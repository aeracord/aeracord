export interface RawReadyData {
    v: number;
    user: RawReadyDataUser;
    session_id: string;
    guilds: RawReadyDataGuild[];
    application: RawReadyDataApplication;
}

export interface RawReadyDataUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    flags?: number;
}

export interface RawReadyDataGuild {
    id: string;
}

export interface RawReadyDataApplication {
    id: string;
    flags: number;
}