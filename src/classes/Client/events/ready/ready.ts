import { Client, Command, RawReadyData, RawReadyDataGuild, ReadyData, READY_STATE_INITIAL_GUILDS, User } from "../../../../internal";
import { EventQueueEvent } from "../../Client";
import event from "../../event";
import readyEvent from "../ready";

export default async function ready(client: Client, rawData: RawReadyData) {

    // Parse data
    const data: ReadyData = {
        availableGuilds: [],
        unavailableGuilds: [],
        application: rawData.application
    };

    // Set client data
    client.user = User._dataFromRawData(rawData.user);
    client._sessionID = rawData.session_id;

    // Set ready data
    client._readyData = { data, rawData };

    // Set uninitialized guilds
    client._uninitializedGuilds = new Set(rawData.guilds.map((g: RawReadyDataGuild) => g.id));

    // Create command objects for global commands
    if (

        // If the initial cache is `true`, all commands should be cached
        client._cacheStrategies.objects.commands?.initialCache === true ||

        (

            // If the initial cache is defined
            client._cacheStrategies.objects.commands?.initialCache &&

            // And global commands need to be cached
            client._cacheStrategies.objects.commands.initialCache.global
        )
    ) {

        // Get commands
        const commands: Command[] | void = await client.getGlobalCommands().catch(() => { });

        // Loop through commands
        if (commands) commands.forEach((c: Command) => c.cache());
    }

    // Bulk overwrite the bot's commands
    if (client._initialCommands) {

        // Bulk overwrite the bot's global commands
        if (client._initialCommands.global) await client.bulkOverwriteGlobalCommands(client._initialCommands.commands);

        // Bulk overwrite the bot's commands in guilds
        if (client._initialCommands.guilds) for (let id of client._initialCommands.guilds) {
            await client.bulkOverwriteGuildCommands(id, client._initialCommands.commands);
        }
    }
    delete client._initialCommands;

    /**
     * Set Ready State
     *
     * Set the ready state to allow guild create and delete events
     */
    client._readyState = READY_STATE_INITIAL_GUILDS;

    // Get queued initial guild events
    const initialGuildEvents: EventQueueEvent[] = client._eventQueue.filter((e: EventQueueEvent) => ((e.type === "GUILD_CREATE") || (e.type === "GUILD_DELETE")) && (client._uninitializedGuilds.has(e.data.id)));

    // Process queued initial guild events
    initialGuildEvents.forEach((e: EventQueueEvent) => event(client, e.type, e.data));
    client._eventQueue = client._eventQueue.filter((e: EventQueueEvent) => ((e.type !== "GUILD_CREATE") && (e.type !== "GUILD_DELETE")) || (!client._uninitializedGuilds.has(e.data.id)));

    // If there arent any uninitialized guilds, fire the ready event
    if (client._uninitializedGuilds.size === 0) readyEvent(client);
}