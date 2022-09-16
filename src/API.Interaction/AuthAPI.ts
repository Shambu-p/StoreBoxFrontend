import API, {Authorized} from "./api";

export async function Login(email: string, password: string){

    try{

        let response = await API.post("/Auth/login", {
            email: email,
            password: password
        });

        return response.data;

    }catch(error){
        throw error;
    }

}

export async function information(token: string): Promise<{status: boolean, data: (any | null)}> {

    try{

        let response = await Authorized(token).post("/Auth/authorization", {});

        return {
            status: true,
            data: {...response, token: token}
        };

    }catch ({message}){
        console.log(message);
    }

    return {
        status: false,
        data: null
    };

}

export async function createUser(token: string, user_data: {
    name: string,
    email: string,
    password: string,
}) {
    try{
        let response = await Authorized(token).post("/Users/create", user_data);
    }catch(error){
        throw error;
    }
}
