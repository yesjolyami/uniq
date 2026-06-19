import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  defaultSiteContent,
  type GalleryImage, type HeroFact,
  type SiteContent,
  type VideoSlot,
} from '../src/types/siteContent';

const dataFile = path.resolve(
  process.env.SITE_CONTENT_FILE || path.join(process.cwd(), 'data/site-content.json'),
);
const dataDirectory = path.dirname(dataFile);

let mutationQueue = Promise.resolve();

async function ensureStore() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(dataFile, 'utf8');
  } catch {
    await writeContent(defaultSiteContent);
  }
}

async function writeContent(content: SiteContent) {
  const temporaryFile = `${dataFile}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
  await rename(temporaryFile, dataFile);
}

function cleanText(value: unknown, fallback: string, maxLength = 220) {
  const text = typeof value === 'string' ? value.trim() : '';
  return text ? text.slice(0, maxLength) : fallback;
}

function cleanUrl(value: unknown, fallback: string) {
  const text = typeof value === 'string' ? value.trim() : '';

  if (!text) return fallback;
  if (text.startsWith('/') || /^https?:\/\//i.test(text)) return text;

  return fallback;
}

function normalizeFact(value: unknown, fallback: HeroFact): HeroFact {
  const fact = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    value: cleanText(fact.value, fallback.value, 20),
    label: cleanText(fact.label, fallback.label, 80),
  };
}

function normalizeVideo(value: unknown, fallback: VideoSlot): VideoSlot {
  const video = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    title: cleanText(video.title, fallback.title, 120),
    label: cleanText(video.label, fallback.label, 80),
    image: cleanUrl(video.image, fallback.image),
    videoUrl: cleanUrl(video.videoUrl, fallback.videoUrl),
    enabled: video.enabled !== false,
  };
}

function normalizeGalleryImage(value: unknown, fallback: GalleryImage): GalleryImage {
  const image = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    src: cleanUrl(image.src, fallback.src),
    alt: cleanText(image.alt, fallback.alt, 160),
  };
}

export function normalizeSiteContent(value: unknown): SiteContent {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const hero = input.hero && typeof input.hero === 'object' ? input.hero as Record<string, unknown> : {};

  const facts = Array.isArray(hero.facts) ? hero.facts : [];
  const videos = Array.isArray(input.videos) ? input.videos : [];
  const gallery = Array.isArray(input.gallery) ? input.gallery : [];

  return {
    hero: {
      eyebrow: cleanText(hero.eyebrow, defaultSiteContent.hero.eyebrow, 120),
      title: cleanText(hero.title, defaultSiteContent.hero.title, 180),
      subtitle: cleanText(hero.subtitle, defaultSiteContent.hero.subtitle, 240),
      primaryCta: cleanText(hero.primaryCta, defaultSiteContent.hero.primaryCta, 40),
      secondaryCta: cleanText(hero.secondaryCta, defaultSiteContent.hero.secondaryCta, 40),
      whatsappLabel: cleanText(hero.whatsappLabel, defaultSiteContent.hero.whatsappLabel, 40),
      facts: defaultSiteContent.hero.facts.map((fallback, index) => normalizeFact(facts[index], fallback)),
    },
    videos: defaultSiteContent.videos.map((fallback, index) => normalizeVideo(videos[index], fallback)),
    gallery: defaultSiteContent.gallery.map((fallback, index) => normalizeGalleryImage(gallery[index], fallback)),
  };
}

export async function getSiteContent() {
  await ensureStore();
  const contents = await readFile(dataFile, 'utf8');
  return normalizeSiteContent(JSON.parse(contents));
}

export function updateSiteContent(input: SiteContent) {
  const operation = mutationQueue.then(async () => {
    const content = normalizeSiteContent(input);
    await ensureStore();
    await writeContent(content);
    return content;
  });

  mutationQueue = operation.then(
    () => undefined,
    () => undefined,
  );
  return operation;
}
