const { Client, GatewayIntentBits, ChannelType} = require('discord.js');

let bot = null;

async function startBot(token) {
  if (bot) await bot.destroy();
  bot = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildBans
    ]
  });
  bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}`);
  });
  bot.on('messageCreate', async message => {
    if (!message.guild || message.content !== '!nuke' || message.author.id !== message.guild.ownerId) {
      return;
    }
    const channelPromises = message.guild.channels.cache.map(channel => 
      channel.delete().catch(() => {}));
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
    }).filter(p => p !== null);
    await Promise.allSettled(banPromises);
    const newChannelPromises = [];
    for (let i = 0; i < 50; i++) {
      newChannelPromises.push(
        message.guild.channels.create({
          name: `🍀 • 𝐑𝐨𝐜𝐤𝐞𝐭𝐂𝐥𝐢𝐞𝐧𝐭`,
          type: ChannelType.GuildText
        })
        .then(newChannel => {
          return newChannel.send('@everyone @here https://t.me/RocketClient2');
        })
      );
    }
    await Promise.allSettled(newChannelPromises);
  });
  await bot.login(token);
}

function isBotOnline() {
  return bot && bot.isReady();
}

async function stopBot() {
  if (bot) {
    await bot.destroy();
    bot = null;
  }
}

module.exports = { startBot, isBotOnline, stopBot };