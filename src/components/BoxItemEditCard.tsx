import ItemModel from "../Models/ItemModel";
import React from "react";

export default function ({item}: {item?: ItemModel}){

    return (
        <div className="card">
            <span className="card-header">
                Edit Box Item
            </span>
            <form className="card-body">
                <div className="input-group mb-3">
                    <input type="text" placeholder="Item Name" className="form-control" />
                </div>
                <div className="input-group mb-3">
                    <input type="number" placeholder="Item Price" className="form-control" />
                </div>
                <button className="btn btn-dark">
                    <i className="bi bi-sd-card-fill" /> Save
                </button>
            </form>
        </div>
    );
}