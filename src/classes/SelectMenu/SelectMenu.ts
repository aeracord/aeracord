import { Client, ComponentTypes, MessageComponent, SelectMenuData, SelectMenuOption } from "../../internal";

export default class SelectMenu extends MessageComponent {

    /**
     * Type
     *
     * The component's type
     */
    type: typeof ComponentTypes.SELECT_MENU;

    /**
     * Placeholder
     *
     * The select menu's placeholder text
     */
    placeholder?: string;

    /**
     * Minimum Values
     *
     * The minimum amount of values that need to be selected
     */
    minimumValues?: number;

    /**
     * Maximum Values
     *
     * The maximum amount of values that can be selected
     */
    maximumValues?: number;

    /**
     * Custom ID
     *
     * The select menu's custom ID
     */
    customID: string;

    /**
     * Options
     *
     * The select menu's options
     */
    options: SelectMenuOption[];

    /**
     * Action Row
     *
     * @param client The client
     * @param selectMenuData Options to initialize this select menu with
     * @param selectMenuData.placeholder The select menu's placeholder text
     * @param selectMenuData.minimumValues The minimum amount of values that need to be selected
     * @param selectMenuData.maximumValues The maximum amount of values that can be selected
     * @param selectMenuData.customID The select menu's custom ID
     * @param selectMenuData.options The select menu's options
     */
    constructor(client: Client, selectMenuData: SelectMenuData) {

        // Super
        super(client, selectMenuData);

        // Set data
        this.placeholder = selectMenuData.placeholder;
        this.minimumValues = selectMenuData.minimumValues;
        this.maximumValues = selectMenuData.maximumValues;
        this.customID = selectMenuData.customID;
        this.options = selectMenuData.options;
    }
}