import { Member } from "../../../../internal";

export interface TypingStartData {

    /**
     * Guild ID
     *
     * The ID of the guild the user started typing in
     */
    guildID: string | null;

    /**
     * Channel ID
     *
     * The ID of the channel the user started typing in
     */
    channelID: string;

    /**
     * User ID
     *
     * The ID of the user that started typing
     */
    userID: string;

    /**
     * Timestamp
     *
     * The timestamp of when the user started typing
     */
    timestamp: number;

    /**
     * Member
     *
     * The member object of the user that started typing
     */
    member: Member | null;
}