import { Client, FetchQueue, Guild, GuildResolvable, RawTemplateData, Template } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateGuildTemplateData {
    name: string;
    description?: string;
}

export default async function createGuildTemplate(client: Client, guildResolvable: GuildResolvable, createGuildTemplateData: CreateGuildTemplateData): Promise<Template> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_GUILD", guildID))) throw new Error("Missing manage guild permissions");

    // Define fetch data
    const path: string = `/guilds/${guildID}/templates`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawTemplateData = await fetchQueue.request({
        path,
        method,
        data: {
            name: createGuildTemplateData.name,
            description: createGuildTemplateData.description
        }
    });

    // Parse template
    const template: Template = Template._fromRawData(client, result);

    // Return
    return template;
}