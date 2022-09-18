import Store from "../Models/Store";
import { Authorized } from "./api";

export default class StoreAPI {

    static _(name: string, storekeeper?: number, id?: number){
        return {
            id: id??0,
            name: name,
            storeKeeper: storekeeper??0
        }
    }

    static async allStores(token: string): Promise<Store[]> {

        try{
            return await Authorized(token).bodyRequest("get", "api/Store");
        }catch(error){
            throw error;
        }

    }

    static async getStore(token: string, id: number): Promise<Store> {

        try{
            return await Authorized(token).bodyRequest("get", "api/Store/"+id);
        }catch(error){
            throw error;
        }

    }

    static async createStore(token: string, name: string, store_keeper: number): Promise<Store> {
        try{
            return await Authorized(token).formRequest("post", "api/Store", {
                store_name: name, 
                store_keeper: store_keeper
            });
        }catch(error){
            throw error;
        }
    }

    static async changeStore(token: string, id: number, name: string, store_keeper: string): Promise<Store> {
        try{
            return await Authorized(token).formRequest("put", "api/Store", {
                store_id: id,
                store_name: name,
                store_keeper: store_keeper,
            });
        }catch(error){
            throw error;
        }
    }

}