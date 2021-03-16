import { Client, FetchQueue, Guild, GuildData, RawGuildData, Template, TemplateResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateGuildFromTemplateData {
    name: string;
    icon?: string;
}

export default async function createGuildFromTemplate(client: Client, templateResolvable: TemplateResolvable, createGuildFromTemplateData: CreateGuildFromTemplateData): Promise<GuildData> {

    // Resolve objects
    const templateCode: string | undefined = Template.resolveCode(templateResolvable);
    if (!templateCode) throw new Error("Invalid template resolvable");

    // Define fetch data
    const path: string = `/guilds/templates/${templateCode}`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawGuildData = await fetchQueue.request({
        path,
        method,
        data: {
            name: createGuildFromTemplateData.name,
            icon: createGuildFromTemplateData.icon
        }
    });

    // Parse guild data
    const guildData: GuildData = Guild._fromRawData(result);

    // Return
    return guildData;
}