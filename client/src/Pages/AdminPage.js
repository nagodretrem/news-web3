import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

const AdminPage = () => {
  if (!localStorage.getItem("userDetails")) {
    window.location.href = "/";
  }
  if (JSON.parse(localStorage.getItem("userDetails")).role !== "admin") {
    window.location.href = "/";
  }
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        // getPosts fonksiyonu
        const postsResponse = await fetch(`http://localhost:5000/post`);
        const postsData = await postsResponse.json();
        setPosts(postsData.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchData2() {
      try {
        // getUsers fonksiyonu
        const usersResponse = await fetch(`http://localhost:5000/users`);
        const usersData = await usersResponse.json();
        setUsers(usersData.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    fetchData2();
  }, []);

  const handleEditPost = (_id, index) => {
    // Code to handle editing post
  };

  const handleDeletePost = (_id, index) => {
    console.log(posts[0].summary);
  };

  const handleToggle = async (_id, index) => {
    let userStatus = posts.filter((post) => post._id === _id)[0].status;
    let authorID = posts.filter((post) => post._id === _id)[0].author._id;
    let authorBalance = users.filter((user) => user._id === authorID)[0]
      .balance;

    try {
      if (userStatus === "unpublished") {
        const response = await fetch(`http://localhost:5000/post/${_id}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "published" }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        console.log(json);

        const response2 = await fetch(
          `http://localhost:5000/user/${authorID}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              balance: authorBalance + 10,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        authorBalance = authorBalance + 10;
        const json2 = await response2.json();
        console.log(json2);
      } else {
        const response3 = await fetch(`http://localhost:5000/post/${_id}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "unpublished" }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json3 = await response3.json();
        console.log(json3);

        const response4 = await fetch(
          `http://localhost:5000/user/${authorID}`,

          {
            method: "PATCH",
            body: JSON.stringify({
              balance: authorBalance - 10,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        authorBalance = authorBalance - 10;
        const json4 = await response4.json();
        console.log(json4);
      }
    } catch (error) {
      console.log(error);
    }

    let newPosts = [...posts];
    newPosts[index].status =
      userStatus === "unpublished" ? "published" : "unpublished";
    setPosts(newPosts);

    let newUsers = [...users];
    for (let i = 0; i < newUsers.length; i++) {
      if (newUsers[i]._id === authorID) {
        newUsers[i].balance = authorBalance;
      }
      setUsers(newUsers);
    }
    console.log(users);
  };

  return (
    <div>
      <>
        <h2>Users</h2>
        <Table striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.balance}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
      <>
        <h2>Posts</h2>
        <Table striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <td>{post._id}</td>
                <td>{post.title}</td>
                <td>{post.author.name}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEditPost(post._id, index)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeletePost(post._id, index)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleToggle(post._id, index)}
                  >
                    {post.status === "published"
                      ? "Yayından Kaldır"
                      : "Yayınla"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    </div>
  );
};

export default AdminPage;
