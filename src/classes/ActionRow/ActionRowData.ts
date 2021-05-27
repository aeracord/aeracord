import { COMPONENT_TYPE_ACTION_ROW, MessageComponentData } from "../../internal";

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
    type: typeof COMPONENT_TYPE_ACTION_ROW;

    /**
     * Components
     *
     * The components in this action row
     */
    components: MessageComponentData[];
}