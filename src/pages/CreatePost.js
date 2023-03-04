import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

function CreatePost({ setModalShow, setModalText, setModalConfirmFn }) {

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  let navigate = useNavigate();
  const postsCollectionRef = collection(db, "posts");

  const createPost = async (e) => {
    if(title.trim() == "" || postText.trim() == ""){alert("title or post, empty");return;}
    e.preventDefault();
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
    setModalShow(true);
    setModalText("Post Created")
    setModalConfirmFn(() => () => { });
  };

  return (
    <>
      <Container>
        <Form className="mt-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control onChange={(event) =>setTitle(event.target.value)} type="text" placeholder="Enter title" />
            {/* <Form.Text className="text-muted">
              Write short title
            </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Post Text</Form.Label>
            <Form.Control style={{ height: "40vh" }} onChange={(event) => setPostText(event.target.value)} as="textarea" placeholder="Write post here..." />
          </Form.Group>
          <Button onClick={(e)=>createPost(e)} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>    
    </>
  );
}

export default CreatePost;
