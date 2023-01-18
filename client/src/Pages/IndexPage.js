import { useEffect, useState } from "react";
import Post from "../components/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function posts() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/post`);
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    posts();
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
