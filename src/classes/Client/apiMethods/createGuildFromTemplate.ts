import { Client, FetchQueue, Guild, RawGuildData, Template, TemplateResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateGuildFromTemplateData {
    name: string;
    icon?: string;
}

export default async function createGuildFromTemplate(client: Client, templateResolvable: TemplateResolvable, createGuildFromTemplateData: CreateGuildFromTemplateData): Promise<Guild> {

    // Resolve objects
    const templateCode: string = Template.resolveCode(templateResolvable);

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

    // Parse guild
    const guild: Guild = Guild._fromRawData(client, result);

    // Return
    return guild;
}