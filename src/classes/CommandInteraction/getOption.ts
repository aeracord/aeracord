import { CommandInteraction, CommandInteractionOption, COMMAND_TYPE_CHAT_INPUT } from "../../internal";

/**
 * Get Option Result
 *
 * An interaction command's parameters with an unknown value type
 */
export interface GetOptionResult {

    /**
     * Name
     *
     * The option's name
     */
    name: string;

    /**
     * Value
     *
     * The option's value
     * `undefined` for subcommands and subcommand groups
     */
    value?: any;

    /**
     * Options
     *
     * The command's options if it's a subcommand or subcommand group
     */
    options?: GetOptionResult[];
}

export default function getOption(commandInteraction: CommandInteraction, name: string, suboptionNames: string[]): GetOptionResult | undefined {

    // Not a slash command
    if (commandInteraction.data.type !== COMMAND_TYPE_CHAT_INPUT) throw new Error("Options are only available on slash commands");

    // Define result
    let result: GetOptionResult | undefined = commandInteraction.data.options?.find((o: CommandInteractionOption) => o.name === name);

    // Loop through suboption names
    for (let name of suboptionNames) {
        if ((result) && (result.options)) result = result.options.find((o: GetOptionResult) => o.name === name);
    }

    // Return
    return result;
}