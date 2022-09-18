import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreAPI from "../../API.Interaction/StoreAPI";
import UserAPI from "../../API.Interaction/UserAPI";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";
import Store from "../../Models/Store";
import User from "../../Models/User";

export default function ({type, store}: {type: string, store?: Store}) {

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const navigate = useNavigate();

    const [data, setData] = useState<any>({
        id: 0,
        name: "",
        store_keeper: 0
    });
    const [keepers, setKeepers] = useState<User[]>([]);

    useEffect(() => {

        const fetchUser = async () => {
            try{
                setKeepers(await UserAPI.getAll(loggedUser.token));
            }catch(error){
                setAlert("cannot fetch users");
            }
        };

        if(type == "change" && store){
            setData({
                id: store.id,
                name: store.name,
                store_keeper: store?.storeKeeper
            });
        }

        if(isLoggedIn){
            fetchUser();
        }

    }, [isLoggedIn, store, type]);

    const inputChange = (value: any, input_name: ("name"|"store_keeper")) => {
        setData({...data, [input_name]: value});
    };

    const createStore = async (event: any) => {
        event.preventDefault();
        try{
            await StoreAPI.createStore(loggedUser.token, data.name, data.store_keeper);
            setAlert("Store created successfully", "success");
            navigate("/stores");
        }catch(error){
            setAlert("Opertation failed!", "danger");
        }
    };

    const changeStore = async (event: any) => {
        event.preventDefault();
        try{
            await StoreAPI.changeStore(loggedUser.token, data.id, data.name, data.store_keeper);
            setAlert("Store created successfully", "success");
            navigate("/stores");
        }catch(error){
            setAlert("Opertation failed!", "danger");
        }
    };

    return (
        <form onSubmit={type == "new" ? createStore : changeStore} className='card-body'>
            <span>Store Name</span>
            <div className="input-group mb-3">
                <input className="form-control form-cotnrol-lg" type="text" placeholder='Store Name' value={data.name} onChange={event => {inputChange(event.target.value, "name")}} />
            </div>
            <span>Store Keeper</span>
            <div className="input-group mb-3">
                <select 
                    className="form-control form-cotnrol-lg" 
                    title='Store Keeper' 
                    value={data.store_keeper} 
                    onChange={event => {inputChange(event.target.value, "store_keeper")}} 
                >
                    {keepers.map(keeper => (<option value={keeper.id}>{keeper.name}</option>))}
                </select>
            </div>
            <button className='btn btn-dark' type="submit">
                <i className='bi bi-sd-card' /> Save
            </button>
        </form>
    );
    
}