import { ChannelResolvable } from "../../internal";

export default function resolveID(channelResolvable: ChannelResolvable): string | undefined {

    // Channel
    if ((typeof channelResolvable === "object") && ("id" in channelResolvable)) return channelResolvable.id;

    // Channel ID
    else if (typeof channelResolvable === "string") return channelResolvable;
}