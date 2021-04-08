export interface RawMessageDeleteBulkData {
    ids: string[];
    channel_id: string;
    guild_id?: string;
}