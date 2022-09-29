import React, { useEffect, useState } from "react";
import logo from "../memories.png";
import "./NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "../Redux/Actions/ActionCreators";
import { createImageFromInitials } from "../Utilities/ImageInitials";
import { getRandomColor } from "../Utilities/RandomColor";
import decode from 'jwt-decode';
import memoriesLogo from "../../Images/memories-Logo.png";
import memoriesText from "../../Images/memories-Text.png";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));



  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  function logout() {
    dispatch(LogoutAction());
    navigate("/auth");
    setUser(null);
  }


  const local = location.pathname.substring(7);
  const locationPath = ["/memories", "/memories/search", `/memories/${local}`];

  const image = user?.userToken.imageUrl;
  const name = user?.userToken.name;

  const authLocation = "/auth"



  return (
    <div className="app_bar">
      <div className="app_bar_recog">
        <h2 className="app_title">
          <Link to="/" className="mem_link">
            {
              location.pathname === authLocation ? "Memories" : <img className="text_image" src={memoriesText} alt="" />
            }
          </Link>
        </h2>
        <img src={location.pathname === authLocation ? logo : memoriesLogo} alt="" className="app_image" />
      </div>
      <div className="toolbar">
        {user ? (
          <div className="profile">
            <div className="profile_avatar_container">
              <img
                className="profile_avatar"
                src={
                  !image ? 
                  createImageFromInitials(500, name, getRandomColor())
                  : image.toString()
                }
                alt=""
              />
            </div>
            <div className="profile_avatar_name">
              <span>{user.userToken.name}</span>
            </div>
            <div>
              <button onClick={logout} className="profile_avatar_logout">
                Logout
              </button>
            </div>
          </div>
        ) : (
          locationPath.includes(location.pathname) && (
            <div>
              <button className="sign_link_button">
                <Link to="/auth" className="sign_link">
                  SIGN IN
                </Link>
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default NavBar;
