import { Client } from "../../internal";

export interface RoleData {
    id: string;
    name: string;
    guildID: string;
    color: number;
    hoist?: boolean;
    position: number;
    permissions: string;
    managed?: boolean;
    mentionable?: boolean;
    tags: RoleDataTags;
}

export interface RoleDataTags {
    botID?: string;
    integrationID?: string;
    premiumRole?: boolean;
}

export type RoleTags = RoleDataTags;

export default class Role {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * ID
     *
     * The role's ID
     */
    id: string;

    /**
     * Name
     *
     * The role's name
     */
    name: string;

    /**
     * Guild ID
     *
     * The ID of the guild this role is in
     */
    guildID: string;

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
     * Position
     *
     * The role's position
     */
    position: number;

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

    /**
     * Managed
     *
     * Whether or not this role is managed by an integration
     */
    managed: boolean;

    /**
     * Tags
     *
     * The role's tags
     */
    tags: RoleTags;

    /**
     * Role
     *
     * @param client The client
     * @param roleData Options to initialize this role with
     * @param roleData.id The role's ID
     * @param roleData.name The role's name
     * @param roleData.guildID The ID of the guild this role is in
     * @param roleData.color The role's color
     * @param roleData.hoist Whether or not this role is hoisted
     * @param roleData.position The role's position
     * @param roleData.permissions The role's permissions
     * @param roleData.mentionable Whether or not this role is mentionable
     * @param roleData.managed Whether or not this role is managed by an integration
     * @param roleData.tags The role's tags
     * @param roleData.tags.botID The ID of the bot this role is managed by
     * @param roleData.tags.integrationID The ID of the integration this role is managed by
     * @param roleData.tags.premiumRole Whether or not this role is the server's Nitro Booster role
     */
    constructor(client: Client, roleData: RoleData) {

        // Set data
        this.client = client;
        this.id = roleData.id;
        this.name = roleData.name;
        this.guildID = roleData.guildID;
        this.color = roleData.color;
        this.hoist = Boolean(roleData.hoist);
        this.position = roleData.position;
        this.permissions = roleData.permissions;
        this.mentionable = Boolean(roleData.mentionable);
        this.managed = Boolean(roleData.managed);
        this.tags = roleData.tags;
    }
}