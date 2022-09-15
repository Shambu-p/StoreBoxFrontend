import React from 'react';
import ItemModel from "../Models/ItemModel";

export default function ({item}: {item: ItemModel}){
    
    return (
        <div className="card rounded shadow-sm mb-3" style={{width: "30rem"}}>
            <img className="card-img-top" src="./image/exam-18.jpg" alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <h6 className="card-subtitle mb-2">Price: {item.price}Birr</h6>
                <h6 className="card-subtitle">Quantity: {item.quantity}</h6>
                <div className="mt-3">
                    <button className="btn btn-dark btn-sm">
                        <i className="bi bi-pencil-square" /> Edit
                    </button>
                </div>
            </div>
        </div>
    );

}