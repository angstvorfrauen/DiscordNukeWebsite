async function connectBot() {
  const tokenInput = document.getElementById('token');
  const responseElement = document.getElementById('response');
  const connectBtn = document.getElementById('connectBtn');
  const res = await fetch('/connect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: tokenInput.value })
  });
  const data = await res.json();
  responseElement.textContent = data.message;
  if (data.success) {
    tokenInput.disabled = true;
    connectBtn.disabled = true;
    document.getElementById('stopBtn').style.display = 'block';
  }
}

async function stopBot() {
  const tokenInput = document.getElementById('token');
  const responseElement = document.getElementById('response');
  const connectBtn = document.getElementById('connectBtn');
  const res = await fetch('/stop', { method: 'POST' });
  const data = await res.json();
  responseElement.textContent = data.message;
  if (data.success) {
    tokenInput.disabled = false;
    connectBtn.disabled = false;
    document.getElementById('stopBtn').style.display = 'none';
  }
}

window.onload = async () => {
  const tokenInput = document.getElementById('token');
  const connectBtn = document.getElementById('connectBtn');
  const responseElement = document.getElementById('response');
  const res = await fetch('/status');
  const data = await res.json();
  if (data.online) {
    tokenInput.disabled = true;
    connectBtn.disabled = true;
    document.getElementById('stopBtn').style.display = 'block';
    responseElement.textContent = "Bot is online";
  }
};  