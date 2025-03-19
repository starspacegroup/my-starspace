// src/routes/api-0/discord/message/+server.ts
import { json, type RequestHandler } from '@sveltejs/kit';
import { DISCORD_PUBLIC_KEY } from '$env/static/private';
import { verify } from 'discord-verify';

// Discord Interaction types
interface DiscordInteraction {
  type: number;
  data?: any;
  member?: {
    user?: {
      id: string;
    };
  };
  user?: {
    id: string;
  };
}

/**
 * SvelteKit server handler for receiving Discord messages
 * This endpoint receives and processes Discord Interactions API payloads
 * when users send private messages to the bot
 */
export const POST: RequestHandler = async ({ request }) => {
  // Get the signature and timestamp from the Discord request
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');

  // If any headers are missing, return an error
  if (!signature || !timestamp) {
    console.error('Missing request headers required for Discord verification');
    return new Response('Bad request: Missing headers', { status: 401 });
  }

  // Get the raw body
  const rawBody = await request.text();

  // Verify the request is coming from Discord
  try {
    const isVerified = await verify(
      rawBody,
      signature,
      timestamp,
      DISCORD_PUBLIC_KEY,
      crypto.subtle
    );

    if (!isVerified) {
      console.error('Invalid Discord signature');
      return new Response('Bad request: Invalid signature', { status: 401 });
    }
  } catch (error) {
    console.error('Error verifying Discord request:', error);
    return new Response('Error verifying request', { status: 401 });
  }

  // Parse the body as JSON
  const body: DiscordInteraction = JSON.parse(rawBody);

  // Handle Discord PING (required for registering the webhook)
  if (body.type === 1) {
    return json({ type: 1 }); // Respond with ACK for PING
  }

  // Handle direct messages (DM) events
  if (body.type === 2) { // Type 2 is APPLICATION_COMMAND
    try {
      // Process the message
      const message = body.data;
      const userId = body.member?.user?.id || body.user?.id;

      // Extract content based on the interaction type
      // This might need adjustment based on your command structure
      const content = typeof message?.content === 'string'
        ? message.content
        : message?.options?.[0]?.value as string;

      console.log(`Received message from user ${userId}: ${content}`);

      // Process the message here
      // ... your bot logic here ...

      // Example response back to Discord
      return json({
        type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
        data: {
          content: `I received your message: "${content}"`
        }
      });
    } catch (error) {
      console.error('Error processing Discord message:', error);
      return json({
        type: 4,
        data: {
          content: 'Sorry, there was an error processing your message.'
        }
      });
    }
  }

  // For other event types
  return json({
    type: 4,
    data: {
      content: 'Received your interaction!'
    }
  });
};