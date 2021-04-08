import { AuditLog, AuditLogChange, AuditLogData, AuditLogEntry } from "../../internal";

export default function toData(auditLog: AuditLog): AuditLogData {

    // Parse auditLog data
    return {
        guildID: auditLog.guildID,
        entries: auditLog.entries.map((e: AuditLogEntry) => ({
            id: e.id,
            event: e.event,
            targetID: e.targetID,
            actorID: e.actorID,
            changes: e.changes && e.changes.map((c: AuditLogChange) => ({
                type: c.type,
                oldValue: c.oldValue,
                newValue: c.newValue
            })),
            options: e.options && {
                deleteMemberDays: e.options.deleteMemberDays,
                membersRemoved: e.options.membersRemoved,
                channelID: e.options.channelID,
                messageID: e.options.messageID,
                count: e.options.count,
                id: e.options.id,
                type: e.options.type,
                roleName: e.options.roleName
            },
            reason: e.reason
        }))
    };
}