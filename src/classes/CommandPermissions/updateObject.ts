import { CommandPermissions, CommandPermissionsData } from "../../internal";

export default function updateObject(commandPermissions: CommandPermissions, commandPermissionsData: CommandPermissionsData) {

    // If the `CommandPermissionsData` was fetched before the `CommandPermissions` object was last updated, dont update anything
    if (commandPermissionsData.fetchedAt < commandPermissions._lastUpdatedAt) return;

    // Unmark as deleted
    if (commandPermissions.deleted) commandPermissions._unmarkAsDeleted();

    // Set data
    commandPermissions.id = commandPermissionsData.id;
    commandPermissions.guildID = commandPermissionsData.guildID;
    commandPermissions.applicationID = commandPermissionsData.applicationID;
    commandPermissions.permissions = commandPermissionsData.permissions;
    commandPermissions._lastUpdatedAt = Date.now();
}