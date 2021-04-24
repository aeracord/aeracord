import { Client, CommandPermissions, CommandPermissionsData } from "../../internal";

export default function fromData(client: Client, commandPermissionsData: CommandPermissionsData): CommandPermissions {

    // Update cached command permissions
    let commandPermissions: CommandPermissions | undefined = CommandPermissions._updateObjectFromData(client, commandPermissionsData);

    // Create command permissions
    if (!commandPermissions) commandPermissions = new CommandPermissions(client, commandPermissionsData);

    // Return
    return commandPermissions;
}