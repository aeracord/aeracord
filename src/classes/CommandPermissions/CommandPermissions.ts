import { Client, CommandPermission, CommandPermissionsData, RawCommandPermissionsData, ReadyStates } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";

export default class CommandPermissions {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * ID
     *
     * The ID of the object
     */
    id: string;

    /**
     * Guild ID
     *
     * The ID of the guild this command is in
     * `null` if it's a global command
     */
    guildID: string | null;

    /**
     * Application ID
     *
     * The ID of the application that owns this command
     */
    applicationID: string;

    /**
     * Permissions
     *
     * The command's permissions
     */
    permissions: CommandPermission[];

    /**
     * Command Permissions
     *
     * @param client The client
     * @param commandPermissionsData Options to initialize this command permissions with
     * @param commandPermissionsData.id The command's ID
     * @param commandPermissionsData.guildID The ID of the guild this command is in
     * @param commandPermissionsData.applicationID The ID of the application that owns this command
     * @param commandPermissionsData.permissions The command's permissions
     */
    constructor(client: Client, commandPermissionsData: CommandPermissionsData) {

        // Set data
        Object.defineProperty(this, "client", { value: client });
        this.id = commandPermissionsData.id;
        this.guildID = commandPermissionsData.guildID;
        this.applicationID = commandPermissionsData.applicationID;
        this.permissions = commandPermissionsData.permissions;
    }

    /**
     * From Raw Data
     *
     * Create an `CommandPermissionsData` object from a `RawCommandPermissionsData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {CommandPermissions} The command permissions
     */
    static _fromRawData(client: Client, rawData: RawCommandPermissionsData): CommandPermissions {
        return CommandPermissions.fromData(client, CommandPermissions._dataFromRawData(rawData));
    }

    /**
     * Data From Raw Data
     *
     * Create a `CommandPermissionsData` object from a `RawCommandPermissionsData` object
     *
     * @private
     * @param rawData The raw data from the API
     *
     * @returns {CommandPermissionsData} The command permissions data
     */
    static _dataFromRawData(rawData: RawCommandPermissionsData): CommandPermissionsData {
        return dataFromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create a `CommandPermissions` from a `CommandPermissionsData` object
     *
     * @param client The client
     * @param commandPermissionsData The command permissions data
     *
     * @returns {CommandPermissions} The command permissions
     */
    static fromData(client: Client, commandPermissionsData: CommandPermissionsData): CommandPermissions {
        return fromData(client, commandPermissionsData);
    }

    /**
     * To Data
     *
     * Create a `CommandPermissionsData` object from a `CommandPermissions`
     *
     * @param commandPermissions The command permissions
     *
     * @returns {CommandPermissionsData} The command permissions data
     */
    static toData(commandPermissions: CommandPermissions): CommandPermissionsData {
        return toData(commandPermissions);
    }
}