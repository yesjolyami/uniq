# Деплой

## Переменные окружения

На сервере нужно задать:

```env
NODE_ENV=production
ADMIN_PASSWORD=your-strong-admin-password
PORT=3001
NEWS_DATA_FILE=/var/www/uniq-data/news.json
SITE_CONTENT_FILE=/var/www/uniq-data/site-content.json
UPLOADS_DIR=/var/www/uniq-data/uploads
UPLOAD_LIMIT_MB=2048
GOOGLE_SHEET_ID=spreadsheet-id
GOOGLE_SHEET_NAME=Заявки
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
# Локально вместо двух строк выше можно задать:
# GOOGLE_SERVICE_ACCOUNT_FILE=/absolute/path/service-account.json
TELEGRAM_BOT_TOKEN=telegram-bot-token
TELEGRAM_CHAT_ID=telegram-chat-id
```

`NEWS_DATA_FILE`, `SITE_CONTENT_FILE` и `UPLOADS_DIR` лучше хранить вне папки релиза. Тогда при обновлении проекта новости, тексты, фото и видео из админки не пропадут.

## Настройка отправки заявок

### Google Таблица

1. Создайте проект в Google Cloud и включите **Google Sheets API**.
2. Создайте сервисный аккаунт и JSON-ключ. Из JSON возьмите `client_email` для
   `GOOGLE_SERVICE_ACCOUNT_EMAIL` и `private_key` для `GOOGLE_PRIVATE_KEY`.
   Для локальной разработки вместо них можно указать абсолютный путь к JSON в
   `GOOGLE_SERVICE_ACCOUNT_FILE`. Не помещайте JSON-ключ внутрь репозитория.
3. Создайте лист с названием из `GOOGLE_SHEET_NAME` (по умолчанию `Заявки`).
4. В первой строке удобно добавить заголовки:
   `Дата`, `Имя`, `Телефон`, `Email`, `Сообщение`, `URL`, `utm_source`,
   `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `ID заявки`.
5. Нажмите «Настройки доступа» у таблицы и выдайте email сервисного аккаунта
   роль **Редактор**. ID таблицы находится в URL между `/d/` и `/edit`.

Значения записываются в режиме `RAW`, а строки, начинающиеся с `=`, `+`, `-`
или `@`, дополнительно экранируются от внедрения формул.

### Telegram

1. Откройте `@BotFather`, выполните `/newbot` и сохраните выданный токен в
   `TELEGRAM_BOT_TOKEN`.
2. Добавьте бота в нужный чат/группу и отправьте туда любое сообщение.
3. Откройте `https://api.telegram.org/bot<ТОКЕН>/getUpdates`, найдите
   `message.chat.id` и сохраните его в `TELEGRAM_CHAT_ID`. Для группы ID обычно
   отрицательный.

Секреты задаются только в окружении Node-сервера. Переменные без префикса
`VITE_` не попадают во frontend-сборку. Файлы `.env*`, кроме безопасного
`.env.example`, исключены через `.gitignore`.

## Сборка и запуск

```bash
npm install
npm run build
npm start
```

После запуска:

- сайт: `https://your-domain.com`
- админка: `https://your-domain.com/admin`

Админка сохраняет изменения через backend API в JSON-файлы из переменных окружения. После сохранения правки сразу видны на сайте.

## Пример Nginx

```nginx
server {
  server_name your-domain.com;
  client_max_body_size 2048m;

  location /api/admin/uploads {
    client_max_body_size 2048m;
    proxy_pass http://127.0.0.1:3001;
    proxy_request_buffering off;
    proxy_read_timeout 300s;
    proxy_send_timeout 300s;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_request_buffering off;
    proxy_read_timeout 300s;
    proxy_send_timeout 300s;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```
