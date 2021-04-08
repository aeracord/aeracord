import { ChannelMention, Message, MessageData } from "../../internal";

export default function toData(message: Message): MessageData {

    // Parse message data
    return {
        id: message.id,
        type: message.type,
        channelID: message.channelID,
        guildID: message.guildID,
        author: message.author,
        webhook: message.webhook && {
            id: message.webhook.id,
            name: message.webhook.name,
            avatar: message.webhook.avatar
        },
        member: message.member,
        content: message.content,
        timestamp: message.timestamp,
        editedTimestamp: message.editedTimestamp,
        tts: message.tts,
        mentionEveryone: message.mentionEveryone,
        mentions: message.mentions,
        mentionedRoles: message.mentionedRoles,
        mentionedChannels: message.mentionedChannels.map((c: ChannelMention) => ({
            id: c.id,
            guildID: c.guildID,
            type: c.type,
            name: c.name
        })),
        attachments: message.attachments,
        embeds: message.embeds,
        stickers: message.stickers,
        reactions: message.reactions,
        pinned: message.pinned,
        activity: message.activity && {
            type: message.activity.type,
            partyID: message.activity.partyID
        },
        application: message.application && {
            id: message.application.id,
            name: message.application.name,
            description: message.application.description,
            icon: message.application.icon,
            coverImage: message.application.coverImage
        },
        messageReference: message.messageReference && {
            messageID: message.messageReference.messageID,
            channelID: message.messageReference.channelID,
            guildID: message.messageReference.guildID
        },
        flags: message.flags,
        referencedMessage: message.referencedMessage
    };
}