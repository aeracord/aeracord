import { Client, READY_STATE_INITIAL_GUILDS, READY_STATE_READY } from "../../internal";
import channelCreate from "./events/channelCreate/channelCreate";
import channelDelete from "./events/channelDelete/channelDelete";
import channelPinsUpdate from "./events/channelPinsUpdate/channelPinsUpdate";
import channelUpdate from "./events/channelUpdate/channelUpdate";
import commandCreate from "./events/commandCreate/commandCreate";
import commandDelete from "./events/commandDelete/commandDelete";
import commandUpdate from "./events/commandUpdate/commandUpdate";
import guildBanAdd from "./events/guildBanAdd/guildBanAdd";
import guildBanRemove from "./events/guildBanRemove/guildBanRemove";
import guildCreate from "./events/guildCreate/guildCreate";
import guildDelete from "./events/guildDelete/guildDelete";
import guildEmojisUpdate from "./events/guildEmojisUpdate/guildEmojisUpdate";
import guildIntegrationsUpdate from "./events/guildIntegrationsUpdate/guildIntegrationsUpdate";
import guildMemberAdd from "./events/guildMemberAdd/guildMemberAdd";
import guildMemberRemove from "./events/guildMemberRemove/guildMemberRemove";
import guildMemberUpdate from "./events/guildMemberUpdate/guildMemberUpdate";
import guildRoleCreate from "./events/guildRoleCreate/guildRoleCreate";
import guildRoleDelete from "./events/guildRoleDelete/guildRoleDelete";
import guildRoleUpdate from "./events/guildRoleUpdate/guildRoleUpdate";
import guildUpdate from "./events/guildUpdate/guildUpdate";
import inviteCreate from "./events/inviteCreate/inviteCreate";
import inviteDelete from "./events/inviteDelete/inviteDelete";
import messageCreate from "./events/messageCreate/messageCreate";
import messageDelete from "./events/messageDelete/messageDelete";
import messageDeleteBulk from "./events/messageDeleteBulk/messageDeleteBulk";
import messageReactionAdd from "./events/messageReactionAdd/messageReactionAdd";
import messageReactionRemove from "./events/messageReactionRemove/messageReactionRemove";
import messageReactionRemoveAll from "./events/messageReactionRemoveAll/messageReactionRemoveAll";
import messageReactionRemoveEmoji from "./events/messageReactionRemoveEmoji/messageReactionRemoveEmoji";
import messageUpdate from "./events/messageUpdate/messageUpdate";
import presenceUpdate from "./events/presenceUpdate/presenceUpdate";
import ready from "./events/ready/ready";
import typingStart from "./events/typingStart/typingStart";
import userUpdate from "./events/userUpdate/userUpdate";
import voiceStateUpdate from "./events/voiceStateUpdate/voiceStateUpdate";
import webhooksUpdate from "./events/webhooksUpdate/webhooksUpdate";

/**
 * Event
 * https://discord.com/developers/docs/topics/gateway#commands-and-events-gateway-events
 *
 * Handles events from the gateway
 */
export default function event(client: Client, type: string, data: any) {

    /**
     * Ready
     * https://discord.com/developers/docs/topics/gateway#ready
     */
    if (type === "READY") return ready(client, data);

    // Initial guild create/delete
    if ((client._readyState === READY_STATE_INITIAL_GUILDS) && ((type === "GUILD_CREATE") || (type === "GUILD_DELETE"))) {

        // Guild Create
        if (type === "GUILD_CREATE") return guildCreate(client, data);

        // Guild Delete
        else return guildDelete(client, data);
    }

    /**
     * If the client isn't ready, add the events to the event queue
     * Once the client's ready, it'll loop through the queue and process all the events
     */
    if (client._readyState < READY_STATE_READY) return client._eventQueue.push({ type, data });

    /**
     * Channel Create
     * https://discord.com/developers/docs/topics/gateway#channel-create
     */
    if (type === "CHANNEL_CREATE") channelCreate(client, data);

    /**
     * Channel Delete
     * https://discord.com/developers/docs/topics/gateway#channel-delete
     */
    else if (type === "CHANNEL_DELETE") channelDelete(client, data);

    /**
     * Channel Pins Update
     * https://discord.com/developers/docs/topics/gateway#channel-pins-update
     */
    else if (type === "CHANNEL_PINS_UPDATE") channelPinsUpdate(client, data);

    /**
     * Channel Update
     * https://discord.com/developers/docs/topics/gateway#channel-update
     */
    else if (type === "CHANNEL_UPDATE") channelUpdate(client, data);

    /**
     * Command Create
     * https://discord.com/developers/docs/topics/gateway#application-command-create
     */
    if (type === "APPLICATION_COMMAND_CREATE") commandCreate(client, data);

    /**
     * Command Delete
     * https://discord.com/developers/docs/topics/gateway#application-command-delete
     */
    else if (type === "APPLICATION_COMMAND_DELETE") commandDelete(client, data);

    /**
     * Command Update
     * https://discord.com/developers/docs/topics/gateway#application-command-update
     */
    else if (type === "APPLICATION_COMMAND_UPDATE") commandUpdate(client, data);

    /**
     * Guild Ban Add
     * https://discord.com/developers/docs/topics/gateway#guild-ban-add
     */
    else if (type === "GUILD_BAN_ADD") guildBanAdd(client, data);

    /**
     * Guild Ban Remove
     * https://discord.com/developers/docs/topics/gateway#guild-ban-remove
     */
    else if (type === "GUILD_BAN_REMOVE") guildBanRemove(client, data);

    /**
     * Guild Create
     * https://discord.com/developers/docs/topics/gateway#guild-create
     */
    else if (type === "GUILD_CREATE") guildCreate(client, data);

    /**
     * Guild Delete
     * https://discord.com/developers/docs/topics/gateway#guild-delete
     */
    else if (type === "GUILD_DELETE") guildDelete(client, data);

    /**
     * Guild Emojis Update
     * https://discord.com/developers/docs/topics/gateway#guild-emojis-update
     */
    else if (type === "GUILD_EMOJIS_UPDATE") guildEmojisUpdate(client, data);

    /**
     * Guild Member Add
     * https://discord.com/developers/docs/topics/gateway#guild-member-add
     */
    else if (type === "GUILD_MEMBER_ADD") guildMemberAdd(client, data);

    /**
     * Guild Member Remove
     * https://discord.com/developers/docs/topics/gateway#guild-member-remove
     */
    else if (type === "GUILD_MEMBER_REMOVE") guildMemberRemove(client, data);

    /**
     * Guild Member Update
     * https://discord.com/developers/docs/topics/gateway#guild-member-update
     */
    else if (type === "GUILD_MEMBER_UPDATE") guildMemberUpdate(client, data);

    /**
     * Guild Integrations Update
     * https://discord.com/developers/docs/topics/gateway#guild-integrations-update
     */
    else if (type === "GUILD_INTEGRATIONS_UPDATE") guildIntegrationsUpdate(client, data);

    /**
     * Guild Role Create
     * https://discord.com/developers/docs/topics/gateway#guild-role-create
     */
    else if (type === "GUILD_ROLE_CREATE") guildRoleCreate(client, data);

    /**
     * Guild Role Delete
     * https://discord.com/developers/docs/topics/gateway#guild-role-delete
     */
    else if (type === "GUILD_ROLE_DELETE") guildRoleDelete(client, data);

    /**
     * Guild Role Update
     * https://discord.com/developers/docs/topics/gateway#guild-role-update
     */
    else if (type === "GUILD_ROLE_UPDATE") guildRoleUpdate(client, data);

    /**
     * Guild Update
     * https://discord.com/developers/docs/topics/gateway#guild-update
     */
    else if (type === "GUILD_UPDATE") guildUpdate(client, data);

    /**
     * Invite Create
     * https://discord.com/developers/docs/topics/gateway#invite-create
     */
    else if (type === "INVITE_CREATE") inviteCreate(client, data);

    /**
     * Invite Delete
     * https://discord.com/developers/docs/topics/gateway#invite-delete
     */
    else if (type === "INVITE_DELETE") inviteDelete(client, data);

    /**
     * Message Create
     * https://discord.com/developers/docs/topics/gateway#message-create
     */
    else if (type === "MESSAGE_CREATE") messageCreate(client, data);

    /**
     * Message Delete
     * https://discord.com/developers/docs/topics/gateway#message-delete
     */
    else if (type === "MESSAGE_DELETE") messageDelete(client, data);

    /**
     * Message Delete Bulk
     * https://discord.com/developers/docs/topics/gateway#message-delete-bulk
     */
    else if (type === "MESSAGE_DELETE_BULK") messageDeleteBulk(client, data);

    /**
     * Message Reaction Add
     * https://discord.com/developers/docs/topics/gateway#message-reaction-add
     */
    else if (type === "MESSAGE_REACTION_ADD") messageReactionAdd(client, data);

    /**
     * Message Reaction Remove
     * https://discord.com/developers/docs/topics/gateway#message-reaction-remove
     */
    else if (type === "MESSAGE_REACTION_REMOVE") messageReactionRemove(client, data);

    /**
     * Message Reaction Remove All
     * https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all
     */
    else if (type === "MESSAGE_REACTION_REMOVE_ALL") messageReactionRemoveAll(client, data);

    /**
     * Message Reaction Remove Emoji
     * https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji
     */
    else if (type === "MESSAGE_REACTION_REMOVE_EMOJI") messageReactionRemoveEmoji(client, data);

    /**
     * Message Update
     * https://discord.com/developers/docs/topics/gateway#message-update
     */
    else if (type === "MESSAGE_UPDATE") messageUpdate(client, data);

    /**
     * Presence Update
     * https://discord.com/developers/docs/topics/gateway#presence-update
     */
    else if (type === "PRESENCE_UPDATE") presenceUpdate(client, data);

    /**
     * Typing Start
     * https://discord.com/developers/docs/topics/gateway#typing-start
     */
    else if (type === "TYPING_START") typingStart(client, data);

    /**
     * User Update
     * https://discord.com/developers/docs/topics/gateway#user-update
     */
    else if (type === "USER_UPDATE") userUpdate(client, data);

    /**
     * Voice State Update
     * https://discord.com/developers/docs/topics/gateway#voice-state-update
     */
    else if (type === "VOICE_STATE_UPDATE") voiceStateUpdate(client, data);

    /**
     * Webhooks Update
     * https://discord.com/developers/docs/topics/gateway#webhooks-update
     */
    else if (type === "WEBHOOKS_UPDATE") webhooksUpdate(client, data);
}