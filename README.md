# 🚀 RocketClient

RocketClient is a web-based dashboard for connecting and managing Discord bot sessions through a simple browser interface.

The project consists of an **Express.js backend**, a **Discord.js bot controller**, and a lightweight frontend built with **HTML, CSS and JavaScript**.

> ⚠️ **Warning:** The included `!nuke` functionality performs destructive actions on a Discord server, including deleting channels and roles, banning members, and creating new channels. Only use this project on servers where you have explicit authorization to perform these actions.

---

## ✨ Features

* 🚀 Web-based Discord bot dashboard
* 🔌 Connect a Discord bot using its bot token
* ⏹️ Start and stop bot sessions from the dashboard
* 📡 Real-time bot status endpoint
* 👤 Session-based bot management
* 💻 Responsive and modern UI
* 🤖 Built with Discord.js v14
* 🌐 Express.js web server
* 🎨 Custom blue RocketClient interface
* ⚡ Lightweight Node.js architecture

---

## 📁 Project Structure

```text
DiscordNukeWebsite/
├── Code/
│   ├── CSS/
│   │   └── index.css
│   ├── JS/
│   │   └── index.js
│   └── index.html
│
├── bot.js
├── server.js
├── package.json
└── README.md
```

### Main Files

| File                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| `server.js`          | Express server and API endpoints                   |
| `bot.js`             | Discord.js client management and bot functionality |
| `package.json`       | Node.js dependencies and scripts                   |
| `Code/index.html`    | Web dashboard                                      |
| `Code/CSS/index.css` | Dashboard styling                                  |
| `Code/JS/index.js`   | Frontend API communication                         |

---

## 🛠️ Requirements

Before installing RocketClient, make sure you have:

* [Node.js](https://nodejs.org/) 18 or newer
* A Discord bot application
* A Discord bot token
* Appropriate permissions for the bot

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

Install the dependencies:

```bash
npm install
```

---

## ▶️ Start the Dashboard

Start the application with:

```bash
npm start
```

The server runs on:

```text
http://localhost:3000
```

Open the address in your browser to access the RocketClient dashboard.

### Development Mode

If you want automatic server restarts while developing:

```bash
npm run dev
```

---

## 🔑 Connecting a Discord Bot

1. Open the RocketClient dashboard.
2. Enter your Discord bot token.
3. Click the connect button.
4. RocketClient attempts to log the bot into Discord.
5. Once connected, the dashboard displays the bot as online.
6. Use **Stop Bot** to disconnect the bot.

### Required Discord Intents

The bot is configured with the following Gateway Intents:

```text
Guilds
GuildMessages
MessageContent
GuildMembers
GuildBans
```

Depending on your bot configuration, some intents may need to be enabled in the **Discord Developer Portal**.

---

## 💥 `!nuke` Command

The included bot listens for:

```text
!nuke
```

When triggered in a guild, the current implementation attempts to:

* Delete guild channels
* Delete editable roles
* Ban bannable members
* Create 50 new text channels
* Send a message in each newly created channel

This is intentionally destructive behavior.

**Do not use it against servers you do not own or administer.**

For development and testing, use a private Discord test server.

---

## 🔌 API Endpoints

### `POST /connect`

Connects a Discord bot using the supplied token.

Request:

```json
{
  "token": "YOUR_BOT_TOKEN"
}
```

Successful response:

```json
{
  "success": true,
  "message": "Bot connected."
}
```

---

### `POST /stop`

Stops the bot associated with the current session.

Example response:

```json
{
  "success": true,
  "message": "Bot stopped."
}
```

---

### `GET /status`

Returns the current bot status.

Example:

```json
{
  "online": true,
  "info": {
    "tag": "ExampleBot#0000"
  }
}
```

---

## ⚙️ Configuration

The server currently uses port `3000`.

In `server.js`:

```js
const PORT = 3000;
```

You can change this to another port if required.

For production deployments, it is recommended to move configuration such as:

* Session secrets
* Port
* Bot credentials
* Environment-specific settings

into environment variables instead of storing them directly in source code.

---

## 🔐 Security

**Never commit Discord bot tokens to GitHub.**

Bot tokens provide control over the Discord bot and should be treated like passwords.

If you accidentally expose a token:

1. Go to the Discord Developer Portal.
2. Open your bot application.
3. Regenerate the bot token.
4. Update your deployment with the new token.

For production use, additional security measures are strongly recommended, including:

* HTTPS
* Secure session cookies
* A strong randomly generated session secret
* Authentication for dashboard users
* Rate limiting
* Input validation
* Environment variables for secrets
* Proper permission checks

---

## 🧪 Development

Install development dependencies:

```bash
npm install
```

Run with Nodemon:

```bash
npm run dev
```

The project will automatically restart when server-side files change.

---

## 📜 License

This project is released under the **MIT License**.

See the `LICENSE` file for more information.

---

## 👤 Author

**Xeuka**

RocketClient — Discord Bot Dashboard

---

## ⚠️ Disclaimer

This software is provided for educational and authorized testing purposes.

The developers are not responsible for damage, data loss, account restrictions, server disruption, or other consequences resulting from misuse of the software.

Only operate the bot on Discord servers where you have explicit permission to perform the requested actions.
