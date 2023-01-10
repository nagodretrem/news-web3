import React from "react";

const RegisterPage = () => {
  return (
    <form className="register">
      <h1>Register</h1>
      <input type="text" placeholder="Name" name="name" />
      <input type="text" placeholder="Lastname" name="lastname" />
      <input type="email" placeholder="Email" name="email" />
      <input type="password" placeholder="Password" name="password" />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
