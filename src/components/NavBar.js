import React, { useState } from 'react';
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { auth, provider } from "../firebase-config";
import { signOut } from "firebase/auth";

import { Container, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function NavBar({ isAuth, setModalText, setModalShow, setModalConfirmFn, setIsAuth }) {

    const navigate = useNavigate();
    const location = useLocation();


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
        <>
            <Navbar bg="dark" variant="dark">
                <Container className='flex-wrap'>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            className={`${location.pathname == '/' && "brand-active"}`+` d-inline-block align-top`}
                            src="https://icon-library.com/images/icon-blogger/icon-blogger-2.jpg"
                            width="30"
                            height="30"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Nav className="me-auto flex-wrap justify-content-start d-flex align-items-center">
                        <NavLink className="ps-sm-3 pe-sm-3 pe-2 ps-2" to='/createpost'>Create</NavLink>
                        <NavLink className="ps-sm-3 pe-sm-3 pe-2 ps-2" to='/mypost'>MyPost</NavLink>
                    </Nav>
                    <Nav className="ms-auto flex-wrap justify-content-end flex-column">
                        {!isAuth ? <Button onClick={login} variant="outline-light btn-sm">Login</Button> :
                            <><Button onClick={logoutClicked} variant="outline-danger btn-sm">Logout</Button></>}
                    </Nav>
                    {isAuth && <p style={{ fontSize: "x-small" }} className='position-absolute start-0 bottom-0 mb-0 text-light text-muted'>@ {localStorage?.name}</p>}
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;