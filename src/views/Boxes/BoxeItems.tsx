import React from "react";
import NavBar from "../../components/Bars/NavBar";
import BoxItemEditCard from "../../components/BoxItemEditCard";
import BoxItemCard from "../../components/BoxItemCard";

export default function(){

    let row = [
        [1, "Desktop Computer", 25000, 5],
        [2, "DDR4 RAM", 2500, 5]
    ];
    return (
        <div>
            <NavBar />
            <div className="d-flex mt-5">
                <div className="col">
                    <h3 className="card-title mb-3">
                        Box Items
                    </h3>
                    <BoxItemCard item={{id: 1, name: "Desktop Computer", price: 25000, quantity: 5}} />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                    <BoxItemEditCard />
                </div>
            </div>
        </div>
    );

}