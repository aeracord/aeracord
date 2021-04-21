import { Base } from "../../internal";

export default function unmarkAsDeleted<ObjectType extends Base<ObjectType>>(object: Base<ObjectType>) {

    // Set deleted
    object.deleted = false;

    // Set expire from cache at
    object.expireFromCacheIn(object._cacheManager.cacheFor || null);
}