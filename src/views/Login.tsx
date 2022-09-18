import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {Login} from "../API.Interaction/AuthAPI";
import AlertContext from "../Contexts/AlertContext";
import AuthContext from "../Contexts/AuthContext";

export default function (){

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const [inputs, setInputs] = useState<{email: string, password: string}>({email: "", password: ""});

    const navigate = useNavigate();

    // useEffect(() => {

    //     const checkLogin = () => {
    //         if(isLoggedIn) {
    //             navigate("/home");
    //         }
    //     };

    // }, [isLoggedIn]);


    let inputOnChange = (input_name: "email"|"password", value: any) => {
        setInputs({...inputs, [input_name]: value});
    };

    const handleSubmit = (e: any) => {
        setInputs({...inputs, [e.target.name] : [e.target.value]})
    }

    let submitForm = async (event: any) => {
        event.preventDefault();
        setTimeout(() => {setWaiting(true)}, 1);
        try {

            let response = await Login(inputs.email, inputs.password);
            
            setCookie("login_token", response.token, {path: "/"});
            setLoggedUser(response);
            setLoggedIn(true);

            setWaiting(false);
            setAlert("login successful", "success", "top-right-alert")

            navigate("/");

        }catch (error: any){
            setAlert("incorrect email or password", "danger", "top-right-alert")
            setWaiting(false);
        }
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center" style={{width: "100%"}}>
                <form onSubmit={submitForm} className="login-form-container pt-3 pb-3 mt-4">
                    <div className="mb-3 d-flex justify-content-center">
                        <i className="bi bi-person-badge-fill" style={{fontSize: "4rem"}} />
                    </div>

                    <div className="input-group mb-3">
                        <input 
                            required 
                            type="email" 
                            placeholder="email address" 
                            className="form-control form-control-lg"
                            onChange={(event: any) => inputOnChange("email", event.target.value)}
                        />
                    </div>
                    <div className="input-group mb-4">
                        <input 
                            required 
                            type="password" 
                            placeholder='Password' 
                            className='form-control form-control-lg'
                            onChange={(event: any) => inputOnChange("password", event.target.value)}
                        />
                    </div>

                    <button type="submit" className='btn btn-dark btn-lg w-100'>
                        Sign In
                    </button>

                </form>
            </div>
        </div>
    );
}