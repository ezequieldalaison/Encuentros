import React from "react";
import Image from "react-bootstrap/Image";
import logo from "../images/logo_blanco.jpg";

const Home = () => {
  return (
    <>
      <p>v0.02</p>
      <Image src={logo} fluid />
    </>
  );
};

export default Home;
