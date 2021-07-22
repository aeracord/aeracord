import { Client, Member } from "../../internal";

export default function canManageMember(client: Client, member: Member): boolean {

    // If the client is the owner of the guild, return `true`
    if (client.id === client._guildOwners.get(member.guildID)) return true;

    // Sort roles
    const roles: string[] = member.roles.sort((a: string, b: string) => {

        // Get positions
        const positionA: number = client._rolePermissions.get(a)?.position as number;
        const positionB: number = client._rolePermissions.get(b)?.position as number;

        // Return
        return positionA - positionB;
    });

    // Check if the client can manage the highest role
    return client.canManageRoles(member.guildID, roles[roles.length - 1]);
}