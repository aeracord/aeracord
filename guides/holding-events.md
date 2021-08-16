# Holding Events

Holding events can be useful if your bot needs to perform an asynchronous task after the [`ready` event](https://aeracord.apixel.me/docs/classes/Client#ready) is sent. Holding events will store events in memory until [`Client.releaseEvents()`](https://aeracord.apixel.me/docs/classes/Client#releaseEvents) is called, preventing your application from processing events before it gets a chance to initialize data.

---

# How to Enable Holding Events

To hold events, we can use the [`ClientData.holdEvents`](https://aeracord.apixel.me/docs/interfaces/ClientData#holdEvents) property when constructing the client:

```js
import { Client, HoldEventsTypes } from "aeracord";

// Create client
const client = new Client({
    ...
    holdEvents: HoldEventsTypes.EMIT
});
```

Then, we can perform asynchronous tasks in the [`ready` event](https://aeracord.apixel.me/docs/classes/Client#ready):

```js
// Ready
client.on("ready", async (data) => {

    // Perform an async task
    await doSomething();

    // Release events
    client.releaseEvents();
});
```

Once the [`Client.releaseEvents()`](https://aeracord.apixel.me/docs/classes/Client#releaseEvents) function is called, any events that the gateway emitted while the bot was performing the asynchronous tasks will be emitted to the client.

This can be useful if you need to initialize data before being able to handle events.

---

## Discarding Events

If your bot doesn't need to process the held events, we can simply tell the client to discard them instead of storing them in memory:

```js
import { Client, HoldEventsTypes } from "aeracord";

// Create client
const client = new Client({
    ...
    holdEvents: HoldEventsTypes.DISCARD
});
```