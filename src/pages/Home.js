import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase-config";
import DropDown from "../components/DropDown";

import { Container, Spinner } from "react-bootstrap";




import Cards from "../components/Cards";

function Home({ isAuth, setModalConfirmFn, setModalText, setModalShow }) {

  const [postLists, setPostList] = useState(null);
  const [dropdown, setDropdown] = useState("latest")

  const getPosts = async () => {
    try {
      const postsCollectionRef = dropdown == "latest" ? query(collection(db, "posts"), orderBy("time", "desc")) :
        query(collection(db, "posts"), orderBy("time"))
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
  }, [dropdown]);

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
      {console.log("HOME.JS RENDERED")}
      <div className="mt-3"></div>
      <Container>
        {postLists?.length > 0 &&
          <div className="mb-3 d-flex justify-content-end">
            <DropDown dropdown={dropdown} setDropdown={setDropdown} isAuth={isAuth} />
          </div>}

        {(postLists == null) &&
          <>
            <Spinner style={{ position: "absolute", top: "40%", left: "calc(50% - 1rem)" }} animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>}

        {postLists != null && postLists?.length > 0 &&
          <Cards postLists={postLists} deletePostClick={deletePostClick} isAuth={isAuth} />
        }

        {postLists?.length == 0 && <h3 className="translate-middle" style={{ position: "absolute", top: "40%", left: "50%" }}>No Posts available</h3>}

      </Container>
      <div className="mt-5"></div>
    </>
  );
}

export default Home;
