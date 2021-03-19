import { Message, MessageData } from "../../internal";

export default function updateObject(message: Message, messageData: MessageData) {

    // Set data
    message.type = messageData.type;
    message.channelID = messageData.channelID;
    message.guildID = messageData.guildID;
    message.author = messageData.author;
    message.webhook = messageData.webhook;
    message.member = messageData.member;
    message.content = messageData.content;
    message.timestamp = messageData.timestamp;
    message.editedTimestamp = messageData.editedTimestamp;
    message.tts = Boolean(messageData.tts);
    message.mentionEveryone = Boolean(messageData.mentionEveryone);
    message.mentions = messageData.mentions;
    message.mentionedRoles = messageData.mentionedRoles;
    message.mentionedChannels = messageData.mentionedChannels;
    message.attachments = messageData.attachments;
    message.embeds = messageData.embeds;
    message.stickers = messageData.stickers;
    message.reactions = messageData.reactions;
    message.pinned = Boolean(messageData.pinned);
    message.activity = messageData.activity;
    message.application = messageData.application;
    message.messageReference = messageData.messageReference;
    message.flags = messageData.flags;
    message.referencedMessage = messageData.referencedMessage;
}