import { ThreadChannelType } from "../../../../internal";

export interface RawThreadDeleteData {
    id: string;
    type: ThreadChannelType;
    guild_id: string;
    parent_id: string;
}