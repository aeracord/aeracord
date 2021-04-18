import { User } from "../../../../internal";

export interface GuildMemberRemoveData {

    /**
     * Guild ID
     *
     * The ID of the guild the member was removed from
     */
    guildID: string;

    /**
     * User
     *
     * The user
     */
    user: User;
}