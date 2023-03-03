import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Link } from "react-router-dom";

function Home({ isAuth }) {
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

  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, "posts", id);
      console.log(postDoc)
      await deleteDoc(postDoc);
      getPosts();

    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div key={post.id} className="post">
            <div className="postHeader">
              <Link to={`/posts?singlepost=${post.id}`} className="title">
                <h1> {post.title}</h1>
              </Link>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  {" "}
                  &#128465;
                </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
