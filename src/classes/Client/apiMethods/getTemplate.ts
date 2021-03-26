import { Client, FetchQueue, RawTemplateData, Template, TemplateData, TemplateResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getTemplate(client: Client, templateResolvable: TemplateResolvable): Promise<TemplateData> {

    // Resolve objects
    const templateCode: string | undefined = Template.resolveCode(templateResolvable);
    if (!templateCode) throw new Error("Invalid template resolvable");

    // Define fetch data
    const path: string = `/guilds/templates/${templateCode}`;
    const method: string = "GET";
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