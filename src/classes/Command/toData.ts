import { Command, CommandChoice, CommandData, CommandOption } from "../../internal";

export default function toData(command: Command): CommandData {

    // Parse command data
    return {
        id: command.id,
        guildID: command.guildID,
        applicationID: command.applicationID,
        name: command.name,
        description: command.description,
        options: command.options
    };
}

const parseOption = (option: CommandOption): CommandOption => ({
    type: option.type,
    name: option.name,
    description: option.description,
    required: option.required,
    choices: option.choices && option.choices.map((c: CommandChoice) => ({
        name: c.name,
        value: c.value
    })),
    options: option.options && option.options.map((o: CommandOption) => parseOption(o))
});