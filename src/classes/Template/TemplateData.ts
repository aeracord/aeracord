import { DefaultMessageNotification, ExplicitContentFilter, GuildChannelType, UserData, VerificationLevel } from "../../internal";

/**
 * Template Data
 *
 * Represents a `Template`
 */
export interface TemplateData {

    /**
     * Code
     *
     * The template's code
     */
    code: string;

    /**
     * Name
     *
     * The template's name
     */
    name: string;

    /**
     * Description
     *
     * The template's description
     */
    description: string | null;

    /**
     * Uses
     *
     * The amount of times this template has been used
     */
    uses: number;

    /**
     * Creator
     *
     * The user that created this template
     */
    creator: UserData;

    /**
     * Created At
     *
     * The timestamp for when the template was created
     */
    createdAt: number;

    /**
     * Updated At
     *
     * The timestamp for when the template was last synced with the source guild
     */
    updatedAt: number;

    /**
     * Source Guild ID
     *
     * The ID of the guild this template is for
     */
    sourceGuildID: string;

    /**
     * Source Guild
     *
     * The source guild of this template
     */
    sourceGuild: TemplateGuild;

    /**
     * Dirty
     *
     * Whether or not this template has unsynced changes
     */
    dirty: boolean;

    /**
     * Fetched At
     *
     * The timestamp for when this template was fetched
     */
    fetchedAt: number;
}

/**
 * Template Guild
 *
 * A source guild of a template
 */
export interface TemplateGuild {

    /**
     * Name
     *
     * The guild's name
     */
    name: string;

    /**
     * Icon
     *
     * The guild's icon hash
     */
    icon: string | null;

    /**
     * Region
     *
     * The guild's region
     */
    region: string;

    /**
     * AFK Channel ID
     *
     * The ID of the guild's AFK channel
     */
    afkChannelID: number | null;

    /**
     * AFK Timeout
     *
     * The guild's AFK timeout
     */
    afkTimeout: number;

    /**
     * Verification Level
     *
     * The guild's verification level
     */
    verificationLevel: VerificationLevel;

    /**
     * Default Message Notifications
     *
     * The guild's default message notifications setting
     */
    defaultMessageNotifications: DefaultMessageNotification;

    /**
     * Explicit Content Filter
     *
     * The guild's explicit content filter setting
     */
    explicitContentFilter: ExplicitContentFilter;

    /**
     * Roles
     *
     * The roles in this guild
     */
    roles: TemplateGuildRole[];

    /**
     * Channels
     *
     * The channels in this guild
     */
    channels: TemplateGuildChannel[];

    /**
     * System Channel ID
     *
     * The ID of the guild's system channel
     */
    systemChannelID: number | null;

    /**
     * System Channel Flags
     *
     * The guild's system channel flags
     */
    systemChannelFlags: number;

    /**
     * Description
     *
     * The guild's description
     */
    description: string | null;

    /**
     * Preferred Locale
     *
     * The guild's preferred locale
     */
    preferredLocale: string;
}

/**
 * Template Guild Role
 *
 * A role in a source guild of a template
 * Note that the ID is a `number` and not a snowflake
 */
export interface TemplateGuildRole {

    /**
     * ID
     *
     * The role's ID
     * Note that the ID is a `number` and not a snowflake
     */
    id: number;

    /**
     * Name
     *
     * The role's name
     */
    name: string;

    /**
     * Color
     *
     * The role's color
     * `0` indicates that the role doesn't have a color
     */
    color: number;

    /**
     * Hoist
     *
     * Whether or not this role is hoisted
     */
    hoist: boolean;

    /**
     * Permissions
     *
     * The role's permissions
     */
    permissions: string;

    /**
     * Mentionable
     *
     * Whether or not this role is mentionable
     */
    mentionable: boolean;
}

/**
 * Template Guild Channel
 *
 * A channel in a source guild of a template
 * Note that the ID is a `number` and not a snowflake
 */
export interface TemplateGuildChannel {

    /**
     * ID
     *
     * The channel's ID
     * Note that the ID is a `number` and not a snowflake
     */
    id: number;

    /**
     * Type
     *
     * The channel's type
     */
    type: GuildChannelType;

    /**
     * Name
     *
     * The channel's name
     */
    name: string;

    /**
     * Topic
     *
     * The channel's topic
     */
    topic: string | null;

    /**
     * Position
     *
     * The position of this channel
     */
    position: number;

    /**
     * NSFW
     *
     * Whether or not the channel is marked as NSFW
     */
    nsfw: boolean;

    /**
     * Permission Overwrites
     *
     * The permission overwrites of this channel
     */
    permissionOverwrites: TemplateGuildChannelPermissionOverwrite[];

    /**
     * Bitrate
     *
     * The channel's bitrate
     */
    bitrate: number | null;

    /**
     * User Limit
     *
     * The channel's user limit
     */
    userLimit: number | null;

    /**
     * Rate Limit Per User
     *
     * The slowmode for this channel in milliseconds
     */
    rateLimitPerUser: number | null;

    /**
     * Parent ID
     *
     * The ID of this channel's parent channel
     */
    parentID: number | null;
}

/**
 * Template Guild Channel Permission Overwrite
 *
 * A permission overwrite in a source guild of a template
 * Note that the ID is a `number` and not a snowflake
 * Also note that all permission overwrites are for roles
 */
export interface TemplateGuildChannelPermissionOverwrite {

    /**
     * ID
     *
     * The permission overwrite's ID
     * Note that the ID is a `number` and not a snowflake
     */
    id: number;

    /**
     * Allow
     *
     * The allowed permissions
     */
    allow: string;

    /**
     * Deny
     *
     * The denied permissions
     */
    deny: string;
}