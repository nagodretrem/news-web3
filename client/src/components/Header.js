import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { userInfoContext, setUserInfoContext } = useContext(UserContext);
  const [redirect, setRedirect] = React.useState(false);
  useEffect(() => {
    async function auth() {
      try {
        const response = await fetch("http://localhost:5000/auth", {
          credentials: "include",
        });
        const data = await response.json();
        if (data) {
          setUserInfoContext(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    auth();
  }, []);

  const logout = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          setRedirect(true);
          localStorage.clear();
          setUserInfoContext(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let username = null;
  if (userInfoContext) {
    username = userInfoContext.name + " " + userInfoContext.lastname;
  }
  if (redirect) {
    window.location.href = "/";
  }

  return (
    <header>
      <Link to="/" className="logo">
        NewsBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/create">Create news post</Link>
            <Link onClick={logout}>Logout</Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
