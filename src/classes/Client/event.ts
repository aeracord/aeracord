import { Client } from "../../internal";
import channelCreate from "./events/channelCreate/channelCreate";
import channelDelete from "./events/channelDelete/channelDelete";
import channelPinsUpdate from "./events/channelPinsUpdate/channelPinsUpdate";
import channelUpdate from "./events/channelUpdate/channelUpdate";
import guildBanAdd from "./events/guildBanAdd/guildBanAdd";
import guildBanRemove from "./events/guildBanRemove/guildBanRemove";
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
import ready from "./events/ready/ready";
import typingStart from "./events/typingStart/typingStart";
import webhooksUpdate from "./events/webhooksUpdate/webhooksUpdate";

export default function event(client: Client, type: string, data: any) {

    // Ready
    if (type === "READY") return ready(client, data);

    /**
     * If the client isn't ready, add the events to the event queue
     * Once the client's ready, it'll loop through the queue and process all the events
     */
    if (!client.ready) return client.eventQueue.push({ type, data });

    // Channel Create
    if (type === "CHANNEL_CREATE") channelCreate(client, data);

    // Channel Delete
    else if (type === "CHANNEL_DELETE") channelDelete(client, data);

    // Channel Pins Update
    else if (type === "CHANNEL_PINS_UPDATE") channelPinsUpdate(client, data);

    // Channel Update
    else if (type === "CHANNEL_UPDATE") channelUpdate(client, data);

    // Guild Ban Add
    else if (type === "GUILD_BAN_ADD") guildBanAdd(client, data);

    // Guild Ban Remove
    else if (type === "GUILD_BAN_REMOVE") guildBanRemove(client, data);

    // Guild Emojis Update
    else if (type === "GUILD_EMOJIS_UPDATE") guildEmojisUpdate(client, data);

    // Guild Member Add
    else if (type === "GUILD_MEMBER_ADD") guildMemberAdd(client, data);

    // Guild Member Remove
    else if (type === "GUILD_MEMBER_REMOVE") guildMemberRemove(client, data);

    // Guild Member Update
    else if (type === "GUILD_MEMBER_UPDATE") guildMemberUpdate(client, data);

    // Guild Integrations Update
    else if (type === "GUILD_INTEGRATIONS_UPDATE") guildIntegrationsUpdate(client, data);

    // Guild Role Create
    else if (type === "GUILD_ROLE_CREATE") guildRoleCreate(client, data);

    // Guild Role Delete
    else if (type === "GUILD_ROLE_DELETE") guildRoleDelete(client, data);

    // Guild Role Update
    else if (type === "GUILD_ROLE_UPDATE") guildRoleUpdate(client, data);

    // Guild Update
    else if (type === "GUILD_UPDATE") guildUpdate(client, data);

    // Invite Create
    else if (type === "INVITE_CREATE") inviteCreate(client, data);

    // Invite Delete
    else if (type === "INVITE_DELETE") inviteDelete(client, data);

    // Typing Start
    else if (type === "TYPING_START") typingStart(client, data);

    // Webhooks Update
    else if (type === "WEBHOOKS_UPDATE") webhooksUpdate(client, data);
}