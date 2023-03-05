import React, { useState, useEffect } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate, useParams } from "react-router-dom";


import { Stack, Container, Button, Spinner } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function SinglePost({ setModalConfirmFn, setModalText, setModalShow, isAuth }) {

    const [post, setPost] = useState(null);

    const { postId } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        const getSinglePost = async () => {
            const docRef = doc(db, "posts", postId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setPost(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                setPost([]);
            }
            console.log("called")
        };
        getSinglePost();
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
            setModalText("Post deleted")
            setModalShow(true)
            setModalConfirmFn(() => () => { }
            )
            navigate("/");


        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <Container>
                <div className="mt-3"></div>
                {post == null &&
                    <Spinner className="translate-middle" style={{ position: "absolute", top: "40%", left: "50%" }} animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
                {console.log(post)}
                {post?.length != 0 && post != null &&
                    <>
                        <Stack direction="horizontal">
                            <Button onClick={() => navigate(-1)} variant="outline-dark btn-sm" className="me-auto"><FontAwesomeIcon size="xs" icon={faArrowLeft} /></Button>
                            {isAuth && post.author.id === localStorage.authuid && (
                                <Button onClick={() => deletePostClick(postId)} variant="outline-danger btn-sm" className="ms-auto"><FontAwesomeIcon size="xs" icon={faTrashCan} /></Button>)}
                        </Stack>
                        <hr></hr>
                        <Stack gap={3} className="mt-1">
                            <p className="h3 mt-3 fw-bold text-decoration-underline">{post.title}</p>
                            <div>
                                {post.postText}
                            </div>
                            <hr />
                            <div>
                                Author: <span className="text-primary">@{post.author.name}</span>
                            </div>
                        </Stack>
                    </>}
                {post?.length == 0 && <h1 className="h1">No Such Post</h1>}
                <div className="mt-5"></div>
            </Container>
        </>
    );
}

export default SinglePost;
