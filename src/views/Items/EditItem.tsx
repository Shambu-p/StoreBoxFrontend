import React from "react";
import NavBar from "../../components/Bars/NavBar";
import ItemCard from "../../components/Item/ItemCard";

export default function () {

    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <h3 className="card-title mb-3">
                    Change Item Properties
                </h3>
                <ItemCard type="edit" />
            </div>
        </div>
    );

}