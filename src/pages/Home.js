import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, query, limit, orderBy, getCountFromServer, startAt, startAfter } from "firebase/firestore";
import { db } from "../firebase-config";
import { Link } from "react-router-dom";


import { Stack, Container, Button, Spinner, DropdownButton, Dropdown, Pagination } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Home({ isAuth, setModalConfirmFn, setModalText, setModalShow, ButtonGroup }) {

  const [postLists, setPostList] = useState(null);
  const [dropdown, setDropdown] = useState("latest");
  const [limitState, setLimit] = useState(2);
  const [countstate, setCount] = useState(0);

  const getPosts = async () => {
    try {

      const getCountofPosts = async () => {
        const coll = collection(db, "posts");
        const q = query(coll 
          // ,where("state", "==", "CA")
          );
        const snapshot = await getCountFromServer(q);
        setCount(snapshot.data().count);
      }
      getCountofPosts();


      const postsCollectionRef = dropdown == "latest" ? query(collection(db, "posts"), orderBy("time", "desc"), limit(limitState), startAt(0)) :
        query(collection(db, "posts"), orderBy("time"), limit(limitState))
      const data = await getDocs(postsCollectionRef);


      setPostList(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id,
        date: new Date(doc.data().time.seconds * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      })));

    } catch (error) {
      alert(error);
    }
  };


  useEffect(() => {
    getPosts();
  }, [dropdown, limitState]);

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
        <div className="filter d-flex justify-content-end mb-3">
          <DropdownButton className="ms-3"
            as={ButtonGroup}
            id="limit"
            variant="outline-primary"
            title={`PerPage ${limitState}`}
          >
            <Dropdown.Item eventKey="1" onClick={() => setLimit(2)} active={limitState == 2 ? true : false} >2</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setLimit(3)} active={limitState == 3 ? true : false} >3</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setLimit(10)} active={limitState == 10 ? true : false} >10</Dropdown.Item>
          </DropdownButton>
          <DropdownButton className="ms-3"
            as={ButtonGroup}
            id="dropdown"
            variant="outline-primary"
            title={dropdown}
          >
            <Dropdown.Item eventKey="1" onClick={() => setDropdown("latest")} active={dropdown == "latest" ? true : false} >Latest</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setDropdown("oldest")} active={dropdown == "oldest" ? true : false} >Oldest</Dropdown.Item>
          </DropdownButton>
        </div>

        {(postLists == null) &&
          <>
            <Spinner style={{ position: "absolute", top: "40%", left: "50%", left: "calc(50% - 1rem)" }} animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>}

        {postLists != null && postLists?.length > 0 &&
          <Row xs={1} md={2} lg={3} className="g-4">
            {postLists.map((post) => (
              <Col key={post.id}>
                <Card bg='light'>
                  <Card.Header className="h5">
                    {post.title.length > 100 ? `${post.title.slice(0, 75)}...` : `${post.title}`}
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex">
                      <Card.Subtitle style={{ fontSize: "small" }} className="mb-2 text-muted me-auto">@{post.author.name}</Card.Subtitle>
                      <Card.Subtitle style={{ fontSize: "small" }} className="mb-2 text-muted ms-auto">{post.date}</Card.Subtitle>
                    </div>
                    <Card.Text>
                      {`${post.postText.slice(0, 100)}...`}
                    </Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <Stack direction="horizontal">
                      <Link to={`/posts/${post.id}`}>
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

        <div className="mt-5"></div>

        <Pagination className="d-flex justify-content-center align-items-center">
          <Pagination.First />
          <p className="mb-0 ms-3 me-3">{`Page 1 of ${Math.ceil(countstate/limitState)}`}</p>
          <Pagination.Last />
        </Pagination>
      </Container>
      <div className="mt-5"></div>
    </>
  );
}

export default Home;
