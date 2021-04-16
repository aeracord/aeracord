# Data Models

When making calls to the Discord API and recieving [events](https://aeracord.apixel.me/docs/classes/Client#events), you can send and recieve one of two types of objects: simple objects and classes. For example, when you recieve the [`interactionCreate` event](https://aeracord.apixel.me/docs/classes/Client#interactionCreate), there will always be a `data` parameter with an [`InteractionData`](https://aeracord.apixel.me/docs/interfaces/InteractionData) object. However, if the interaction is cached, you'll also get the [`Interaction`](https://aeracord.apixel.me/docs/classes/Interaction) object:

```js
// Interaction create
client.on("interactionCreate", (data, { interaction }) => { ... });
```

The [`InteractionData`](https://aeracord.apixel.me/docs/interfaces/InteractionData) object is a regular object with properties for the interaction's ID, token, etc. The [`Interaction`](https://aeracord.apixel.me/docs/classes/Interaction) object is a class instance with similar properties as well as some useful methods. For example, you can use the [`Interaction.respond`](https://aeracord.apixel.me/docs/classes/Interaction#respond) method to respond to an interaction:

```js
// Respond
interaction.respond("Pong!");
```

To do the same thing with an [`InteractionData`](https://aeracord.apixel.me/docs/interfaces/InteractionData) object, you'd need to use the [`Client.createInteractionResponse`](https://aeracord.apixel.me/docs/classes/Client#createInteractionResponse) method:

```js
// Respond
client.createInteractionResponse(data.id, data.token, {
    type: INTERACTION_RESPONSE_TYPE_MESSAGE,
    data: {
        content: "Pong!"
    }
});
```

Although the first example is simpler, the `InteractionData` object can be a better option if you don't want the interaction to be cached. You can learn more about caching with the [caching guide](https://aeracord.apixel.me/guides/caching).