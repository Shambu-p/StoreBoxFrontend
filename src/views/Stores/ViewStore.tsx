import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import StoreAPI from "../../API.Interaction/StoreAPI";
import NavBar from "../../components/Bars/NavBar";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";
import Store from "../../Models/Store";

export default function () {

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const navigate = useNavigate();
    const params: any = useParams();

    const [store, setStore] = useState<Store|null>(null);

    useEffect(() => {
        const fetchStore = async () => {
            try{
                setStore(await StoreAPI.getStore(loggedUser.token, parseInt(params.id)));
            }catch(error){
                setAlert("failed to load store!", "danger");
            }
        };

        if(isLoggedIn){
            fetchStore();
        }
    }, [isLoggedIn]);

    const deleteStore = () => {

    }

    return (
        <div>
            <NavBar />
            <div className="container bg-white p-3 mt-5">
                <ul className="list-group">
                    <li className="list-group-item active">Store Detail</li>
                    <li className="list-group-item">ID: {store?.id}</li>
                    <li className="list-group-item">Name: {store?.name}</li>
                    <li className="list-group-item">Store Keeper: {store?.storeKeeperNavigation?.name} </li>
                    <li className="list-group-item">
                        <button className="btn btn-primary mr-3" onClick={() => navigate("/edit_store/"+params.id)}>Edit</button>
                        <button className="btn btn-danger" onClick={deleteStore}>Delete</button>
                    </li>
                </ul>
            </div>
        </div>
    );
    
}