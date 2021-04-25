# Data Models

When making calls to the Discord API and recieving [events](https://aeracord.apixel.me/docs/classes/Client#events), you can send and recieve two types of objects: simple objects and classes. For example, when you recieve the [`interactionCreate` event](https://aeracord.apixel.me/docs/classes/Client#interactionCreate), you'll get an [`Interaction`](https://aeracord.apixel.me/docs/classes/Interaction) object. This object has a [`user`](https://aeracord.apixel.me/docs/classes/Interaction#user) property which is a [`UserData`](https://aeracord.apixel.me/docs/interfaces/UserData) object. This object has similar properties to a [`User`](https://aeracord.apixel.me/docs/classes/User) object, but it's a regular object instead of a class.

---

# Converting Between Data Models

You can convert between the two types of data models whenever you want. These examples will use the [`UserData`](https://aeracord.apixel.me/docs/interfaces/UserData) and [`User`](https://aeracord.apixel.me/docs/classes/User) objects.

## `UserData` to `User`

You can convert a [`UserData`](https://aeracord.apixel.me/docs/interfaces/UserData) object to a [`User`](https://aeracord.apixel.me/docs/classes/User) object with the [`User.fromData()`](https://aeracord.apixel.me/docs/classes/User#fromData) method:

```js
// Create user object
const user = User.fromData(userData);
```

## `User` to `UserData`

You can convert a [`User`](https://aeracord.apixel.me/docs/classes/User) object to a [`UserData`](https://aeracord.apixel.me/docs/interfaces/UserData) object with the [`User.toData()`](https://aeracord.apixel.me/docs/classes/User#toData) method:

```js
// Create user data object
const userData = User.toData(user);
```
