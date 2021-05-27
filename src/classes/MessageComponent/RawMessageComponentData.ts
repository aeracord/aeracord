import { ButtonStyle, ComponentType } from "../../internal";

export interface RawMessageComponentData {
    type: ComponentType;
    components?: RawMessageComponentData[];
    style?: ButtonStyle;
    label?: string;
    emoji?: RawMessageComponentDataEmoji;
    custom_id?: string;
    url?: string;
    disabled?: boolean;
}

export interface RawMessageComponentDataEmoji {
    id: string | null;
    name: string | null;
    animated?: boolean;
}

export interface RawMessageComponentMetadata {
    messageID: string;
    channelID: string;
    guildID?: string | null;
}