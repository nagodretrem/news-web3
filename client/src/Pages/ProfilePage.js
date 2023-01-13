import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

const ProfilePage = () => {
  if (!localStorage.getItem("userDetails")) {
    window.location.href = "/";
  }
  if (JSON.parse(localStorage.getItem("userDetails")).role === "admin") {
    window.location.href = "/admin";
  }

  const { _id, name, balance } = JSON.parse(
    localStorage.getItem("userDetails")
  );
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // getPosts fonksiyonu
        const postsResponse = await fetch(
          `http://localhost:5000/profile/${_id}`
        );
        const postsData = await postsResponse.json();
        setPosts(postsData.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleEditPost = (id) => {
    // Code to handle editing post
  };

  const handleDeletePost = (id) => {
    // Code to handle deleting post
  };

  return (
    <div>
      <>
        <h2>{name} Posts</h2>
        <h3>Balance: {balance}</h3>
        <Table striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post._id}</td>
                  <td>{post.title}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEditPost(post._id)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>{post.status}</td>
                </tr>
              ))}
            </>
          </tbody>
        </Table>
      </>
    </div>
  );
};

export default ProfilePage;
