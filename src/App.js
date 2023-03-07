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
import MyPosts from './pages/MyPosts';

//packages imports
import { Routes, Route } from "react-router-dom";
import { useState } from "react";


function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [show, setModalShow] = useState(false);
  const [modalConfirmFn, setModalConfirmFn] = useState();
  const [modalText, setModalText] = useState("");

  const hideModal = () => setModalShow(false)

  const modalConfirmPress = () => {
    modalConfirmFn();
    setModalShow(false);
    setModalConfirmFn(() => () => { });
  }

  const props = {
    show,
    hideModal,
    setModalShow,
    isAuth,
    setIsAuth,
    modalText,
    setModalText,
    modalConfirmPress,
    setModalConfirmFn
  }


  return (
    <>
      {console.log('APP.JS RENDERED')}
      <Model {...props} />
      <NavBar {...props} />
      <Routes>
        <Route path="/" element={<Home {...props} />} />
        <Route path="/createpost" element={<CreatePost {...props} />} />
        <Route path="/login" element={<Login {...props} />} />
        <Route path="/mypost" element={<MyPosts {...props} />} />
        <Route path="/posts/:postId" element={<SinglePost {...props} />} />
        <Route path="*" element={<h1 className='text-center mt-5'>404 page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
