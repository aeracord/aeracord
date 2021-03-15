import { Client, RawGuildWidgetData } from "../../internal";
import fromRawData from "./fromRawData";

export interface GuildWidgetData {
    guildID: string;
    enabled?: boolean;
    channelID?: string;
}

export default class GuildWidget {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * Guild ID
     *
     * The ID of the guild this widget is for
     */
    guildID: string;

    /**
     * Enabled
     *
     * Whether or not the widget is enabled
     */
    enabled: boolean;

    /**
     * Channel ID
     *
     * The ID of the channel this widget is for
     */
    channelID?: string;

    /**
     * Guild Widget
     *
     * @param client The client
     * @param guildWidgetData Options to initialize this widget with
     * @param guildWidgetData.guildID The ID of the guild this widget is for
     * @param guildWidgetData.enabled Whether or not the widget is enabled
     * @param guildWidgetData.channelID The ID of the channel this widget is for
     */
    constructor(client: Client, guildWidgetData: GuildWidgetData) {

        // Set data
        this.client = client;
        this.guildID = guildWidgetData.guildID;
        this.enabled = Boolean(guildWidgetData.enabled);
        this.channelID = guildWidgetData.channelID;
    }

    /**
     * From Raw Data
     *
     * Create a `GuildWidget` from a `RawGuildWidgetData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {GuildWidget} The widget
     */
    static _fromRawData(client: Client, rawData: RawGuildWidgetData, guildID: string): GuildWidget {
        return fromRawData(client, rawData, guildID);
    }
}