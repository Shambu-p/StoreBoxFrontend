import { stringify } from "querystring";
import React, { useState } from "react";
import NavBar from "../../components/Bars/NavBar";

export default function () {

    const [inputs, setInput] = useState<{name: string, email: string, password: string}>({
        name: "",
        email: "",
        password: "password"
    });

    const createUser = (event: any) => {
        event.preventDefault();

    };

    const inputChange = (value: any, input_name: ("name"|"email"|"password")) => {
        setInput({...inputs, [input_name]: value});
    };

    return (
        <div>
            <NavBar />
            <div className="container bg-white pt-4 mt-5">
                <h3 className="card-title text-center mb-3">Create New User</h3>
                <form onSubmit={createUser} className='card-body'>
                    <span>Full Name</span>
                    <div className="input-group mb-3">
                        <input 
                            className="form-control form-cotnrol-lg" 
                            type="text" 
                            placeholder='Full Name' 
                            value={inputs.name} 
                            onChange={event => {inputChange(event.target.value, "name")}} 
                        />
                    </div>
                    <span>Email Address</span>
                    <div className="input-group mb-3">
                        <input 
                            className="form-control form-cotnrol-lg" 
                            type="email" 
                            placeholder='Email Address' 
                            value={inputs.email} 
                            onChange={event => {inputChange(event.target.value, "email")}} 
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