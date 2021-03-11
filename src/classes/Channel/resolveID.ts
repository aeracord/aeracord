import { CategoryChannel, Channel, ChannelResolvable, DMChannel, GuildChannel, NewsChannel, StoreChannel, TextChannel, VoiceChannel } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(channelResolvable: ChannelResolvable): string | undefined {

    // Channel
    if ((channelResolvable instanceof Channel) || ((channelResolvable as any) instanceof GuildChannel) || ((channelResolvable as any) instanceof DMChannel) || ((channelResolvable as any) instanceof TextChannel) || ((channelResolvable as any) instanceof VoiceChannel) || ((channelResolvable as any) instanceof CategoryChannel) || ((channelResolvable as any) instanceof NewsChannel) || ((channelResolvable as any) instanceof StoreChannel)) return (channelResolvable as Channel).id;

    // Channel ID
    else if (isID(channelResolvable)) return channelResolvable;
}