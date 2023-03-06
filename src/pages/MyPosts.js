import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase-config";
import DropDown from "../components/DropDown";
import Cards from "../components/Cards";


import { Container, Spinner } from "react-bootstrap";


function MyPosts({ isAuth, setModalConfirmFn, setModalText, setModalShow }) {

    const [postLists, setPostList] = useState(null);
    const [dropdown, setDropdown] = useState("latest")

    const getPosts = async () => {
        try {
            const postsCollectionRef = dropdown == "latest" ?
                query(collection(db, "posts"), where("author.id", "==", localStorage.authuid), orderBy("time", "desc")) :
                query(collection(db, "posts"), where("author.id", "==", localStorage.authuid), orderBy("time"))
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                date: new Date(doc.data().time.seconds * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            })));

        } catch (error) {
            alert(error);
            console.log(error)
        }
    };

    useEffect(() => {
        if (localStorage.authuid == null) return;
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
                {postLists?.length > 0 &&
                    <div className="mb-3 d-flex justify-content-end">
                        <DropDown dropdown={dropdown} setDropdown={setDropdown} isAuth={isAuth} />
                    </div>}

                {(postLists == null) && localStorage.authuid &&
                    <>
                        <Spinner style={{ position: "absolute", top: "40%", left: "50%", left: "calc(50% - 1rem)" }} animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </>}

                {postLists != null && postLists?.length > 0 &&
                    <Cards postLists={postLists} deletePostClick={deletePostClick} isAuth={isAuth} />
                }
                {localStorage.authuid == null && <h3 className="translate-middle" style={{ position: "absolute", top: "40%", left: "50%" }}>Login to see your posts</h3>}
                {postLists?.length == 0 && <h3 className="translate-middle" style={{ position: "absolute", top: "40%", left: "50%" }}>You have no posts. Create one.</h3>}

            </Container>
            <div className="mt-5"></div>
        </>
    );
}

export default MyPosts;
