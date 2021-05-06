import { Interaction, InteractionCommandOption } from "../../internal";

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

export default function getOption(interaction: Interaction, name: string, suboptionNames: string[]): GetOptionResult | undefined {

    // Define result
    let result: GetOptionResult | undefined = interaction.data.options?.find((o: InteractionCommandOption) => o.name === name);

    // Loop through suboption names
    for (let name of suboptionNames) {
        if ((result) && (result.options)) result = result.options.find((o: GetOptionResult) => o.name === name);
    }

    // Return
    return result;
}