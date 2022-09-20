import React, { useContext, useEffect, useState } from "react";
import TableDisplay from "../../components/Extra/TableDisplay";
import NavBar from "../../components/Bars/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";
import StoreItemsAPI from "../../API.Interaction/StoreItems";
import Store from "../../Models/Store";

export default function(){

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const navigate = useNavigate();
    const params: any = useParams();

    const [store, setStore] = useState<Store|undefined>();

    useEffect(() => {
        
        const fetchUsers = async () => {
            try{
                setStore(await StoreItemsAPI.storeItems(loggedUser.token, params.store_id));
            }catch(error){
                setAlert("cannot fetch Users list");
            }
        };

        if(isLoggedIn){
            fetchUsers();
        }

    }, [isLoggedIn]);

    let row = !store ? [] : store.storeItems.map(item => [item.item?.name, item.totalAmount, item.unboxedAmount, (
        <div className="d-flex">
            {/* <i  className="bi bi-eye-fill mr-2" style={{fontSize: "25px"}} /> */}
            <i  
                onClick={() => navigate("/edit_store_item/"+item.id)}
                className="bi bi-pen-fill mr-2" style={{fontSize: "25px"}}
            />
        </div>
    )]);

    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <div className="d-flex justify-content-between mb-3">
                    <h3 className="card-title">
                        Items Available: {store?.name}
                    </h3>
                    <button className="btn btn-success" onClick={() => navigate("/add_store_item/" + params.store_id)}>Add Item</button>
                </div>
                
                <TableDisplay
                    columns={[
                        "Item Name",
                        "Total Amount",
                        "Unboxed Amount",
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