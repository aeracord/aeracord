import { Member, Message, MessageData, User } from "../../internal";

export default function updateObject(message: Message, messageData: MessageData) {

    // If the `MessageData` was fetched before the `Message` object was last updated, dont update anything
    if (messageData.fetchedAt < message._lastUpdatedAt) return;

    // Unmark as deleted
    if (message.deleted) message._unmarkAsDeleted();

    // Set data
    message.type = messageData.type;
    message.channelID = messageData.channelID;
    message.guildID = messageData.guildID;
    message.author = messageData.author && User.fromData(message.client, messageData.author);
    message.webhook = messageData.webhook;
    message.member = messageData.member && Member.fromData(message.client, messageData.member);
    message.content = messageData.content;
    message.timestamp = messageData.timestamp;
    message.editedTimestamp = messageData.editedTimestamp;
    message.tts = messageData.tts;
    message.mentionEveryone = messageData.mentionEveryone;
    message.mentions = messageData.mentions;
    message.mentionedRoles = messageData.mentionedRoles;
    message.mentionedChannels = messageData.mentionedChannels;
    message.attachments = messageData.attachments;
    message.embeds = messageData.embeds;
    message.stickers = messageData.stickers;
    message.reactions = messageData.reactions;
    message.pinned = messageData.pinned;
    message.activity = messageData.activity;
    message.application = messageData.application;
    message.messageReference = messageData.messageReference;
    message.flags = messageData.flags;
    message.referencedMessage = messageData.referencedMessage;
    message.interaction = messageData.interaction;
    message.components = messageData.components;
    message._lastUpdatedAt = Date.now();
}