// css imports
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

// components imports
import Model from './components/Model';
import NavBar from "./components/NavBar";

//pages imports
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";

//packages imports
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";


function App() {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [modalShow, setModalShow] = useState(false);
  const [modalConfirmFn, setModalConfirmFn] = useState();
  const [modalText, setModalText] = useState("");

  const hideModal = () => setModalShow(false)

  const modalConfirmPress = () => {
    modalConfirmFn();
    setModalShow(false);
    setModalConfirmFn(() => () => { });
  }



  return (
    <>
      {console.log('APP.JS RENDERED')}
      <Model
        show={modalShow}
        hideModal={hideModal}
        modalConfirmPress={modalConfirmPress}
        modalText={modalText} />
      <NavBar
        setIsAuth={setIsAuth}
        isAuth={isAuth}
        setModalConfirmFn={setModalConfirmFn}
        setModalText={setModalText}
        setModalShow={setModalShow} />
      <Routes>
        <Route path="/" element={<Home
          isAuth={isAuth}
          setModalConfirmFn={setModalConfirmFn}
          setModalText={setModalText}
          setModalShow={setModalShow} />} />
        <Route path="/createpost" element={<CreatePost
          setModalConfirmFn={setModalConfirmFn}
          isAuth={isAuth}
          setModalShow={setModalShow}
          setModalText={setModalText} />} />
        <Route path="/login" element={<Login
          setModalConfirmFn={setModalConfirmFn}
          setIsAuth={setIsAuth}
          setModalText={setModalText}
          setModalShow={setModalShow} />} />
        <Route path="/mypost" element={<Home />} />
        <Route path="/:id" element={<SinglePost />} />
      </Routes>
    </>
  );
}

export default App;
