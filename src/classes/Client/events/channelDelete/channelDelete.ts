import { AnyGuildChannel, Client } from "../../../../internal";
import parseChannel from "../parseChannel";
import { RawChannelData } from "../rawChannelData";

export default function channelDelete(client: Client, rawData: RawChannelData) {

    // Parse channel
    const channel: AnyGuildChannel = parseChannel(client, rawData) as AnyGuildChannel;

    // Emit event
    client.emit("channelDelete", channel, rawData);
}