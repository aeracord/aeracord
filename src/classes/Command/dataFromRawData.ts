import { Client, Command, CommandData, CommandOption, RawCommandData, RawCommandDataChoice, RawCommandDataOption } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawCommandData, guildID?: string): CommandData {

    // Parse command data
    const commandData: CommandData = {
        id: rawData.id,
        guildID: guildID || null,
        applicationID: rawData.application_id,
        name: rawData.name,
        description: rawData.description,
        options: rawData.options ? rawData.options.map((o: RawCommandDataOption) => parseOption(o)) : [],
        defaultPermission: rawData.default_permission,
        fetchedAt: Date.now()
    };

    // Update cached command
    Command._updateObjectFromData(client, commandData);

    // Return
    return commandData;
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