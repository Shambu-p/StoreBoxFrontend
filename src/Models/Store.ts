import User from "./User";

export default interface Store {
    id: number,
    name: string,
    storeKeeper?: number,
    storeKeeperNavigation?: User
};