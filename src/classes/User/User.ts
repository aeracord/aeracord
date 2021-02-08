import { Client } from "../../internal";

export interface UserData {
    id: string;
}

export type PremiumType = typeof PREMIUM_TYPE_NONE | typeof PREMIUM_TYPE_NITRO_CLASSIC | typeof PREMIUM_TYPE_NITRO;
export const PREMIUM_TYPE_NONE = 0;
export const PREMIUM_TYPE_NITRO_CLASSIC = 1;
export const PREMIUM_TYPE_NITRO = 2;

export default class User {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * ID
     *
     * The user's ID
     */
    id: string;

    /**
     * User
     *
     * @param client The client
     * @param userData Options to initialize this user with
     * @param userData.id The user's ID
     */
    constructor(client: Client, userData: UserData) {

        // Set data
        this.client = client;
        this.id = userData.id;
    }

    /**
     * Debug
     *
     * Log debug info
     *
     * @param info Debug info to log
     */
    _debug = (info: string) => this.client._debug(info);
}