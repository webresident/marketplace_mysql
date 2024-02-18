import React from 'react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = ({handleLogin}) => {
    const navigate = useNavigate();
    const roleOptions = [
        {
            id: 1,
            label: "Client",
            value: "client"
        },
        {
            id: 2,
            label: "Supplier",
            value: "supplier"
        },
        {
            id: 3,
            label: "Admin",
            value: "admin"
        }
    ];
    const [loginUser, setLoginUser] = useState({
        username: "",
        password: "",
        role: roleOptions[0].value
    });
    const handleChange = (e) => {
        setLoginUser(prev => ({...prev, [e.target.name]: e.target.value}) );
    };
  
  const handleClick = async (e) => {
    e.preventDefault();
    try{
        await axios.post("http://localhost:8800/login", loginUser).then((response)=>{
            
            if(response.data.message){
                alert("Incorect username or password!");
            }else{
                let userRole = loginUser.role.slice();
                handleLogin(response.data[0].username, loginUser.role, userRole.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase()));
                navigate("/");
            }
        });

        
    }catch(error){
        console.log(error);
    }
  };  

  return (
    <div>
    <div className="container">
        <div className="login form">
            <h1>Login</h1>
            <label>Username</label>
            <input 
            type={"text"}
            onChange={handleChange}
            name="username"
            />
            <label>Password</label>
            <input 
            type={"password"}
            onChange={handleChange}
            name="password"
            />
            <label>Role</label>
            <select className="role-choice" id="role" name="role" onChange={handleChange}>
                {
                    roleOptions.map((option) => (
                        <option value={option.value} key={option.id}>{option.label}</option>
                    ))
                }
            </select>
            <button className="formButton" onClick={handleClick}>Login</button>
            <button className="formButton">
                <NavLink to="/register">
                    <div className="nav-text">
                    Register
                    </div>
                </NavLink>
            </button>
        </div>
    </div>

    </div>
  )
}

export default Login
