import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from '@fortawesome/free-brands-svg-icons' 
function Login({ setIsAuth, setModalShow, setModalText, setModalConfirmFn }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("authuid", auth.currentUser.uid);
      setIsAuth(true);
      navigate("/");
      setModalShow(true);
      setModalText("Login Successful")
      setModalConfirmFn(() => () => { });

    });
  };

  return (
    <Container style={{height:"50vh"}} className="d-flex flex-column align-items-center justify-content-center">
        <p className="">Sign In With Google to Continue</p>
        <Button onClick={signInWithGoogle}><FontAwesomeIcon className="me-3" icon={faGoogle} />Sign in Google</Button>
    </Container>

  );
}

export default Login;
