import React from "react";
import NavBar from "../../components/Bars/NavBar";
import StoreForm from "./StoreForm";

export default function () {

    return (
        <div>
            <NavBar />
            <div className="container bg-white pt-4 mt-5">
                <h3 className="card-title text-center mb-3">Change Store Properties</h3>
                <StoreForm
                    type="change" 
                    store={{
                        id: 1,
                        name: "Adama Branch",
                        storekeeper: 2
                    }}
                />
            </div>
        </div>
    );
    
}