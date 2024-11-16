import React from "react";
import Nav from "../components/Nav";
export default function Login() {
  return (
    <div>
      <Nav />

      <div className="Login">
        <div className="Form">
          <h1>Log In to Your MovieFlow Account</h1>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Login</button>
          <p>New to MovieFlow?<span>Sign up</span></p>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 MovieFlow. All rights reserved. | Powered by TMDb.</p>
      </div>
    </div>
  );
}
