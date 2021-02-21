import { Channel, ChannelResolvable } from "../../internal";

export default function resolveID(channelResolvable: ChannelResolvable): string {

    // Channel
    if (channelResolvable instanceof Channel) return channelResolvable.id;

    // Channel ID
    else return channelResolvable;
}