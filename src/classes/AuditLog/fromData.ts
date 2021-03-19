import { AuditLog, AuditLogData, Client } from "../../internal";

export default function fromData(client: Client, auditLogData: AuditLogData): AuditLog {

    // Create audit log
    const auditLog: AuditLog = new AuditLog(client, auditLogData);

    // Return
    return auditLog;
}