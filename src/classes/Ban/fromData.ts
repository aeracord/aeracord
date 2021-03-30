import { Ban, BanData, Client } from "../../internal";

export default function fromData(client: Client, banData: BanData): Ban {

    // Update cached ban
    let ban: Ban | undefined = Ban._updateObjectFromData(client, banData);

    // Create ban
    if (!ban) ban = new Ban(client, banData);

    // Return
    return ban;
}