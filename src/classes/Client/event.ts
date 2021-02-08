import { Client } from "../../internal";
import channelCreate from "./events/channelCreate/channelCreate";
import channelDelete from "./events/channelDelete/channelDelete";
import channelUpdate from "./events/channelUpdate/channelUpdate";
import ready from "./events/ready/ready";

export default function event(client: Client, type: string, data: any) {

    // Ready
    if (type === "READY") return ready(client, data);

    /**
     * If the client isn't ready, add the events to the event queue
     * Once the client's ready, it'll loop through the queue and process all the events
     */
    if (!client.ready) return client.eventQueue.push({ type, data });

    // Channel Create
    if (type === "CHANNEL_CREATE") channelCreate(client, data);

    // Channel Delete
    else if (type === "CHANNEL_DELETE") channelDelete(client, data);

    // Channel Update
    else if (type === "CHANNEL_UPDATE") channelUpdate(client, data);
}