import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Bars/NavBar";
import TableDisplay from "../../components/Extra/TableDisplay";

export default function (){

    const navigate = useNavigate();
    const row = [
        [1, "Tewodros Kassahun", "teddy@absoft.net", (<div className="d-flex">
            <i style={{fontSize: "25px"}} className="bi bi-eye-fill mr-3" />
            <i style={{fontSize: "25px"}} className="bi bi-card-list mr-3" />
        </div>)],
        [2, "Tewodros Tadesse", "tedy@absoft.net", (<div className="d-flex">
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
                        System Users
                    </h3>
                    <button className="btn btn-success" onClick={() => {navigate("/create_user")}}>Create User</button>
                </div>
                <TableDisplay 
                    columns={["User Id", "Name", "Email Address", "Actions"]} 
                    rows={row} 
                />
            </div>
        </div>
        
    );

};