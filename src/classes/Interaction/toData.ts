import { AnyInteraction, AnyInteractionData, CommandInteraction, ComponentInteraction, INTERACTION_TYPE_COMMAND, INTERACTION_TYPE_COMPONENT, Member, User } from "../../internal";

export default function toData(interaction: AnyInteraction): AnyInteractionData {

    // Parse command interaction data
    if (interaction.type === INTERACTION_TYPE_COMMAND) {
        const commandInteraction: CommandInteraction = interaction as CommandInteraction;
        return {
            id: commandInteraction.id,
            type: commandInteraction.type,
            token: commandInteraction.token,
            applicationID: commandInteraction.applicationID,
            data: commandInteraction.data,
            guildID: commandInteraction.guildID,
            channelID: commandInteraction.channelID,
            member: commandInteraction.member && Member.toData(commandInteraction.member),
            permissions: commandInteraction.permissions,
            user: User.toData(commandInteraction.user),
            fetchedAt: commandInteraction._lastUpdatedAt
        };
    }

    // Parse component interaction data
    else if (interaction.type === INTERACTION_TYPE_COMPONENT) {
        const componentInteraction: ComponentInteraction = interaction as ComponentInteraction;
        return {
            id: componentInteraction.id,
            type: componentInteraction.type,
            token: componentInteraction.token,
            applicationID: componentInteraction.applicationID,
            data: componentInteraction.data,
            guildID: componentInteraction.guildID,
            channelID: componentInteraction.channelID,
            member: componentInteraction.member && Member.toData(componentInteraction.member),
            permissions: componentInteraction.permissions,
            user: User.toData(componentInteraction.user),
            message: componentInteraction.message,
            fetchedAt: componentInteraction._lastUpdatedAt
        };
    }

    // Unknown interaction type
    else throw new Error(`Unknown interaction type '${interaction.type}'. Please open an issue about this at https://github.com/aeracord/aeracord`);
}