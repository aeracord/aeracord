import { Ban, BanData, Client } from "../../internal";

export default function fromRawData(client: Client, banData: BanData): Ban {

    // Create ban
    const ban: Ban = new Ban(client, banData);

    // Return
    return ban;
}