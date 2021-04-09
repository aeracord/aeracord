import { Client, Command, CommandData, RawReadyData, RawReadyDataGuild, ReadyData, READY_STATE_INITIAL_GUILDS } from "../../../../internal";
import { EventQueueEvent } from "../../Client";
import event from "../../event";

export default async function ready(client: Client, rawData: RawReadyData) {

    // Parse data
    const data: ReadyData = {
        apiVersion: rawData.v,
        user: {
            username: rawData.user.username,
            id: rawData.user.id,
            flags: rawData.user.flags || 0,
            discriminator: rawData.user.discriminator,
            avatar: rawData.user.avatar
        },
        sessionID: rawData.session_id,
        availableGuilds: [],
        unavailableGuilds: [],
        application: rawData.application
    };

    // Set client data
    client.id = data.user.id;
    client.username = data.user.username;
    client.discriminator = data.user.discriminator;
    client.avatar = data.user.avatar;
    client._sessionID = data.sessionID;

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
        const commands: CommandData[] | void = await client.getGlobalCommands().catch(() => { });

        // Loop through commands
        if (commands) commands.forEach((c: CommandData) => Command.fromData(client, c));
    }

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
}