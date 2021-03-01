import { Client, FetchQueue, RawTemplateData, Template, TemplateResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getTemplate(client: Client, templateResolvable: TemplateResolvable): Promise<Template> {

    // Resolve objects
    const templateCode: string = Template.resolveCode(templateResolvable);

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

    // Parse template
    const template: Template = Template._fromRawData(client, result);

    // Return
    return template;
}