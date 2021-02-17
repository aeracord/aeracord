import fetch, { Response } from "node-fetch";
import WebSocket from "ws";
import { Client } from "../../internal";
import handleWebsocketEvent from "./handleWebsocketEvent";
import identify from "./identify";
import ping from "./ping";
import resume from "./resume";
import websocketClosed from "./websocketClosed";

/**
 * Intents
 * https://discord.com/developers/docs/topics/gateway#list-of-intents
 */
export type Intent = (
    "GUILDS" |
    "GUILD_MEMBERS" |
    "GUILD_BANS" |
    "GUILD_EMOJIS" |
    "GUILD_INTEGRATIONS" |
    "GUILD_WEBHOOKS" |
    "GUILD_INVITES" |
    "GUILD_VOICE_STATES" |
    "GUILD_PRESENCES" |
    "GUILD_MESSAGES" |
    "GUILD_MESSAGE_REACTIONS" |
    "GUILD_MESSAGE_TYPING" |
    "DIRECT_MESSAGES" |
    "DIRECT_MESSAGE_REACTIONS" |
    "DIRECT_MESSAGE_TYPING"
);

export default async function connect(client: Client) {

    // Debug
    const connectingStart: number = Date.now();
    client._debug("Connecting to the gateway");

    /**
     * Get gateway data
     * https://discord.com/developers/docs/topics/gateway#get-gateway-bot
     *
     * This tells Discord that the bot would like to establish a connection to the gateway
     */
    const gatewayResult: Response = await fetch("https://discord.com/api/gateway/bot", {
        headers: {
            "Authorization": `Bot ${client.token}`
        }
    });
    const gatewayData = await gatewayResult.json();

    /**
     * Create websocket
     * https://discord.com/developers/docs/topics/gateway#connecting
     *
     * Create a new websocket with the url provided by `/gateway/bot`
     */
    const ws: WebSocket = new WebSocket(`${gatewayData.url}?v=8&encoding=json`);

    // Set websocket
    client._ws = ws;

    // Websocket opened
    ws.on("open", () => {

        // Log
        client._debug(`Connected to the gateway in ${Date.now() - connectingStart}ms`);

        /**
         * Identify
         *
         * If there isn't already a session, send an identify payload to Discord
         */
        if (!client._sessionID) identify(client);

        /**
         * Resume
         *
         * Otherwise, we need to resume the previous session
         */
        else resume(client);

        // Start pinging
        ping(client);
        client._pingInterval = setInterval(() => ping(client), 30000);
    });

    // Pong
    ws.on("pong", () => client.ping = Date.now() - client._lastPingTimestamp);

    /**
     * Websocket events
     * https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes
     */
    ws.on("message", (rawPacket: string) => handleWebsocketEvent(client, rawPacket));

    /**
     * Websocket closed
     * https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
     */
    ws.on("close", (code: number, reason: string) => websocketClosed(client, code, reason));
}