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
            setLoggedUser(response.data);
            setAuthWaiting(false);
            setLoggedIn(response.status);

        };

        if(cookies.login_token && cookies.login_token != "") {
            checkAuth(cookies.login_token);
        }


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
                        <Route path="/" element={isLoggedIn ? (<Home />):(<Login />)} />

                        {isLoggedIn ? (<Route path="/items" element={<Items />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/box_item" element={<BoxeItems />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/box_search" element={<ScanBox />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/stores" element={<StoreList />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/add_item" element={<AddItem />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/edit_item/:item_id" element={<EditItem />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/store_items/:store_id" element={<StoreItemList />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/add_store" element={<AddStore />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/edit_store/:id" element={<EditStore />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/view_store/:id" element={<ViewStore />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/add_store_item/:store_id" element={<AddStoreItem />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/edit_store_item/:id" element={<EditStoreItem />} />):(<></>)}
                        
                        {isLoggedIn ? (<Route path="/create_user" element={<CreateUser />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/users" element={<UserList />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/profile/:id" element={<Profile />} />):(<></>)}
                        {isLoggedIn ? (<Route path="/change_password/:id" element={<ChangePassword />} />):(<></>)}

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