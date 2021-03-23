export default interface RawReactionData {
    count: number;
    me: boolean;
    emoji: RawReactionDataEmoji;
}

export interface RawReactionDataEmoji {
    id: string | null;
    name: string | null;
    animated?: boolean;
}

export interface RawReactionMetadata {
    messageID: string;
    channelID: string;
    guildID?: string | null;
}