import { CommandPermissions, CommandPermissionsData } from "../../internal";

export default function toData(commandPermissions: CommandPermissions): CommandPermissionsData {

    // Parse command permissions data
    return {
        id: commandPermissions.id,
        guildID: commandPermissions.guildID,
        applicationID: commandPermissions.applicationID,
        permissions: commandPermissions.permissions
    };
}