import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Link } from "react-router-dom";


import { Stack, Container, Button } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Home({ isAuth, setModalConfirmFn, setModalText, setModalShow }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const getPosts = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log('called')

    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

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
      <Container>
        <div className="mt-3"></div>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {postLists.map((post) => (
            <Col key={post.id}>
              <Card bg='light'>
                <Card.Header className="h5">
                  { post.title.length>100 ? `${post.title.slice(0,75)}...`:`${post.title}`}
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">@{post.author.name}</Card.Subtitle>
                  <Card.Text>
                    {`${post.postText.slice(0,100)}...`}
                  </Card.Text>
                </Card.Body>
                <Card.Body>
                  <Stack direction="horizontal">
                    <Link to={`/posts?singlepost=${post.id}`}>
                      Read More
                    </Link>
                    {isAuth && post.author.id === auth.currentUser.uid && (
                      <Button onClick={() => deletePostClick(post.id)} variant="outline-danger" className="ms-auto"><FontAwesomeIcon size="xs" icon={faTrashCan} /></Button>
                    )}
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="mt-5"></div>
      </Container>
    </>
  );
}

export default Home;






// function GridExample() {
//   return (
//     <Row xs={1} md={2} lg={3} xl={4} className="g-4">
//       {Array.from({ length: 4 }).map((_, idx) => (
//         <Col>
//           <Card>
//             <Card.Img variant="top" src="holder.js/100px160" />
//             <Card.Body>
//               <Card.Title>Card title</Card.Title>
//               <Card.Text>
//                 This is a longer card with supporting text below as a natural
//                 lead-in to additional content. This content is a little bit
//                 longer.
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// }

// export default GridExample;
