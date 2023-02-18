import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  // promises
  useEffect(() => {
    fetch("/logoutpage", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        navigate("/Login", { replace: true });
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="logout-page">
        <div className="logout-div">
          <p className="pt-5">Please wait ...</p>

          <h2>Logging you out ...</h2>
        </div>
      </div>
    </>
  );
};

export default Logout;
