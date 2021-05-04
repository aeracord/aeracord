import { GuildCreateData, GuildDeleteData } from "../../../../internal";

export interface ReadyData {

    /**
     * Available Guilds
     *
     * An array of available guilds that the bot is in
     */
    availableGuilds: GuildCreateData[];

    /**
     * Unavailable Guilds
     *
     * An array of unavailable guilds that the bot is in
     */
    unavailableGuilds: GuildDeleteData[];

    /**
     * Application
     *
     * Data about the client's application
     */
    application: ReadyDataApplication;
}

export interface ReadyDataApplication {

    /**
     * ID
     *
     * The application's ID
     */
    id: string;

    /**
     * Avatar
     *
     * The application's flags
     */
    flags: number;
}