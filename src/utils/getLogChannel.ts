import { Channel } from "discord.js";
import { client } from "../client";

export const getLogChannel = (): Channel | undefined => {
  return client.channels.cache.get("902717914761814057");
};