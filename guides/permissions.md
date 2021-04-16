# Caching Client Permissions

The client's permissions for all channels are cached by default. This is because the client uses this data before making requests to the Discord API. For example, the client needs to make sure it has permissions to send messages before trying to do so. You can disable this when creating the client:

```js
// Create client
const client = new Client({
    cacheStrategies: {
        permissions: {
            enabled: false
        }
    }
});
```

You can also enable caching permission data for external emojis:

```js
// Create client
const client = new Client({
    cacheStrategies: {
        permissions: {
            externalEmojis: true
        }
    }
});
```

Discord has a limit of 10,000 [invalid requests](https://discord.com/developers/docs/topics/rate-limits#invalid-request-limit-aka-cloudflare-bans) per 10 minutes. Invalid requests include trying to do something that the client doesn't have permission to do, which is why it's recommended to leave permission caching enabled. However, if you know that your bot won't hit this limit, you can disable caching permission data.

---

# Checking Permissions

You can use the [`Permissions`](https://aeracord.apixel.me/docs/classes/Permissions) class to check for subsets of permissions. For example, if you have a permission bitfield, you can check if the `VIEW_CHANNEL` permission is included:

```js
// Create permissions
const permissions = new Permissions(bitfield);

// Check if the permissions have the `VIEW_CHANNEL` permission
if (permissions.has("VIEW_CHANNEL")) { ... }
```