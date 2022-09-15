import React, { useContext } from 'react';
import AlertContext from '../../Contexts/AlertContext';

export default function (){

    const {setSideBar} = useContext(AlertContext);

    return (
        <div className="top_navbar d-flex justify-content-left p-2 border-bottom bg-white shadow">
            <i className="bi bi-justify" style={{fontSize: "2rem", cursor: "pointer"}} onClick={(event: any) => setSideBar(true)} />
            <span className='ml-4' style={{fontSize: "2rem"}}>
                Store Box
            </span>
        </div>
    );

};