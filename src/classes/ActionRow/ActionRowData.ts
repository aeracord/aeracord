import { ComponentTypes, MessageComponentData } from "../../internal";

/**
 * Action Row Data
 *
 * Represents an `ActionRow`
 */
export interface ActionRowData extends MessageComponentData {

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
    components: MessageComponentData[];
}