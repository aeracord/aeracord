import { Client, DefaultMessageNotifications, ExplicitContentFilter, GuildChannelType, RawTemplateData, UserData, VerificationLevel } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveCode from "./resolveCode";

export interface TemplateData {
    code: string;
    name: string;
    description?: string;
    uses: number;
    creator: UserData;
    createdAt: number;
    updatedAt: number;
    sourceGuildID: string;
    sourceGuild: TemplateGuild;
    dirty?: boolean;
}

export interface TemplateGuild {
    name: string;
    icon?: string;
    region: string;
    afkChannelID?: number;
    afkTimeout: number;
    verificationLevel: VerificationLevel;
    defaultMessageNotifications: DefaultMessageNotifications;
    explicitContentFilter: ExplicitContentFilter;
    roles: TemplateGuildRole[];
    channels: TemplateGuildChannel[];
    systemChannelID?: number;
    systemChannelFlags: number;
    description?: string;
    preferredLocale: string;
}

export interface TemplateGuildRole {
    id: number;
    name: string;
    color: number;
    hoist?: boolean;
    permissions: string;
    mentionable?: boolean;
}

export interface TemplateGuildChannel {
    id: number;
    type: GuildChannelType;
    name: string;
    topic?: string;
    position: number;
    nsfw?: boolean;
    permissionOverwrites: TemplateGuildChannelPermissionOverwrite[];
    bitrate?: number;
    userLimit?: number;
    rateLimitPerUser?: number;
    parentID?: number;
}

export interface TemplateGuildChannelPermissionOverwrite {
    id: number;
    allow: string;
    deny: string;
}

export type TemplateResolvable = Template | string;

export default class Template {

    /**
     * Client
     *
     * The client
     */
    client: Client;

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
    description?: string;

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
     * Template
     *
     * @param client The client
     * @param templateData Options to initialize this template with
     * @param templateData.code The template's code
     * @param templateData.name The template's name
     * @param templateData.description The template's description
     * @param templateData.uses The amount of times this template has been used
     * @param templateData.creator The user that created this template
     * @param templateData.createdAt The timestamp for when the template was created
     * @param templateData.updatedAt The timestamp for when the template was last synced with the source guild
     * @param templateData.sourceGuildID The ID of the guild this template is for
     * @param templateData.sourceGuild The source guild of this template
     * @param templateData.dirty Whether or not this template has unsynced changes
     */
    constructor(client: Client, templateData: TemplateData) {

        // Set data
        this.client = client;
        this.code = templateData.code;
        this.name = templateData.name;
        this.description = templateData.description;
        this.uses = templateData.uses;
        this.creator = templateData.creator;
        this.createdAt = templateData.createdAt;
        this.updatedAt = templateData.updatedAt;
        this.sourceGuildID = templateData.sourceGuildID;
        this.sourceGuild = templateData.sourceGuild;
        this.dirty = Boolean(templateData.dirty);
    }

    /**
     * From Raw Data
     *
     * Create a `TemplateData` object from a `RawTemplateData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {TemplateData} The template data
     */
    static _fromRawData(rawData: RawTemplateData): TemplateData {
        return fromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create a `Template` from a `TemplateData` object
     *
     * @param templateData The template data
     *
     * @returns {Template} The template
     */
    static fromData(client: Client, templateData: TemplateData): Template {
        return fromData(client, templateData);
    }

    /**
     * Resolve Code
     *
     * Resolve an object to a template code
     *
     * @param templateResolvable The template resolvable
     *
     * @returns {string | undefined} The resolved template code, or `undefined` if the template resolvable is invalid
     */
    static resolveCode(templateResolvable: TemplateResolvable): string | undefined {
        return resolveCode(templateResolvable);
    }
}