export default interface RawWelcomeScreenData {
    description: string | null;
    welcome_channels: RawWelcomeScreenDataChannel[];
}

export interface RawWelcomeScreenDataChannel {
    channel_id: string;
    description: string;
    emoji_id: string | null;
    emoji_name: string | null;
}