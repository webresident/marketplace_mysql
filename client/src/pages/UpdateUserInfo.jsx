import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';


const UpdateUserInfo = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
      const fetchCurrentUserInfo = async () => {
        try {
            let tempUser = {
                username: window.user.username,
                role: window.user.roleType
            };
            const res = await axios.post("http://localhost:8800/userinfo", tempUser);
            let dataInfo = res.data[0];
            setUserInfo({
                username: dataInfo.username,
                password: dataInfo.password,
                firstName: dataInfo.firstName,
                lastName: dataInfo.lastName,
                currentAmount: dataInfo.currentAmount,
                role: window.user.roleType
            })
        } catch (err) {
            console.log(err);
        }
      };
      fetchCurrentUserInfo();
    }, []);


    const handleChange = (e) => {
        setUserInfo(prev => ({...prev, [e.target.name]: e.target.value}) );
    };
    const updateInfoInTable = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8800/userinfo/update-execute", userInfo);
            navigate(-1);
          } catch (err) {
            console.log(err);
          }
    }
  return (
    <div>
      <div className="container">
        <div className="container-info">
            
            <table className="user-table">
            <tr>
                <th>Your Username:</th>
                <th>{userInfo?userInfo.username: ""}</th>
            </tr>
            <tr> 
                <th>Your Password:</th>
                <th>
                    <input 
                    type={"text"}
                    name="password"
                    value={userInfo?userInfo.password: ""}
                    onChange={handleChange}
                    />  
                    
                </th>
            </tr> 
            <tr>
                <th>Your First Name:</th>
                <th>
                    <input 
                    type={"text"}
                    name="firstName"
                    value={userInfo?userInfo.firstName: ""}
                    onChange={handleChange}
                    /> 
                </th>
            </tr>
            <tr>
                <th>Your Second Name:</th>
                <th><input 
                    type={"text"}
                    name="lastName"
                    value={userInfo?userInfo.lastName: ""}
                    onChange={handleChange}
                    />
                </th>
            </tr>
            <tr>
                <th>Your Money:</th>
                <th>{userInfo?userInfo.currentAmount: ""}</th>
            </tr>
            </table>
                <button className="formButton" onClick={updateInfoInTable}>
                    <NavLink to="/userinfo/update">
                    <div className="nav-text">
                        Change
                    </div>
                    </NavLink>
                </button>
                <button className="formButton" onClick={()=>{navigate(-1)}}>
                    <div className="nav-text">
                        Back
                    </div>
                </button>
            {/* <div className="formRow">
            <button className="formButton" onClick={getUserInfo}>Get Account Info</button>
            </div> */}
            
        </div>
      </div>
    </div>
  )
}

export default UpdateUserInfo
