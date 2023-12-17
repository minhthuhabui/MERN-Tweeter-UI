import React, { useCallback, useContext, useEffect } from "react";
import PostItem from "./PostItem";
import "../css/Post.css";
import axios from "axios";
import AppContext from "./AppContext";

export default function PostList() {
  const { state, dispatch } = useContext(AppContext);
  const { posts, user } = state;
  const getAllPosts = useCallback(async () => {
    try {
      const option = {
        method: "get",
        url: "/api/v1/posts",
      };
      const response = await axios(option);
      const posts = response.data.data.posts;
      // console.log(posts);
      dispatch({ type: "GET_ALL_POSTS", payload: posts });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  const newPosts = posts.map((post) => {
    if (user) {
      return post.author.name === user.userName
        ? { ...post, isEditable: true }
        : post;
    } else {
      return { ...post, isEditable: false };
    }
  });
  // console.log(newPosts);
  return (
    <section className="post-section">
      <div className="post-list">
        {newPosts.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </div>
    </section>
  );
}
