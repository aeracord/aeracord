import { RawUserData } from "../rawUserData";

export interface RawReadyData {
    v: number;
    user: RawUserData;
    session_id: string;
    guilds: RawReadyDataGuild[];
    application: RawReadyDataApplication;
}

export interface RawReadyDataGuild {
    id: string;
}

export interface RawReadyDataApplication {
    id: string;
    flags: number;
}