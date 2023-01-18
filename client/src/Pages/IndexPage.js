import { useEffect, useState } from "react";
import Post from "../components/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/post`).then((res) => {
      res.json().then((posts) => {
        setPosts(posts.data);
      });
    });
  }, []);

  const newPosts = posts.filter((post) => post.status === "published");

  return (
    <>
      {newPosts.length > 0 &&
        newPosts.map((post, index) => <Post key={index} {...post} />)}
    </>
  );
};

export default IndexPage;
