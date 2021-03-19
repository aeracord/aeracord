import { Role, RoleData } from "../../internal";

export default function updateObject(role: Role, roleData: RoleData) {

    // Set data
    role.name = roleData.name;
    role.guildID = roleData.guildID;
    role.color = roleData.color;
    role.hoist = Boolean(roleData.hoist);
    role.position = roleData.position;
    role.permissions = roleData.permissions;
    role.mentionable = Boolean(roleData.mentionable);
    role.managed = Boolean(roleData.managed);
    role.tags = roleData.tags;
}