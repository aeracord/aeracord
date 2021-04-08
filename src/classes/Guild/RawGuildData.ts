import { DefaultMessageNotifications, ExplicitContentFilter, Feature, MFALevel, PremiumTier, RawEmojiData, RawRoleData, RawWelcomeScreenData, VerificationLevel } from "../../internal";

export interface RawGuildData {
    id: string;
    name: string;
    icon: string | null;
    splash: string | null;
    discovery_splash: string | null;
    owner_id: string;
    region: string;
    afk_channel_id: string | null;
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: string | null;
    verification_level: VerificationLevel;
    default_message_notifications: DefaultMessageNotifications;
    explicit_content_filter: ExplicitContentFilter;
    roles: RawRoleData[];
    emojis: RawEmojiData[];
    features: Feature[];
    mfa_level: MFALevel;
    application_id: string | null;
    system_channel_id: string | null;
    system_channel_flags: number;
    rules_channel_id: string | null;
    max_presences?: number | null;
    max_members?: number;
    vanity_url_code: string | null;
    description: string | null;
    banner: string | null;
    premium_tier: PremiumTier;
    premium_subscription_count?: number;
    preferred_locale: string;
    public_updates_channel_id: string | null;
    max_video_channel_users?: number;
    approximate_member_count?: number;
    approximate_presence_count?: number;
    welcome_screen?: RawWelcomeScreenData;
}