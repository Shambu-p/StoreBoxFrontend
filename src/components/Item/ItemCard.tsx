import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ItemAPI from '../../API.Interaction/ItemAPI';
import AlertContext from '../../Contexts/AlertContext';
import AuthContext from '../../Contexts/AuthContext';
import ItemModel from "../../Models/ItemModel";

export default function ({item, type}: {item?: ItemModel, type: ("new"|"edit"|"view")}){

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const navigate = useNavigate();

    const emptyItem = {
        id: 0,
        name: "",
        price: 0
    };

    const [newItem, setNewItem] = useState<ItemModel>(emptyItem);

    useEffect(() => {
        if(item){
            setNewItem(item);
        }
    }, [item]);

    const inputOnChange = (event: any) => {
        setNewItem({...newItem, [event.target.name]: event.target.value});
    };

    const addNew = async (event: any) => {
        event.preventDefault();
        try{
            let item = await ItemAPI.createItem(loggedUser.token, ItemAPI._(newItem.name, newItem.price));
            setAlert("Item created successfully", "success");
            navigate("/items");
        }catch(error: any){
            setAlert("cannot create item! operation failed!", "danger");
        }
    }

    const editItem = async (event: any) => {
        event.preventDefault();
        try{
            let item = await ItemAPI.changeItem(loggedUser.token, ItemAPI._(newItem.name, newItem.price, newItem.id));
            setAlert("Item changed successfully", "success");
            navigate("/items");
        }catch(error: any){
            setAlert("cannot create item! operation failed!", "danger");
        }
    };


    let new_form = type == "view" ? (<></>) : (
        <form onSubmit={type == "edit" ? editItem : addNew} className='card-body'>
            <div className="input-group mb-3">
                <input className="form-control" type="text" name="name" placeholder='Item Name' value={newItem?.name} onChange={inputOnChange} />
            </div>
            <div className="input-group mb-3">
                <input className="form-control" type="number" name="price" placeholder='Item Price' value={newItem?.price} onChange={inputOnChange} />
            </div>
            <button type="submit" className='btn btn-dark'>
                <i className='bi bi-sd-card' /> Save
            </button>
        </form>
    );

    let view_form = (
        <div className="card rounded shadow-sm mb-3">
            <img className="card-img-top" src="./image/exam-18.jpg" alt="Card image cap" />           
            <div className="card-body">
                <h5 className="card-title">{item?.name}</h5>
                <h6 className="card-subtitle mb-2">Price: {item?.price}Birr</h6>
                <div className="mt-3">
                    <button className="btn btn-dark btn-sm" type="submit" >
                        <i className="bi bi-pencil-square" /> Edit
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        (type == "view") ? view_form : (
            <div className="card rounded shadow-sm mb-3">
                {new_form}
            </div>
        )
    );

}