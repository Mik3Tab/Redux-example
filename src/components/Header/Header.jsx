import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../features/auth/authSlice";
const Header = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const onLogout = (event) =>{
        event.preventDefault();
        dispatch(logout());
        navigate("/login");
    };
    return(
        <nav>
            <span>Header</span>
        <div>
        {
        user ? <>
        <span><Link to="/" onClick={onLogout}>Logout</Link></span>
        <span><Link to="/profile">{user.user.name}</Link></span>
        </>
        :
        <>
        <span><Link to ="/login">Login </Link></span>
        <span><Link to="/Register">Register</Link></span>
        </>
            }   
        {user?.rol === 'admin' ? <span><Link to="/admin">Admin</Link></span>:''}
        </div>
        </nav>
    );
}

export default Header;