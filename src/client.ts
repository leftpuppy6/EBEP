import Discord from "discord.js";

export const client = new Discord.Client({
  intents: [...Object.values(Discord.Intents.FLAGS)],
});
