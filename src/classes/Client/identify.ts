import { Client } from "../../internal";

export default function identify(client: Client) {

    // Get os
    let os: string = process.platform;
    if (os === "win32") os = "windows";
    else if (os === "darwin") os = "macos";

    // Define intents
    const INTENTS = {
        GUILDS: 1 << 0,
        GUILD_BANS: 1 << 2,
        GUILD_EMOJIS_AND_STICKERS: 1 << 3,
        GUILD_INTEGRATIONS: 1 << 4,
        GUILD_WEBHOOKS: 1 << 5,
        GUILD_INVITES: 1 << 6,
        GUILD_VOICE_STATES: 1 << 7,
        GUILD_MESSAGES: 1 << 9,
        GUILD_MESSAGE_REACTIONS: 1 << 10,
        GUILD_MESSAGE_TYPING: 1 << 11,
        DIRECT_MESSAGES: 1 << 12,
        DIRECT_MESSAGE_REACTIONS: 1 << 13,
        DIRECT_MESSAGE_TYPING: 1 << 14
    };
    const GUILD_MEMBERS_INTENT: number = 1 << 1;
    const GUILD_PRESENCES_INTENT: number = 1 << 8;

    let intents: number = Object.values(INTENTS).reduce((all, intent) => all | intent, 0);
    if (client._membersIntent) intents |= GUILD_MEMBERS_INTENT;
    if (client._presencesIntent) intents |= GUILD_PRESENCES_INTENT;

    /**
     * Identify
     * https://discord.com/developers/docs/topics/gateway#identifying
     */
    client._ws.send(JSON.stringify({
        op: 2,
        d: {
            token: client.token,
            properties: {
                $os: os,
                $browser: "aeracord",
                $device: "aeracord"
            },
            presence: client._initialPresence,
            intents
        }
    }));
}