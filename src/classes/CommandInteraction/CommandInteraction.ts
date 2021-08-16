import { Client, CommandInteractionData, CommandInteractionMetadata, GetOptionResult, Interaction, InteractionTypes } from "../../internal";
import getOption from "./getOption";
import updateObject from "./updateObject";

/**
 * Command Interaction
 *
 * Represents a slash command, user command, or message command interaction that the client receives
 */
export default class CommandInteraction extends Interaction {

    /**
     * Type
     *
     * The interaction's type
     */
    type: typeof InteractionTypes.COMMAND;

    /**
     * Data
     *
     * The command interaction's data
     */
    data: CommandInteractionMetadata;

    /**
     * Command Interaction
     *
     * @param client The client
     * @param commandInteractionData Options to initialize this command interaction with
     * @param commandInteractionData.recipient The ID of the user this DM is with
     */
    constructor(client: Client, commandInteractionData: CommandInteractionData) {

        // Super
        super(client, commandInteractionData);

        // Set data
        CommandInteraction._updateObject(this, commandInteractionData, true);
    }

    /**
     * Update Object
     *
     * Update the `CommandInteraction` object with data from a `CommandInteractionData` object
     *
     * @private
     * @param commandInteraction The command interaction to update
     * @param commandInteractionData The data to update the command interaction with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(commandInteraction: CommandInteraction, commandInteractionData: CommandInteractionData, fromConstructor?: boolean) {
        updateObject(commandInteraction, commandInteractionData, fromConstructor);
    }

    /**
     * Get Option
     *
     * Get an option from this interaction's data
     *
     * @param name The name of the option
     * @param suboptionNames The names of the suboptions
     *
     * @returns {GetOptionResult | undefined} The option or `undefined` if it isn't found
     */
    getOption(name: string, ...suboptionNames: string[]): GetOptionResult | undefined {
        return getOption(this, name, suboptionNames);
    }
}