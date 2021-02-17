import { Client } from "../../internal";

export default function identify(client: Client) {

    // Get os
    let os: string = process.platform;
    if (os === "win32") os = "windows";
    else if (os === "darwin") os = "macos";

    // Define intents
    interface Intents {
        [key: string]: number;
    }

    const INTENTS: Intents = {
        GUILDS: 1 << 0,
        GUILD_MEMBERS: 1 << 1,
        GUILD_BANS: 1 << 2,
        GUILD_EMOJIS: 1 << 3,
        GUILD_INTEGRATIONS: 1 << 4,
        GUILD_WEBHOOKS: 1 << 5,
        GUILD_INVITES: 1 << 6,
        GUILD_VOICE_STATES: 1 << 7,
        GUILD_PRESENCES: 1 << 8,
        GUILD_MESSAGES: 1 << 9,
        GUILD_MESSAGE_REACTIONS: 1 << 10,
        GUILD_MESSAGE_TYPING: 1 << 11,
        DIRECT_MESSAGES: 1 << 12,
        DIRECT_MESSAGE_REACTIONS: 1 << 13,
        DIRECT_MESSAGE_TYPING: 1 << 14
    };

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
            intents: client._intents.reduce((all, intent) => all | INTENTS[intent], 0)
        }
    }));
}