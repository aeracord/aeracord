import { ActionRow, ActionRowData, Button, ButtonData, Client, Component, ComponentType, MessageComponentData, RawMessageComponentData, RawMessageComponentMetadata } from "../../internal";
import componentsToJSON from "./componentsToJSON";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";

export type AnyMessageComponent = MessageComponent | ActionRow | Button;

export type AnyMessageComponentData = MessageComponentData | ActionRowData | ButtonData;

export default class MessageComponent {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * Type
     *
     * The component's type
     */
    type: ComponentType;

    /**
     * Message ID
     *
     * The ID of the message this component is in
     */
    messageID: string;

    /**
     * Channel ID
     *
     * The ID of the channel this component is in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this component is in
     * `null` if the component is sent in a DM channel
     */
    guildID?: string | null;

    /**
     * Component
     *
     * @param client The client
     * @param messageComponentData Options to initialize this component with
     * @param messageComponentData.type The component's type
     */
    constructor(client: Client, messageComponentData: MessageComponentData) {

        // Set data
        Object.defineProperty(this, "client", { value: client });
        this.type = messageComponentData.type;
        this.messageID = messageComponentData.messageID;
        this.channelID = messageComponentData.channelID;
        this.guildID = messageComponentData.guildID;
    }

    /**
     * From Raw Data
     *
     * Create a `MessageComponentData` object from a `RawMessageComponentData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     * @param metadata Metadata about the object
     *
     * @returns {AnyMessageComponent} The message component
     */
    static _fromRawData(client: Client, rawData: RawMessageComponentData, metadata: RawMessageComponentMetadata): AnyMessageComponent {
        return MessageComponent.fromData(client, MessageComponent._dataFromRawData(rawData, metadata));
    }

    /**
     * Data From Raw Data
     *
     * Create a `MessageComponentData` object from a `RawMessageComponentData` object
     *
     * @private
     * @param rawData The raw data from the API
     * @param metadata Metadata about the object
     *
     * @returns {AnyMessageComponentData} The message component data
     */
    static _dataFromRawData(rawData: RawMessageComponentData, metadata: RawMessageComponentMetadata): AnyMessageComponentData {
        return dataFromRawData(rawData, metadata);
    }

    /**
     * From Data
     *
     * Create a `MessageComponent` from a `MessageComponentData` object
     *
     * @param client The client
     * @param messageComponentData The message component data
     *
     * @returns {MessageComponent} The message component
     */
    static fromData(client: Client, messageComponentData: AnyMessageComponentData): MessageComponent {
        return fromData(client, messageComponentData);
    }

    /**
     * To Data
     *
     * Create a `MessageComponentData` object from a `MessageComponent`
     *
     * @param messageComponent The message component
     *
     * @returns {AnyMessageComponentData} The message component data
     */
    static toData(messageComponent: AnyMessageComponent): AnyMessageComponentData {
        return toData(messageComponent);
    }

    /**
     * Components To Data
     *
     * Convert component objects into a JSON object for sending to the API
     *
     * @private
     * @param components The components
     */
    static _componentsToJSON(components: Component[]): object {
        return componentsToJSON(components);
    }
}