import { AnyMessageComponentData, Attachment, ChannelMention, Member, MemberData, MessageActivity, MessageApplication, MessageData, MessageEmbed, MessageInteraction, MessageReference, MessageStickerItem, MessageType, MessageWebhook, Reaction, User, UserData } from "../../../../internal";

export interface MessageUpdateData {

    /**
     * ID
     *
     * The message's ID
     */
    id: string;

    /**
     * Type
     *
     * The message's type
     */
    type?: MessageType;

    /**
     * Channel ID
     *
     * The ID of the channel this message is in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this message is in
     */
    guildID?: string;

    /**
     * Author
     *
     * The user that sent this message
     */
    author?: User;

    /**
     * Webhook
     *
     * The webhook that sent this message
     */
    webhook?: MessageWebhook;

    /**
     * Member
     *
     * The member object of the user that sent this message
     */
    member?: Member;

    /**
     * Content
     *
     * The message's content
     */
    content?: string;

    /**
     * Timestamp
     *
     * The timestamp for when the message was sent
     */
    timestamp?: number;

    /**
     * Edited Timestamp
     *
     * The timestamp for when the message was last edited
     */
    editedTimestamp?: number;

    /**
     * TTS
     *
     * Whether or not this message is TTS
     */
    tts?: boolean;

    /**
     * Mention Everyone
     *
     * Whether or not this message mentions everyone
     */
    mentionEveryone?: boolean;

    /**
     * Mentions
     *
     * An array of users that are mentioned in this message
     * If the message is in a guild, this will be an array of members instead
     */
    mentions?: UserData[] | MemberData[];

    /**
     * Mentioned Roles
     *
     * The IDs of the roles this message mentions
     */
    mentionedRoles?: string[];

    /**
     * Mentioned Channels
     *
     * The channels this message mentions
     */
    mentionedChannels?: ChannelMention[];

    /**
     * Attachments
     *
     * The message's attachments
     */
    attachments?: Attachment[];

    /**
     * Embeds
     *
     * The message's embeds
     */
    embeds?: MessageEmbed[];

    /**
     * Sticker Items
     *
     * The message's stickers
     */
    stickerItems?: MessageStickerItem[];

    /**
     * Reactions
     *
     * The message's reactions
     */
    reactions?: Reaction[];

    /**
     * Pinned
     *
     * Whether or not this message is pinned
     */
    pinned?: boolean;

    /**
     * Activity
     *
     * The message's activity
     */
    activity?: MessageActivity;

    /**
     * Application
     *
     * The message's application
     */
    application?: MessageApplication;

    /**
     * Message Reference
     *
     * The data for the message this message references
     */
    messageReference?: MessageReference;

    /**
     * Flags
     *
     * The message's flags
     */
    flags?: number;

    /**
     * Referenced Message
     *
     * The message this message references
     */
    referencedMessage?: MessageData;

    /**
     * Interaction
     *
     * The interaction this message is in response to
     */
    interaction?: MessageInteraction;

    /**
     * Components
     *
     * The message's components
     */
    components?: AnyMessageComponentData[];
}