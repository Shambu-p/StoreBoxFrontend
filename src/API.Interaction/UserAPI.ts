import {Authorized} from "./api";
import User from "../Models/User";

export default class UserAPI {

    static _(name: string, email: string, password: string, role: string, id?: number): User {
        return {
            name: name,
            email: email,
            password: password,
            role: role,
            id: (id ?? 0)
        };
    }

    static async getAll(token: string): Promise<User[]> {

        try{
            return await Authorized(token).bodyRequest("get", "api/User");
        }catch(error) {
            throw error;
        }

    }

    /**
     * single employee detail information
     * @param token
     * @param id
     *      employee id number
     */
    static async userDetail(token: string, id: number): Promise<User> {

        try{
            return await Authorized(token).bodyRequest("get", "api/User/" + id);
        }catch(error) {
            throw error;
        }

    }

    static async createUser(token: string, user: User): Promise<User> {
        try{
            return await Authorized(token).formRequest("post", "api/User", user);
        }catch(error) {
            throw error;
        }
    }

    static async change_password(token: string, old_password: string, new_password: string, confirm_password: string) {

        try{
            return await Authorized(token).formRequest("put", "api/User/change_password", {
                current_password: old_password,
                new_password: new_password,
                confirm_password: confirm_password
            });
        }catch(error) {
            throw error;
        }

    }

}