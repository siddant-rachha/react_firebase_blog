import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useParams } from "react-router-dom";

function SinglePost() {
    let { id } = useParams();


    useEffect(() => {
        const getSinglePost = async () => {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        };
        getSinglePost();
        console.log(id)

    }, []);

    return (
        <>
        </>
    );
}

export default SinglePost;
