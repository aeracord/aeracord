import { UserData } from "../../internal";

/**
 * Member Data
 *
 * Represents a `Member`
 */
export interface MemberData {

    /**
     * Guild ID
     *
     * The ID of the guild this member is in
     */
    guildID: string;

    /**
     * Nickname
     *
     * The member's nickname
     */
    nickname: string | null;

    /**
     * Roles
     *
     * The IDs of the roles this member has
     */
    roles: string[];

    /**
     * Joined At
     *
     * The timestamp for when the member joined the guild
     */
    joinedAt: number;

    /**
     * Premium Since
     *
     * The timestamp for when the member started boosting the guild
     */
    premiumSince: number | null;

    /**
     * Pending
     *
     * Whether or not this member has not passed membership screening yet
     */
    pending: boolean;

    /**
     * User
     *
     * The member's user object
     */
    user: UserData;

    /**
     * Fetched At
     *
     * The timestamp for when this member was fetched
     */
    fetchedAt: number;
}