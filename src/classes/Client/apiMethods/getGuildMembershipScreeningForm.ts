import { Client, FetchQueue, Guild, GuildMembershipScreeningForm, GuildResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseGuildMembershipScreeningForm from "../events/parseGuildMembershipScreeningForm";
import { RawGuildMembershipScreeningFormData } from "../events/rawGuildMembershipScreeningFormData";

export default async function getGuildMembershipScreeningForm(client: Client, guildResolvable: GuildResolvable): Promise<GuildMembershipScreeningForm> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/member-verification`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawGuildMembershipScreeningFormData = await fetchQueue.request({
        path,
        method
    });

    // Parse guild membership screening form
    const guildMembershipScreeningForm: GuildMembershipScreeningForm = parseGuildMembershipScreeningForm(result);

    // Return
    return guildMembershipScreeningForm;
}