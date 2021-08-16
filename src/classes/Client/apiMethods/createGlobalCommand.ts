import { Client, Command, CommandChoice, CommandOptionType, CommandTypes, ContextMenuCommandType, FetchQueue, RawCommandData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export type CreateCommandData = CreateChatInputCommandData | CreateContextMenuCommandData;

export interface BaseCreateCommandData {
    name: string;
    defaultPermission?: boolean;
}

export interface CreateChatInputCommandData extends BaseCreateCommandData {
    type: typeof CommandTypes.CHAT_INPUT;
    description: string;
    options?: CreateCommandDataOption[];
}

export interface CreateContextMenuCommandData extends BaseCreateCommandData {
    type: ContextMenuCommandType;
}

export interface CreateCommandDataOption {
    name: string;
    description: string;
    type: CommandOptionType;
    required?: boolean;
    choices?: CommandChoice[];
    options?: CreateCommandDataOption[];
}

export default async function createGlobalCommand(client: Client, createCommandData: CreateCommandData): Promise<Command> {

    // Define fetch data
    const path: string = `/applications/${client.id}/commands`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawCommandData = await fetchQueue.request({
        path,
        method,
        data: {
            name: createCommandData.name,
            type: createCommandData.type,
            description: createCommandData.type === CommandTypes.CHAT_INPUT ? createCommandData.description : undefined,
            options: createCommandData.type === CommandTypes.CHAT_INPUT ? createCommandData.options : undefined,
            default_permission: createCommandData.defaultPermission
        }
    });

    // Parse command
    const command: Command = Command._fromRawData(client, result);

    // Return
    return command;
}