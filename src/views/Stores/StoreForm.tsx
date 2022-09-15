import React, { useEffect, useState } from "react";
import NavBar from "../../components/Bars/NavBar";
import BoxItemCard from "../../components/BoxItemCard";
import ItemCard from "../../components/Item/ItemCard";
import Store from "../../Models/Store";

export default function ({type, store}: {type: string, store?: Store}) {

    const [data, setData] = useState<any>({
        id: 0,
        name: "",
        store_keeper: 0
    });

    useEffect(() => {
        if(type == "change" && store){
            setData({
                id: store.id,
                name: store.name,
                store_keeper: store?.storekeeper
            });
        }
    }, [store, type]);

    const inputChange = (value: any, input_name: ("name"|"store_keeper")) => {
        setData({...data, [input_name]: value});
    };

    const createStore = (event: any) => {
        event.target.prevetDefault();
    };

    const changeStore = (event: any) => {
        event.target.prevetDefault();
    };

    return (
        <form onSubmit={type == "new" ? createStore : changeStore} className='card-body'>
            <span>Store Name</span>
            <div className="input-group mb-3">
                <input className="form-control form-cotnrol-lg" type="text" placeholder='Store Name' value={data.name} onChange={event => {inputChange(event.target.value, "name")}} />
            </div>
            <span>Store Keeper</span>
            <div className="input-group mb-3">
                <select className="form-control form-cotnrol-lg" title='Store Keeper' value={data.store_keeper} onChange={event => {inputChange(event.target.value, "store_keeper")}} >
                    <option value="1">Abnet Kebede</option>
                    <option value="2">Babbi Kebede</option>
                </select>
            </div>
            <button className='btn btn-dark' type="submit">
                <i className='bi bi-sd-card' /> Save
            </button>
        </form>
    );
    
}