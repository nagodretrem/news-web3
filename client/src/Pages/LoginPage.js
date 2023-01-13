import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Button } from "react-bootstrap";

const LoginPage = () => {
  const { setUserInfoContext } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setUserInfoContext(data);
      localStorage.setItem("token", data.token);
      auth();
      setRedirect(true);
    } else {
      alert(data.message);
    }
  }

  const auth = () => {
    fetch("http://localhost:5000/auth", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        localStorage.setItem("userDetails", JSON.stringify(data.data));
      });
    });
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button type="submit" variant="secondary">
        Login
      </Button>
    </form>
  );
};

export default LoginPage;
