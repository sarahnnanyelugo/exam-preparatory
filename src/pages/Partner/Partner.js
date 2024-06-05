import React, { useContext, useEffect } from "react";
import EducareNavBar from "../../components/EducareNavBar/EducareNavBar";
import Img from "../../assets/images/main-pic.png";
import Grange from "../../assets/images/grange.png";
import LBS from "../../assets/images/lbs.png";
import Meadow from "../../assets/images/meadow.png";
import Evergreen from "../../assets/images/evergreen.png";
import Lagoon from "../../assets/images/lagoon.png";
import Starvile from "../../assets/images/starvile.png";
import Jamb from "../../assets/images/jamb.png";
import Waec from "../../assets/images/waec.png";
import Igcse from "../../assets/images/igcse.png";
import Toefl from "../../assets/images/toefl.png";
import Neco from "../../assets/images/neco.png";
import Ielt from "../../assets/images/ielt.png";
import Olympiad from "../../assets/images/olympiad.png";
import Sat from "../../assets/images/sat.png";
import Bece from "../../assets/images/bece.png";
import Users from "../../assets/images/users.png";
import Star from "../../assets/images/star.png";
import Schedule from "../../assets/images/schedule.png";
import Customize from "../../assets/images/customize.png";
import Parents from "../../assets/images/parents.png";
import Banner from "../../assets/images/p-banner.png";
import Img2 from "../../assets/images/p-img.png";

import "./partner.scss";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Testimonials from "../Testimonial/Testimonials";
import AuthContext from "../../context/AuthProvider";

export const Partner = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <EducareNavBar isPartner={true} />
      <div className="partner-cover">
        <img src={Banner} width="100%" className="b-img" />

        <div className="partner-overlay">
          <h1>Become a Partner</h1>
          <p>Partner with Us to Transforming Educational Experiences!</p>
        </div>
      </div>
      <center>
        {" "}
        <div className="build col-md-9  d-md-flex col-10">
          <div className="col-md-6">
            <h2 style={{ fontFamily: "   font-family: rebondG-Bold" }}>
              Build your business as an educare Partner
            </h2>
            <p>
              This technology enables educators with quick performance analysis,
              revealing student strengths and areas for improvement. It’s
              adaptability in tailoring assessments enables educators to refine
              teaching strategies for a personalized learning experience.
            </p>
          </div>
          <div className="col-md-6">
            {" "}
            <img src={Img2} className="col-md-11 offset-md-1" width="100%" />
          </div>
        </div>
      </center>
      <div className="col-md-10 offset-md-1 mt " id="partner">
        <center>
          <h2>Discover how we support success for every learner</h2>
        </center>
        <div className="row row-cols-1 row-cols-lg-3 g-2 g-lg-5 discover2">
          <div className="col mt margin2">
            <center>
              <img src={Star} alt="" width="57px" />
              <h5>New revenue streams:</h5>
              <p>
                Earn more revenue for the clients under you when they purchase
                units. Expand your profits with up to 20% of recurring
                commission, referral bonuses, and more.
              </p>
            </center>
          </div>{" "}
          <div className="col mt margin2">
            <center>
              <img src={Schedule} alt="" width="57px" />
              <h5>Expanded Business Dashboard:</h5>
              <p>
                See the list of users, monitor the progress of Learners as they
                practice at their own pace, our CBT system give Test analysis of
                the Learners under you.
              </p>
            </center>
          </div>{" "}
          <div className="col mt margin2">
            <center>
              <img src={Customize} alt="" width="57px" />
              <h5>Detailed Analytics:</h5>
              <p>
                Comprehensive performance analytics help to track students
                progress, identify areas for improvement, and tailor their study
                plans accordingly.
              </p>
            </center>
          </div>
        </div>
      </div>

      <center className="mt8">
        <Link to={"/demo-page"}>
          <button className="demo-btn">See how it works</button>
        </Link>
      </center>

      <div className="col-md-12 all-learners mt">
        <center>
          <div className="col-md-5">
            <h2>For all learners</h2>
            <p>
              Whether you’re a student preparing for standardized tests, a
              professional seeking certification, or someone on a lifelong
              learning journey, our platform is designed to cater to your unique
              needs
            </p>
          </div>
        </center>
        <div className="col-md-10 offset-md-1 row row-cols-1 row-cols-lg-3 g-2 g-lg-3 discover2">
          <div className="col">
            <h1>01</h1>
            <div className="steps">
              <h4>Sign Up</h4>
              <center>
                <span>ddddd</span>
              </center>
              <p>
                Join our platform by creating your account. It’s a quick
                process, providing access to all clients under you.
              </p>
            </div>
          </div>{" "}
          <div className="col">
            <h1>02</h1>
            <div className="steps">
              <h4>Fund you wallets</h4>
              <center>
                <span>ddddd</span>
              </center>
              <p>
                Add units securely to your wallet, enabling access to practice
                tests and get detailed solutions.
              </p>
            </div>
          </div>{" "}
          <div className="col">
            <h1>03</h1>
            <div className="steps">
              <h4>Practice your test</h4>
              <center>
                <span>ddddd</span>
              </center>
              <p>
                Select a test, answer questions, and review with detailed
                solutions to prepare for your exams.
              </p>
            </div>
          </div>
        </div>
      </div>

      <center className="mt4 mb-5">
        <Link to={"/authenticate-business"}>
          <button className="demo-btn">JOIN NOW</button>
        </Link>
      </center>

      <Footer />
    </>
  );
};
