const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { startBot, stopBot, isBotOnline, getBotInfo } = require('./bot');

const app = express();
const PORT = 3000;

app.use(express.static('Code'));
app.use(bodyParser.json());
app.use(session({
  secret: '🚀rocketSecret🚀',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
}));

app.post('/connect', async (req, res) => {
  const token = req.body.token;
  const userId = req.session.id;
  try {
    await startBot(userId, token);
    req.session.token = token;
    res.json({ success: true, message: 'Bot connected.' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

app.post('/stop', async (req, res) => {
  const userId = req.session.id;
  await stopBot(userId);
  req.session.token = null;
  res.json({ success: true, message: 'Bot stopped.' });
});

app.get('/status', (req, res) => {
  const userId = req.session.id;
  res.json({ online: isBotOnline(userId), info: getBotInfo(userId) });
});

app.listen(PORT, () => {
  console.log(PORT)
});