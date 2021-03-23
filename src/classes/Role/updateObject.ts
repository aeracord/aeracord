import { Role, RoleData } from "../../internal";

export default function updateObject(role: Role, roleData: RoleData) {

    // Set data
    role.name = roleData.name;
    role.guildID = roleData.guildID;
    role.color = roleData.color;
    role.hoist = roleData.hoist;
    role.position = roleData.position;
    role.permissions = roleData.permissions;
    role.mentionable = roleData.mentionable;
    role.managed = roleData.managed;
    role.tags = roleData.tags;
}