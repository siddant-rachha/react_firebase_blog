
//redux store imports
import { useSelector, useDispatch } from 'react-redux'
import { modelActions } from '../store/modelSlice';
import { isAuthActions } from '../store/isAuthSlice';
//

//router
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";

//firebase
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

//react
import { useEffect } from 'react';

//bootstrap
import { Container, Button, Nav, Navbar } from 'react-bootstrap';



function NavBar() {

    const navigate = useNavigate();
    const location = useLocation();

    //redux
    const dispatch = useDispatch()
    const model = useSelector((state) => state.model)
    const authState = useSelector((state) => state.authState)
    //

    const logoutClicked = () => {
        dispatch(modelActions.setModel({ text: "Do you want to logout?", display: true, btnFunction: "logout" }))
    }

    const login = () => {
        navigate('/login');
    };

    useEffect(() => {
        if (model.btnFunction == 'logout') {
            signOut(auth).then(() => {

                dispatch(isAuthActions.setIsAuth({uid:"", displayName: "", isAuth: false}))
                navigate('/login');
                dispatch(modelActions.setModel({ text: "", display: false, btnFunction: "" }))

            })
        }
    }, [model.pressed])

    return (
        <>
            {console.log('NAVBAR COMPONENT.JS RENDERED')}

            <Navbar bg="dark" variant="dark">
                <Container className='flex-wrap'>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            className={`${location.pathname == '/' && "brand-active"}` + ` d-inline-block align-top`}
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
                        {authState.isAuth == true ? <Button onClick={logoutClicked} variant="outline-danger">Logout</Button> :
                            <Button onClick={login} variant="outline-light">Login</Button>}
                    </Nav>
                    {authState.isAuth == true && <p style={{ fontSize: "x-small" }} className='position-absolute start-0 bottom-0 mb-0 text-light text-muted'>@ {authState.displayName}</p>}
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;