import { Client, FetchQueue, Guild, GuildResolvable, RawTemplateData, Template, TemplateData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildTemplates(client: Client, guildResolvable: GuildResolvable): Promise<TemplateData[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_GUILD", guildID))) throw new Error("Missing manage guild permissions");

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
    const templates: TemplateData[] = result.map((t: RawTemplateData) => Template._fromRawData(client, t));

    // Return
    return templates;
}