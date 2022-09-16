import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Bars/NavBar";

export default function () {

    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    const deleteUser = () => {

    }

    return (
        <div>
            <NavBar />
            <div className="container bg-white p-3 mt-5">
                <ul className="list-group">
                    <li className="list-group-item active">User Detail</li>
                    <li className="list-group-item">ID: </li>
                    <li className="list-group-item">Full Name:</li>
                    <li className="list-group-item">Email Address: </li>
                    <li className="list-group-item">
                        <button className="btn btn-primary mr-3" onClick={() => navigate("/change_password")}>Change Password</button>
                        <button className="btn btn-danger" onClick={deleteUser}>Delete</button>
                    </li>
                </ul>
            </div>
        </div>
    );
    
}