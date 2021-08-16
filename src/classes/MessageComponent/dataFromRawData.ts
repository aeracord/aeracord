import { AnyMessageComponentData, ComponentTypes, MessageComponent, RawMessageComponentData, RawMessageComponentDataOption, RawMessageComponentMetadata } from "../../internal";

export default function dataFromRawData(rawData: RawMessageComponentData, metadata: RawMessageComponentMetadata): AnyMessageComponentData {

    // Define message component data
    let messageComponentData: AnyMessageComponentData;

    // Parse action row data
    if (rawData.type === ComponentTypes.ACTION_ROW) messageComponentData = {
        type: rawData.type,
        messageID: metadata.messageID,
        channelID: metadata.channelID,
        guildID: metadata.guildID,
        components: (rawData.components as RawMessageComponentData[]).map((c: RawMessageComponentData) => MessageComponent._dataFromRawData(c, metadata))
    };

    // Parse button data
    else if (rawData.type === ComponentTypes.BUTTON) messageComponentData = {
        type: rawData.type,
        messageID: metadata.messageID,
        channelID: metadata.channelID,
        guildID: metadata.guildID,
        style: rawData.style,
        label: rawData.label,
        emoji: rawData.emoji && {
            id: rawData.emoji.id,
            name: rawData.emoji.name,
            animated: Boolean(rawData.emoji.animated)
        },
        customID: rawData.custom_id,
        url: rawData.url,
        disabled: Boolean(rawData.disabled)
    };

    // Parse select menu data
    else if (rawData.type === ComponentTypes.SELECT_MENU) messageComponentData = {
        type: rawData.type,
        messageID: metadata.messageID,
        channelID: metadata.channelID,
        guildID: metadata.guildID,
        placeholder: rawData.placeholder,
        minimumValues: rawData.min_values,
        maximumValues: rawData.max_values,
        customID: rawData.custom_id,
        options: (rawData.options as RawMessageComponentDataOption[]).map((o: RawMessageComponentDataOption) => ({
            label: o.label,
            description: o.description,
            value: o.value,
            emoji: o.emoji && {
                id: o.emoji.id,
                name: o.emoji.name,
                animated: Boolean(o.emoji.animated)
            },
            default: Boolean(o.default)
        }))
    };

    // Unknown component type
    else throw new Error(`Unknown component type '${rawData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);

    // Return
    return messageComponentData;
}