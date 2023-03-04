import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase-config";
import { signOut } from "firebase/auth";



function NavBar({ isAuth, setModalText, setModalShow, setModalConfirmFn, setIsAuth }) {

    const navigate = useNavigate();

    const logoutClicked = () => {
        setModalText("Do you want to logout?")
        setModalShow(true)
        setModalConfirmFn(() => () =>
            signOut(auth).then(() => {
                localStorage.clear();
                setIsAuth(false);
                navigate('/login');
            })
        )
    }

    const login = () => {
        navigate('/login');
    };

    return (
        <nav>

            <Link to="/"> Home </Link>
            <Link to="/createpost"> Create Post </Link>

            {!isAuth ?
                <button className='logout' onClick={login}> Login </button> :
                <button className="logout" onClick={logoutClicked}> Log Out</button>
            }
        </nav>
    )
}

export default NavBar;