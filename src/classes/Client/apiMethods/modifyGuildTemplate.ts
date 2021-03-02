import { Client, FetchQueue, Guild, GuildResolvable, RawTemplateData, Template, TemplateResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildTemplateData {
    name?: string;
    description?: string;
}

export default async function modifyGuildTemplate(client: Client, guildResolvable: GuildResolvable, templateResolvable: TemplateResolvable, modifyGuildTemplateData: ModifyGuildTemplateData): Promise<Template> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);
    const templateCode: string = Template.resolveCode(templateResolvable);

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

    // Parse template
    const template: Template = Template._fromRawData(client, result);

    // Return
    return template;
}