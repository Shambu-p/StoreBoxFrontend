import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "../../components/Bars/NavBar";
import BoxItemCard from "../../components/BoxItemCard";
import ItemCard from "../../components/Item/ItemCard";

export default function () {

    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    const editStore = () => {

    };

    const deleteStore = () => {

    }

    return (
        <div>
            <NavBar />
            <div className="container bg-white p-3 mt-5">
                <ul className="list-group">
                    <li className="list-group-item active">Store Detail</li>
                    <li className="list-group-item">ID: </li>
                    <li className="list-group-item">Name:</li>
                    <li className="list-group-item">Store Keeper: </li>
                    <li className="list-group-item">
                        <button className="btn btn-primary mr-3" onClick={() => navigate("/edit_store")}>Edit</button>
                        <button className="btn btn-danger" onClick={deleteStore}>Delete</button>
                    </li>
                </ul>
            </div>
        </div>
    );
    
}