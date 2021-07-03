import { AnyInteractionData, ComponentType, COMPONENT_TYPE_BUTTON, COMPONENT_TYPE_SELECT_MENU, InteractionMetadata, INTERACTION_TYPE_COMMAND, INTERACTION_TYPE_COMPONENT, Member, Message, RawInteractionData, RawMemberData, RawMessageData, User } from "../../internal";

export default function dataFromRawData(rawData: RawInteractionData): AnyInteractionData {

    // Define interaction data
    let interactionData: AnyInteractionData;

    // Parse slash command data
    if (rawData.type === INTERACTION_TYPE_COMMAND) interactionData = {
        id: rawData.id,
        type: rawData.type,
        token: rawData.token,
        applicationID: rawData.application_id,
        data: {
            id: rawData.data.id as string,
            name: rawData.data.name as string,
            options: rawData.data.options
        },
        guildID: rawData.guild_id || null,
        channelID: rawData.channel_id,
        member: (rawData.member && rawData.guild_id) ? Member._dataFromRawData(rawData.member, rawData.guild_id) : null,
        permissions: rawData.member ? rawData.member.permissions : null,
        user: User._dataFromRawData(rawData.user || (rawData.member as RawMemberData).user),
        fetchedAt: Date.now()
    };

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