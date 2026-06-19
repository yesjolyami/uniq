import { spawn, type ChildProcess } from 'node:child_process';

const apiPort = process.env.API_PORT || '3001';
const webPort = process.env.WEB_PORT || '3002';
const apiTarget = `http://localhost:${apiPort}`;

const commands: Array<[string, string[], NodeJS.ProcessEnv]> = [
  ['npm', ['run', 'dev:api'], { ...process.env, PORT: apiPort }],
  ['npm', ['run', 'dev:web', '--', '--port', webPort], { ...process.env, VITE_API_TARGET: apiTarget }],
];

const children: ChildProcess[] = commands.map(([command, args, env]) =>
  spawn(command, args, {
    stdio: 'inherit',
    env,
  }),
);

let isStopping = false;

function stop(exitCode = 0) {
  if (isStopping) return;
  isStopping = true;
  children.forEach((child) => child.kill('SIGTERM'));
  process.exit(exitCode);
}

children.forEach((child) => {
  child.on('exit', (code, signal) => {
    if (!isStopping && (code !== 0 || signal)) {
      stop(code || 1);
    }
  });
});

process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
