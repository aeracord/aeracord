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
import { ActivityTypes, Client } from "aeracord";

// Create client
const client = new Client({
    token: process.env.TOKEN,
    presence: {
        activities: [{
            name: "say /help",
            type: ActivityTypes.PLAYING
        }]
    },
    membersIntent: true,
    presencesIntent: true
});

// Event listeners
...

// Connect to the gateway
client.connect();
```

Before interacting with the API, you need to wait for the [`ready` event](https://aeracord.apixel.me/docs/classes/Client#ready). This event is fired when the client has connected to the gateway:

```js
// Ready
client.on("ready", (data) => {

    // Log
    console.log("Bot online");
});
```

You can also listen for various other [events](https://aeracord.apixel.me/docs/classes/Client#events), such as the [`interactionCreate` event](https://aeracord.apixel.me/docs/classes/Client#interactionCreate) for when an interaction is created:

```js
// Interaction create
client.on("interactionCreate", (interaction) => {

    // Ping
    if (interaction.data.name === "ping") {

        // Respond
        interaction.respond("Pong!");
    }
});
```

---

# Other Guides

We recommend learning about how you can control what the client caches with the [caching guide](https://aeracord.apixel.me/guides/caching) as well as how you can use Aeracord's different ways of modeling data with the [Data Models](https://aeracord.apixel.me/guides/data-models) guide.