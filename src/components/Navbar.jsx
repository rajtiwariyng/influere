import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useModal } from "../context/ModalContext";

const Navbar = () => {
  const { openLoginModal } = useModal();

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Influere" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" className="collapse navbar-collapse gap-3">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                What We Do
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Why Join
              </Link>
            </li>
            <li className="nav-item">
              <select
                className="form-select border-0 me-2"
                aria-label="Default select example"
              >
                <option value={1} selected="">₹ INR</option>
                <option value={2}>€ EUR</option>
                <option value={3}>$ USD</option>
              </select>
            </li>
          </ul>
           <button className="secondary-btn" onClick={openLoginModal}>
             Login
           </button>
          <Link className="primary-btn" to="/register">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
