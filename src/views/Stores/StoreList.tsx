import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreAPI from "../../API.Interaction/StoreAPI";
import NavBar from "../../components/Bars/NavBar";
import TableDisplay from "../../components/Extra/TableDisplay";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";
import Store from "../../Models/Store";

export default function (){

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const navigate = useNavigate();

    const [stores, setStores] = useState<Store[]>([]);

    useEffect(() => {
        
        const fetchUsers = async () => {
            try{
                setStores(await StoreAPI.allStores(loggedUser.token));
            }catch(error){
                setAlert("cannot fetch Users list");
            }
        };

        if(isLoggedIn){
            fetchUsers();
        }

    }, [isLoggedIn]);

    const row = stores.map(store => [
        store.id, 
        store.name, 
        (<div className="d-flex">
            <i onClick={() => navigate("/view_store/"+store.id)} style={{fontSize: "25px"}} className="bi bi-eye-fill mr-3" />
            <i style={{fontSize: "25px"}} className="bi bi-card-list mr-3" />
        </div>)
    ]);

    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <div className="d-flex justify-content-between mb-3">
                    <h3 className="card-title">
                        Stores Available
                    </h3>
                    <button className="btn btn-success" onClick={() => {navigate("/add_store")}}>Add Store</button>
                </div>
                <TableDisplay columns={["Store Id", "Name", "Actions"]} rows={row} />
            </div>
        </div>
        
    );

};