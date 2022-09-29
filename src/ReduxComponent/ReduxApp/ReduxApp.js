import React from 'react';
import NavBar from '../NavBar/NavBar';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from '../Home/Home';
import "./ReduxApp.css";
import Auth from '../Auth/Auth';
import PostDetails from '../PostDetails/PostDetails';




function ReduxApp() {

    const user = JSON.parse(localStorage.getItem("profile"));

    return (
        <BrowserRouter>
            <div className="app">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Navigate to="/memories" />} />
                    <Route path='/memories' exact element={<Home />} />
                    <Route path='/memories/search' exact element={<Home />} />
                    <Route path='/memories/get/:id' element={<PostDetails />}/>
                    <Route 
                        path="/auth"
                        element={
                            user ? <Navigate to="/memories" /> : <Auth />
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>

    )
}

export default ReduxApp;