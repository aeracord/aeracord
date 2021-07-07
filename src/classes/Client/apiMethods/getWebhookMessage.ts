import { APIError, Client, FetchQueue, Message, MessageResolvable, RawMessageData, Webhook, WebhookResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getWebhookMessage(client: Client, webhookResolvable: WebhookResolvable, webhookToken: string, messageResolvable: MessageResolvable): Promise<Message | undefined> {

    // Resolve objects
    const webhookID: string | undefined = Webhook.resolveID(webhookResolvable);
    if (!webhookID) throw new Error("Invalid webhook resolvable");
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");

    // Define fetch data
    const path: string = `/webhooks/${webhookID}/${webhookToken}/messages/${messageID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    let unknownMessage: boolean = false;
    const result: RawMessageData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown message
        if (
            err.code === 10008 ||
            err.errors?.webhook_id?._errors?.[0]?.code === "NUMBER_TYPE_COERCE" ||
            err.errors?.message_id?._errors?.[0]?.code === "NUMBER_TYPE_COERCE"
        ) unknownMessage = true;

        // Throw error
        else throw err;
    });

    // Unknown message
    if (unknownMessage) return;

    // Parse message
    const message: Message = Message._fromRawData(client, result);

    // Return
    return message;
}