import { useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok === false) {
      alert(data.message);
    } else {
      setRedirect(true);
      alert(data.data);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Lastname"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
      />
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
        Register
      </Button>
    </form>
  );
};

export default RegisterPage;
