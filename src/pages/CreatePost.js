//react
import { useState } from "react";

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

function CreatePost() {

  //redux
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState)
  //

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [btndisabled, setbtndisabled] = useState(false);

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async (e) => {
    e.preventDefault();
    if (title.trim() == "" || postText.trim() == "") { alert("title or post, empty"); return; }
    setbtndisabled(true);
    try {
      await addDoc(postsCollectionRef, {
        title,
        postText,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        time: serverTimestamp()
      });
      navigate("/");
      dispatch(modelActions.setModel({ text: "Post Created", display: true }))

    }
    catch (e) {
      alert(e)
    }
    finally {
      setbtndisabled(false);
    }


  };

  return (
    <>
      {console.log('CREATE POST.JS RENDERED')}
      <Container className="mt-5">
        {!(authState.isAuth==true) && <h1 className="h3 mb-3">Login to create post</h1>}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control disabled={(authState.isAuth==true) ? false : true} onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Enter title" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Post Text</Form.Label>
            <Form.Control disabled={(authState.isAuth==true) ? false : true} style={{ height: "40vh" }} onChange={(event) => setPostText(event.target.value)} as="textarea" placeholder="Write post here..." />
          </Form.Group>
          <Button disabled={(authState.isAuth==true) && !btndisabled ? false : true} onClick={(e) => createPost(e)} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="mb-3"></div>
      </Container>
    </>
  );
}

export default CreatePost;
