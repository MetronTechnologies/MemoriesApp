import React, { useEffect, useState } from "react";
import "./Auth.css";
import Input from "./Input";
import "../font-awesome-4.7.0/css/font-awesome.css";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux"
import { AuthAction } from "../Redux/Actions/ActionCreators";
import { useNavigate } from "react-router-dom";
import { SignIn, SignUp } from "../Redux/AsyncActions/AsyncActions";

const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
}



function Auth() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    function submitHandler(e) {
        e.preventDefault();
        if (isSignUp) {
            dispatch(SignUp(formData, navigate))
        } else {
            dispatch(SignIn(formData, navigate))
        }
    }

    function changeHandler(e) {
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        );
    }

    function swichMode() {
        setIsSignUp((previousIsSignUp) => !previousIsSignUp);
    }

    async function googleSucess(response) {
        const token = response?.credential;
        let userObject = jwt_decode(token);
        const userToken = {
            email: userObject.email,
            family_name: userObject.family_name,
            given_name: userObject.given_name,
            googleId: userObject.sub,
            imageUrl: userObject.picture,
            name: userObject.name
        }

        try {
            const data = { token, userToken }
            dispatch(AuthAction(data));
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }




    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id:
                "1014711425227-j8b9f121evts1qepeq4sggd3lf9je0dc.apps.googleusercontent.com",
            callback: googleSucess,
        });

        google.accounts.id.renderButton(document.getElementById("google_sign_in"), {
            type: "standard",
            theme: "filled_blue",
            size: "large",
            shape: "rectangular",
            width: "300px",
            logo_alignment: "left",
        });
    }, []);



    return (
        <div className="auth_body">
            <div className="auth_avatar">
                <span className="auth_lock fa fa-lock fa-2x"></span>
            </div>
            <div className="auth_sign">{isSignUp ? "Sign Up" : "Sign In"}</div>
            <div>
                <form onSubmit={submitHandler}>
                    <div className="form_box">
                        {isSignUp && (
                            <div className="box_1">
                                <Input
                                    name="firstname"
                                    label="First Name"
                                    changeHandler={changeHandler}
                                    type="text"
                                    placeholder="First Name"
                                />
                                <Input
                                    name="lastname"
                                    label="Last Name"
                                    changeHandler={changeHandler}
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </div>
                        )}
                        <Input
                            name="email"
                            label="Email"
                            changeHandler={changeHandler}
                            type="email"
                            placeholder="Email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            changeHandler={changeHandler}
                            type="password"
                            placeholder="Password"
                        />
                        {isSignUp && (
                            <Input
                                name="confirmPassword"
                                label="Confirm Password"
                                changeHandler={changeHandler}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        )}
                    </div>
                    <div>
                        <button className="auth_button" type="submit">
                            {isSignUp ? "SIGN UP" : "SIGN IN"}
                        </button>
                    </div>
                    <div className="google_button" id="google_sign_in">

                    </div>
                    <div className="switcher">
                        <button className="auth_button2" onClick={swichMode}>
                            {isSignUp ? (
                                <span className="switch1">
                                    Already have an account? SIGN IN
                                </span>
                            ) : (
                                <span className="switch2">Don't have an Account? SIGN UP</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Auth;
