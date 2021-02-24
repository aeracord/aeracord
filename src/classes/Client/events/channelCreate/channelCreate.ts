import { AnyGuildChannel, Client } from "../../../../internal";
import parseChannel from "../parseChannel";
import { RawChannelData } from "../rawChannelData";

export default function channelCreate(client: Client, rawData: RawChannelData) {

    // Parse channel
    const channel: AnyGuildChannel = parseChannel(client, rawData) as AnyGuildChannel;

    // Emit event
    client.emit("channelCreate", channel, rawData);
}