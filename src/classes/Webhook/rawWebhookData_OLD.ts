import { RawUserData, WebhookType } from "../../internal";

export interface RawWebhookData {
    id: string;
    type: WebhookType;
    guild_id: string;
    channel_id: string;
    name: string;
    avatar: string | null;
    user: RawUserData;
    token?: string;
    application_id: string | null;
}