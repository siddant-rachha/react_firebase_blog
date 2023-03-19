import React, { useState, useEffect } from "react";

import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate, useParams } from "react-router-dom";

import { Stack, Container, Button, Spinner } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { modelActions } from "../store/modelSlice";
import { useDispatch, useSelector } from "react-redux";

function SinglePost({ isAuth }) {

    const [post, setPost] = useState(null);
    const [deleteId, setDeleteId] = useState("")


    const { postId } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const model = useSelector((state) => state.model)

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
    };

    useEffect(() => {
        getSinglePost();
    }, []);

    useEffect(() => {
        if (model.btnFunction == "delete_Single") {
            const deletePost = async () => {
                try {
                    const postDoc = doc(db, "posts", deleteId);
                    console.log(postDoc)
                    await deleteDoc(postDoc);
                    dispatch(modelActions.setModel({ text: "Post deleted", display: false, btnFunction: "" }))

                    navigate("/");

                } catch (error) {
                    alert(error);
                }
                finally {
                    dispatch(modelActions.setModel({ text: "", display: false, btnFunction: "" }))
                }
            }
            deletePost();
        }

    }, [model.pressed])

    const deletePostClick = (id) => {

        setDeleteId(id);
        dispatch(modelActions.setModel({ text: "Do you want to delete?", display: true, btnFunction: "delete_Single" }))
    };

    return (
        <>
            {console.log('SINGLEPOST.JS RENDERED')}

            <Container>
                <div className="mt-3"></div>
                {post == null &&
                    <Spinner style={{ position: "absolute", top: "40%", left: "calc(50% - 1rem)" }} animation="border" role="status">
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
                            <div style={{ whiteSpace: "pre-wrap" }}>
                                {post.postText}
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <span>Author: <span className="text-primary">@{post.author.name}</span></span>
                                <span>Date: <span className="text-dark">{new Date(post.time.seconds * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span></span>
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
