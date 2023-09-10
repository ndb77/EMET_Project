import React from "react";
import logo from "../img/logo-clipart.png";
import FhirSignInButton from "./FhirSignInButton";

//Renders the login page. This page automatically redirects to the epic login page
const LoginPage = () => {
  return (
    <div className="container" style={{ paddingTop: 20, maxWidth: 960 }}>
      <div className="col">
        <div className="row" style={{ paddingBottom: 20 }}>
          <div className="col-md-12">
            <div className="mx-auto" style={{ width: 150 }}>
              <img src={logo} />
            </div>
          </div>
        </div>
        <div className="row" style={{ marginRight: 0, marginLeft: 0 }}>
          <div
            className="col-lg-9 offset-lg-0 d-lg-flex mx-auto justify-content-lg-center"
            style={{ width: "auto" }}
          >
            <p id="welcome-header" style={{ marginBottom: 0, width: "auto" }}>
              Welcome Back!
            </p>
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ marginRight: 0, marginLeft: 0, paddingBottom: 0 }}
        >
          <div className="col-auto"></div>
        </div>
        <div
          className="row d-lg-flex justify-content-lg-center"
          style={{ marginRight: 0, marginLeft: 0 }}
        >
          <div className="col-auto mx-auto">
            <input
              className="d-flex"
              type="text"
              style={{
                margin: "auto",
                paddingRight: 40,
                borderRadius: 3,
                marginBottom: 20,
              }}
            />
          </div>
        </div>
        <div
          className="row d-lg-flex justify-content-lg-center"
          style={{ marginRight: 0, marginLeft: 0 }}
        >
          <div className="col-auto mx-auto">
            <input
              type="password"
              style={{
                margin: "auto",
                paddingRight: 40,
                borderRadius: 3,
                marginBottom: 20,
              }}
            />
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ marginRight: 0, marginLeft: 0, width: "auto" }}
        >
          <div className="col-auto" style={{ width: "auto" }}>
            <p className="sign-in-info-text" style={{ width: "auto" }}>
              Forgot your password?
              <a href="#" style={{ paddingLeft: 5 }}>
                Click here.
              </a>
            </p>
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ marginRight: 0, marginLeft: 0, width: "auto" }}
        >
          <div
            className="col-auto"
            style={{ width: "auto", paddingBottom: 20 }}
          >
            <p className="sign-in-info-text" style={{ width: "auto" }}>
              Need to create an account?
              <a href="#" style={{ paddingLeft: 5 }}>
                Click here.
              </a>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-auto mx-auto">
            {" "}
            {/* Automatically redirects to the epic sign-in page */}
            <FhirSignInButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
