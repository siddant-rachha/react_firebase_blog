import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { Link, useLocation } from "react-router-dom";


import { Stack, Container, Button, Spinner } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Home({ isAuth, setModalConfirmFn, setModalText, setModalShow }) {

  const location = useLocation();
  const [postLists, setPostList] = useState(null);
  const [mypost, setMyPost] = useState(null);


  let postsCollectionRef = "";
  if (location.pathname == '/mypost') {
    postsCollectionRef = query(collection(db, "posts"), where("author.id", "==", localStorage.authuid));
  }
  if (location.pathname == '/') {
    postsCollectionRef = query(collection(db, "posts"));
  }


  const getPosts = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    ((location.pathname == '/mypost') ? setMyPost(true): setMyPost(false))
    getPosts();
  }, [location.pathname]);

  const deletePostClick = (id) => {

    setModalText("Do you want to delete?")
    setModalShow(true)
    setModalConfirmFn(() => () =>
      deletePost(id)
    )
  };

  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, "posts", id);
      console.log(postDoc)
      await deleteDoc(postDoc);
      getPosts();

    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <div className="mt-3"></div>
      <Container>
        {postLists == null ?
          <>
            <Spinner className="translate-middle" style={{ position: "absolute", top: "40%", left: "50%" }} animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </> :

          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {postLists.map((post) => (
              <Col key={post.id}>
                <Card bg='light'>
                  <Card.Header className="h5">
                    {post.title.length > 100 ? `${post.title.slice(0, 75)}...` : `${post.title}`}
                  </Card.Header>
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">@{post.author.name}</Card.Subtitle>
                    <Card.Text>
                      {`${post.postText.slice(0, 100)}...`}
                    </Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <Stack direction="horizontal">
                      <Link to={`/posts?singlepost=${post.id}`}>
                        Read More
                      </Link>
                      {isAuth && post.author.id === localStorage.authuid && (
                        <Button onClick={() => deletePostClick(post.id)} variant="outline-danger" className="ms-auto"><FontAwesomeIcon size="xs" icon={faTrashCan} /></Button>
                      )}
                    </Stack>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

        }
        {postLists?.length == 0 && <h3 className="translate-middle" style={{ position: "absolute", top: "40%", left: "50%" }}>No Posts available</h3>}
      </Container>
      <div className="mt-5"></div>
    </>
  );
}

export default Home;
