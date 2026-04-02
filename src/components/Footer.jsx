import logo from "../assets/logo.svg";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/insta.svg";
import twitter from "../assets/linkedin.svg";
import youtube from "../assets/yt.svg";
import location from "../assets/location.svg";
import mail from "../assets/mail.svg";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <img src={logo} alt="Influere" />
                <div className="social-media-icons">
                  <Link to="/">
                    <img src={facebook} alt="Facebook" />
                  </Link>
                  <Link to="/">
                    <img src={youtube} alt="Youtube" />
                  </Link>
                  <Link to="/">
                    <img src={instagram} alt="Instagram" />
                  </Link>
                  <Link to="/">
                    <img src={twitter} alt="Twitter" />
                  </Link>
                </div>
              </div>
              <div className="col-md-8 d-flex justify-content-end gap-4">
                <div className="footer-col">
                  <h5 className="fw-semibold mb-2 text-orange">Company</h5>
                    <Link className="footer-link" to="/">Privacy Policy</Link>
                    <Link className="footer-link" to="/">Cookies Notice</Link>
                    <Link className="footer-link" to="/">Security</Link>
                    <Link className="footer-link" to="/">Terms & Conditions</Link>
                </div>
                <div className="footer-col">
                  <h5 className="fw-semibold mb-2 text-orange">Quick Links</h5>
                    <Link className="footer-link" to="/">What we Do</Link>
                    <Link className="footer-link" to="/">About Us</Link>
                    <Link className="footer-link" to="/">Why Join Us</Link>
                    <Link className="footer-link" to="/">Contact Us</Link>
                </div>
                <div className="footer-col">
                  <h5 className="fw-semibold mb-2 text-orange">Contact</h5>
                    <Link className="footer-link d-flex align-items-center gap-1 mb-1" to="/"><img src={mail} alt="mail" /> info@influere.net</Link>
                    <Link className="footer-link d-flex align-items-center gap-1" to="/"><img src={location} alt="location" /> #7 - 5707 Sidley St. Burnaby , BC</Link>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="text-center">© 2025 Influere. All rights reserved.</p>
            </div>
          </div>
      </footer>
    );
  };
  
  export default Footer;
  