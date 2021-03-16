import { Channel, GuildChannel, GuildChannelData } from "../../internal";

export default function updateObject(guildChannel: GuildChannel, guildChannelData: GuildChannelData, fromConstructor?: boolean) {

    // Set data
    guildChannel.name = guildChannelData.name;
    guildChannel.guildID = guildChannelData.guildID;
    guildChannel.position = guildChannelData.position;
    guildChannel.permissionOverwrites = guildChannelData.permissionOverwrites;
    guildChannel.parentID = guildChannelData.parentID;

    /**
     * If this function was not called from a constructor,
     * call the `updateObject()` function for the class guild channels extend
     */
    if (!fromConstructor) Channel._updateObject(guildChannel, guildChannelData);
}