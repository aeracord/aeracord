import { Client, RawGuildWidgetData } from "../../internal";
import fromData from "./fromData";
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
     * Create a `GuildWidgetData` object from a `RawGuildWidgetData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {GuildWidgetData} The guild widget data
     */
    static _fromRawData(rawData: RawGuildWidgetData, guildID: string): GuildWidgetData {
        return fromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create a `GuildWidget` from a `GuildWidgetData` object
     *
     * @param guildWidgetData The guild widget data
     *
     * @returns {GuildWidget} The guild widget
     */
    static fromData(client: Client, guildWidgetData: GuildWidgetData): GuildWidget {
        return fromData(client, guildWidgetData);
    }
}