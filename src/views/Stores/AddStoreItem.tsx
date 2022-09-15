import React from 'react';
import NavBar from '../../components/Bars/NavBar';

export default function(){

    const addItem = (event: any) => {
        event.target.preventDefault();
    };

    const inputChange = (value: any, input: ("item"|"")) => {

    }
    return (
        <div>
            <NavBar />
            <div className="container bg-white mt-5 p-3">
                <h3 className="card-title mb-3">Add Item to Store</h3>
                <form onSubmit={addItem}>
                    <div className="input-group mb-3">
                        <select className="form-control form-control-lg" >
                            <option value="1">Desktop Computer</option>
                            <option value="1">Desktop Computer</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control form-control-lg" placeholder="Total Amount" />
                    </div>
                    <button className="btn btn-dark btn-lg" type="submit">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
    
}