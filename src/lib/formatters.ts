/**
 * Formats a Discord timestamp into the user's local date and time
 * 
 * Discord timestamps use the format <t:UNIX_TIMESTAMP:FORMAT_FLAG>
 * Common format flags:
 * - t: Short time (e.g., 9:30 PM)
 * - T: Long time (e.g., 9:30:00 PM)
 * - d: Short date (e.g., 07/16/2021)
 * - D: Long date (e.g., July 16, 2021)
 * - f: Short date/time (e.g., July 16, 2021 9:30 PM)
 * - F: Long date/time (e.g., Friday, July 16, 2021 9:30 PM)
 * - R: Relative time (e.g., 2 hours ago)
 * 
 * @param discordTimestamp - The Discord timestamp string (e.g., <t:1741961887:t>)
 * @returns Formatted date and time string in the user's local timezone
 */
export function formatDiscordTimestamp(discordTimestamp: string): string {
  // Extract the Unix timestamp and format flag using regex
  const regex = /<t:(\d+):([tTdDfFR])>/;
  const match = discordTimestamp.match(regex);

  if (!match) {
    throw new Error("Invalid Discord timestamp format. Expected format: <t:TIMESTAMP:FLAG>");
  }

  const unixTimestamp = parseInt(match[1], 10);
  const formatFlag = match[2];

  // Create a Date object from the Unix timestamp (in seconds)
  const date = new Date(unixTimestamp * 1000);

  // Format based on the flag
  switch (formatFlag) {
    case 't': // Short time
      return date.toLocaleTimeString([], { timeStyle: 'short' });
    case 'T': // Long time
      return date.toLocaleTimeString([], { timeStyle: 'medium' });
    case 'd': // Short date
      return date.toLocaleDateString([], { dateStyle: 'short' });
    case 'D': // Long date
      return date.toLocaleDateString([], { dateStyle: 'long' });
    case 'f': // Short date/time
      return date.toLocaleDateString([], { dateStyle: 'long' }) + ' ' +
        date.toLocaleTimeString([], { timeStyle: 'short' });
    case 'F': // Long date/time
      return date.toLocaleDateString([], { weekday: 'long', dateStyle: 'long' }) + ' ' +
        date.toLocaleTimeString([], { timeStyle: 'short' });
    case 'R': // Relative time
      return formatRelativeTime(date);
    default:
      return date.toLocaleString();
  }
}

/**
 * Formats a date as relative time (e.g., "2 hours ago", "in 3 days")
 * @param date - The date to format
 * @returns Formatted relative time string
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffDays / 365);

  const absDiffSecs = Math.abs(diffSecs);
  const absDiffMins = Math.abs(diffMins);
  const absDiffHours = Math.abs(diffHours);
  const absDiffDays = Math.abs(diffDays);
  const absDiffWeeks = Math.abs(diffWeeks);
  const absDiffMonths = Math.abs(diffMonths);
  const absDiffYears = Math.abs(diffYears);

  const isInFuture = diffMs > 0;
  const prefix = isInFuture ? 'in ' : '';
  const suffix = isInFuture ? '' : ' ago';

  if (absDiffSecs < 60) {
    return isInFuture ? 'just now' : 'just now';
  } else if (absDiffMins < 60) {
    return `${prefix}${absDiffMins} minute${absDiffMins !== 1 ? 's' : ''}${suffix}`;
  } else if (absDiffHours < 24) {
    return `${prefix}${absDiffHours} hour${absDiffHours !== 1 ? 's' : ''}${suffix}`;
  } else if (absDiffDays < 7) {
    return `${prefix}${absDiffDays} day${absDiffDays !== 1 ? 's' : ''}${suffix}`;
  } else if (absDiffMonths < 1) {
    return `${prefix}${absDiffWeeks} week${absDiffWeeks !== 1 ? 's' : ''}${suffix}`;
  } else if (absDiffYears < 1) {
    return `${prefix}${absDiffMonths} month${absDiffMonths !== 1 ? 's' : ''}${suffix}`;
  } else {
    return `${prefix}${absDiffYears} year${absDiffYears !== 1 ? 's' : ''}${suffix}`;
  }
}