// src/routes/api-0/discord/interactions/+server.ts
import { verifyKey } from 'discord-interactions';
import { DISCORD_CLIENT_SECRET, DISCORD_PUBLIC_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

// Discord interaction types
const InteractionType = {
  PING: 1,
  APPLICATION_COMMAND: 2,
  MESSAGE_COMPONENT: 3,
  APPLICATION_COMMAND_AUTOCOMPLETE: 4,
  MODAL_SUBMIT: 5
};

// Discord interaction response types
const InteractionResponseType = {
  PONG: 1,
  CHANNEL_MESSAGE_WITH_SOURCE: 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
  DEFERRED_UPDATE_MESSAGE: 6,
  UPDATE_MESSAGE: 7,
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: 8,
  MODAL: 9
};

export async function POST({ request, platform }) {
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');

  const body = await request.text();

  // Verify the request is from Discord
  const isValidRequest = signature && timestamp &&
    verifyKey(body, signature, timestamp, DISCORD_PUBLIC_KEY);

  if (!isValidRequest) {
    return new Response('Invalid request signature', { status: 401 });
  }

  const interaction = JSON.parse(body);

  // Handle ping from Discord
  if (interaction.type === InteractionType.PING) {
    return json({ type: InteractionResponseType.PONG });
  }

  // Handle command interaction
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    // Handle the timebox command
    if (interaction.data.name === 'timebox') {
      // Extract command options
      const options = interaction.data.options || [];
      let minutes = 25; // Default value
      let label = 'Timebox session'; // Default label

      // Get values from options if provided
      const minutesOption = options.find((opt: { name: string; }) => opt.name === 'minutes');
      if (minutesOption) {
        minutes = minutesOption.value;
      }

      const labelOption = options.find((opt: { name: string; }) => opt.name === 'label');
      if (labelOption) {
        label = labelOption.value;
      }

      // Get user ID for the DM
      const userId = interaction.member.user.id;

      // Schedule the timebox
      await scheduleTimebox(userId, minutes, label, platform?.env?.TIMEBOX_KV as KVNamespace);

      return json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Started a ${minutes} minute timebox${label ? ` for "${label}"` : ''}! I'll DM you when time's up.`,
          flags: 64 // Ephemeral flag - only visible to the user who triggered the command
        }
      });
    }
  }

  // Default response if no other conditions are met
  return json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: 'Command not recognized',
      flags: 64 // Ephemeral flag
    }
  });
}

async function scheduleTimebox(userId: any, minutes: number, label: string, kv: KVNamespace) {
  // Get the Discord bot token from environment
  const token = DISCORD_CLIENT_SECRET;

  // Send initial DM to user
  await sendDirectMessage(userId, token,
    `🕒 Your ${minutes} minute timebox${label ? ` for "${label}"` : ''} has started! Focus time begins now.`);

  // Schedule the end notification using Cloudflare Workers
  const endTime = Date.now() + minutes * 60 * 1000;

  // Store the scheduled timebox in KV for the Workflow to pick up
  await kv.put(`timebox:${userId}:${endTime}`, JSON.stringify({
    userId,
    endTime,
    minutes,
    label
  }));
}

async function sendDirectMessage(userId: any, token: any, content: string) {
  // First create a DM channel
  const dmChannelResponse = await fetch('https://discord.com/api/v10/users/@me/channels', {
    method: 'POST',
    headers: {
      'Authorization': `Bot ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipient_id: userId
    })
  });

  const dmChannel: any = await dmChannelResponse.json();

  // Then send message to the DM channel
  await fetch(`https://discord.com/api/v10/channels/${dmChannel.id}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bot ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content
    })
  });
}