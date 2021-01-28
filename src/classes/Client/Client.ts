// import name from "./name";

export interface ClientData {
    token: string;
}

export default class Client {

    /**
     * Token
     *
     * The client's token
     */
    token: string;

    /**
     * Client
     *
     * @param clientData Options to initialize this client with
     * @param clientData.token The client's token
     */
    constructor(clientData: ClientData) {

        // Set data
        this.token = clientData.token;
    }
}