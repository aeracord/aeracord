import { Client } from "../../../../internal";
import parseAttachment from "../parseAttachment";
import parseEmbed from "../parseEmbed";
import parseMember from "../parseMember";
import parseMessage from "../parseMessage";
import parseReaction from "../parseReaction";
import parseSticker from "../parseSticker";
import parseUser from "../parseUser";
import parseWebhook from "../parseWebhook";
import { RawAttachmentData } from "../rawAttachmentData";
import { RawEmbedData } from "../rawEmbedData";
import { RawMessageDataChannelMention } from "../rawMessageData";
import { RawReactionData } from "../rawReactionData";
import { RawStickerData } from "../rawStickerData";
import { RawUserData, RawUserWithMemberData } from "../rawUserData";
import { RawWebhookData } from "../rawWebhookData";
import { MessageUpdateData } from "./messageUpdateData";
import { RawMessageUpdateData } from "./rawMessageUpdateData";

export default function messageUpdate(client: Client, rawData: RawMessageUpdateData) {

    // Parse data
    const data: MessageUpdateData = {
        id: rawData.id,
        type: rawData.type,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id,
        author: rawData.webhook_id ? undefined : parseUser(client, rawData.author as RawUserData),
        webhook: rawData.webhook_id ? parseWebhook(client, rawData.author as RawWebhookData) : undefined,
        member: (rawData.member && rawData.guild_id) ? parseMember(client, { ...rawData.member, user: rawData.author as RawUserData }, rawData.guild_id) : undefined,
        content: rawData.content,
        timestamp: rawData.timestamp ? new Date(rawData.timestamp).getTime() : undefined,
        editedTimestamp: rawData.edited_timestamp ? new Date(rawData.edited_timestamp).getTime() : undefined,
        tts: rawData.tts,
        mentionEveryone: rawData.mention_everyone,
        mentions: (rawData.mentions && rawData.guild_id) ? rawData.mentions.map((u: RawUserWithMemberData) => parseMember(client, {
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
        attachments: rawData.attachments ? rawData.attachments.map((a: RawAttachmentData) => parseAttachment(client, a)) : undefined,
        embeds: rawData.embeds ? rawData.embeds.map((e: RawEmbedData) => parseEmbed(client, e)) : undefined,
        stickers: rawData.stickers ? rawData.stickers.map((s: RawStickerData) => parseSticker(client, s)) : undefined,
        reactions: rawData.reactions ? rawData.reactions.map((r: RawReactionData) => parseReaction(client, r)) : undefined,
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
        flags: rawData.flags,
        referencedMessage: rawData.referenced_message ? parseMessage(client, rawData.referenced_message) : undefined
    };

    // Emit event
    client.emit("messageUpdate", data, rawData);
}