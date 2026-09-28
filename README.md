# GREEN-API Test Task — Специалист технической поддержки 2 линии

Тестовая HTML-страница для вызова методов GREEN-API:

- `getSettings`
- `getStateInstance`
- `sendMessage`
- `sendFileByUrl`

## Запуск

Проект состоит из обычных HTML/CSS/JavaScript-файлов и не требует сборки.

Можно открыть `index.html` в браузере или запустить через VS Code Live Server.

## Настройка

В `script.js` по умолчанию используется:

```js
const API_URL = 'https://api.green-api.com';
```

Если в личном кабинете GREEN-API для конкретного инстанса указан другой `apiUrl`, замените это значение.

## Использование

1. Создайте инстанс GREEN-API и авторизуйте WhatsApp.
2. Введите `idInstance` и `ApiTokenInstance`.
3. Нажмите `getSettings` или `getStateInstance`.
4. Для `sendMessage` укажите `Chat ID` и текст сообщения.
5. Для `sendFileByUrl` укажите `Chat ID` и публичную ссылку на файл. Имя файла определяется автоматически из URL.
6. Ответ API отображается в поле «Ответ» только для чтения.

## GitHub Pages

После загрузки репозитория на GitHub:

`Settings → Pages → Deploy from a branch → main → /(root) → Save`

Через некоторое время GitHub Pages выдаст публичную ссылку на `index.html`.

## Важно

Не публикуйте реальные `ApiTokenInstance` в репозитории, README, скриншотах или видео. Вводите токен непосредственно на опубликованной странице во время демонстрации.
