import { Permissions, PermissionsResolvable } from "../../internal";

export default function has(permissions: Permissions, permissionBits: PermissionsResolvable): boolean {

    // If theres an array of bits, every bit needs to be in the permissions
    if (permissionBits instanceof Array) return permissionBits.every((p: PermissionsResolvable) => has(permissions, p));

    // Parse bits
    const parsedBits: bigint = Permissions.resolveBits(permissionBits);

    // Return
    return (permissions.bits & parsedBits) === parsedBits;
}