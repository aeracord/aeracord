import { Attachment, Member, Message, MessageData, MessageEmbed, RawAttachmentData, RawMessageData, RawMessageDataChannelMention, RawMessageEmbedData, RawReactionData, RawStickerData, RawUserData, RawUserWithMemberData, Reaction, Sticker, User } from "../../internal";

export default function dataFromRawData(rawData: RawMessageData): MessageData {

    // Parse message data
    return {
        id: rawData.id,
        type: rawData.type,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id || null,
        author: rawData.webhook_id ? null : User._dataFromRawData(rawData.author as RawUserData),
        webhook: rawData.webhook_id ? {
            id: rawData.author.id,
            name: rawData.author.username,
            avatar: rawData.author.avatar
        } : null,
        member: (rawData.member && rawData.guild_id) ? Member._dataFromRawData({ ...rawData.member, user: rawData.author as RawUserData }, rawData.guild_id) : null,
        content: rawData.content,
        timestamp: new Date(rawData.timestamp).getTime(),
        editedTimestamp: rawData.edited_timestamp ? new Date(rawData.edited_timestamp).getTime() : null,
        tts: rawData.tts,
        mentionEveryone: rawData.mention_everyone,
        mentions: rawData.guild_id ? rawData.mentions.map((u: RawUserWithMemberData) => Member._dataFromRawData({
            ...u.member,
            user: u
        }, rawData.guild_id as string)) : [],
        mentionedRoles: rawData.mention_roles,
        mentionedChannels: rawData.mention_channels ? rawData.mention_channels.map((c: RawMessageDataChannelMention) => ({
            id: c.id,
            guildID: c.guild_id,
            type: c.type,
            name: c.name
        })) : [],
        attachments: rawData.attachments.map((a: RawAttachmentData) => Attachment._dataFromRawData(a, {
            messageID: rawData.id,
            channelID: rawData.channel_id,
            guildID: rawData.guild_id || null
        })),
        embeds: rawData.embeds.map((e: RawMessageEmbedData) => MessageEmbed._dataFromRawData(e, {
            messageID: rawData.id,
            channelID: rawData.channel_id,
            guildID: rawData.guild_id || null
        })),
        stickers: rawData.stickers ? rawData.stickers.map((s: RawStickerData) => Sticker._dataFromRawData(s)) : [],
        reactions: rawData.reactions ? rawData.reactions.map((r: RawReactionData) => Reaction._dataFromRawData(r, {
            messageID: rawData.id,
            channelID: rawData.channel_id,
            guildID: rawData.guild_id || null
        })) : [],
        pinned: rawData.pinned,
        activity: rawData.activity ? {
            type: rawData.activity.type,
            partyID: rawData.activity.party_id || null
        } : null,
        application: rawData.application ? {
            id: rawData.application.id,
            name: rawData.application.name,
            description: rawData.application.description,
            icon: rawData.application.icon,
            coverImage: rawData.application.cover_image || null
        } : null,
        messageReference: rawData.message_reference ? {
            messageID: rawData.message_reference.message_id || null,
            channelID: rawData.message_reference.channel_id,
            guildID: rawData.message_reference.guild_id || null
        } : null,
        flags: rawData.flags || 0,
        referencedMessage: rawData.referenced_message && Message._dataFromRawData(rawData.referenced_message),
        interaction: rawData.interaction ? {
            id: rawData.interaction.id,
            type: rawData.interaction.type,
            name: rawData.interaction.name,
            user: User._dataFromRawData(rawData.interaction.user)
        } : null,
        fetchedAt: Date.now()
    };
}