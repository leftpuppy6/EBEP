import { VoiceState } from "discord.js";
import { client } from "../../client";
import { getLogChannel } from "../../utils/getLogChannel";
import { sendLog } from "../../utils/sendLog";

export const voiceStateUpdate = async (
  oldMember: VoiceState,
  newMember: VoiceState
): Promise<void> => {
  const oldChannelId = oldMember.channelId;
  const newChannelId = newMember.channelId;
  const logChannel = getLogChannel();

  if (logChannel) {
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

    if (
      oldChannelId != undefined &&
      newChannelId != undefined &&
      oldChannelId !== newChannelId
    ) {
      await sendLog(
        logChannel,
        `${newMember.member?.user.username} move from ${oldMember.channel?.name} to ${newMember.channel?.name}`
      );
    }
  } else {
    throw new Error("The target log channel is not found.");
  }
};
