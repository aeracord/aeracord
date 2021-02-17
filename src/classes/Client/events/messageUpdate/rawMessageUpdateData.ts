import { MessageType } from "../../../../internal";
import { RawAttachmentData } from "../rawAttachmentData";
import { RawEmbedData } from "../rawEmbedData";
import { RawUserlessMemberData } from "../rawMemberData";
import { RawMessageData, RawMessageDataActivity, RawMessageDataApplication, RawMessageDataChannelMention, RawMessageDataMessageReference } from "../rawMessageData";
import { RawReactionData } from "../rawReactionData";
import { RawStickerData } from "../rawStickerData";
import { RawUserData, RawUserWithMemberData } from "../rawUserData";
import { RawWebhookData } from "../rawWebhookData";

export interface RawMessageUpdateData {
    id: string;
    type?: MessageType;
    channel_id: string;
    guild_id?: string;
    author?: RawUserData | RawWebhookData;
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
    embeds?: RawEmbedData[];
    stickers?: RawStickerData[];
    reactions?: RawReactionData[];
    nonce?: string | number;
    pinned?: boolean;
    webhook_id?: string;
    activity?: RawMessageDataActivity;
    application?: RawMessageDataApplication;
    message_reference?: RawMessageDataMessageReference;
    flags?: number;
    referenced_message?: RawMessageData | null;
}