import React, { useState } from "react";
import NavBar from "../../components/Bars/NavBar";

export default function () {

    const [inputs, setInput] = useState<{box_id: string}>({
        box_id: ""
    });

    const findBox = (event: any) => {
        event.preventDefault();

    };

    const inputChange = (value: any, input_name: string) => {
        setInput({...inputs, [input_name]: value});
    };

    return (
        <div>
            <NavBar />
            <div className="container bg-white pt-4 mt-5">
                <h3 className="card-title text-center mb-3">Find/Scan Box</h3>
                <form onSubmit={findBox} className='card-body'>
                    
                    <div className="input-group mb-3">
                        <input 
                            className="form-control form-control-lg" 
                            type="number" 
                            placeholder='Confirm Password' 
                            value={inputs.box_id} 
                            onChange={event => {inputChange(event.target.value, "box_id")}} 
                        />
                        <button className="btn btn-light btn-lg">
                            <i className='bi bi-upc-scan' />                            
                        </button>
                    </div>
                    <button className='btn btn-dark btn-lg' type="submit">
                        <i className='bi bi-search' /> Find
                    </button>
                </form>
            </div>
        </div>
    );
    
}