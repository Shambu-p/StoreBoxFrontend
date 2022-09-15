import React from "react";
import NavBar from "../../components/Bars/NavBar";
import ItemCard from "../../components/Item/ItemCard";

export default function () {

    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <h3 className="card-title mb-3">
                    Create new Item
                </h3>
                <ItemCard type="new" />
            </div>
        </div>
    );

}