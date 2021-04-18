import { CommandData, CommandOption, RawCommandData, RawCommandDataChoice, RawCommandDataOption } from "../../internal";

export default function dataFromRawData(rawData: RawCommandData, guildID?: string): CommandData {

    // Parse command data
    return {
        id: rawData.id,
        guildID: guildID || null,
        applicationID: rawData.application_id,
        name: rawData.name,
        description: rawData.description,
        options: rawData.options ? rawData.options.map((o: RawCommandDataOption) => parseOption(o)) : []
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