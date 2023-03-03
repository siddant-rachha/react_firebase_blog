import React from 'react';
import { Link, useNavigate } from "react-router-dom";

function NavBar({ isAuth, signUserOut }) {

    const navigate = useNavigate();

    const login = () => {
        navigate('/login');
    };

    return (
        <nav>
            <Link to="/"> Home </Link>
            <Link to="/createpost"> Create Post </Link>

            {!isAuth ?
                <button className='logout' onClick={login}> Login </button> :
                <button className="logout" onClick={signUserOut}> Log Out</button>
            }
        </nav>
    )
}

export default NavBar;