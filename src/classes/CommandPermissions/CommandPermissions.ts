import { Base, Client, CommandPermission, CommandPermissionsData, RawCommandPermissionsData, READY_STATE_READY } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

export default class CommandPermissions extends Base<CommandPermissions> {

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

        // Super
        super(client, {
            id: commandPermissionsData.id,
            cacheManager: client._commandPermissions
        });

        // Set data
        CommandPermissions._updateObject(this, commandPermissionsData);

        /**
         * Cache Command
         *
         * If we need to cache all command permissions and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if (client._commandPermissions.cacheAll && client._readyState === READY_STATE_READY) this.cache();
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

    /**
     * Update Object
     *
     * Update the `CommandPermissions` object with data from a `CommandPermissionsData` object
     *
     * @private
     * @param commandPermissions The command permissions to update
     * @param commandPermissionsData The data to update this command permissions with
     */
    static _updateObject(commandPermissions: CommandPermissions, commandPermissionsData: CommandPermissionsData) {
        updateObject(commandPermissions, commandPermissionsData);
    }

    /**
     * Update Object From Data
     *
     * Update the `CommandPermissions` object with data from a `CommandPermissionsData` object if it's cached
     *
     * @private
     * @param client The client
     * @param commandPermissionsData The command permissions data
     *
     * @returns {CommandPermissions | undefined} The command permissions
     */
    static _updateObjectFromData(client: Client, commandPermissionsData: CommandPermissionsData): CommandPermissions | undefined {
        return updateObjectFromData(client, commandPermissionsData);
    }

    /**
     * Cache
     *
     * Cache this `Command`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._commandPermissions.cache(this.id, this, expiresIn);
    }
}