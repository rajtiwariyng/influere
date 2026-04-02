import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import Navbar from '../components/Navbar';
import graphic from '../assets/left-img.svg';
import Footer from '../components/Footer';

const RegistrationLayout = ({ children }) => {
  return (
    <div className="registration-layout">
      <Navbar />
      {/* Main Content */}
      <main className="registration-main mt-3 mb-3">
        <div className="container">
          <div className="row g-0 min-vh-100">
            {/* Left Panel - Graphic */}
            <div className="col-lg-4 registration-graphic-panel">
              <img src={graphic} alt="Registration Graphic" />
            </div>

            {/* Right Panel - Form */}
            <div className="col-lg-8 registration-form-panel">
              <div className="registration-form-container">
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default RegistrationLayout;
