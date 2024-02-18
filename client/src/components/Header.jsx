import React from 'react';
import {NavLink, Navigate, useNavigate} from "react-router-dom";

const Header = ({user, handleLogout}) => {
  const navigate = useNavigate();
  const handleClick = ()=>{
    if(user){
      handleLogout();
    }else{
      navigate("/login");
    }
  };
  return (
    <div className="header">
      <div className="nav-link">
        <NavLink to="/">
          <div className="nav-text">Home</div>
        </NavLink>
      </div>
      <div className="nav-link">
        <NavLink to="/products">
          <div className="nav-text">Products</div>
        </NavLink>
      </div>
      {
        user && user.roleType === "client"?
        <div className="nav-link">
          <NavLink to="/client">
            <div className="nav-text">Client Info</div>
          </NavLink>
        </div>
        :""
      }
      {
        user && user.roleType === "supplier"?
        <div className="nav-link">
          <NavLink to="/supplier">
            <div className="nav-text">Supplier Info</div>
          </NavLink>
        </div>
        :""
      }
      

      <div className="header_user-info">
        <div className="column-info">
          <div className="header-info">Username: </div>
          <div className="header-info">Role: </div>
        </div>
        <div className="column-info">
          <div className="detail-info">{user ? user.name: "Unknown"}</div>
          <div className="detail-info">{user ? user.roleLabel: "Unknown"}</div>
        </div>
        <div className="column-info">
          <div className="nav-link">
            <button className="loginButton" onClick={handleClick}>
              <div className="nav-text">{user ? "Logout": "Login"}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Header;
