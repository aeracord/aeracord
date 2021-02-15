import { AnyChannel, Member, Presence, VoiceState } from "../../../../internal";
import Guild from "../../../Guild/Guild";

export interface GuildCreateData {

    /**
     * Guild
     *
     * The guild object
     */
    guild: Guild;

    /**
     * Joined At
     *
     * The guild object
     */
    joinedAt: number;

    /**
     * Large
     *
     * The guild object
     */
    large: boolean;

    /**
     * Member Count
     *
     * The guild object
     */
    memberCount: number;

    /**
     * Voice States
     *
     * The guild object
     */
    voiceStates: VoiceState[];

    /**
     * Members
     *
     * The guild object
     */
    members: Member[];

    /**
     * Channels
     *
     * The guild object
     */
    channels: AnyChannel[];

    /**
     * Presences
     *
     * The guild object
     */
    presences: Presence[];
}