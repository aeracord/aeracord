import { ChannelType, CommandType, ComponentType, InteractionType, RawChannelDataThreadMetadata, RawMemberData, RawMessageData, RawRoleData, RawUserlessMemberData, RawUserData } from "../../internal";

export interface RawInteractionData {
    id: string;
    type: InteractionType;
    token: string;
    application_id: string;
    data: RawInteractionMetadata;
    guild_id?: string;
    channel_id: string;
    member?: RawInteractionDataMember;
    user?: RawUserData;
    message?: RawMessageData;
}

export interface RawInteractionMetadata {
    id?: string;
    name?: string;
    type?: CommandType;
    resolved?: RawInteractionResolvedData;
    options?: RawInteractionMetadataOption[];
    component_type?: ComponentType;
    custom_id?: string;
    values?: string[];
    target_id?: string;
}

export interface RawInteractionResolvedData {
    users?: {
        [key: string]: RawUserData;
    };
    members?: {
        [key: string]: RawUserlessMemberData;
    };
    roles?: {
        [key: string]: RawRoleData;
    };
    channels?: {
        [key: string]: RawResolvedChannel;
    };
    messages?: {
        [key: string]: RawMessageData;
    };
}

export interface RawResolvedChannel {
    id: string;
    type: ChannelType;
    name: string;
    permissions: string;
    parent_id: string | null;
    thread_metadata?: RawChannelDataThreadMetadata;
}

export interface RawInteractionMetadataOption {
    name: string;
    value?: string | number;
    options?: RawInteractionMetadataOption[];
}

export interface RawInteractionDataMember extends RawMemberData {
    permissions: string;
}