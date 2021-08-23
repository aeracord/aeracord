import { CommandPermissionsData, RawCommandPermissionsData } from "../../internal";

export default function dataFromRawData(rawData: RawCommandPermissionsData): CommandPermissionsData {

    // Parse command permissions data
    return {
        id: rawData.id,
        guildID: rawData.guild_id,
        applicationID: rawData.application_id,
        permissions: rawData.permissions
    };
}