import React from 'react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
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
        }
      ];
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: roleOptions[0].value
  });
  


  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser(prev => ({...prev, [e.target.name]: e.target.value}) );
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try{
        for(let property in newUser){
            if(newUser[property]==""){
                alert("Please, fill up all fields!");
                return;
            }
        }

        const res = await axios.get("http://localhost:8800/verify-register", newUser);
        let isUsernameUnique = true;
        for(let i = 0; i < res.data.length; i++){
            if(res.data[i]["username"] === newUser.username){
                isUsernameUnique = false;
                break;
            }
        }

        if(isUsernameUnique){
            await axios.post("http://localhost:8800/register", newUser);
            alert("You were registered with success. Please sign in")
            navigate("/login");
        }else{
            alert("Please, choose another username!");
        }
        
    }catch(error){
        console.log(error);
    }
  };
  return (
    <div>
    <div className="container">
        <div className="registration form">
            <h1>Registration</h1>
            <label>Username</label>
            <input 
            type={"text"}
            onChange={handleChange}
            name="username"
            />
            <label>Password</label>
            <input 
            type={"text"}
            onChange={handleChange}
            name="password"
            />
            <label>First Name</label>
            <input 
            type={"text"}
            onChange={handleChange}
            name="firstName"
            />
            <label>Last Name</label>
            <input 
            type={"text"}
            onChange={handleChange}
            name="lastName"
            />
            <label>Role</label>

            <select className="role-choice" id="role" name="role" onChange={handleChange}>
                {
                    roleOptions.map((option) => (
                        <option value={option.value} key={option.id}>{option.label}</option>
                    ))
                }
            </select>
            <button className="formButton" onClick={handleClick}>Register</button>
            <button className="formButton">
                <NavLink to="/login">
                    <div className="nav-text">
                    Login
                    </div>
                </NavLink>
            </button>
        </div>
    </div>
    </div>
  )
}

export default Register;
