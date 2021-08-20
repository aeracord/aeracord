/**
 * Format MS
 *
 * Format an amount of time in milliseconds into a formatted string
 *
 * @param ms The amount of time in milliseconds
 *
 * @returns {string} The formatted string
 */
export default function formatMS(ms: number): string {

    // Get timestamp data
    let seconds: number = ms / 1000;
    let hours: number = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    let minutes: number = Math.floor(seconds / 60);
    seconds = seconds % 60;

    // Return
    return `${hours} hour${hours === 1 ? "" : "s"}, ${minutes} minute${minutes === 1 ? "" : "s"}, and ${seconds} second${seconds === 1 ? "" : "s"}`;
}