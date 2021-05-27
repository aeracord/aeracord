import { ActionRow, AnyMessageComponent, AnyMessageComponentData, Button, COMPONENT_TYPE_ACTION_ROW, COMPONENT_TYPE_BUTTON, MessageComponent } from "../../internal";

export default function toData(messageComponent: AnyMessageComponent): AnyMessageComponentData {

    // Parse action row data
    if (messageComponent.type === COMPONENT_TYPE_ACTION_ROW) {
        const actionRow: ActionRow = messageComponent as ActionRow;
        return {
            type: actionRow.type,
            messageID: actionRow.messageID,
            channelID: actionRow.channelID,
            guildID: actionRow.guildID,
            components: actionRow.components.map((c: MessageComponent) => MessageComponent.toData(c))
        };
    }

    // Parse button data
    else if (messageComponent.type === COMPONENT_TYPE_BUTTON) {
        const button: Button = messageComponent as Button;
        return {
            type: button.type,
            messageID: button.messageID,
            channelID: button.channelID,
            guildID: button.guildID,
            style: button.style,
            label: button.label,
            emoji: button.emoji,
            customID: button.customID,
            url: button.url,
            disabled: button.disabled
        };
    }

    // Unknown component type
    else throw new Error(`Unknown component type '${messageComponent.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);
}