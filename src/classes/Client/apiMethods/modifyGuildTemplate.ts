import { Client, FetchQueue, Guild, GuildResolvable, RawTemplateData, Template, TemplateData, TemplateResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildTemplateData {
    name?: string;
    description?: string;
}

export default async function modifyGuildTemplate(client: Client, guildResolvable: GuildResolvable, templateResolvable: TemplateResolvable, modifyGuildTemplateData: ModifyGuildTemplateData): Promise<TemplateData> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const templateCode: string | undefined = Template.resolveCode(templateResolvable);
    if (!templateCode) throw new Error("Invalid template resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_GUILD", guildID))) throw new Error("Missing manage guild permissions");

    // Define fetch data
    const path: string = `/guilds/${guildID}/templates/${templateCode}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawTemplateData = await fetchQueue.request({
        path,
        method,
        data: {
            name: modifyGuildTemplateData.name,
            description: modifyGuildTemplateData.description
        }
    });

    // Parse template data
    const templateData: TemplateData = Template._fromRawData(client, result);

    // Return
    return templateData;
}