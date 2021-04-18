import { AnyChannelData, Guild, MemberData, PresenceData, VoiceStateData } from "../../../../internal";

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
     * The timestamp for when the client joined the guild
     */
    joinedAt: number;

    /**
     * Large
     *
     * Whether or not the guild is large
     */
    large: boolean;

    /**
     * Member Count
     *
     * The guild's member count
     */
    memberCount: number;

    /**
     * Voice States
     *
     * The guild's voice states
     */
    voiceStates: VoiceStateData[];

    /**
     * Members
     *
     * The guild's members
     */
    members: MemberData[];

    /**
     * Channels
     *
     * The guild's channels
     */
    channels: AnyChannelData[];

    /**
     * Presences
     *
     * The guild's presences
     */
    presences: PresenceData[];
}