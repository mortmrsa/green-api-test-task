// GREEN-API test task
// The public API URL is used by default. If your GREEN-API console shows
// a different apiUrl for the instance, replace API_URL with that value.
const API_URL = 'https://api.green-api.com';

const $ = (id) => document.getElementById(id);

const responseBox = $('response');
const statusBox = $('status');

function setStatus(message = '', type = '') {
  statusBox.textContent = message;
  statusBox.className = `status ${type}`.trim();
}

function getCredentials() {
  const idInstance = $('idInstance').value.trim();
  const apiTokenInstance = $('apiTokenInstance').value.trim();

  if (!idInstance || !apiTokenInstance) {
    throw new Error('Введите idInstance и ApiTokenInstance.');
  }

  return { idInstance, apiTokenInstance };
}

function endpoint(method) {
  const { idInstance, apiTokenInstance } = getCredentials();
  return `${API_URL}/waInstance${encodeURIComponent(idInstance)}/${method}/${encodeURIComponent(apiTokenInstance)}`;
}

function showResponse(data) {
  responseBox.value = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
}

async function request(method, options = {}) {
  const url = endpoint(method);
  setStatus(`Выполняется ${method}...`);

  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    showResponse(data);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    setStatus(`${method}: успешно, HTTP ${response.status}`, 'success');
    return data;
  } catch (error) {
    const message = error instanceof TypeError
      ? 'Не удалось выполнить запрос. Проверьте API URL, CORS, интернет-соединение и данные инстанса.'
      : error.message;
    if (!responseBox.value) showResponse({ error: message });
    setStatus(message, 'error');
  }
}

$('getSettingsBtn').addEventListener('click', () => request('getSettings'));
$('getStateBtn').addEventListener('click', () => request('getStateInstance'));

$('sendMessageBtn').addEventListener('click', async () => {
  try {
    const chatId = $('messageChatId').value.trim();
    const message = $('messageText').value.trim();

    if (!chatId || !message) {
      throw new Error('Для sendMessage заполните Chat ID и сообщение.');
    }

    await request('sendMessage', {
      method: 'POST',
      body: { chatId, message }
    });
  } catch (error) {
    showResponse({ error: error.message });
    setStatus(error.message, 'error');
  }
});

$('sendFileBtn').addEventListener('click', async () => {
  try {
    const chatId = $('fileChatId').value.trim();
    const urlFile = $('fileUrl').value.trim();
    const caption = $('fileCaption').value.trim();

    if (!chatId || !urlFile) {
      throw new Error('Для sendFileByUrl заполните Chat ID и URL файла.');
    }

    let fileName = 'file';
    try {
      const parsed = new URL(urlFile);
      const name = decodeURIComponent(parsed.pathname.split('/').pop() || '');
      if (name) fileName = name;
    } catch {
      throw new Error('Укажите корректный URL файла.');
    }

    const body = { chatId, urlFile, fileName };
    if (caption) body.caption = caption;

    await request('sendFileByUrl', {
      method: 'POST',
      body
    });
  } catch (error) {
    showResponse({ error: error.message });
    setStatus(error.message, 'error');
  }
});

$('clearBtn').addEventListener('click', () => {
  responseBox.value = '';
  setStatus('');
});
