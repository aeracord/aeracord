import { ActionRowData, Client, COMPONENT_TYPE_ACTION_ROW, MessageComponent, MessageComponentData } from "../../internal";

export default class ActionRow extends MessageComponent {

    /**
     * Type
     *
     * The component's type
     */
    type: typeof COMPONENT_TYPE_ACTION_ROW;

    /**
     * Components
     *
     * The components in this action row
     */
    components: MessageComponent[];

    /**
     * Action Row
     *
     * @param client The client
     * @param actionRowData Options to initialize this action row with
     * @param actionRowData.components The components in this action row
     */
    constructor(client: Client, actionRowData: ActionRowData) {

        // Super
        super(client, actionRowData);

        // Set data
        this.components = actionRowData.components.map((c: MessageComponentData) => MessageComponent.fromData(client, c));
    }
}