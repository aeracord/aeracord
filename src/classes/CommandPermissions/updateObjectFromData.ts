import { Client, CommandPermissions, CommandPermissionsData } from "../../internal";

export default function updateObjectFromData(client: Client, commandPermissionsData: CommandPermissionsData): CommandPermissions | undefined {

    // Get command permissions from cache
    let commandPermissions: CommandPermissions | undefined = client.commandPermissions.get(commandPermissionsData.id);

    // Update command permissions object
    if (commandPermissions) CommandPermissions._updateObject(commandPermissions, commandPermissionsData);

    // Return
    return commandPermissions;
}