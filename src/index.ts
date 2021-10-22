import Discord, { Channel, GuildMember, GuildMemberManager, Message } from "discord.js";
import {sendLog} from './utils/sendLog'

const client = new Discord.Client({
  intents: [...Object.values(Discord.Intents.FLAGS)],
});

client.login(process.env.DISCORD_BOT_TOKEN);

client.once("ready", async () => {
  console.log("Ebep愛してる。");
});

function getLogChannel(): Channel | undefined {
  return client.channels.cache.get("901113596191326259")
}

client.on("voiceStateUpdate", async (oldMember, newMember) => {
  const oldChannelId = oldMember.channelId;
  const newChannelId = newMember.channelId;

  const logChannel = getLogChannel()

  if(logChannel) {
    // Sending a message when a user joined a voice channel.
    if (!oldChannelId && newChannelId) {
      await sendLog(
        logChannel,
        `${newMember.member?.user.username} joined ${newMember.channel?.name}`
      );
    }
  
    // Sending a message when a user disconnected from a voice channel
    if (oldChannelId && !newChannelId) {
      await sendLog(
        logChannel,
        `${newMember.member?.user.username} disconnected from ${oldMember.channel?.name}`
      );
    }
   
    if (oldChannelId != undefined && newChannelId != undefined && oldChannelId !== newChannelId) {
      await sendLog(
        logChannel,
        `${newMember.member?.user.username} move from ${oldMember.channel?.name} to ${newMember.channel?.name}`
      );
    }
  } else {
    throw new Error('The target log channel is not found.')
  }
});

client.on("messageCreate", async message => {
  if(message.author.bot) {
    return
  }

  const logChannel = getLogChannel()

  if(logChannel){
    await sendLog(logChannel, `${message.author.username} sent a message`, {
      // @ts-ignore
      message: {
        content: message.content,
        // @ts-ignore
        image: {
          url: message.attachments.first()?.url,
        },
        // @ts-ignore
        author: {
          name: message.author.id,
        },
      },
    });
  } else {
    throw new Error('The target log channel is not found.')
  }
})
