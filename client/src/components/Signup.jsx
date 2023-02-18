import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import pic from "../images/reg.gif";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (event) => {
    // console.log(e);

    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, work, password, cpassword }),
    });

    const response = await res.json();

    if (response.status === 422 || !response) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration successful.");
      console.log("Registration successful.");
      navigate("/login");
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <form method="POST" className="register-form" id="regiser-form">
                <h2 className="form-title">Sign up</h2>
                {/* name */}
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={user.name}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Your Name"
                  />
                </div>
                {/* email */}
                <div className="form-group">
                  <label htmlFor="Email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Your Email"
                  />
                </div>
                {/* Phone  */}
                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={user.phone}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Your Phone number"
                  />
                </div>
                {/* work  */}
                <div className="form-group">
                  <label htmlFor="work">
                    <i className="zmdi zmdi-slideshow"></i>
                  </label>
                  <input
                    type="text"
                    name="work"
                    id="work"
                    value={user.work}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Your Profession"
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
                    id="password"
                    value={user.password}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="password"
                  />
                </div>
                {/* cpassword  */}
                <div className="form-group">
                  <label htmlFor="cpassword">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="text"
                    name="cpassword"
                    id="cpassword"
                    value={user.cpassword}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Confirm password"
                  />
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    onClick={postData}
                    className="form-submit"
                    value="Register"
                  />
                </div>
              </form>

              {/* // right side image  */}
              <div className="signup-image">
                <figure>
                  <img src={pic} alt="pic" className="signImage" />
                </figure>
                <p>
                  <NavLink to="/login" className="signup-image-link">
                    Already registered? go to login.
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
