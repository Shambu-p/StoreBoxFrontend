import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";

export default function () {

    const {loggedUser, setLoggedUser, setLoggedIn, removeCookie} = useContext(AuthContext);
    const {SideBar, setSideBar} = useContext(AlertContext);


    const navigate = useNavigate();
    const [expand, setExpand] = useState<boolean>(true);

    const logout = () => {

        const d = new Date();
        d.setTime(d.getTime() - (24*60*60*1000));

        removeCookie("login_token", {path: "/", expires: d.toUTCString()});
        setLoggedUser(null);
        setLoggedIn(false);
        navigate("/login");

    };

    const sidebarSetting = () => {
        setExpand(expand ? false : true);
    };

    const goTo = (address: string) => {
        setSideBar(false);
        navigate(address);
    };

    return (
        <div className="sidebar_container">
            <div className="sidebar pb-3">
                <div className="d-flex justify-content-between border-bottom mb-3 p-1">
                    <span style={{fontSize: "2rem"}} >Store Box</span>
                    <i className="bi bi-x sidebar-button" onClick={(e: any) => setSideBar(false)} />
                </div>
                <div id="sidebar_content">
                    <div className="mb-3">
                        <button
                            className="sidebar-item d-flex justify-content-end"
                            onClick={() => {goTo("/home")}}
                        >
                            Home
                            <i className="bi bi-house-fill ml-2"/>
                        </button>

                        <button
                            className="sidebar-item d-flex justify-content-end"
                            onClick={() => {goTo("/items")}}
                        >
                            Items
                            <i className="bi bi-collection-fill ml-2"/>
                        </button>

                        <button
                            className="sidebar-item d-flex justify-content-end"
                            onClick={() => {goTo("/box_search")}}
                        >
                            Find Box
                            <i className="bi bi-box ml-2"/>
                        </button>

                        <button
                            className="sidebar-item d-flex justify-content-end"
                            onClick={() => {goTo("/stores")}}
                        >
                            Stores
                            <i className="bi bi-archive-fill ml-2"/>
                        </button>

                        <button
                            className="sidebar-item d-flex justify-content-end"
                            onClick={() => {goTo("/users")}}
                        >
                            Users
                            <i className="bi bi-people-fill ml-2"/>
                        </button>

                    </div>

                    <div className="mb-3">
                        <button
                            className="sidebar-item d-flex justify-content-end"
                            onClick={() => {goTo("/profile")}}
                        >
                            Profile
                            <i className="bi bi-person-badge-fill ml-2"/>
                        </button>
                        <button
                            className="sidebar-item d-flex justify-content-end"
                        >
                            Sign Out
                            <i className="bi bi-door-closed ml-2"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}