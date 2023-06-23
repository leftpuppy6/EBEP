import { Message } from "discord.js";
import { client } from "../../client";
import { getLogChannel } from "../../utils/getLogChannel";
import { sendLog } from "../../utils/sendLog";

export const messageCreate = async (message: Message): Promise<void> => {
  if (message.author.bot) {
    return;
  }

  const logChannel = getLogChannel();

  const content = message.content;
  console.log(content)
  const image = {
    url: message.attachments.first()?.url,
  };

  const musicchannel = '886902151761256469';
  if(message.channelId == musicchannel){
  if(message.content.match(/www.youtube.com/)){
      //  @ts-ignore
   client.channels.cache.get(musicchannel).send(';;play '+message.content);
  }
}

  if (logChannel) {
    await sendLog(
      logChannel,
      `**<@${message.author.id}> sent a message on <#${message.channelId}> at https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}**`,
      {
        message: {
          content,
          image,
        },
      }
    );
  } else {
    throw new Error("The target log channel is not found.");
  }
};
