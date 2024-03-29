//react
import { useEffect, useState } from "react";

//firebase
import { getDocs, collection, deleteDoc, doc, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase-config";

//component
import DropDown from "../components/DropDown";
import Cards from "../components/Cards";

//bootstrap
import { Container, Spinner } from "react-bootstrap";

//redux
import { useDispatch, useSelector } from "react-redux";
import { modelActions } from "../store/modelSlice";



function Home() {

  //redux
  const dispatch = useDispatch()
  const model = useSelector((state) => state.model)
  const authState = useSelector((state) => state.authState)

  const [postLists, setPostList] = useState(null);
  const [dropdown, setDropdown] = useState("latest")
  const [deleteId, setDeleteId] = useState("")

  const getPosts = async () => {
    try {
      let postsCollectionRef;
      if (dropdown == "latest") {
        postsCollectionRef = query(collection(db, "posts"), orderBy("time", "desc"))
      }
      if (dropdown == "oldest") {
        postsCollectionRef = query(collection(db, "posts"), orderBy("time"))
      }
      if (dropdown == "premium") {
        postsCollectionRef = query(collection(db, "posts"), where("premium", "==", true), orderBy("time", "desc"))
      }
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

    if (model.btnFunction == 'delete_Home') {
      const deletePost = async () => {
        try {
          const postDoc = doc(db, "posts", deleteId);
          console.log(postDoc)
          await deleteDoc(postDoc);
          getPosts();
        }
        catch (error) {
          alert(error);
        }
        finally {
          dispatch(modelActions.setModel({ text: "", display: false, btnFunction: "" }))
        }

      }
      deletePost();

    }

  }, [model.pressed]);

  useEffect(() => {

    getPosts()
  }, [dropdown])

  const deletePostClick = (id) => {

    setDeleteId(id)

    dispatch(modelActions.setModel({ text: "Do you want to delete?", display: true, btnFunction: "delete_Home" }))

  };

  return (
    <>
      {console.log("HOME.JS RENDERED")}
      <div className="mt-3"></div>
      <Container>
        {postLists?.length > 0 &&
          <div className="mb-3 d-flex justify-content-end">
            <DropDown dropdown={dropdown} setDropdown={setDropdown} />
          </div>}

        {(postLists == null) &&
          <>
            <Spinner style={{ position: "absolute", top: "40%", left: "calc(50% - 1rem)" }} animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>}

        {postLists != null && postLists?.length > 0 &&
          <Cards postLists={postLists} deletePostClick={deletePostClick} isAuth={authState.isAuth} uid={authState.uid} />
        }

        {postLists?.length == 0 && <h3 className="translate-middle" style={{ position: "absolute", top: "40%", left: "50%" }}>No Posts available</h3>}

      </Container>
      <div className="mt-5"></div>
    </>
  );
}

export default Home;
