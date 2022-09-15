import React from 'react';
import NavBar from '../../components/Bars/NavBar';

export default function(){

    const changeItem = (event: any) => {
        event.target.preventDefault();
    };

    const inputChange = (value: any, input: ("item"|"")) => {

    }

    return (
        <div>
            <NavBar />
            <div className="container bg-white mt-5 p-3">
                <h3 className="card-title mb-3">Add Item to Store</h3>
                <ul className="list-group">
                    <li className="list-group-item">Item: </li>
                    <li className="list-group-item">Total Amount:</li>
                    <li className="list-group-item">
                        Unboxed Amount 
                        <div className="input-group">
                            <button className="btn btn-dark btn-sm">-</button>
                            <input type="number" className="form-control form-control-sm" />
                            <button className="btn btn-dark btn-sm">+</button>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <button className="btn btn-primary" >Save</button>
                    </li>
                </ul>
            </div>
        </div>
    );
    
}