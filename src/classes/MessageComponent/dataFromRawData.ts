import { AnyMessageComponentData, COMPONENT_TYPE_ACTION_ROW, COMPONENT_TYPE_BUTTON, MessageComponent, RawMessageComponentData, RawMessageComponentMetadata } from "../../internal";

export default function dataFromRawData(rawData: RawMessageComponentData, metadata: RawMessageComponentMetadata): AnyMessageComponentData {

    // Define message component data
    let messageComponentData: AnyMessageComponentData;

    // Parse action row data
    if (rawData.type === COMPONENT_TYPE_ACTION_ROW) messageComponentData = {
        type: rawData.type,
        messageID: metadata.messageID,
        channelID: metadata.channelID,
        guildID: metadata.guildID,
        components: (rawData.components as RawMessageComponentData[]).map((c: RawMessageComponentData) => MessageComponent._dataFromRawData(c, metadata))
    };

    // Parse button data
    else if (rawData.type === COMPONENT_TYPE_BUTTON) messageComponentData = {
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

    // Unknown component type
    else throw new Error(`Unknown component type '${rawData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);

    // Return
    return messageComponentData;
}