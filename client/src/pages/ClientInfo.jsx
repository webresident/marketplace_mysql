import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';


const ClientInfo = () => {
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
                currentAmount: dataInfo.currentAmount
            })
        } catch (err) {
            console.log(err);
        }
      };
      fetchCurrentUserInfo();
    }, []);

    return (
    <div>
      <div className="container">
        <div className="container-info">
            
            <table className="user-table">
            <tr>
                <th>Your Username:</th>
                <th>{userInfo?userInfo.username: ""}</th>
            </tr>
            <tr > 
                <th>Your Password:</th>
                <th>{userInfo?userInfo.password: ""}</th>
            </tr> 
            <tr>
                <th>Your First Name:</th>
                <th>{userInfo?userInfo.firstName: ""}</th>
            </tr>
            <tr>
                <th>Your Second Name:</th>
                <th>{userInfo?userInfo.lastName: ""}</th>
            </tr>
            <tr>
                <th>Your Money:</th>
                <th>{userInfo?userInfo.currentAmount: ""}</th>
            </tr>
            </table>
            <div className="tableButton">
                <button className="formButton">
                    <NavLink to="/userinfo/update">
                    <div className="nav-text">
                        Update
                    </div>
                    </NavLink>
                    
                </button>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default ClientInfo
