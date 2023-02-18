import React, { useState, useContext } from "react";
import login from "../images/login.gif";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [User, setUser] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setUser({ ...User, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = User;
    //console.log(email, password);
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login successful.");
      navigate("/");
    }
  };
  return (
    <section className="signin sign-in">
      <div className="container mt-5">
        <div className="signin-content">
          <div className="signin-form">
            {/* left side  */}
            <div className="signin-image">
              <figure>
                <img src={login} alt="pic" className="signImage" />
              </figure>
              <p>
                <NavLink to="/signup" className="signin-image-link">
                  Not registered? go to Sign Up.
                </NavLink>
              </p>
            </div>
            {/* // right side  */}
            <form method="POST" className="register-form" id="regiser-form">
              <h2 className="form-title">Sign In</h2>

              {/* email */}
              <div className="form-group">
                <label htmlFor="Email">
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={onChange}
                  value={User.email}
                  id="email"
                  autoComplete="off"
                  placeholder="Your Email"
                />
              </div>

              {/* password  */}
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={onChange}
                  value={User.password}
                  id="password"
                  autoComplete="off"
                  placeholder="password"
                />
              </div>

              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  onClick={loginUser}
                  className="form-submit"
                  value="Login"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
