import { RawMemberData } from "../../internal";

export default interface RawVoiceStateData {
    guild_id: string;
    channel_id: string;
    user_id: string;
    member: RawMemberData;
    session_id: string;
    mute: boolean;
    deaf: boolean;
    self_mute: boolean;
    self_deaf: boolean;
    self_stream?: boolean;
    self_video: boolean;
    suppress: boolean;
}