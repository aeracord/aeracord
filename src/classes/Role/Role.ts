import { Base, Client, ModifyGuildRoleData, RawRoleData, UserResolvable } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

export interface RoleData {
    id: string;
    name: string;
    guildID: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags: RoleDataTags;
}

export interface RoleDataTags {
    botID: string | null;
    integrationID: string | null;
    premiumRole: boolean;
}

export type RoleTags = RoleDataTags;

export type RoleResolvable = Role | string;

export default class Role extends Base<Role> {

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

        // Super
        super(client, {
            id: roleData.id,
            cacheManager: client._roles
        });

        // Set data
        Role._updateObject(this, roleData);

        // Cache role
        this.client._roles.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create a `RoleData` object from a `RawRoleData` object
     *
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this role is in
     *
     * @returns {RoleData} The role data
     */
    static _fromRawData(client: Client, rawData: RawRoleData, guildID: string): RoleData {
        return fromRawData(client, rawData, guildID);
    }

    /**
     * From Data
     *
     * Create a `Role` from a `RoleData` object
     *
     * @param client The client
     * @param roleData The role data
     *
     * @returns {Role} The role
     */
    static fromData(client: Client, roleData: RoleData): Role {
        return fromData(client, roleData);
    }

    /**
     * Resolve ID
     *
     * Resolve an object to a role ID
     *
     * @param roleResolvable The role resolvable
     *
     * @returns {string | undefined} The resolved role ID, or `undefined` if the role resolvable is invalid
     */
    static resolveID(roleResolvable: RoleResolvable): string | undefined {
        return resolveID(roleResolvable);
    }

    /**
     * Update Object
     *
     * Update the `Role` object with data from a `RoleData` object
     *
     * @param role The role to update
     * @param roleData The data to update this role with
     */
    static _updateObject(role: Role, roleData: RoleData) {
        updateObject(role, roleData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Role` object with data from a `RoleData` object if it's cached
     *
     * @param client The client
     * @param roleData The role data
     *
     * @returns {Role | undefined} The role
     */
    static _updateObjectFromData(client: Client, roleData: RoleData): Role | undefined {
        return updateObjectFromData(client, roleData);
    }

    /**
     * Add to Member
     *
     * Add this role to a member
     *
     * @param user The user resolvable for the member to add this role to
     */
    addToMember(user: UserResolvable): Promise<void> {
        return this.client.addGuildMemberRole(this.guildID, user, this);
    }

    /**
     * Edit
     *
     * Edit this role
     *
     * @param modifyGuildRoleData The data to modify the role
     *
     * @returns {Promise<RoleData>} The modified role's data
     */
    edit(modifyGuildRoleData: ModifyGuildRoleData): Promise<RoleData> {
        return this.client.modifyGuildRole(this.guildID, this, modifyGuildRoleData);
    }

    /**
     * Remove from Member
     *
     * Remove this role from a member
     *
     * @param user The user resolvable for the member to remove the role from
     */
    removeFromMember(user: UserResolvable): Promise<void> {
        return this.client.removeGuildMemberRole(this.guildID, user, this);
    }
}