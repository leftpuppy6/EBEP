import Discord, {
  Channel,
  GuildMember,
  GuildMemberManager,
  Message,
  Role,
  VoiceState,
} from "discord.js";
import { sendLog } from "./utils/sendLog";
import { kiss } from "./kiss";
import { client } from "./client";
import { getLogChannel } from "./utils/getLogChannel";
import { voiceStateUpdate } from "./events/voiceStateUpdate";
import { messageCreate } from "./events/messageCreate";

kiss();

const addRole = async (message:Message):Promise<void> => {
  let role = message.member?.guild.roles.cache.find(role => role.name === '900990533353222195');
  console.log(role)
}

const Ruru = () => {
  
}


client.on("voiceStateUpdate", voiceStateUpdate);
client.on("messageCreate", messageCreate);


