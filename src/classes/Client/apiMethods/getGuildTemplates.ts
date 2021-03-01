import { Client, FetchQueue, Guild, GuildResolvable, RawTemplateData, Template } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildTemplates(client: Client, guildResolvable: GuildResolvable): Promise<Template[]> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/templates`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawTemplateData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse templates
    const templates: Template[] = result.map((t: RawTemplateData) => Template._fromRawData(client, t));

    // Return
    return templates;
}