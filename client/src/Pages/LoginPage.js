import React from "react";

const LoginPage = () => {
  return (
    <form className="login">
      <h1>Login</h1>
      <input type="email" placeholder="Email" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
