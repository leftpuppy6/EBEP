import { Channel, MessageEmbed, TextBasedChannels } from "discord.js";

interface Options {
  message?: {
    content?: string;
    image?: {
      url?: string;
    };
  };
}

export async function sendLog(
  /**
   * A target log channel that stores log messages.
   */
  targetChannel: Channel,
  /**
   * The text that you wanna send to a log channel.
   */
  text: string,
  options?: Options
): Promise<void> {
  if (targetChannel?.isText()) {
    const embed = new MessageEmbed().setDescription(text);

    if (options) {
      const { message } = options;
      if (message?.content) {
        embed.addField("Content", message.content);
      }
      if (message?.image?.url) {
        embed.setImage(message?.image?.url);
      }
    }
    console.log(embed);
    await targetChannel.send({ embeds: [embed] });
  }
}
