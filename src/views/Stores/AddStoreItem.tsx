import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemAPI from '../../API.Interaction/ItemAPI';
import StoreItemsAPI from '../../API.Interaction/StoreItems';
import NavBar from '../../components/Bars/NavBar';
import AlertContext from '../../Contexts/AlertContext';
import AuthContext from '../../Contexts/AuthContext';
import ItemModel from '../../Models/ItemModel';

export default function(){

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const navigate = useNavigate();
    const params: any = useParams();

    const [items, setItems] = useState<ItemModel[]>([]);
    const [inputs, setInputs] = useState<{item_id: number, total_quantity: number}>({
        item_id: 0,
        total_quantity: 0
    });

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

    const addItem = async (event: any) => {
        event.preventDefault();
        try{
            await StoreItemsAPI.createItem(loggedUser.token, parseInt(params.store_id), inputs.item_id, inputs.total_quantity);
            setAlert("Item created Successfully", "success");
            navigate("/store_items/" + params.store_id);
        }catch(error){
            setAlert("operation failed!", "danger");
        }
    };

    const inputChange = (event: any) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    return (
        <div>
            <NavBar />
            <div className="container bg-white mt-5 p-3">
                <h3 className="card-title mb-3">Add Item to Store</h3>
                <form onSubmit={addItem}>
                    <div className="input-group mb-3">
                        <select 
                            className="form-control form-control-lg" 
                            onChange={inputChange}
                            name="item_id"
                        >
                            {items.map(item => (<option value={item.id}>{item.name}</option>))}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <input 
                            type="number" 
                            className="form-control form-control-lg" 
                            placeholder="Total Amount" 
                            onChange={inputChange}
                            name="total_quantity"
                        />
                    </div>
                    <button className="btn btn-dark btn-lg" type="submit">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
    
}