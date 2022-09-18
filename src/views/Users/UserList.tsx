import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../API.Interaction/UserAPI";
import NavBar from "../../components/Bars/NavBar";
import TableDisplay from "../../components/Extra/TableDisplay";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";
import User from "../../Models/User";

export default function (){

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        
        const fetchUsers = async () => {
            try{
                setUsers(await UserAPI.getAll(loggedUser.token));
            }catch(error){
                setAlert("cannot fetch Users list");
            }
        };

        if(isLoggedIn){
            fetchUsers();
        }

    }, [isLoggedIn]);

    const row = users.map(user => [
        user.id, 
        user.name, 
        user.email, 
        (user.role == '1' ? "Administrator" : "User"),
        (<div className="d-flex">
            <i onClick={() => navigate("/profile/"+user.id)} style={{fontSize: "25px"}} className="bi bi-eye-fill mr-3" />
        </div>)
    ]);

    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <div className="d-flex justify-content-between mb-3">
                    <h3 className="card-title">
                        System Users
                    </h3>
                    <button 
                        className="btn btn-success" 
                        onClick={() => {navigate("/create_user")}}
                    >
                        Create User
                    </button>
                </div>
                <TableDisplay 
                    columns={["User Id", "Name", "Email Address", "Role", "Actions"]} 
                    rows={row} 
                />
            </div>
        </div>
        
    );

};