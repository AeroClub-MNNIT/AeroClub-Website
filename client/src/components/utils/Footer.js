import React from "react";
import "../../css/footer.css";
import { useLocation } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { Link as Scroll } from "react-scroll";
import m from "../../images/utils/aerologofix.png";

export default function Footer() {
  const location = useLocation();

  return (
    <div>
      <footer className="site-footer container-fluid">
        <div className="topBottomMargin">
          {location.pathname === "/" && (
            <div className="wrap mar ">
              <div className="row d-flex">
                <div className="col-sm-12 col-md-12 col-lg-4">
                  <div className="information">
                    <h2 style={{ fontFamily: "Audiowide" }}>AERO CLUB MNNIT</h2>
                    <p>
                      Near Boys SAC,
                      <br />
                      Barrister Mullah Colony,
                      <br />
                      MNNIT Allahabad Campus,
                      <br />
                      Teliarganj,Prayagraj
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 quick-links">
                  <h6>Quick-Links</h6>
                  <ul className="footer-links">
                    <li>
                      <a className="hov" href="https://mnnit.ac.in">
                        <i className="fa fa-caret-right"></i> MNNIT
                      </a>
                    </li>
                    <li>
                      <a className="hov" href="#">
                        <i className="fa fa-caret-right"></i> Home
                      </a>
                    </li>
                    <li>
                      <a className="hov" href="/workshop">
                        <i className="fa fa-caret-right"></i> Workshop
                      </a>
                    </li>
                    <li>
                      <a className="hov" href="/sponsor">
                        <i className="fa fa-caret-right"></i> Sponsors
                      </a>
                    </li>
                    <li>
                      <a className="hov" href="/collaborate">
                        <i className="fa fa-caret-right"></i> Collaborate
                      </a>
                    </li>
                    <li>
                      <a className="hov" href="https://roboticsclubmnnit.website/">
                        <i className="fa fa-caret-right"></i> RoboClub
                      </a>
                    </li>
                    
                  </ul>
                </div>
                <div className="col-lg-4 col-md-6 footer-logo float-right">
                  <img src={m} alt="mnnit" className='float-right' />
                </div>
              </div>
              {/* <br /> */}
              <hr />
            </div>
          )}
          <div className="wrap mar">
            <div className="row">
              <div className="col-md-8 col-sm-6 col-xs-12">
                <p className="copyright-text">
                  Copyright © 2021 All Rights Reserved by AERO CLUB MNNIT
                </p>
              </div>
              <div className="col-md-4 col-sm-6 col-xs-12">
                <ul className="social-icons">
                  <SocialIcon url="https://www.facebook.com/AeroClubMNNIT/" target="_blank" />
                  <SocialIcon url="https://www.youtube.com/channel/UCm7uHtNLbmq--wBzt7Yf23w" target="_blank" />
                  <SocialIcon url="https://www.instagram.com/aeroclubmnnit/?hl=en" target="_blank" />
                  <SocialIcon url="mailto:aeroclub@mnnit.ac.in" target="_blank" />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
