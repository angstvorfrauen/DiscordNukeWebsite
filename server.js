const express = require('express');
const bodyParser = require('body-parser');
const { startBot, isBotOnline, stopBot } = require('./bot');

const app = express();
const PORT = 3000;
let savedToken = null;

app.use(bodyParser.json());
app.use(express.static('Code'));

app.post('/connect', async (req, res) => {
  const { token } = req.body;
  try {
    await startBot(token);
    savedToken = token;
    res.json({ success: true, message: "Bot connected!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

app.get('/status', (req, res) => {
  res.json({ online: isBotOnline() });
});

app.post('/stop', async (req, res) => {
  try {
    await stopBot();
    savedToken = null;
    res.json({ success: true, message: "Bot stopped!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(PORT);
});