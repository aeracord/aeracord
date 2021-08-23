import { Client, CommandData, CommandOption, CommandType, EditCommandData, RawCommandData, ReadyStates } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import resolveID from "./resolveID";
import toData from "./toData";

/**
 * Command Resolvable
 *
 * The types that can be resolved to an command
 */
export type CommandResolvable = Command | CommandData | string;

/**
 * Command
 *
 * An application command is a slash command, user command, or message command that's registered with Discord
 * For example, a `Command` is returned by `Client.getGlobalCommand()` and `Client.getGuildCommand()`
 *
 * A command interaction is represented by the `CommandInteraction` class
 * This is sent to the `interactionCreate` event
 */
export default class Command {

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
     * Name
     *
     * The command's name
     */
    name: string;

    /**
     * Type
     *
     * The command's type
     */
    type: CommandType;

    /**
     * Description
     *
     * The command's description
     */
    description: string;

    /**
     * Options
     *
     * The command's options
     */
    options: CommandOption[];

    /**
     * Default Permission
     *
     * Whether or not the command is enabled by default
     */
    defaultPermission: boolean;

    /**
     * Command
     *
     * @param client The client
     * @param commandData Options to initialize this command with
     * @param commandData.id The command's ID
     * @param commandData.guildID The ID of the guild this command is in
     * @param commandData.applicationID The ID of the application that owns this command
     * @param commandData.name The command's name
     * @param commandData.type The command's type
     * @param commandData.description The command's description
     * @param commandData.options The command's options
     * @param commandData.defaultPermission Whether or not the command is enabled by default
     */
    constructor(client: Client, commandData: CommandData) {

        // Set data
        Object.defineProperty(this, "client", { value: client });
        this.id = commandData.id;
        this.guildID = commandData.guildID;
        this.applicationID = commandData.applicationID;
        this.name = commandData.name;
        this.type = commandData.type;
        this.description = commandData.description;
        this.options = commandData.options;
        this.defaultPermission = commandData.defaultPermission;
    }

    /**
     * From Raw Data
     *
     * Create a `CommandData` object from a `RawCommandData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this command is in
     *
     * @returns {Command} The command
     */
    static _fromRawData(client: Client, rawData: RawCommandData, guildID?: string): Command {
        return Command.fromData(client, Command._dataFromRawData(rawData, guildID));
    }

    /**
     * Data From Raw Data
     *
     * Create a `CommandData` object from a `RawCommandData` object
     *
     * @private
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this command is in
     *
     * @returns {CommandData} The command data
     */
    static _dataFromRawData(rawData: RawCommandData, guildID?: string): CommandData {
        return dataFromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create a `Command` from a `CommandData` object
     *
     * @param client The client
     * @param commandData The command data
     *
     * @returns {Command} The command
     */
    static fromData(client: Client, commandData: CommandData): Command {
        return fromData(client, commandData);
    }

    /**
     * To Data
     *
     * Create a `CommandData` object from a `Command`
     *
     * @param command The command
     *
     * @returns {CommandData} The command data
     */
    static toData(command: Command): CommandData {
        return toData(command);
    }

    /**
     * Resolve ID
     *
     * Resolve a object to a command ID
     *
     * @param commandResolvable The command resolvable
     *
     * @returns {string | undefined} The resolved command ID, or `undefined` if the command resolvable is invalid
     */
    static resolveID(commandResolvable: CommandResolvable): string | undefined {
        return resolveID(commandResolvable);
    }

    /**
     * Edit
     *
     * Edit this command
     *
     * @param editCommandData The data for the command
     *
     * @returns {Promise<Command>} The command
     */
    edit(editCommandData: EditCommandData): Promise<Command> {
        return this.guildID ? this.client.editGuildCommand(this.guildID, this, editCommandData) : this.client.editGlobalCommand(this, editCommandData);
    }

    /**
     * Delete
     *
     * Delete this command
     */
    delete(): Promise<void> {
        return this.guildID ? this.client.deleteGuildCommand(this.guildID, this) : this.client.deleteGlobalCommand(this);
    }
}