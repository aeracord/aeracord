import { ActionRowData, Client, ComponentTypes, MessageComponent, MessageComponentData } from "../../internal";

export default class ActionRow extends MessageComponent {

    /**
     * Type
     *
     * The component's type
     */
    type: typeof ComponentTypes.ACTION_ROW;

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