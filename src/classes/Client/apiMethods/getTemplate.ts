import { APIError, Client, FetchQueue, RawTemplateData, Template, TemplateResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getTemplate(client: Client, templateResolvable: TemplateResolvable): Promise<Template | undefined> {

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
    let unknownTemplate: boolean = false;
    const result: RawTemplateData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown template
        if (err.code === 10057) unknownTemplate = true;

        // Throw error
        else throw err;
    });

    // Unknown template
    if (unknownTemplate) return;

    // Parse template
    const template: Template = Template._fromRawData(client, result);

    // Return
    return template;
}