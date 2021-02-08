import { AnyChannel, Client } from "../../../../internal";
import parseChannel from "../parseChannel";
import { RawChannelData } from "../rawChannelData";

export default function channelDelete(client: Client, rawData: RawChannelData) {

    // Parse channel
    const channel: AnyChannel = parseChannel(client, rawData);

    // Emit event
    client.emit("channelDelete", channel, rawData);
}