import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAPI from "../../API.Interaction/UserAPI";
import NavBar from "../../components/Bars/NavBar";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";

export default function () {

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const navigate = useNavigate();
    const params = useParams();

    const [inputs, setInput] = useState<{old_password: string, new_password: string, confirm_password: string}>({
        old_password: "",
        new_password: "",
        confirm_password: ""
    });

    const changePassword = async (event: any) => {

        event.preventDefault();
        try{
            await UserAPI.change_password(loggedUser.token, inputs.old_password, inputs.new_password, inputs.confirm_password);
            setAlert("password has been changed! use the new password on the next login!");
            navigate("/profile/"+loggedUser.id);
        }catch(error){
            setAlert("operation failed!", "danger");
        }

    };

    const inputChange = (value: any, input_name: ("old_password"|"confirm_password"|"new_password")) => {
        setInput({...inputs, [input_name]: value});
    };

    return (
        <div>
            <NavBar />
            <div className="container bg-white pt-4 mt-5">
                <h3 className="card-title text-center mb-3">Create New User</h3>
                <form onSubmit={changePassword} className='card-body'>
                    
                    <span>Old Password</span>
                    <div className="input-group mb-3">
                        <input 
                            className="form-control form-cotnrol-lg" 
                            type="password" 
                            placeholder='Old Password'
                            value={inputs.old_password} 
                            onChange={event => {inputChange(event.target.value, "old_password")}} 
                        />
                    </div>
                    <span>New Password</span>
                    <div className="input-group mb-3">
                        <input 
                            className="form-control form-cotnrol-lg" 
                            type="password" 
                            placeholder='New Password' 
                            value={inputs.new_password} 
                            onChange={event => {inputChange(event.target.value, "new_password")}} 
                        />
                    </div>
                    <span>Confirm Password</span>
                    <div className="input-group mb-3">
                        <input 
                            className="form-control form-cotnrol-lg" 
                            type="password" 
                            placeholder='Confirm Password' 
                            value={inputs.confirm_password} 
                            onChange={event => {inputChange(event.target.value, "confirm_password")}} 
                        />
                    </div>
                    <button className='btn btn-dark btn-lg' type="submit">
                        <i className='bi bi-sd-card' /> Save
                    </button>
                </form>
            </div>
        </div>
    );
    
}