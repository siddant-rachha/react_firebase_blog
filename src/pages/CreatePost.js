import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { serverTimestamp } from "firebase/firestore";


function CreatePost({ isAuth, setModalShow, setModalText, setModalConfirmFn }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async (e) => {
    if (title.trim() == "" || postText.trim() == "") { alert("title or post, empty"); return; }
    e.preventDefault();
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      time: serverTimestamp()
    });
    navigate("/");
    setModalShow(true);
    setModalText("Post Created")
    setModalConfirmFn(() => () => { });
  };

  return (
    <>
      <Container className="mt-5">
        {!isAuth && <h1 className="h3 mb-3">Login to create post</h1>}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control disabled={isAuth?false:true} onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Enter title" />
              {/* <Form.Text className="text-muted">
              Write short title
            </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Post Text</Form.Label>
              <Form.Control disabled={isAuth?false:true} style={{ height: "40vh" }} onChange={(event) => setPostText(event.target.value)} as="textarea" placeholder="Write post here..." />
            </Form.Group>
            <Button disabled={isAuth?false:true} onClick={(e) => createPost(e)} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <div className="mb-3"></div>
      </Container>
    </>
  );
}

export default CreatePost;
