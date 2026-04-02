import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import trust from "../assets/people-img.svg";
import about from "../assets/about.png";
import professional from "../assets/professional.png";
import background from "../assets/section-img.jpg";
import infograph from "../assets/infographic.svg";
import servicesIcon1 from "../assets/service-icon-1.svg";
import hexagonCenter from "../assets/hexagon-center.svg";
import serviceIcon from "../assets/icon.svg";
import Icon2 from "../assets/icon-2.svg";
import Icon3 from "../assets/icon-3.svg";
import Icon4 from "../assets/icon-4.svg";
import Icon5 from "../assets/icon-5.svg";
import Icon6 from "../assets/icon-6.svg";
import Icon7 from "../assets/icon-7.svg";
import Icon8 from "../assets/icon-8.svg";
import Icon9 from "../assets/icon-9.svg";
import Icon10 from "../assets/icon-10.svg";
import Icon11 from "../assets/icon-11.svg";

const Home = () => {
  usePageTitle("Home");
  return (
    <>
      <div className="container hero-section">
        <h4 className="fw-light">Connect with us and</h4>
        <h1 className="fw-bold">
          Let's build your <br />
          success story together
        </h1>
        <Link to="/contact" className="orange-btn d-inline-block mt-2">
          Connect With Us
        </Link>
        <div className="trust-tag">
          <img src={trust} alt="trust" />
          <div className="trust-tag-content">
            <h5 className="text-white fs-6">Trusted By</h5>
            <p className="text-white fs-6">1000+ Influencer</p>
          </div>
        </div>
      </div>

      <div className="container wrapper">
        <div className="services-section text-center hexagon-section">
          <img src={hexagonCenter} className="hexagon-center" alt="" />

          <div
            className="hex md"
            role="img"
            aria-label="Verified Profile Badge"
          >
            <div className="hex-content">
              <img src={serviceIcon} className="icon" alt="" />
              <h3>Verified Profile Badge</h3>
              <div className="subtitle">
                Get a unique 'Verified Profile' Badge to add to your online
                profile in all social media platforms. A one-time label showing
                that you are an authentic and trustworthy user.
              </div>
            </div>
          </div>

          <div className="hex md" role="img" aria-label="Analytics">
            <div className="hex-content">
              <img src={Icon2} className="icon" alt="" />
              <h3>Profile Registration Number</h3>
              <div className="subtitle">
                Along with your 'Verified Profile' badge, get a registration
                number assigned that can be traced back to a portal listing of
                all verified registered members.
              </div>
            </div>
          </div>

          <div className="hex md" role="img" aria-label="Analytics">
            <div className="hex-content">
              <img src={Icon3} className="icon" alt="" />
              <h3>Profile Buy/Sell</h3>
              <div className="subtitle">
                Repository of buyers and sellers to sell or buy your profile as
                an asset.
              </div>
            </div>
          </div>

          <div className="hex md" role="img" aria-label="Analytics">
            <div className="hex-content">
              <img src={Icon10} className="icon" alt="" />
              <h3>Professional Liability Insurance</h3>
              <div className="subtitle">
              Safeguard yourself or your company from Legal lawsuits and and
                protect yourself from financial claims from our varied insurance
                policy packages to suite your needs.
              </div>
            </div>
          </div>

          <div className="hex md" role="img" aria-label="Analytics">
            <div className="hex-content">
              <img src={Icon11} className="icon" alt="" />
              <h3>Action against Fake/Duplicate profiles</h3>
              <div className="subtitle">
                We use our extensive network of profiles to flag illegal, fake
                and ransom fraudsters. Get advice on how to guard your profile
                and your followers.
              </div>
            </div>
          </div>

          <div className="hex md" role="img" aria-label="Analytics">
            <div className="hex-content">
              <img src={Icon8} className="icon" alt="" />
              <h3>Legal Counsel</h3>
              <div className="subtitle">
                Get access to experienced and proficient legal team located in
                your country of origin help drafting contractual obligations and
                collaborative agreements preparation with legal and strategic
                advice and representation.
              </div>
            </div>
          </div>

          <div className="hex md" role="img" aria-label="Analytics">
            <div className="hex-content">
              <img src={Icon9} className="icon" alt="" />
              <h3>Tax Counsel</h3>
              <div className="subtitle">
                Get access to our Tax accountant team located in your country of
                origin for local tax and investment advice. They can also file
                your taxes and offer you investment and strategic financial
                advice.
              </div>
            </div>
          </div>

          <div className="hex md" role="img" aria-label="Analytics">
            <div className="hex-content">
              <img src={Icon7} className="icon" alt="" />
              <h3>Multimedia Creation and Editing</h3>
              <div className="subtitle">
                A team of experts in video and image creation and editing are
                available round the clock at nominal rates.
              </div>
            </div>
          </div>

          <div className="hex md" role="img" aria-label="Analytics">
            <div className="hex-content">
              <img src={Icon6} className="icon" alt="" />
              <h3>Avail Discounts</h3>
              <div className="subtitle">
                From all participating apps and tools available for content
                creation. Avail discounts at conferences, meetings, and get
                updated on the latest trends in the field.
              </div>
            </div>
          </div>

          <div className="hex md" role="img" aria-label="Analytics">
            <div className="hex-content">
              <img src={Icon5} className="icon" alt="" />
              <h3>INFLUERE Linktree</h3>
              <div className="subtitle">
                Send your contacts ONE single link that leads them to a portal
                from INFLUERE showing all your social media presence on one
                page.
              </div>
            </div>
          </div>

          <div className="hex md d-none" role="img" aria-label="Analytics">
            <div className="hex-content">
              <img src={Icon10} className="icon" alt="" />
              <h3>Professional Liability Insurance</h3>
              <div className="subtitle">
                Safeguard yourself or your company from Legal lawsuits and and
                protect yourself from financial claims from our varied insurance
                policy packages to suite your needs.
              </div>
            </div>
          </div>

          <div className="hex md" role="img" aria-label="Analytics">
            <div className="hex-content">
              <img src={Icon4} className="icon" alt="" />
              <h3>Collaborate</h3>
              <div className="subtitle">
              Our most valued service for your growth. Use our repository to
                connect with like minded creators. Use your credits to request
                networking opportunities and cross promotion.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section wrapper pb-0">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="line mb-3"></div>
              <h5 className="mb-3 text-white">
                Build your influencer brand on our platform which will give you
                the tools and networking opportunities to grow and collaborate
                with other like minded influencers and merchant brands.
              </h5>
              <h5 className="text-white">
                Bring in revenue by tagging, adding, creating, reposting, on
                pictures and videos for/ by other influencer or simply report
                fake profiles and earn redeemable credits enough to pay your
                monthly.
              </h5>
              <Link
                to="/register"
                className="display-inline-block secondary-btn mt-3"
              >
                Register Now
              </Link>
            </div>
            <div className="col-md-6">
              <img src={about} alt="about" />
            </div>
          </div>
        </div>
      </div>

      <div className="professional-section wrapper">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 p-0">
              <img
                src={professional}
                className="img-fluid"
                alt="professional"
              />
            </div>
            <div className="col-md-7 professional-content">
              <h1 className="mb-3 fw-bold text-white">
                Professional Liability Insurance
              </h1>
              <p className="text-white">
                PLI acts as a kind of safety net protecting you and your
                business from the financial claim made by other players / stake
                holders . Our policy will cover all the leagal expenses to
                defend your interest in any negligence claim made against you /
                business.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid p-0 wrapper">
        <img src={background} className="img-fluid" alt="background" />
      </div>
      <div className="info-section wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2 className="fw-bold">About Us </h2>
              <div className="line mb-3"></div>
            </div>
            <div className="col-md-8">
              <p>
                Influere is a latin verb that means “to flow in” or “to affect”.
                It is the root of the english word “influence” and is what best
                describes our platform which has the power or capacity to affect
                someones future. The potential and talent by bringing the tools
                of computer software, the skills of professionals and the
                networking gains of collaboration to every influencer joining
                our us.
              </p>
              <p>
                We are multicultural, multinational and a global group of
                professionals, all bundle into this platform to provide you
                every opportunity to monitorize your skills and takes to the
                global audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
