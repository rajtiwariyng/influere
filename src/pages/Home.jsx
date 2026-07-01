import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import useScrollReveal from "../hooks/useScrollReveal";
import trust from "../assets/people-img.svg";
import about from "../assets/about.png";
import professional from "../assets/professional.png";
import background from "../assets/section-img.jpg";
import infograph from "../assets/infographic.svg";
import servicesIcon1 from "../assets/service-icon-1.svg";
import serviceIcon from "../assets/icon.svg";
import Icon2 from "../assets/icon-2.svg";
import Icon3 from "../assets/icon-3.svg";
import Icon4 from "../assets/icon-4.svg";
import Icon7 from "../assets/icon-7.svg";
import Icon8 from "../assets/icon-8.svg";
import Icon9 from "../assets/icon-9.svg";
import Icon10 from "../assets/icon-10.svg";

// 8 services that surround the bold central hexagon (3 flat-top columns)
const hexCols = [
  [
    { icon: serviceIcon, title: "Verified Profile Badge", desc: "Get a unique 'Verified Profile' badge for all your social platforms — a label showing you're an authentic and trustworthy user." },
    { icon: Icon8, title: "Legal Counsel", desc: "Access experienced legal teams in your country for contracts, collaborative agreements, strategic advice and representation." },
    { icon: Icon7, title: "Multimedia Creation & Editing", desc: "Experts in video and image creation and editing, available round the clock at nominal rates." },
  ],
  [
    { icon: Icon3, title: "Profile Buy/Sell", desc: "A repository of buyers and sellers to buy or sell your profile as an asset." },
    { center: true },
    { icon: Icon9, title: "Tax Counsel", desc: "Access tax accountants in your country for tax filing, investment and strategic financial advice." },
  ],
  [
    { icon: Icon4, title: "Collaborate", desc: "Connect with like-minded creators and use your credits to request networking opportunities and cross-promotion." },
    { icon: Icon2, title: "Profile Registration Number", desc: "A registration number traceable to a portal listing all verified, registered members." },
    { icon: Icon10, title: "Professional Liability Insurance", desc: "Safeguard yourself or your company from legal lawsuits and financial claims with our insurance packages." },
  ],
];

const renderHex = (item, key) => {
  if (item.center) {
    return (
      <div key={key} className="hc-cell hc-center">
        <div className="hc-center-inner">
          <span className="hc-brand">iCollaborate.ai</span>
          <span className="hc-provides">Provides</span>
          <p>
            Comprehensive support to drive your growth. Our mission is to
            ensure you're equipped with all the tools necessary.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div key={key} className="hc-cell hc-surround">
      <div className="hc-inner">
        <div className="hc-face hc-front">
          <img src={item.icon} className="hc-icon" alt="" />
          <h3>{item.title}</h3>
        </div>
        <div className="hc-face hc-back">
          <img src={item.icon} className="hc-icon" alt="" />
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  usePageTitle("Home");
  useScrollReveal();

  // Scroll-scrubbed honeycomb: progress (0..1) drives both the un-packing
  // (--spread) and a staggered rotateY flip on each surrounding hexagon.
  const honeycombRef = useRef(null);
  useEffect(() => {
    const el = honeycombRef.current;
    if (!el) return;
    const cells = Array.from(el.querySelectorAll(".hc-surround .hc-inner"));
    const STAGGER = 0.035;
    const SPAN = 0.32;
    let raf = 0;

    const apply = () => {
      raf = 0;
      const absTop = el.getBoundingClientRect().top + window.scrollY;
      const begin = Math.max(0, absTop - window.innerHeight * 0.45 - 20);
      const dist = Math.max(el.offsetHeight * 0.5, 280);
      let p = (window.scrollY - begin) / dist;
      p = Math.min(1, Math.max(0, p));
      el.style.setProperty("--spread", p.toFixed(3));
      cells.forEach((c, i) => {
        let cp = (p - i * STAGGER) / SPAN;
        cp = Math.min(1, Math.max(0, cp));
        c.style.transform = `rotateY(${(cp * 180).toFixed(1)}deg)`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="container hero-section" data-animate data-reveal-once>
        <h4 className="fw-light">Connect with us and</h4>
        <h1 className="fw-bold">
          Let's build your <br />
          success story together
        </h1>
        <Link to="/#contact-details" className="orange-btn d-inline-block mt-2">
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

      <div id="services" className="container wrapper">
        <div className="honeycomb" ref={honeycombRef}>
          <div className="honeycomb-grid">
            {hexCols.map((col, ci) => (
              <div key={ci} className="hc-col">
                {col.map((item, ri) => renderHex(item, `${ci}-${ri}`))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="why-join" className="about-section wrapper pb-0" data-animate>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="fw-bold text-white mb-2">What is iCollaborate.ai</h2>
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

      <div className="professional-section wrapper" data-animate>
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
      <div id="about-us" className="info-section wrapper" data-animate>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2 className="fw-bold">About Us</h2>
              <div className="line mb-3"></div>
            </div>
            <div className="col-md-8">
              <p>
                iCollaborate.ai uses advanced AI to analyze audience
                demographics, engagement quality, and content style,
                automatically pairing influencers with compatible peers for
                high-impact collaborations. Beyond matchmaking, this
                one-stop-shop approach functions as a comprehensive, centralized
                ecosystem for the professional influencer, streamlining the
                entire partnership lifecycle from AI-driven discovery and
                automated outreach to legal contracting, content approvals, and
                secure, instant payments. The platform integrates directly with
                e-commerce systems, provides a single dashboard to track ROI
                through analytics and manage all professional requirements,
                including content creation tools and campaign reporting,
                eliminating the need for fragmented, manual workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
