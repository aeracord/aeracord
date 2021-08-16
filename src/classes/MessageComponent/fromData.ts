import { ActionRow, ActionRowData, AnyMessageComponent, AnyMessageComponentData, Button, ButtonData, Client, ComponentTypes, SelectMenu, SelectMenuData } from "../../internal";

export default function fromData(client: Client, componentData: AnyMessageComponentData): AnyMessageComponent {

    // Define message component
    let messageComponent: AnyMessageComponent;

    // Create action row
    if (componentData.type === ComponentTypes.ACTION_ROW) messageComponent = new ActionRow(client, componentData as ActionRowData);

    // Create button
    else if (componentData.type === ComponentTypes.BUTTON) messageComponent = new Button(client, componentData as ButtonData);

    // Create select menu
    else if (componentData.type === ComponentTypes.SELECT_MENU) messageComponent = new SelectMenu(client, componentData as SelectMenuData);

    // Unknown component type
    else throw new Error(`Unknown component type '${componentData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);

    // Return
    return messageComponent;
}