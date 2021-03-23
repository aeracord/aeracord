import { Attachment, Client, Embed, Member, Message, RawAttachmentData, RawEmbedData, RawMessageDataChannelMention, RawReactionData, RawStickerData, RawUserData, RawUserWithMemberData, RawWebhookData, Reaction, Sticker, User, Webhook } from "../../../../internal";
import { MessageUpdateData } from "./messageUpdateData";
import { RawMessageUpdateData } from "./rawMessageUpdateData";

export default function messageUpdate(client: Client, rawData: RawMessageUpdateData) {

    // Parse data
    const data: MessageUpdateData = {
        id: rawData.id,
        type: rawData.type,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id,
        author: (rawData.webhook_id || !rawData.author) ? undefined : User._fromRawData(rawData.author as RawUserData),
        webhook: (rawData.webhook_id && rawData.author) ? {
            id: rawData.author.id,
            name: rawData.author.username,
            avatar: rawData.author.avatar
        } : undefined,
        member: (rawData.member && rawData.guild_id) ? Member._fromRawData({ ...rawData.member, user: rawData.author as RawUserData }, rawData.guild_id) : undefined,
        content: rawData.content,
        timestamp: rawData.timestamp ? new Date(rawData.timestamp).getTime() : undefined,
        editedTimestamp: rawData.edited_timestamp ? new Date(rawData.edited_timestamp).getTime() : undefined,
        tts: rawData.tts,
        mentionEveryone: rawData.mention_everyone,
        mentions: (rawData.mentions && rawData.guild_id) ? rawData.mentions.map((u: RawUserWithMemberData) => Member._fromRawData({
            ...u.member,
            user: u
        }, rawData.guild_id as string)) : undefined,
        mentionedRoles: rawData.mention_roles,
        mentionedChannels: rawData.mention_channels ? rawData.mention_channels.map((c: RawMessageDataChannelMention) => ({
            id: c.id,
            guildID: c.guild_id,
            type: c.type,
            name: c.name
        })) : undefined,
        attachments: rawData.attachments ? rawData.attachments.map((a: RawAttachmentData) => Attachment._fromRawData(a, {
            messageID: rawData.id,
            channelID: rawData.channel_id,
            guildID: rawData.guild_id
        })) : undefined,
        embeds: rawData.embeds ? rawData.embeds.map((e: RawEmbedData) => Embed._fromRawData(e, {
            messageID: rawData.id,
            channelID: rawData.channel_id,
            guildID: rawData.guild_id
        })) : undefined,
        stickers: rawData.stickers ? rawData.stickers.map((s: RawStickerData) => Sticker._fromRawData(s)) : undefined,
        reactions: rawData.reactions ? rawData.reactions.map((r: RawReactionData) => Reaction._fromRawData(r, {
            messageID: rawData.id,
            channelID: rawData.channel_id,
            guildID: rawData.guild_id
        })) : undefined,
        pinned: rawData.pinned,
        activity: rawData.activity && {
            type: rawData.activity.type,
            partyID: rawData.activity.party_id || null
        },
        application: rawData.application && {
            id: rawData.application.id,
            name: rawData.application.name,
            description: rawData.application.description,
            icon: rawData.application.icon,
            coverImage: rawData.application.cover_image || null
        },
        messageReference: rawData.message_reference && {
            messageID: rawData.message_reference.message_id || null,
            channelID: rawData.message_reference.channel_id,
            guildID: rawData.message_reference.guild_id || null
        },
        flags: rawData.flags,
        referencedMessage: rawData.referenced_message ? Message._fromRawData(rawData.referenced_message) : undefined
    };

    // Emit event
    client.emit("messageUpdate", data, rawData);
}