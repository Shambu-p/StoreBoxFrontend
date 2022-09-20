import ItemModel from "./ItemModel";
import Store from "./Store";

export default interface StoreItems {
    id: number,
    storeId: number,
    itemId: number,
    totalAmount: number,
    unboxedAmount: number,

    item?: ItemModel,
    store?: Store
};