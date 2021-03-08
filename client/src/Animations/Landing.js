import React from "react";
import "../css/Landing.css";
import Typewriter from "typewriter-effect";
import m from "../images/utils/logo-aero2.png";

class Landing extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="pagesl">
          <div className="overlayl">
            <div className="landing d-flex flex-column-reverse flex-lg-row align-items-center justify-content-center flex-wrap">
              <div className="landing-about">
                <h1 className="font-weight-bold text-uppercase">
                  AeroModeling club
                </h1>
                <h2 className="text-center">MNNIT Allahabad</h2>
              </div>
              <div className="landing-logo">
                <img src={m} alt="aero" srcset="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
