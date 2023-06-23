import { client } from "./client";

export const kiss = () => {
  client.login(process.env.DISCORD_BOT_TOKEN);

  client.once("ready", async () => {
    console.log("READY");
  });
};
