# Caching

Aeracord aims to be flexible about what objects are cached and for how long they stay cached. When creating a client, you can specify cache strategies:

```js
// Create client
const client = new Client({
    cacheStrategies: {
        objects: ObjectCacheStrategies,
        permissions: { ... }
    }
});
```

## Objects

The [`ObjectCacheStrategies`](https://aeracord.apixel.me/docs/interfaces/ObjectCacheStrategies) object takes the type of object as a key:

- `commands`
- `bans`
- `channels`
- `emojis`
- `guilds`
- `guildWidgets`
- `interactions`
- `invites`
- `members`
- `messages`
- `presences`
- `roles`
- `templates`
- `vanityInvites`
- `webhooks`
- `welcomeScreens`
- `users`

And either a [`CacheStrategy`](https://aeracord.apixel.me/docs/interfaces/CacheStrategy) object or a boolean as the value:

```js
{
    cacheFor?: number | null;
    cacheDeletedFor?: number | null;
    garbageCollectionInterval?: number | null;
    cacheAll?: boolean;
    initialCache?: InitialCacheType;
}
```

`cacheFor` is the amount of time in milliseconds to keep the object cached. `undefined` will use the default of `60000` (1 minute), and `null` can be used if the object should never expire from cache. The same values can be used for `cacheDeletedFor`, except this will apply to deleted objects. For example, you can specify how long a channel should stay cached after it's deleted.

The `garbageCollectionInterval` is the interval in milliseconds for garbage collecting cached objects. `undefined` will use the default of `60000` (1 minute), and `null` can be used if the objects should never be garbage collected.

`cacheAll` can be set to `true` to automatically cache all objects.

`initialCache` can be used to cache certain objects when the client connects to the gateway. The [`ready` event](https://aeracord.apixel.me/docs/classes/Client#ready) will fire after these objects are cached. The [`InitialCacheType`](https://aeracord.apixel.me/docs/interfaces/InitialCacheType) object depends on the object (ie. `guilds`, `channels`, `users`, etc).

### IDs

An [`InitialCacheTypeIDs`](https://aeracord.apixel.me/docs/interfaces/InitialCacheTypeIDs) object is an array of IDs. The following objects use an `InitialCacheTypeIDs` object:

- `guilds`
- `guildWidgets`
- `presences`
- `vanityInvites`
- `welcomeScreens`
- `users`

For example, for the `guilds` objects, you can specify guild IDs. Note that `guildWidgets`, `vanityInvites`, and `welcomeScreens` use guild IDs and `presences` use user IDs.

### Guilds

An [`InitialCacheTypeGuilds`](https://aeracord.apixel.me/docs/interfaces/InitialCacheTypeGuilds) object is used to cache objects from guilds. The following objects use an `InitialCacheTypeGuilds` object:

- `bans`
- `channels`
- `emojis`
- `members`
- `roles`
- `templates`

An `InitialCacheTypeGuilds` object could look like this:

```js
{
    ids?: string[];
    guilds?: string[];
}
```

`ids` is an array of IDs. For example, for the `channels` objects, you can specify channel IDs. `guilds` is an array of guild IDs. For example, you might want to cache all the channels in specific guilds.

### Channels

An [`InitialCacheTypeChannels`](https://aeracord.apixel.me/docs/interfaces/InitialCacheTypeChannels) object is used to cache objects from channels. The following objects use an `InitialCacheTypeChannels` object:

- `invites`
- `webhooks`

An `InitialCacheTypeChannels` object could look like this:

```js
{
    ids?: string[];
    channels?: string[];
    guilds?: string[];
}
```

`ids` and `guilds` works the same way as an `InitialCacheTypeGuilds` object, and the `channels` property is an array of channel IDs. For example, you might want to cache all the webhooks in specific channels.

### Messages

An [`InitialCacheTypeMessages`](https://aeracord.apixel.me/docs/interfaces/InitialCacheTypeMessages) object is used to cache `messages` objects. An `InitialCacheTypeMessages` object could look like this:

```js
{
    ids?: string[];
    channels?: string[];
    guilds?: string[];
    count?: number;
}
```

`ids`, `channels`, and `guilds` works the same way as an `InitialCacheTypeChannels` object, and the `count` property is the amount of messages to fetch from channels. For example, you might want to cache the 10 most recent messages in the guilds and channels specified.

### Commands

An [`InitialCacheTypeCommands`](https://aeracord.apixel.me/docs/interfaces/InitialCacheTypeCommands) object is used to cache `commands` objects. An `InitialCacheTypeCommands` object could look like this:

```js
{
    global?: boolean;
    guilds?: string[];
}
```

`global` can be set to `true` to cache the bot's global commands. `guilds` is an array of guild IDs. For example, you might want to cache all the commands in specific guilds.

## Permissions

You can learn more about the `permissions` property in the [permissions guide](https://aeracord.apixel.me/guides/permissions).