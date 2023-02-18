import React, { useReducer } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Contact from "./components/Contact";
import About from "./components/About";
import Signup from "./components/Signup";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Error from "./components/Error";
import { createContext } from "react";
import { initialState, reducer } from "../src/reducer/UseReducer";

// creating context
export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Logout" element={<Logout />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
        <Footer />
      </UserContext.Provider>
    </>
  );
};

export default App;
//export { userContext };
