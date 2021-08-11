import { AnyInteractionData, Client, CommandInteractionResolvedData, COMMAND_TYPE_CHAT_INPUT, COMMAND_TYPE_MESSAGE, COMMAND_TYPE_USER, COMPONENT_TYPE_BUTTON, COMPONENT_TYPE_SELECT_MENU, InteractionMetadata, INTERACTION_TYPE_COMMAND, INTERACTION_TYPE_COMPONENT, Member, Message, RawInteractionData, RawMemberData, RawMessageData, RawResolvedChannel, RawRoleData, RawUserlessMemberData, RawUserData, Role, User } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawInteractionData): AnyInteractionData {

    // Define interaction data
    let interactionData: AnyInteractionData;

    // Parse command data
    if (rawData.type === INTERACTION_TYPE_COMMAND) {

        // Define interaction metadata
        let data: InteractionMetadata;

        // Parse resolved data
        const resolved: CommandInteractionResolvedData = {
            users: new Map(),
            members: new Map(),
            roles: new Map(),
            channels: new Map(),
            messages: new Map()
        };

        // Parse resolved users
        if (rawData.data.resolved?.users) Object.values(rawData.data.resolved.users).forEach((u: RawUserData) => resolved.users.set(u.id, User._dataFromRawData(u)));

        // Parse resolved members
        if (rawData.data.resolved?.members) Object.keys(rawData.data.resolved.members).forEach((m: string) => resolved.members.set(m, Member._dataFromRawData({
            ...rawData.data.resolved?.members?.[m] as RawUserlessMemberData,
            user: rawData.data.resolved?.users?.[m] as RawUserData
        }, rawData.guild_id as string)));

        // Parse resolved roles
        if (rawData.data.resolved?.roles) Object.values(rawData.data.resolved.roles).forEach((r: RawRoleData) => resolved.roles.set(r.id, Role._dataFromRawData(client, r, rawData.guild_id as string)));

        // Parse resolved channels
        if (rawData.data.resolved?.channels) Object.values(rawData.data.resolved.channels).forEach((c: RawResolvedChannel) => resolved.channels.set(c.id, {
            id: c.id,
            type: c.type,
            name: c.name,
            permissions: c.permissions,
            parentID: c.parent_id,
            archived: c.thread_metadata?.archived,
            autoArchivedDuration: c.thread_metadata?.auto_archive_duration,
            archivedAt: c.thread_metadata && new Date(c.thread_metadata.archive_timestamp).getTime(),
            locked: c.thread_metadata?.locked
        }));

        // Parse resolved messages
        if (rawData.data.resolved?.messages) Object.values(rawData.data.resolved.messages).forEach((m: RawMessageData) => resolved.messages.set(m.id, Message._dataFromRawData({
            ...m,
            guild_id: rawData.guild_id
        })));

        // Parse chat input command metadata
        if (rawData.data.type === COMMAND_TYPE_CHAT_INPUT) data = {
            id: rawData.data.id as string,
            name: rawData.data.name as string,
            type: rawData.data.type,
            resolved,
            options: rawData.data.options
        };

        // Parse context menu command metadata
        else if ((rawData.data.type === COMMAND_TYPE_USER) || (rawData.data.type === COMMAND_TYPE_MESSAGE)) data = {
            id: rawData.data.id as string,
            name: rawData.data.name as string,
            type: rawData.data.type,
            resolved,
            targetID: rawData.data.target_id as string
        };

        // Unknown component type
        else throw new Error(`Unknown component type '${rawData.data.component_type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);

        // Parse interaction data
        interactionData = {
            id: rawData.id,
            type: rawData.type,
            token: rawData.token,
            applicationID: rawData.application_id,
            data,
            guildID: rawData.guild_id || null,
            channelID: rawData.channel_id,
            member: (rawData.member && rawData.guild_id) ? Member._dataFromRawData(rawData.member, rawData.guild_id) : null,
            permissions: rawData.member ? rawData.member.permissions : null,
            user: User._dataFromRawData(rawData.user || (rawData.member as RawMemberData).user),
            fetchedAt: Date.now()
        };
    }

    // Parse component data
    else if (rawData.type === INTERACTION_TYPE_COMPONENT) {

        // Define interaction metadata
        let data: InteractionMetadata;

        // Parse button metadata
        if (rawData.data.component_type === COMPONENT_TYPE_BUTTON) data = {
            type: rawData.data.component_type,
            customID: rawData.data.custom_id as string
        };

        // Parse select menu metadata
        else if (rawData.data.component_type === COMPONENT_TYPE_SELECT_MENU) data = {
            type: rawData.data.component_type,
            customID: rawData.data.custom_id as string,
            values: rawData.data.values as string[]
        };

        // Unknown component type
        else throw new Error(`Unknown component type '${rawData.data.component_type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);

        // Parse interaction data
        interactionData = {
            id: rawData.id,
            type: rawData.type,
            token: rawData.token,
            applicationID: rawData.application_id,
            data,
            guildID: rawData.guild_id || null,
            channelID: rawData.channel_id,
            member: (rawData.member && rawData.guild_id) ? Member._dataFromRawData(rawData.member, rawData.guild_id) : null,
            permissions: rawData.member ? rawData.member.permissions : null,
            user: User._dataFromRawData(rawData.user || (rawData.member as RawMemberData).user),
            message: Message._dataFromRawData(rawData.message as RawMessageData),
            fetchedAt: Date.now()
        };
    }

    // Unknown interaction type
    else throw new Error(`Unknown interaction type '${rawData.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);

    // Return
    return interactionData;
}