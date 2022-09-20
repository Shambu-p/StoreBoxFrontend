import Store from "./Store";
import User from "./User";

export default interface Box {
    id: number,
    storeId: number,
    userId: number,

    store?: Store,
    user?: User
}