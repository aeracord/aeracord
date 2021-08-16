import { ButtonData, ButtonEmoji, ButtonStyle, Client, ComponentTypes, MessageComponent } from "../../internal";

export default class Button extends MessageComponent {

    /**
     * Type
     *
     * The component's type
     */
    type: typeof ComponentTypes.BUTTON;

    /**
     * Style
     *
     * The button's style
     */
    style: ButtonStyle;

    /**
     * Label
     *
     * The button's label
     */
    label: string;

    /**
     * Emoji
     *
     * The button's emoji
     */
    emoji?: ButtonEmoji;

    /**
     * Custom ID
     *
     * The button's custom ID
     */
    customID: string;

    /**
     * URL
     *
     * The button's url
     */
    url?: string;

    /**
     * Disabled
     *
     * Whether or not the button is disabled
     */
    disabled: boolean;

    /**
     * Action Row
     *
     * @param client The client
     * @param buttonData Options to initialize this button with
     * @param buttonData.style The button's style
     * @param buttonData.label The button's label
     * @param buttonData.emoji The button's emoji
     * @param buttonData.customID The button's custom ID
     * @param buttonData.url The button's url
     * @param buttonData.disabled Whether or not the button is disabled
     */
    constructor(client: Client, buttonData: ButtonData) {

        // Super
        super(client, buttonData);

        // Set data
        this.style = buttonData.style;
        this.label = buttonData.label;
        this.emoji = buttonData.emoji;
        this.customID = buttonData.customID;
        this.url = buttonData.url;
        this.disabled = buttonData.disabled;
    }
}