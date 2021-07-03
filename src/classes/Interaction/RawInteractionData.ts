import { ComponentType, InteractionType, RawMemberData, RawMessageData, RawUserData } from "../../internal";

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
    options?: RawInteractionMetadataOption[];
    component_type?: ComponentType;
    custom_id?: string;
    values?: string[];
}

export interface RawInteractionMetadataOption {
    name: string;
    value?: string | number;
    options?: RawInteractionMetadataOption[];
}

export interface RawInteractionDataMember extends RawMemberData {
    permissions: string;
}