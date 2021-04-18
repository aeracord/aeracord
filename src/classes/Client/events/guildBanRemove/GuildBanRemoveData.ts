import { User } from "../../../../internal";

export interface GuildBanRemoveData {

    /**
     * Guild ID
     *
     * The ID of the guild the user was unbanned in
     */
    guildID: string;

    /**
     * User
     *
     * The user
     */
    user: User;
}