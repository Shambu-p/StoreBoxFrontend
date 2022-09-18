import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StoreAPI from "../../API.Interaction/StoreAPI";
import NavBar from "../../components/Bars/NavBar";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";
import Store from "../../Models/Store";
import StoreForm from "./StoreForm";

export default function () {

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const navigate = useNavigate();
    const params: any = useParams();

    const [store, setStore] = useState<Store|undefined>();

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

    return (
        <div>
            <NavBar />
            <div className="container bg-white pt-4 mt-5">
                <h3 className="card-title text-center mb-3">Change Store Properties</h3>
                <StoreForm
                    type="change" 
                    store={store}
                />
            </div>
        </div>
    );
    
}