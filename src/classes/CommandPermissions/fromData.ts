import { Client, CommandPermissions, CommandPermissionsData } from "../../internal";

export default function fromData(client: Client, commandPermissionsData: CommandPermissionsData): CommandPermissions {

    // Create command permissions
    const commandPermissions: CommandPermissions = new CommandPermissions(client, commandPermissionsData);

    // Return
    return commandPermissions;
}