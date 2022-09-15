import React from "react";
import TableDisplay from "../../components/Extra/TableDisplay";
import NavBar from "../../components/Bars/NavBar";
import { useNavigate } from "react-router-dom";

export default function(){

    const navigate = useNavigate();
    let row = [
        [1, "Desktop Computer", 25000, 5],
        [2, "DDR4 RAM", 2500, 5]
    ];
    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <div className="d-flex justify-content-between mb-3">
                    <h3 className="card-title">
                        Items Available
                    </h3>
                    <button className="btn btn-success" onClick={() => navigate("/add_item")}>Add Items</button>
                </div>
                
                <TableDisplay
                    columns={[
                        "ID",
                        "Name",
                        "Price",
                        "Quantity"
                    ]}
                    rows={row}
                />
                <div className="d-flex justify-content-end mt-3">
                    <div className="btn-group">
                        <button className="btn btn-dark btn-sm">
                            <i className="bi bi-caret-left-fill" />
                        </button>
                        <button className="btn btn-dark btn-sm">1</button>
                        <button className="btn btn-light btn-sm">2</button>
                        <button className="btn btn-dark btn-sm">3</button>
                        <button className="btn btn-dark btn-sm">
                            <i className="bi bi-caret-right-fill" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}