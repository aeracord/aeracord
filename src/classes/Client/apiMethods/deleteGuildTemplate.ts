import { Client, FetchQueue, Guild, GuildResolvable, RawTemplateData, Template, TemplateData, TemplateResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteGuildTemplate(client: Client, guildResolvable: GuildResolvable, templateResolvable: TemplateResolvable): Promise<TemplateData> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const templateCode: string | undefined = Template.resolveCode(templateResolvable);
    if (!templateCode) throw new Error("Invalid template resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/templates/${templateCode}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawTemplateData = await fetchQueue.request({
        path,
        method
    });

    // Parse template data
    const templateData: TemplateData = Template._fromRawData(client, result);

    // Return
    return templateData;
}