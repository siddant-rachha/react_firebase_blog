import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useSearchParams } from "react-router-dom";

function SinglePost() {
    const [searchParams, setSearchParams] = useSearchParams();
    const postId = searchParams.get("singlepost");


    useEffect(() => {
        const getSinglePost = async () => {
            const docRef = doc(db, "posts", postId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        };
        getSinglePost();
    }, []);

    return (
        <>
        </>
    );
}

export default SinglePost;
