import { CommandData, CommandOption, COMMAND_TYPE_CHAT_INPUT, RawCommandData, RawCommandDataChoice, RawCommandDataOption } from "../../internal";

export default function dataFromRawData(rawData: RawCommandData, guildID?: string): CommandData {

    // Parse command data
    return {
        id: rawData.id,
        guildID: guildID || null,
        applicationID: rawData.application_id,
        name: rawData.name,
        type: rawData.type || COMMAND_TYPE_CHAT_INPUT,
        description: rawData.description,
        options: rawData.options ? rawData.options.map((o: RawCommandDataOption) => parseOption(o)) : [],
        defaultPermission: rawData.default_permission,
        fetchedAt: Date.now()
    };
}

const parseOption = (optionData: RawCommandDataOption): CommandOption => ({
    type: optionData.type,
    name: optionData.name,
    description: optionData.description,
    required: Boolean(optionData.required),
    choices: optionData.choices && optionData.choices.map((c: RawCommandDataChoice) => ({
        name: c.name,
        value: c.value
    })),
    options: optionData.options && optionData.options.map((o: RawCommandDataOption) => parseOption(o))
});