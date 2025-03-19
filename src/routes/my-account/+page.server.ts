// populate data from cookies

export const prerender = true;

export async function load({ cookies }) {
  // put discord user session data from cookies in props
  return {
    data: JSON.parse(cookies.get('discord_session_user') || '{}')
  };
}