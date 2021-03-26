import { Base, Client, CreateGuildFromTemplateData, DefaultMessageNotifications, ExplicitContentFilter, GuildChannelType, GuildData, ModifyGuildTemplateData, RawTemplateData, UserData, VerificationLevel } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveCode from "./resolveCode";
import updateObject from "./updateObject";

export interface TemplateData {
    code: string;
    name: string;
    description: string | null;
    uses: number;
    creator: UserData;
    createdAt: number;
    updatedAt: number;
    sourceGuildID: string;
    sourceGuild: TemplateGuild;
    dirty: boolean;
}

export interface TemplateGuild {
    name: string;
    icon: string | null;
    region: string;
    afkChannelID: number | null;
    afkTimeout: number;
    verificationLevel: VerificationLevel;
    defaultMessageNotifications: DefaultMessageNotifications;
    explicitContentFilter: ExplicitContentFilter;
    roles: TemplateGuildRole[];
    channels: TemplateGuildChannel[];
    systemChannelID: number | null;
    systemChannelFlags: number;
    description: string | null;
    preferredLocale: string;
}

export interface TemplateGuildRole {
    id: number;
    name: string;
    color: number;
    hoist: boolean;
    permissions: string;
    mentionable: boolean;
}

export interface TemplateGuildChannel {
    id: number;
    type: GuildChannelType;
    name: string;
    topic: string | null;
    position: number;
    nsfw: boolean;
    permissionOverwrites: TemplateGuildChannelPermissionOverwrite[];
    bitrate: number | null;
    userLimit: number | null;
    rateLimitPerUser: number | null;
    parentID: number | null;
}

export interface TemplateGuildChannelPermissionOverwrite {
    id: number;
    allow: string;
    deny: string;
}

export type TemplateResolvable = Template | string;

export default class Template extends Base<Template> {

    /**
     * Code
     *
     * The template's code
     */
    get code(): string {
        return this.id;
    }

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

        // Super
        super(client, {
            id: templateData.code,
            cacheManager: client._templates
        });

        // Set data
        Template._updateObject(this, templateData);

        // Cache template
        this.client._templates.cache(this.id, this);
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
    static _fromRawData(client: Client, rawData: RawTemplateData): TemplateData {
        return fromRawData(client, rawData);
    }

    /**
     * From Data
     *
     * Create a `Template` from a `TemplateData` object
     *
     * @param client The client
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

    /**
     * Update Object
     *
     * Update the `Template` object with data from a `TemplateData` object
     *
     * @param template The template to update
     * @param templateData The data to update this template with
     */
    static _updateObject(template: Template, templateData: TemplateData) {
        updateObject(template, templateData);
    }

    /**
     * Create Guild
     *
     * Create a guild from this template
     *
     * @param createGuildFromTemplateData The data for the guild
     *
     * @returns {Promise<GuildData>} The created guild's data
     */
    createGuild(createGuildFromTemplateData: CreateGuildFromTemplateData): Promise<GuildData> {
        return this.client.createGuildFromTemplate(this, createGuildFromTemplateData);
    }

    /**
     * Edit
     *
     * Edit this template
     *
     * @param modifyGuildTemplateData The data to modify the template
     *
     * @returns {Promise<TemplateData>} The modified template's data
     */
    edit(modifyGuildTemplateData: ModifyGuildTemplateData): Promise<TemplateData> {
        return this.client.modifyGuildTemplate(this.sourceGuildID, this, modifyGuildTemplateData);
    }

    /**
     * Sync
     *
     * Sync this template
     *
     * @returns {Promise<TemplateData>} The synced template's data
     */
    sync(): Promise<TemplateData> {
        return this.client.syncGuildTemplate(this.sourceGuildID, this);
    }
}