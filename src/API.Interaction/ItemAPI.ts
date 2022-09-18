import ItemModel from "../Models/ItemModel";
import { Authorized } from "./api";

export default class ItemAPI {

    static _(name: string, price?: number, id?: number): ItemModel {

        return {
            id: (id ?? 0),
            name: name,
            price: (price ?? 0),
            StoreItems: []
        };

    }

    static async allItems(token: string): Promise<ItemModel[]> {
        try{
            return await Authorized(token).bodyRequest("get", "api/Item");
        }catch(error){
            throw error;
        }
    }

    static async singleItem(token: string, id: number): Promise<ItemModel> {
        try{
            return await Authorized(token).bodyRequest("get", "api/Item/"+id);
        }catch(error){
            throw error;
        }
    }

    static async createItem(token: string, item: ItemModel): Promise<ItemModel> {
        try{
            return await Authorized(token).formRequest("post", "api/Item", item);
        }catch(error){
            throw error;
        }
    }

    static async changeItem(token: string, item: ItemModel): Promise<ItemModel> {
        try{
            return await Authorized(token).formRequest("put", "api/Item", item);
        }catch(error){
            throw error;
        }
    }

}