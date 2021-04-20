import { UserData } from "../../internal";

/**
 * Ban Data
 *
 * Represents a `Ban`
 */
export interface BanData {

    /**
     * Guild ID
     *
     * The ID of the guild this ban is in
     */
    guildID: string;

    /**
     * User
     *
     * The user object for the user this ban is for
     */
    user: UserData;

    /**
     * Reason
     *
     * The ban's reason
     */
    reason: string | null;

    /**
     * Fetched At
     *
     * The timestamp for when this ban was fetched
     */
    fetchedAt: number;
}