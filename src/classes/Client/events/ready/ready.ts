import { Client } from "../../../../internal";
import { EventQueueEvent } from "../../Client";
import event from "../../event";
import { RawReadyData, RawReadyDataGuild } from "./rawReadyData";
import { ReadyData } from "./readyData";

export default function ready(client: Client, rawData: RawReadyData) {

    // Parse data
    const data: ReadyData = {
        apiVersion: rawData.v,
        user: {
            username: rawData.user.username,
            id: rawData.user.id,
            flags: rawData.user.flags || 0,
            discriminator: rawData.user.discriminator,
            avatar: rawData.user.avatar
        },
        sessionID: rawData.session_id,
        guilds: rawData.guilds.map((g: RawReadyDataGuild) => g.id),
        application: rawData.application
    };

    // Set client data
    client.id = data.user.id;
    client.username = data.user.username;
    client.discriminator = data.user.discriminator;
    client.avatarURL = `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}`;
    client.sessionID = data.sessionID;

    /**
     * Ready
     *
     * Set the client as ready
     * This allows events to be processed
     */
    client.ready = true;

    // Process queued events
    client.eventQueue.forEach((e: EventQueueEvent) => event(client, e.type, e.data));
    client.eventQueue = [];

    // Emit event
    client.emit("ready", data, rawData);
}