import { CommandOptionType, CommandType } from "../../internal";

export interface RawCommandData {
    id: string;
    application_id: string;
    name: string;
    type?: CommandType;
    description: string;
    options?: RawCommandDataOption[];
    default_permission: boolean;
}

export interface RawCommandDataOption {
    type: CommandOptionType;
    name: string;
    description: string;
    required?: boolean;
    choices?: RawCommandDataChoice[];
    options?: RawCommandDataOption[];
}

export interface RawCommandDataChoice {
    name: string;
    value: string | number;
}