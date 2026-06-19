# Деплой

## Переменные окружения

На сервере нужно задать:

```env
NODE_ENV=production
ADMIN_PASSWORD=your-strong-admin-password
PORT=3001
NEWS_DATA_FILE=/var/www/uniq-data/news.json
SITE_CONTENT_FILE=/var/www/uniq-data/site-content.json
```

`NEWS_DATA_FILE` и `SITE_CONTENT_FILE` лучше хранить вне папки релиза. Тогда при обновлении проекта новости, тексты, фото и видео из админки не пропадут.

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

  location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```
