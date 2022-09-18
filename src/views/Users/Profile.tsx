import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAPI from "../../API.Interaction/UserAPI";
import NavBar from "../../components/Bars/NavBar";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";
import User from "../../Models/User";

export default function () {

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const navigate = useNavigate();
    const params: any = useParams();

    const [user, setUser] = useState<User|null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try{
                setUser(await UserAPI.userDetail(loggedUser.token, params.id));
            }catch(error){
                setAlert("cannot fetch user detail!");
            }
        };

        if(isLoggedIn){
            fetchUser();
        }

    }, [isLoggedIn]);

    const deleteUser = () => {

    }

    return !user ? (<></>) : (
        <div>
            <NavBar />
            <div className="container bg-white p-3 mt-5">
                <ul className="list-group">
                    <li className="list-group-item active">User Detail</li>
                    <li className="list-group-item">ID: {user.id}</li>
                    <li className="list-group-item">Full Name: {user.name}</li>
                    <li className="list-group-item">Email Address: {user.email}</li>
                    <li className="list-group-item">
                        {loggedUser.id == params.id ? (<button className="btn btn-primary mr-3" onClick={() => navigate("/change_password/"+user.id)}>Change Password</button>):(<></>)}
                        {loggedUser.role = '1' ? (<button className="btn btn-danger" onClick={deleteUser}>Delete</button>):(<></>)}
                    </li>
                </ul>
            </div>
        </div>
    );
    
}