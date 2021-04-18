import { User } from "../../../../internal";

export interface GuildBanAddData {

    /**
     * Guild ID
     *
     * The ID of the guild the user was banned in
     */
    guildID: string;

    /**
     * User
     *
     * The user
     */
    user: User;
}