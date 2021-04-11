import { GuildChannelType, InteractionType, MessageActivityType, MessageType, RawAttachmentData, RawEmbedData, RawReactionData, RawStickerData, RawUserlessMemberData, RawUserData, RawUserWithMemberData } from "../../internal";

export interface RawMessageData {
    id: string;
    type: MessageType;
    channel_id: string;
    guild_id?: string;
    author: RawUserData | RawMessageDataWebhook;
    member?: RawUserlessMemberData;
    content: string;
    timestamp: string;
    edited_timestamp: string | null;
    tts: boolean;
    mention_everyone: boolean;
    mentions: RawUserWithMemberData[];
    mention_roles: string[];
    mention_channels?: RawMessageDataChannelMention[];
    attachments: RawAttachmentData[];
    embeds: RawEmbedData[];
    stickers?: RawStickerData[];
    reactions?: RawReactionData[];
    nonce?: string | number;
    pinned: boolean;
    webhook_id?: string;
    activity?: RawMessageDataActivity;
    application?: RawMessageDataApplication;
    message_reference?: RawMessageDataMessageReference;
    flags?: number;
    referenced_message?: RawMessageData | null;
    interaction?: RawMessageDataInteraction;
}

export interface RawMessageDataWebhook {
    id: string;
    username: string;
    avatar: string | null;
}

export interface RawMessageDataChannelMention {
    id: string;
    guild_id: string;
    type: GuildChannelType;
    name: string;
}

export interface RawMessageDataActivity {
    type: MessageActivityType;
    party_id?: string;
}

export interface RawMessageDataApplication {
    id: string;
    name: string;
    description: string;
    icon: string | null;
    cover_image?: string;
}

export interface RawMessageDataMessageReference {
    message_id?: string;
    channel_id: string;
    guild_id?: string;
}

export interface RawMessageDataInteraction {
    id: string;
    type: InteractionType;
    name: string;
    user: RawUserData;
}