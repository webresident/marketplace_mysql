
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
  Link,
  Outlet
} from "react-router-dom";



import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";

import Test from "./pages/Test";
import "./style.css";

import { useEffect, useState } from "react";
import ClientInfo from "./pages/ClientInfo";
import SupplierInfo from "./pages/SupplierInfo";
import Products from "./pages/Products";
import UpdateUserInfo from "./pages/UpdateUserInfo";

function App() {
  const [user, setUser] = useState(null);
  const handleLogin = (username, roleType, roleLabel) => {
    setUser({
      name: username,
      roleType: roleType,
      roleLabel: roleLabel
    });
    window.user = {
      username: username,
      roleType: roleType,
      roleLabel: roleLabel
    };
  }
  const handleLogout = () => {
    setUser(null);
    window.user = null;
    <Navigate to="/login"></Navigate>
  }
  const ProtectedRoute = ({user}) => {
    return user?<Outlet />:<Navigate to="/login"></Navigate>;
  };
  // {
  //   user ? (<button onClick={handleLogout}>Sign out</button>)
  //   :(<button onClick={handleLogin}>Sign in</button>)
  // }
  
  return (
    <div className="App">
      <BrowserRouter>
      <Header user={user} handleLogout={handleLogout}></Header>
      
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
          <Route path="/register" element={<Register></Register>}/>
          <Route element={<ProtectedRoute user={user}/>}>
            <Route path="/products" element={<Products/>}/>
            <Route path="/client" element={<ClientInfo/>}/>
            <Route path="/supplier" element={<SupplierInfo/>}/>
            <Route path="/userinfo/update" element={<UpdateUserInfo/>}/>
          </Route>
        
          
        </Routes>
        
        
      </BrowserRouter>


      

      
    </div>
  );
}

export default App;
