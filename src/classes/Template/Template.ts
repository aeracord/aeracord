import { Base, Client, CreateGuildFromTemplateData, Guild, ModifyGuildTemplateData, RawTemplateData, READY_STATE_READY, TemplateData, TemplateGuild, User } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import resolveCode from "./resolveCode";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

/**
 * Template Resolvable
 *
 * The types that can be resolved to a template
 */
export type TemplateResolvable = Template | TemplateData | string;

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
    creator: User;

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

        /**
         * Cache Template
         *
         * If we need to cache all templates and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if ((client._templates.cacheAll) && (client._readyState === READY_STATE_READY)) this.cache();
    }

    /**
     * From Raw Data
     *
     * Create a `TemplateData` object from a `RawTemplateData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {Template} The template
     */
    static _fromRawData(client: Client, rawData: RawTemplateData): Template {
        return Template.fromData(client, Template._dataFromRawData(rawData));
    }

    /**
     * Data From Raw Data
     *
     * Create a `TemplateData` object from a `RawTemplateData` object
     *
     * @private
     * @param rawData The raw data from the API
     *
     * @returns {TemplateData} The template data
     */
    static _dataFromRawData(rawData: RawTemplateData): TemplateData {
        return dataFromRawData(rawData);
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
     * To Data
     *
     * Create a `TemplateData` object from a `Template`
     *
     * @param template The template
     *
     * @returns {TemplateData} The template data
     */
    static toData(template: Template): TemplateData {
        return toData(template);
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
     * @private
     * @param template The template to update
     * @param templateData The data to update this template with
     */
    static _updateObject(template: Template, templateData: TemplateData) {
        updateObject(template, templateData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Template` object with data from a `TemplateData` object if it's cached
     *
     * @private
     * @param client The client
     * @param templateData The template data
     *
     * @returns {Template | undefined} The template
     */
    static _updateObjectFromData(client: Client, templateData: TemplateData): Template | undefined {
        return updateObjectFromData(client, templateData);
    }

    /**
     * Cache
     *
     * Cache this `Template`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._templates.cache(this.id, this, expiresIn);
    }

    /**
     * Create Guild
     *
     * Create a guild from this template
     *
     * @param createGuildFromTemplateData The data for the guild
     *
     * @returns {Promise<Guild>} The created guild
     */
    createGuild(createGuildFromTemplateData: CreateGuildFromTemplateData): Promise<Guild> {
        return this.client.createGuildFromTemplate(this, createGuildFromTemplateData);
    }

    /**
     * Edit
     *
     * Edit this template
     *
     * @param modifyGuildTemplateData The data to modify the template
     *
     * @returns {Promise<Template>} The modified template
     */
    edit(modifyGuildTemplateData: ModifyGuildTemplateData): Promise<Template> {
        return this.client.modifyGuildTemplate(this.sourceGuildID, this, modifyGuildTemplateData);
    }

    /**
     * Sync
     *
     * Sync this template
     *
     * @returns {Promise<Template>} The synced template
     */
    sync(): Promise<Template> {
        return this.client.syncGuildTemplate(this.sourceGuildID, this);
    }
}