import "./App.css";
import React from "react";
import Posts from "./NonReduxComponent/Posts/Posts";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Form from "./NonReduxComponent/Form/Form";

function App(){

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/addimage"
                        element={<Form/>}
                    />
                    <Route
                        path="/allimages"
                        element={<Posts/>}
                    />
                    <Route
                        path="/"
                        element={<Posts/>}
                    />
                    <Route
                        path="/editimage/:id"
                        element={<Form/>}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
