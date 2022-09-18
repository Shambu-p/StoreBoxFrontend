import React, { useContext, useEffect, useState } from "react";
import TableDisplay from "../../components/Extra/TableDisplay";
import NavBar from "../../components/Bars/NavBar";
import { useNavigate } from "react-router-dom";
import ItemAPI from "../../API.Interaction/ItemAPI";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";
import ItemModel from "../../Models/ItemModel";

export default function(){

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const navigate = useNavigate();
    const [items, setItems] = useState<ItemModel[]>([]);

    useEffect(() => {

        const fetchItems = async () => {
            try{
                let items = await ItemAPI.allItems(loggedUser.token);
                setItems(items);
            }catch(error: any){
                setAlert(error.message, "danger");
            }
        };
        
        if(isLoggedIn){
            fetchItems();
        }

    }, [isLoggedIn]);



    let row = items.map(item => [item.id, item.name, item.price, (<i 
        className="bi bi-pen-fill" 
        style={{fontSize: "25px"}} 
        onClick={() => navigate("/edit_item/"+item.id)} 
    />)]);

    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <div className="d-flex justify-content-between mb-3">
                    <h3 className="card-title">
                        Items Available
                    </h3>
                    <button className="btn btn-success" onClick={() => navigate("/add_item")}>Add Items</button>
                </div>
                
                <TableDisplay
                    columns={[
                        "ID",
                        "Name",
                        "Price",
                        "Actions"
                    ]}
                    rows={row}
                />
                <div className="d-flex justify-content-end mt-3">
                    <div className="btn-group">
                        <button className="btn btn-dark btn-sm">
                            <i className="bi bi-caret-left-fill" />
                        </button>
                        <button className="btn btn-dark btn-sm">1</button>
                        <button className="btn btn-light btn-sm">2</button>
                        <button className="btn btn-dark btn-sm">3</button>
                        <button className="btn btn-dark btn-sm">
                            <i className="bi bi-caret-right-fill" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}