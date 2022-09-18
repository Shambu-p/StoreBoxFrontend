import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemAPI from "../../API.Interaction/ItemAPI";
import NavBar from "../../components/Bars/NavBar";
import ItemCard from "../../components/Item/ItemCard";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";
import ItemModel from "../../Models/ItemModel";

export default function () {

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const params: any = useParams();
    const [item, setItem] = useState<ItemModel|undefined>();

    useEffect(() => {
        const fetchItem = async () => {
            try{
                let fetched_item = await ItemAPI.singleItem(loggedUser.token, parseInt(params.item_id));
                setItem(fetched_item);
            }catch(error: any){
                setAlert("cannot fetch item", "danger");
            }
        };

        if(isLoggedIn){
            fetchItem();
        }

    }, [isLoggedIn]);
    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <h3 className="card-title mb-3">
                    Change Item Properties
                </h3>
                <ItemCard type="edit" item={item}/>
            </div>
        </div>
    );

}