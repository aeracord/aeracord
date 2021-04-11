import { ChannelResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(channelResolvable: ChannelResolvable): string | undefined {

    // Channel
    if ((typeof channelResolvable === "object") && ("id" in channelResolvable)) return channelResolvable.id;

    // Channel ID
    else if (isID(channelResolvable)) return channelResolvable;
}