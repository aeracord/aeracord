# Interactions

[`Interaction`](https://aeracord.pranav.page/docs/classes/Interaction)s are a way for your bot to have commands that users can easily use. You can define your bot's global commands when creating a client:

```js
// Create client
const client = new Client({
    globalCommands: [
        {
            name: "ping",
            description: "Ping the bot"
        }
    ],
    ...
});
```

You can also get and modify your bot's commands with some methods:

- [`Client.getGlobalCommand()`](https://aeracord.pranav.page/docs/classes/Client#getGlobalCommand) - Get a global command
- [`Client.getGlobalCommands()`](https://aeracord.pranav.page/docs/classes/Client#getGlobalCommands) - Get the bot's global commands
- [`Client.createGlobalCommand()`](https://aeracord.pranav.page/docs/classes/Client#createGlobalCommand) - Create a global command
- [`Client.editGlobalCommand()`](https://aeracord.pranav.page/docs/classes/Client#editGlobalCommand) - Edit a global command
- [`Client.deleteGlobalCommand()`](https://aeracord.pranav.page/docs/classes/Client#deleteGlobalCommand) - Delete a global command
- [`Client.bulkOverwriteGlobalCommands()`](https://aeracord.pranav.page/docs/classes/Client#bulkOverwriteGlobalCommands) - Bulk edit the bot's global commands
- [`Client.getGuildCommand()`](https://aeracord.pranav.page/docs/classes/Client#getGuildCommand) - Get a guild command
- [`Client.getGuildCommands()`](https://aeracord.pranav.page/docs/classes/Client#getGuildCommands) - Get the commands in a guild
- [`Client.createGuildCommand()`](https://aeracord.pranav.page/docs/classes/Client#createGuildCommand) - Create a guild command
- [`Client.editGuildCommand()`](https://aeracord.pranav.page/docs/classes/Client#editGuildCommand) - Edit a guild command
- [`Client.deleteGuildCommand()`](https://aeracord.pranav.page/docs/classes/Client#deleteGuildCommand) - Delete a guild command
- [`Client.bulkOverwriteGuildCommands()`](https://aeracord.pranav.page/docs/classes/Client#bulkOverwriteGuildCommands) - Bulk edit the commands in a guild

---

# Receiving Interactions

You can receive interactions with the [`interactionCreate` event](https://aeracord.pranav.page/docs/classes/Client#interactionCreate). Here's a basic example of receiving an interaction and responding to it:

```js
// Interaction create
client.on("interactionCreate", (data, { interaction }) => {

    // Ping
    if (interaction.data.name === "ping") {

        // Respond
        interaction.respond("Pong!");
    }
});
```

You can learn more about interactions in the [docs](https://aeracord.pranav.page/docs/classes/Interaction).