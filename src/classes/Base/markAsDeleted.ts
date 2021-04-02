import { Base } from "../../internal";

export default function markAsDeleted<ObjectType extends Base<ObjectType>>(object: Base<ObjectType>) {

    // Set deleted
    object.deleted = true;

    // Set expire from cache at
    object.expireFromCacheIn(object._cacheManager.cacheDeletedFor);
}