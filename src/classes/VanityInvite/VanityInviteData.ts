/**
 * Vanity Invite Data
 *
 * Represents a `VanityInvite`
 */
export interface VanityInviteData {

    /**
     * Guild ID
     *
     * The ID of the guild this vanity invite is for
     */
    guildID: string;

    /**
     * Code
     *
     * The vanity invite's code
     */
    code: string | null;

    /**
     * Uses
     *
     * The amount of times this vanity invite link has been used
     */
    uses: number;
}