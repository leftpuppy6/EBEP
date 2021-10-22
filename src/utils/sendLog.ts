import {Channel, MessageEmbed} from "discord.js";

interface Options {
  message?:{
    content?: string
    author?:{
      name?: string
    }
    image?: {
      url?: string
    }
  }
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
    const embed = new MessageEmbed().setTitle(text).setTimestamp();
    
    if(options) {
      const {message} = options
      
      if(message?.author?.name){
        embed.addField('Author', `<@${message?.author?.name}>`)
      }
      if(message?.content){
        embed.addField('Content',message.content)
      }
      if(message?.image?.url) {
        embed.setImage(message?.image?.url)
      }
    }

    await targetChannel.send({ embeds: [embed] });
  }
}
  