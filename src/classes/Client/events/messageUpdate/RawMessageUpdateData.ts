import { MessageType, RawAttachmentData, RawMessageComponentData, RawMessageData, RawMessageDataActivity, RawMessageDataApplication, RawMessageDataChannelMention, RawMessageDataInteraction, RawMessageDataMessageReference, RawMessageDataWebhook, RawMessageEmbedData, RawMessageStickerItem, RawReactionData, RawUserlessMemberData, RawUserData, RawUserWithMemberData, RawWebhookData } from "../../../../internal";

export interface RawMessageUpdateData {
    id: string;
    type?: MessageType;
    channel_id: string;
    guild_id?: string;
    author?: RawUserData | RawMessageDataWebhook;
    member?: RawUserlessMemberData;
    content?: string;
    timestamp?: string;
    edited_timestamp?: string | null;
    tts?: boolean;
    mention_everyone?: boolean;
    mentions?: RawUserWithMemberData[];
    mention_roles?: string[];
    mention_channels?: RawMessageDataChannelMention[];
    attachments?: RawAttachmentData[];
    embeds?: RawMessageEmbedData[];
    sticker_items?: RawMessageStickerItem[];
    reactions?: RawReactionData[];
    nonce?: string | number;
    pinned?: boolean;
    webhook_id?: string;
    activity?: RawMessageDataActivity;
    application?: RawMessageDataApplication;
    message_reference?: RawMessageDataMessageReference;
    flags?: number;
    referenced_message?: RawMessageData | null;
    interaction?: RawMessageDataInteraction;
    components?: RawMessageComponentData[];
}