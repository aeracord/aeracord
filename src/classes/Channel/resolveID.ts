import { Channel, ChannelResolvable } from "../../internal";

export default function resolveID(channelResolvable: ChannelResolvable): string | undefined {

    // Channel
    if (channelResolvable instanceof Channel) return channelResolvable.id;

    // Channel ID
    else if (/^[0-9]{17,}$/.test(channelResolvable)) return channelResolvable;
}