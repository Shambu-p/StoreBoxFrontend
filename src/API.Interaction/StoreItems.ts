import { Authorized } from "./api";

export default class StoreItemsAPI {

    static _(store_id: number,item_id: number, total_amount?: number, unboxed_amount?: number, id?: number){
        return {
            id: id ?? 0,
            storeId: store_id,
            itemId: item_id,
            TotalAmount: total_amount ?? 0,
            UnboxedAmount: unboxed_amount ?? 0
        };
    }

    static async storeItems(token: string, store_id: number){
        return await Authorized(token).bodyRequest("get", "api/Store/items/" + store_id);
    }

    static async singleItem(token: string, store_item_id: number){
        return await Authorized(token).bodyRequest("get", "api/Store/items/single_item/" + store_item_id);
    }

    static async createItem(token: string, store_id: number, item_id: number, quantity: number){
        return await Authorized(token).formRequest("post", "api/Store/items", {
            store_id, item_id, amount: quantity
        });
    }

    static async addItem(token: string, store_id: number, item_id: number, quantity: number){
        return await Authorized(token).formRequest("put", "api/Store/items/change_amount", {
            store_id, item_id, amount: quantity
        });
    }

};