/**
 * Stage Instance Data
 *
 * Represents a `StageInstance`
 */
export interface StageInstanceData {

    /**
     * ID
     *
     * The stage instance's ID
     */
    id: string;

    /**
     * Guild ID
     *
     * The ID of the guild this stage instance is in
     */
    guildID: string;

    /**
     * Channel ID
     *
     * The ID of the channel this stage instance is in
     */
    channelID: string;

    /**
     * Topic
     *
     * The stage instance's topic
     */
    topic: string;

    /**
     * Privacy Level
     *
     * The stage instance's privacy level
     */
    privacyLevel: PrivacyLevel;

    /**
     * Discoverable Disabled
     *
     * Whether or not discovery is disabled for the stage instance
     */
    discoverableDisabled: boolean;
}

/**
 * Privacy Level
 * https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level
 */
export type PrivacyLevel = typeof PRIVACY_LEVEL_PUBLIC | typeof PRIVACY_LEVEL_GUILD_ONLY;
export const PRIVACY_LEVEL_PUBLIC = 1;
export const PRIVACY_LEVEL_GUILD_ONLY = 2;