import React, { useEffect, useState } from 'react';
import ItemModel from "../../Models/ItemModel";

export default function ({item, type}: {item?: ItemModel, type: ("new"|"edit"|"view")}){

    const emptyItem = {
        id: 0,
        name: "",
        price: 0,
        quantity: 0
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

    const addNew = (event: any) => {
        //TODO:add new Item
    }

    const editItem = (event: any) => {
        //TODO: edit item 
    };


    let new_form = type == "view" ? (<></>) : (
        <form onSubmit={type == "edit" ? editItem : addNew} className='card-body'>
            <div className="input-group mb-3">
                <input className="form-control" type="text" placeholder='Item Name' value={newItem?.name} onChange={inputOnChange} />
            </div>
            <div className="input-group mb-3">
                <input className="form-control" type="number" placeholder='Item Price' value={newItem?.price} onChange={inputOnChange} />
            </div>
            <div className="input-group mb-3">
                <input className="form-control" type="number" placeholder='Item Quantity' value={newItem?.quantity} onChange={inputOnChange} />
            </div>
            <button className='btn btn-dark'>
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
                <h6 className="card-subtitle">Quantity: {item?.quantity}</h6>
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