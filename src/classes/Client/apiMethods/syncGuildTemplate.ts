import { Client, FetchQueue, Guild, GuildResolvable, RawTemplateData, Template, TemplateResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function syncGuildTemplate(client: Client, guildResolvable: GuildResolvable, templateResolvable: TemplateResolvable): Promise<Template> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);
    const templateCode: string = Template.resolveCode(templateResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/templates/${templateCode}`;
    const method: string = "PUT";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawTemplateData = await fetchQueue.request({
        path,
        method
    });

    // Parse template
    const template: Template = Template._fromRawData(client, result);

    // Return
    return template;
}