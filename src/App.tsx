import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Error from "./views/Error";
import AuthContext from "./Contexts/AuthContext";
import AlertContext from "./Contexts/AlertContext";
import Alert from "./components/Extra/Alert";
import Waiting from "./components/Extra/Waiting";
import {useCookies} from "react-cookie";
import { information } from "./API.Interaction/AuthAPI";
import Login from "./views/Login";
import SideBarComponent from "./components/Bars/SideBar";
import Home from "./views/Home";
import Items from "./views/Items/Items";
import BoxeItems from "./views/Boxes/BoxeItems";
import StoreList from "./views/Stores/StoreList";
import AddItem from "./views/Items/AddItem";
import StoreItemList from "./views/Stores/StoreItemList";
import AddStore from "./views/Stores/AddStore";
import EditStore from "./views/Stores/EditStore";
import ViewStore from "./views/Stores/ViewStore";
import AddStoreItem from "./views/Stores/AddStoreItem";
import EditStoreItem from "./views/Stores/EditStoreItem";
import EditItem from "./views/Items/EditItem";
import CreateUser from "./views/Users/CreateUser";
import UserList from "./views/Users/UserList";
import Profile from "./views/Users/Profile";
import ChangePassword from "./views/Users/ChangePassword";
import ScanBox from "./views/Boxes/ScanBox";


export default function (params: any) {

    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [loggedUser, setLoggedUser] = useState<null | any>(null);
    const [cookies, setCookie, removeCookie] = useCookies(["login_token"]);
    const [authWaiting, setAuthWaiting] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showWaiting, setWaiting] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"success"|"danger"|"warning"|"info"|"primary">("danger");
    const [alertMessage, setMessage] = useState<string>("");
    const [SideBar, setSideBar] = useState<boolean>(false);

    useEffect(() => {

        const checkAuth = async (token: string) => {

            setTimeout(() => {setAuthWaiting(true);}, 1);
            let response = await information(token);
            setLoggedIn(response.status);
            setLoggedUser(response.data);
            setAuthWaiting(false);

        };

        // if(cookies.login_token && cookies.login_token != "") {
        //     checkAuth(cookies.login_token);
        // }


    }, []);

    const setAlert = (
        message: string,
        type: "success"|"danger"|"warning"|"primary"|"info"
    ) => {

        setAlertType(type);
        setShowAlert(true);
        setMessage(message);

        setTimeout( () => {
            setShowAlert(false);
        }, 3000);

    }

    return (
        <AlertContext.Provider 
            value={{
                showAlert, 
                alertType, 
                setAlertType, 
                setAlert, 
                setWaiting, 
                SideBar, 
                setSideBar
            }}
        >
            <AuthContext.Provider 
                value={{
                    isLoggedIn, 
                    loggedUser, 
                    setLoggedUser, 
                    setLoggedIn, 
                    setCookie, 
                    cookies, 
                    removeCookie, 
                    authWaiting
                }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/items" element={<Items />} />
                        <Route path="/box_item" element={<BoxeItems />} />
                        <Route path="/box_search" element={<ScanBox />} />

                        <Route path="/stores" element={<StoreList />} />
                        <Route path="/add_item" element={<AddItem />} />
                        <Route path="/edit_item" element={<EditItem />} />
                        <Route path="/store_items" element={<StoreItemList />} />
                        <Route path="/add_store" element={<AddStore />} />
                        <Route path="/edit_store" element={<EditStore />} />
                        <Route path="/view_store" element={<ViewStore />} />
                        <Route path="/add_store_item" element={<AddStoreItem />} />
                        <Route path="/edit_store_item" element={<EditStoreItem />} />

                        <Route path="/create_user" element={<CreateUser />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/change_password" element={<ChangePassword />} />

                        {/* <Route path="/admin" element={<AdminMain />}> */}
                            {/* <Route path="home" element={<Home />}/> */}
                        {/* </Route> */}
                        <Route path="*" element={<Error/>} />
                    </Routes>

                    {SideBar ? (<SideBarComponent />) : <></>}

                </BrowserRouter>
            </AuthContext.Provider>
            {showAlert ? (<Alert message={alertMessage} color={alertType} />) : ""}
            {showWaiting ? (<Waiting />) : ""}
        </AlertContext.Provider>
    );

}