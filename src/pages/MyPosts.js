//react
import { useEffect, useState } from "react";

//firebase
import { getDocs, collection, deleteDoc, doc, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase-config";

//components
import DropDown from "../components/DropDown";
import Cards from "../components/Cards";

//bootstrap
import { Container, Spinner } from "react-bootstrap";

//redux
import { useDispatch, useSelector } from "react-redux";
import { modelActions } from "../store/modelSlice";


function MyPosts() {

    const [postLists, setPostList] = useState(null);
    const [dropdown, setDropdown] = useState("latest")

    const [deleteId, setDeleteId] = useState("")
    const dispatch = useDispatch();
    const model = useSelector((state) => state.model)
    const authState = useSelector((state) => state.authState)


    const getPosts = async () => {
        try {
            const postsCollectionRef = dropdown == "latest" ?
                query(collection(db, "posts"), where("author.id", "==", authState.uid), orderBy("time", "desc")) :
                query(collection(db, "posts"), where("author.id", "==", authState.uid), orderBy("time"))
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                date: new Date(doc.data().time.seconds * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            })));

        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {

        if (model.btnFunction == "delete_MyPost") {
            const deletePost = async () => {
                try {
                    const postDoc = doc(db, "posts", deleteId);
                    await deleteDoc(postDoc);
                    getPosts();

                } catch (error) {
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
        if (authState.isAuth == true) getPosts();

    }, [dropdown]);

    const deletePostClick = (id) => {
        setDeleteId(id);
        dispatch(modelActions.setModel({ text: "Do you want to delete?", display: true, btnFunction: "delete_MyPost" }))
    };

    return (
        <>
            {console.log('MYPOSTS.JS RENDERED')}
            <div className="mt-3"></div>
            <Container>
                {postLists?.length > 0 &&
                    <div className="mb-3 d-flex justify-content-end">
                        <DropDown dropdown={dropdown} setDropdown={setDropdown} />
                    </div>}

                {(postLists == null) && localStorage.authuid &&
                    <>
                        <Spinner style={{ position: "absolute", top: "40%", left: "calc(50% - 1rem)" }} animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </>}

                {postLists != null && postLists?.length > 0 &&
                    <Cards postLists={postLists} deletePostClick={deletePostClick} isAuth={authState.isAuth} uid={authState.uid} />
                }
                {!(authState.isAuth==true) && <h3 className="translate-middle" style={{ position: "absolute", top: "40%", left: "50%" }}>Login to see your posts</h3>}
                {postLists?.length == 0 && <h3 className="translate-middle" style={{ position: "absolute", top: "40%", left: "50%" }}>You have no posts. Create one.</h3>}

            </Container>
            <div className="mt-5"></div>
        </>
    );
}

export default MyPosts;
