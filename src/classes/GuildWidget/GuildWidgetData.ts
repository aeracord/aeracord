/**
 * Guild Widget Data
 *
 * Represents a `GuildWidget`
 */
export interface GuildWidgetData {

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
    channelID: string | null;

    /**
     * Fetched At
     *
     * The timestamp for when this guild widget was fetched
     */
    fetchedAt: number;
}