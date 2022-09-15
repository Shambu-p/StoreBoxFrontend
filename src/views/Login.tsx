import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {Login} from "../API.Interaction/AuthAPI";
import NavBar from '../components/Bars/NavBar';
import AlertContext from "../Contexts/AlertContext";
import AuthContext from "../Contexts/AuthContext";

export default function (){

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const [inputs, setInputs] = useState<{email: string, password: string}>({email: "", password: ""});

    const navigate = useNavigate();

    useEffect(() => {

        const checkLogin = () => {
            if(isLoggedIn) {
                navigate("/admin/home");
            }
        };

    }, [isLoggedIn]);


    let inputOnChange = (input_name: "email"|"password", value: string|any) => {
        let inp: { email: string, password: string } = {...inputs};
        inp[input_name] = value;
        setInputs(inp);
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

            navigate("/admin/home");

        }catch ({message}){
            setAlert(message, "danger", "top-right-alert")
            setWaiting(false);
        }
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center" style={{width: "100%"}}>
                <form className="login-form-container pt-3 pb-3 mt-4">
                    <div className="mb-3 d-flex justify-content-center">
                        <i className="bi bi-person-badge-fill" style={{fontSize: "4rem"}} />
                    </div>

                    <div className="input-group mb-3">
                        <input required type="email" placeholder="email address" className="form-control form-control-lg" />
                    </div>
                    <div className="input-group mb-4">
                        <input required type="password" placeholder='Password' className='form-control form-control-lg' />
                    </div>

                    <button type="button" className='btn btn-dark btn-lg w-100'>
                        Sign In
                    </button>

                </form>
            </div>
        </div>
    );
}