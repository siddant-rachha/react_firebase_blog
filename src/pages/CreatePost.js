//react
import { useEffect, useState } from "react";

//firebase
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";

//bootstrap
import { Form, Button, Container } from "react-bootstrap";

//redux
import { useDispatch, useSelector } from "react-redux";
import { modelActions } from "../store/modelSlice";
//

import { postActions } from "../store/postSlice";


function CreatePost() {

  const navigate = useNavigate()


  //redux
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState)
  const post = useSelector((state) => state.post)
  //

  const [btndisabled, setbtndisabled] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const postsCollectionRef = collection(db, "posts");

  const createPost = async (e) => {
    e.preventDefault();
    if (post.title.trim() == "" || post.postText.trim() == "") { alert("title or post, empty"); return; }
    setbtndisabled(true);
    debugger
    try {
      await addDoc(postsCollectionRef, {
        title: post.title,
        postText: post.postText,
        author: { name: authState.displayName, id: authState.uid },
        time: serverTimestamp()
      });
      navigate("/");
      dispatch(modelActions.setModel({ text: "Post Created", display: true }))

    }
    catch (error) {
      alert(error)
    }
    finally {
      setbtndisabled(false);
    }


  };

  const payPost = (e) => {
    e.preventDefault();
    console.log(auth.currentUser.displayName)
    if (post.title.trim() == "" || post.postText.trim() == "") { alert("title or post, empty"); return; }
    setbtndisabled(true);
    navigate("/payment");
  }

  const toggleCheckbox = (e) => {
    setCheckbox(e.target.checked)
  }


  return (
    <>
      {console.log('CREATE POST.JS RENDERED')}
      <Container className="mt-5">
        {!(authState.isAuth == true) && <h1 className="h3 mb-3">Login to create post</h1>}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control disabled={(authState.isAuth == true) ? false : true} onChange={(event) => dispatch(postActions.setTitle({ title: event.target.value }))} type="text" placeholder="Enter title" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Post Text</Form.Label>
            <Form.Control disabled={(authState.isAuth == true) ? false : true} style={{ height: "40vh" }} onChange={(event) => dispatch(postActions.setPostText({ postText: event.target.value }))} as="textarea" placeholder="Write post here..." />
          </Form.Group>
          <Form.Check
            onClick={toggleCheckbox}
            type="switch"
            id="switch"
            label={checkbox ? "Premium Post" : "Normal Post"}
            className="mb-3 danger"
          />


          {checkbox ?
            <Button className="mt-2" disabled={(authState.isAuth == true) && !btndisabled ? false : true} onClick={(e) => payPost(e)} variant="primary" type="submit">
              Pay
            </Button> :
            <Button className="mt-2" disabled={(authState.isAuth == true) && !btndisabled ? false : true} onClick={(e) => createPost(e)} variant="primary" type="submit">
              Submit
            </Button>
          }


        </Form>
        <div className="mb-3"></div>
      </Container>
    </>
  );
}

export default CreatePost;
