import { Channel, ChannelResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(channelResolvable: ChannelResolvable): string | undefined {

    // Channel
    if (channelResolvable instanceof Channel) return channelResolvable.id;

    // Channel ID
    else if (isID(channelResolvable)) return channelResolvable;
}