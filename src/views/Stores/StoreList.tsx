import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Bars/NavBar";
import TableDisplay from "../../components/Extra/TableDisplay";

export default function (){

    const navigate = useNavigate();
    const column = ["Store Id", "Name", "Actions"];
    const row = [
        [1, "Adama Tkur Abay Branch", (<div className="d-flex">
            <i style={{fontSize: "25px"}} className="bi bi-eye-fill mr-3" />
            <i style={{fontSize: "25px"}} className="bi bi-card-list mr-3" />
        </div>)],
        [2, "Addis Ababa Piasa ", (<div className="d-flex">
            <i style={{fontSize: "25px"}} className="bi bi-eye-fill mr-3" />
            <i style={{fontSize: "25px"}} className="bi bi-card-list mr-3" />
        </div>)]
    ];

    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <div className="d-flex justify-content-between mb-3">
                    <h3 className="card-title">
                        Stores Available
                    </h3>
                    <button className="btn btn-success" onClick={() => {navigate("/add_store")}}>Add Store</button>
                </div>
                <TableDisplay columns={column} rows={row} />
            </div>
        </div>
        
    );

};