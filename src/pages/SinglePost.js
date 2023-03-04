import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useSearchParams } from "react-router-dom";

import { Stack, Container, Button } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function SinglePost() {
    const [searchParams, setSearchParams] = useSearchParams();
    const postId = searchParams.get("singlepost");

    const [post, setPost] = useState(null);


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

    return (
        <>
            <Container>
                <div className="mt-3"></div>
                {post == null && <h1>Loading...</h1>}
                {console.log(post)}
                {post?.length != 0 && post!=null &&
                    <>
                        <Stack direction="horizontal">
                            <Button className="me-auto"><FontAwesomeIcon  icon={faArrowLeft} /></Button>
                            <Button className="ms-auto"><FontAwesomeIcon  icon={faTrashCan} /></Button>
                        </Stack>
                        <Stack gap={3} className="mt-1">
                            <strong><em><div className="text-primary h2 text-center">
                                {post.title}
                            </div></em>
                            </strong>
                            <hr/>
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
                    
            </Container>
        </>
    );
}

export default SinglePost;
