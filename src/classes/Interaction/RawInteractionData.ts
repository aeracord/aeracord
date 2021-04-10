import { InteractionType, RawMemberData, RawUserData } from "../../internal";

export interface RawInteractionData {
    id: string;
    type: InteractionType;
    token: string;
    application_id: string;
    data: RawInteractionDataCommand;
    guild_id?: string;
    channel_id: string;
    member?: RawInteractionDataMember;
    user?: RawUserData;
}

export interface RawInteractionDataCommand {
    id: string;
    name: string;
    options?: RawInteractionDataCommandOption[];
}

export interface RawInteractionDataCommandOption {
    name: string;
    value?: string | number;
    options?: RawInteractionDataCommandOption[];
}

export interface RawInteractionDataMember extends RawMemberData {
    permissions: string;
}