import { GuildMembershipScreeningFormFieldType } from "../../../internal";

export interface RawGuildMembershipScreeningFormData {
    description: string | null;
    form_fields: RawGuildMembershipScreeningFormDataField[];
    version: string;
}

export interface RawGuildMembershipScreeningFormDataField {
    field_type: GuildMembershipScreeningFormFieldType;
    label: string;
    values?: string[];
    required: boolean;
}