import { GuildMembershipScreeningForm } from "../../../internal";
import { RawGuildMembershipScreeningFormData, RawGuildMembershipScreeningFormDataField } from "./rawGuildMembershipScreeningFormData";

export default function parseGuildMembershipScreeningForm(rawData: RawGuildMembershipScreeningFormData): GuildMembershipScreeningForm {

    // Parse guild membership screening form
    const guildMembershipScreeningForm: GuildMembershipScreeningForm = {
        description: rawData.description || undefined,
        fields: rawData.form_fields.map((f: RawGuildMembershipScreeningFormDataField) => ({
            type: f.field_type,
            label: f.label,
            values: f.values,
            required: f.required
        })),
        updatedAt: new Date(rawData.version).getTime()
    };

    // Return
    return guildMembershipScreeningForm;
}