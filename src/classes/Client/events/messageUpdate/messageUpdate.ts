import { Attachment, Client, Embed, Member, Message, MessageData, MessageUpdateData, RawAttachmentData, RawEmbedData, RawMessageDataChannelMention, RawMessageUpdateData, RawReactionData, RawStickerData, RawUserData, RawUserWithMemberData, RawWebhookData, Reaction, Sticker, User, Webhook } from "../../../../internal";

export default function messageUpdate(client: Client, rawData: RawMessageUpdateData) {

    // Parse data
    const data: MessageUpdateData = {
        id: rawData.id,
        type: rawData.type,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id,
        author: (rawData.webhook_id || !rawData.author) ? undefined : User._fromRawData(client, rawData.author as RawUserData),
        webhook: (rawData.webhook_id && rawData.author) ? {
            id: rawData.author.id,
            name: rawData.author.username,
            avatar: rawData.author.avatar
        } : undefined,
        member: (rawData.member && rawData.guild_id) ? Member._fromRawData(client, { ...rawData.member, user: rawData.author as RawUserData }, rawData.guild_id) : undefined,
        content: rawData.content,
        timestamp: rawData.timestamp ? new Date(rawData.timestamp).getTime() : undefined,
        editedTimestamp: rawData.edited_timestamp ? new Date(rawData.edited_timestamp).getTime() : undefined,
        tts: rawData.tts,
        mentionEveryone: rawData.mention_everyone,
        mentions: (rawData.mentions && rawData.guild_id) ? rawData.mentions.map((u: RawUserWithMemberData) => Member._dataFromRawData({
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
        attachments: rawData.attachments ? rawData.attachments.map((a: RawAttachmentData) => Attachment._fromRawData(client, a, {
            messageID: rawData.id,
            channelID: rawData.channel_id,
            guildID: rawData.guild_id
        })) : undefined,
        embeds: rawData.embeds ? rawData.embeds.map((e: RawEmbedData) => Embed._fromRawData(client, e, {
            messageID: rawData.id,
            channelID: rawData.channel_id,
            guildID: rawData.guild_id
        })) : undefined,
        stickers: rawData.stickers ? rawData.stickers.map((s: RawStickerData) => Sticker._fromRawData(client, s)) : undefined,
        reactions: rawData.reactions ? rawData.reactions.map((r: RawReactionData) => Reaction._fromRawData(client, r, {
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
        referencedMessage: rawData.referenced_message ? Message._dataFromRawData(rawData.referenced_message) : undefined,
        interaction: rawData.interaction && {
            id: rawData.interaction.id,
            type: rawData.interaction.type,
            name: rawData.interaction.name,
            user: User._dataFromRawData(rawData.interaction.user)
        }
    };

    // Get message
    const message: Message | undefined = client.messages.get(data.id);

    // Get old message data
    const oldMessageData: MessageData | undefined = message && Message.toData(message);

    // Update data
    if (message) {
        if (data.type !== undefined) message.type = data.type;
        if (data.content !== undefined) message.content = data.content;
        if (data.editedTimestamp !== undefined) message.editedTimestamp = data.editedTimestamp;
        if (data.tts !== undefined) message.tts = data.tts;
        if (data.mentionEveryone !== undefined) message.mentionEveryone = data.mentionEveryone;
        if (data.mentions !== undefined) message.mentions = data.mentions;
        if (data.mentionedRoles !== undefined) message.mentionedRoles = data.mentionedRoles;
        if (data.mentionedChannels !== undefined) message.mentionedChannels = data.mentionedChannels;
        if (data.attachments !== undefined) message.attachments = data.attachments;
        if (data.embeds !== undefined) message.embeds = data.embeds;
        if (data.stickers !== undefined) message.stickers = data.stickers;
        if (data.reactions !== undefined) message.reactions = data.reactions;
        if (data.pinned !== undefined) message.pinned = data.pinned;
        if (data.activity !== undefined) message.activity = data.activity;
        if (data.application !== undefined) message.application = data.application;
        if (data.flags !== undefined) message.flags = data.flags;
    }

    // Emit event
    client.emit("messageUpdate", data, {
        rawData,
        message,
        guild: data.guildID ? client.guilds.get(data.guildID) : undefined,
        channel: client.channels.get(data.channelID),
        oldMessageData
    });
}