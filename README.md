# Aeracord

[Aeracord](https://aeracord.apixel.me) is a lightweight library for the Discord API. Aeracord's main purpose is to give you control over how objects are cached.

---

# Installation

Aeracord can be installed from [NPM](https://npmjs.com/package/aeracord). You can install it with the NPM CLI tool or with Yarn. Aeracord has TypeScript support built in.

NPM:
```
npm install aeracord
```

Yarn:
```
yarn add aeracord
```

Once installed, you can import it into your project as usual:

```js
// CommonJS
const aeracord = require("aeracord");

// or ES6 imports
import aeracord from "aeracord";
```

Or if you'd prefer, you can destruct the imports:

```js
// CommonJS
const { Client, Guild, User, ... } = require("aeracord");

// or ES6 imports
import { Client, Guild, User, ... } from "aeracord";
```

---

# Connecting to the Gateway

To connect to the gateway, you need to construct a new [Client](https://aeracord.apixel.me/docs/classes/Client):

```js
import { Client, ACTIVITY_TYPE_PLAYING } from "aeracord";

// Create client
const client = new Client({
    token: process.env.TOKEN,
    presence: {
        activities: [{
            name: "say /help",
            type: ACTIVITY_TYPE_PLAYING
        }]
    },
    membersIntent: true,
    presencesIntent: true
});
```

Before interacting with the API, you need to wait for the [`ready` event](https://aeracord.apixel.me/docs/classes/Client#ready). This event is fired when the client has connected to the gateway:

```js
// Ready
client.on("ready", (data) => {

    // Log
    console.log("Bot online");
});
```

You can also listen for various other [events](https://aeracord.apixel.me/docs/classes/Client#events), such as the [`interactionCreate` event](https://aeracord.apixel.me/docs/classes/Client#interactionCreate) for when a slash command is used. This event will always have the `data` parameter, but the `interaction` might not be defined. You can learn more about this in the [caching guide](https://aeracord.apixel.me/guides/caching). Here's how you can respond to an interaction with the `interaction` object:

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

Or, you can use the `data` parameter:

```js
// Interaction create
client.on("interactionCreate", (data) => {

    // Ping
    if (data.data.name === "ping") {

        // Respond
        client.createInteractionResponse(data.id, data.token, {
            type: INTERACTION_RESPONSE_TYPE_MESSAGE,
            data: {
                content: "Pong!"
            }
        });
    }
});
```

---

# Issue Tracker

You can report bugs and suggest features by [opening an issue](https://github.com/aeracord/aeracord/issues/new). Please check to make sure that an issue for the bug or feature you're reporting doesn't already exist.

---

# Contributing

Contributing guidelines will be available soon.