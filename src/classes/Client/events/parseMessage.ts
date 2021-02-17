import { Client, Message } from "../../../internal";
import parseAttachment from "./parseAttachment";
import parseEmbed from "./parseEmbed";
import parseMember from "./parseMember";
import parseReaction from "./parseReaction";
import parseSticker from "./parseSticker";
import parseUser from "./parseUser";
import parseWebhook from "./parseWebhook";
import { RawAttachmentData } from "./rawAttachmentData";
import { RawEmbedData } from "./rawEmbedData";
import { RawMessageData, RawMessageDataChannelMention } from "./rawMessageData";
import { RawReactionData } from "./rawReactionData";
import { RawStickerData } from "./rawStickerData";
import { RawUserData, RawUserWithMemberData } from "./rawUserData";
import { RawWebhookData } from "./rawWebhookData";

export default function parseMessage(client: Client, rawData: RawMessageData): Message {

    // Parse message
    const message: Message = new Message(client, {
        id: rawData.id,
        type: rawData.type,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id,
        author: rawData.webhook_id ? undefined : parseUser(client, rawData.author as RawUserData),
        webhook: rawData.webhook_id ? parseWebhook(client, rawData.author as RawWebhookData) : undefined,
        member: (rawData.member && rawData.guild_id) ? parseMember(client, { ...rawData.member, user: rawData.author as RawUserData }, rawData.guild_id) : undefined,
        content: rawData.content,
        timestamp: new Date(rawData.timestamp).getTime(),
        editedTimestamp: rawData.edited_timestamp ? new Date(rawData.edited_timestamp).getTime() : undefined,
        tts: rawData.tts,
        mentionEveryone: rawData.mention_everyone,
        mentions: rawData.guild_id ? rawData.mentions.map((u: RawUserWithMemberData) => parseMember(client, {
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
        attachments: rawData.attachments.map((a: RawAttachmentData) => parseAttachment(client, a)),
        embeds: rawData.embeds.map((e: RawEmbedData) => parseEmbed(client, e)),
        stickers: rawData.stickers ? rawData.stickers.map((s: RawStickerData) => parseSticker(client, s)) : [],
        reactions: rawData.reactions ? rawData.reactions.map((r: RawReactionData) => parseReaction(client, r)) : [],
        pinned: rawData.pinned,
        activity: rawData.activity && {
            type: rawData.activity.type,
            partyID: rawData.activity.party_id
        },
        application: rawData.application && {
            id: rawData.application.id,
            name: rawData.application.name,
            description: rawData.application.description,
            icon: rawData.application.icon || undefined,
            coverImage: rawData.application.cover_image
        },
        messageReference: rawData.message_reference && {
            messageID: rawData.message_reference.message_id,
            channelID: rawData.message_reference.channel_id,
            guildID: rawData.message_reference.guild_id
        },
        flags: rawData.flags || 0,
        referencedMessage: rawData.referenced_message ? parseMessage(client, rawData.referenced_message) : undefined
    });

    // Return
    return message;
}