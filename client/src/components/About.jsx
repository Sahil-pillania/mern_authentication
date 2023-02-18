import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../images/logo.jpg";

const About = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/aboutpage", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      //console.log("data after fetch request is :" + data);
      setData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log("can't redirect into about page " + error);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <section className="container emp-profile">
      <form method="GET" className="profile_form">
        <div className="row">
          <div className="col-md-4 uImage grid_divs">
            <img src={image} alt="user" />
          </div>
          <div className="col-md-5 grid_divs">
            <div className="profile-head">
              <h5>{data.name}</h5>
              <h6>Web Developer</h6>
              <p className="profile-rating mt-3 mb-5">
                RANKINGS <span> </span> 9/10
              </p>

              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                  >
                    Timeline
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 grid_divs">
            <input
              type="submit"
              name="btnAddMore"
              className="Profile-edit-btn"
              value="Edit Profile"
            />
          </div>
        </div>
        {/* next row  */}
        <div className="row">
          <div className="col-md-4 grid_divs">
            <div className="profile-work">
              <p>
                <b>Work Link</b>
              </p>
              <a href="#" target="_blank">
                Portfolio
              </a>
              <a href="#" target="_blank">
                Instagram
              </a>
              <a href="#" target="_blank">
                LinkedIn
              </a>
              <a href="#" target="_blank">
                Twitter
              </a>
              <a href="#" target="_blank">
                Github
              </a>
            </div>
          </div>
          <div className="col-md-7 pl-5 about-info grid_divs">
            <div className="tab-content profile-tab" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="User ID">User ID</label>
                  </div>
                  <div className="col-md-6">
                    <p>{data._id}</p>
                  </div>
                </div>
                {/* name  */}
                <div className="row">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>{data.name}</p>
                  </div>
                </div>
                {/* email  */}
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{data.email}</p>
                  </div>
                </div>
                {/* phone  */}
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                    <p>{data.phone}</p>
                  </div>
                </div>
                {/* profession  */}
                <div className="row">
                  <div className="col-md-6">
                    <label>Profession</label>
                  </div>
                  <div className="col-md-6">
                    <p>{data.work}</p>
                  </div>
                </div>
              </div>
              {/* ///// Profile tab  */}
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                // aria-tabelledby="profile-tab"
              >
                <div className="row experience_tab">
                  <div className="col-md-6">
                    <label>Experience</label>
                  </div>
                  <div className="col-md-6">
                    <label>Expert</label>
                  </div>
                </div>
                {/* rate  */}
                <div className="row experience_tab">
                  <div className="col-md-6">
                    <label>Hourly rate</label>
                  </div>
                  <div className="col-md-6">
                    <label>10$/hr</label>
                  </div>
                </div>
                {/* projects  */}
                <div className="row experience_tab">
                  <div className="col-md-6">
                    <label>Total Projects</label>
                  </div>
                  <div className="col-md-6">
                    <label>87</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default About;
