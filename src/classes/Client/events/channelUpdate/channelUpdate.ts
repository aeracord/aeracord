import { AnyGuildChannel, Client } from "../../../../internal";
import parseChannel from "../parseChannel";
import { RawChannelData } from "../rawChannelData";

export default function channelUpdate(client: Client, rawData: RawChannelData) {

    // Parse channel
    const channel: AnyGuildChannel = parseChannel(client, rawData) as AnyGuildChannel;

    // Emit event
    client.emit("channelUpdate", channel, rawData);
}