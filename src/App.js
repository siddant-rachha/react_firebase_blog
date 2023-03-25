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
import Payment from './pages/Payment';

//packages imports
import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//redux store imports
import { useDispatch } from 'react-redux';
import { isAuthActions } from './store/isAuthSlice'
import Completion from './pages/Completion';
import { postActions } from './store/postSlice';

const auth = getAuth();


function App() {

  const dispatch = useDispatch()

  onAuthStateChanged(auth, (user) => {

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      dispatch(isAuthActions.setIsAuth({
        isAuth: true,
        uid: user.uid,
        displayName: user.displayName,
        email: user.email
      }))
      dispatch(postActions.setAuthor({ name: user.displayName, id: user.uid }))

    } else {
      // User is signed out
      dispatch(isAuthActions.setIsAuth({
        isAuth: false,
        uid: "",
        displayName: ""
      }))
    }

  });


  return (
    <>
      {console.log('APP.JS RENDERED')}
      <Model />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
        <Route path="/mypost" element={<MyPosts />} />
        <Route path="/payment/*" element={<Payment />} />
        {/* <Route path="/completion" element={<Completion />} /> */}

        <Route path="*" element={<h1 className='text-center mt-5'>404 page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
