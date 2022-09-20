import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StoreItemsAPI from '../../API.Interaction/StoreItems';
import NavBar from '../../components/Bars/NavBar';
import AlertContext from '../../Contexts/AlertContext';
import AuthContext from '../../Contexts/AuthContext';
import Store from '../../Models/Store';
import StoreItems from '../../Models/StoreItems';

export default function(){

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const navigate = useNavigate();
    const params: any = useParams();

    const [item, setItem] = useState<StoreItems>();
    const [quantity, setQuantity] = useState<{value: number}>({value: 0});

    useEffect(() => {
        
        const fetchUsers = async () => {
            try{
                let response = await StoreItemsAPI.singleItem(loggedUser.token, params.id);
                setItem(response);
                // setQuantity(response.unboxedAmount);
            }catch(error){
                setAlert("cannot fetch item information");
            }
        };

        if(isLoggedIn){
            fetchUsers();
        }

    }, [isLoggedIn]);

    const changeItem = async (event: any) => {
        event.preventDefault();
        if(!item){
            return;
        }
        try{
            await StoreItemsAPI.addItem(loggedUser.token, item.storeId, item.itemId, quantity.value);
            setAlert("item added successfully", "success");
            navigate("/store_items/"+item?.storeId)
            // setQuantity(response.unboxedAmount);
        }catch(error){
            setAlert("operation failed", "danger");
        }
    };

    const inputChange = (qt: number) => {
        // let tq = (item?.totalAmount ?? 0) + (qt - (item?.unboxedAmount ?? 0));
        if(((item?.unboxedAmount ?? 0) + qt) >= 0){
            setQuantity({value: qt});
        }
        // if(item){
            // setItem({...item, totalAmount: tq, unboxedAmount: qt});
        // }
        
    }

    const inpchange = (qt: number) => {
        let k = qt - (item?.totalAmount ?? 0);
        if(((item?.unboxedAmount ?? 0) + k) >= 0){
            setQuantity({value: k});
        }
    }

    return (
        <div>
            <NavBar />
            <div className="container bg-white mt-5 p-3">
                <h3 className="card-title mb-3">Add Item to Store</h3>
                <ul className="list-group">
                    <li className="list-group-item">Item: {item?.item?.name}</li>
                    <li className="list-group-item">Uboxed Amount: {(item?.unboxedAmount ?? 0) + quantity.value}</li>
                    <li className="list-group-item">
                        Total Amount 
                        <div className="input-group">
                            <button onClick={() => inputChange(quantity.value - 1)} className="btn btn-dark btn-sm">-</button>
                            <input value={quantity.value + (item?.totalAmount ?? 0)} onChange={(event: any) => inpchange(event.target.value)} type="number" className="form-control form-control-sm" />
                            <button onClick={() => inputChange(quantity.value + 1)} className="btn btn-dark btn-sm">+</button>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <button onClick={changeItem} className="btn btn-primary" >Save</button>
                    </li>
                </ul>
            </div>
        </div>
    );
    
}