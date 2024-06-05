import React, { useContext, useEffect, useState } from "react";
import EducareNavBar from "../../components/EducareNavBar/EducareNavBar";

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
import Educators from "../../assets/images/educators.png";

import "./home.scss";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Testimonials from "../Testimonial/Testimonials";
import AuthContext from "../../context/AuthProvider";
import PartnersSlider from "../../components/PartnersSlider/PartnersSlider";
import { latestNews } from "../../TestData";
import { News } from "../../components/News/News";
export const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);
  const [state, setState] = useState({
    query: "",
    //  list: popularCourses,
    list2: latestNews.filter((newsItem) => {
      return newsItem.id <= 2;
    }),
    //  list3: latestEvents,
  });
  return (
    <>
      <EducareNavBar />
      <div className="landing-div col-md-12 flexy">
        <div className="col-md-4 offset-md-1 mt">
          <h1>One platform for all Exam Preparation. ⚡︎</h1>
          <p className="col-md-10">
            Achieve exam-ready confidence with our CBT tools, providing
            comprehensive practice and detailed solutions to boost your
            performance.
          </p>

          <Link to={"/authenticate"}>
            <button>Become a member</button>
          </Link>
          <br />
          <div className="flexy mt3 examlogos">
            {" "}
            <img src={Ielt} alt="img" width="54px" height="21px" className="" />
            <img
              src={Igcse}
              alt="img"
              width="30px"
              height="35px"
              className=""
            />
            <img src={Sat} alt="img" width="45px" height="35px" className="" />
            <img src={Waec} alt="img" width="54px" height="42px" className="" />
            <img
              src={Toefl}
              alt="img"
              width="85px"
              height="16px"
              className="mt1"
            />
            <img src={Jamb} alt="img" width="34px" height="32px" className="" />
          </div>
          <img src={Users} alt="img" width="136px" className="mt1" />
          <h6 style={{ fontFamily: "   font-family: rebondG-Bold" }}>
            Over 1,000,000 registered students
          </h6>
        </div>
      </div>
      <div className="col-md-12">
        <PartnersSlider />
      </div>
      <div className="col-md-10 offset-md-1 mt">
        <center>
          <h3 style={{ fontFamily: "   font-family: rebondG-Bold" }}>
            One platform for all Exams
          </h3>
          <p>Browse through our top exams questions</p>
        </center>
        <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
          <div className="col">
            <div className="exam-container flexy flexyM">
              {" "}
              <img src={Jamb} alt="logo" className="" width="44px" />
              <h6>JAMB Exams</h6>
            </div>
          </div>{" "}
          <div className="col">
            <div className="exam-container flexy flexyM">
              {" "}
              <img src={Waec} alt="logo" className="" width="44px" />
              <h6>Waec Exams</h6>
            </div>
          </div>{" "}
          <div className="col">
            <div className="exam-container flexy flexyM">
              {" "}
              <img src={Igcse} alt="logo" className="" width="38px" />
              <h6>IGCSE Exams</h6>
            </div>
          </div>{" "}
          <div className="col">
            <div className="exam-container flexy flexyM">
              {" "}
              <img
                src={Toefl}
                alt="logo"
                className="mt1"
                width="44px"
                height="9px"
              />
              <h6>TOEFL Exams</h6>
            </div>
          </div>{" "}
          <div className="col">
            <div className="exam-container flexy flexyM">
              {" "}
              <img src={Neco} alt="logo" className="" width="44px" />
              <h6>NECO Exams</h6>
            </div>
          </div>
          <div className="col">
            <div className="exam-container flexy flexyM">
              {" "}
              <img src={Ielt} alt="logo" className="" width="70px" />
              <h6>IELT Exams</h6>
            </div>
          </div>{" "}
          <div className="col">
            <div className="exam-container flexy flexyM">
              {" "}
              <img src={Olympiad} alt="logo" className="" width="38px" />
              <h6>OLYMPIAD Exams</h6>
            </div>
          </div>
          <div className="col">
            <div className="exam-container flexy flexyM">
              {" "}
              <img src={Sat} alt="logo" className="" width="70px" />
              <h6>SAT Exams</h6>
            </div>
          </div>
          <div className="col">
            <div className="exam-container flexy flexyM">
              {" "}
              <img src={Bece} alt="logo" className="" width="41px" />
              <h6>BECE Exams</h6>
            </div>
          </div>
          <div className="col">
            <div className="exam-container flexy flexyM">
              {" "}
              <img src={Bece} alt="logo" className="" width="44px" />
              <h6>Checkpoint Exams</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-10 offset-md-1 mt">
        {" "}
        <center>
          <h2 style={{ fontFamily: "   font-family: rebondG-Bold" }}>
            Discover how we support success for every learner
          </h2>
        </center>
        <div className="row row-cols-1 row-cols-lg-3 g-2 g-lg-5 discover2">
          <div className="col mt margin2">
            <center>
              <img src={Star} alt="" width="57px" />
              <h5>High Quality Contents:</h5>
              <p>
                Well-constructed, relevant, and effective questions that assess
                a student’s knowledge and understanding of the subject and asses
                thier readiness for exams.
              </p>
            </center>
          </div>{" "}
          <div className="col mt margin2">
            <center>
              <img src={Schedule} alt="" width="57px" />
              <h5>Personalized Learning Paths:</h5>
              <p>
                Learners and students practice at their own pace, our CBT system
                adapt to individual learning styles and pace, offering
                personalised learning paths that cater to the their specific
                needs.
              </p>
            </center>
          </div>{" "}
          <div className="col mt margin2">
            <center>
              <img src={Customize} alt="" width="57px" />
              <h5>Detailed Analytics:</h5>
              <p>
                Comprehensive performance analytics help students track their
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
      <div className="col-md-10 offset-md-1 flexy discover mtt">
        <div className="col-md-4 mt8 no-margin">
          <small>For educators</small>
          <h3>Tools that empower teachers and educators</h3>
          <p>
            This technology enables educators with quick performance analysis,
            revealing student strengths and areas for improvement. It’s
            adaptability in tailoring assessments enables educators to refine
            teaching strategies for a personalized learning experience.
          </p>
          <Link to={"/"}>
            {" "}
            <button>Get started here</button>
          </Link>
        </div>
        <div className="col-md-6 offset-md-2 margin2">
          {" "}
          <img src={Educators} alt="" width="100%" />
        </div>
      </div>{" "}
      <div className="col-md-10 offset-md-1 flexy discover">
        <div className="col-md-6">
          {" "}
          <img src={Parents} alt="" width="100%" />
        </div>
        <div className="col-md-4 offset-md-2 mt8 no-margin">
          <small>For parents</small>
          <h3>Your child deserves the best learning opportunities.</h3>
          <p>
            By signing up your child, you’re contributing to your child’s exam
            success by learning and practicing our vetted past questions, coming
            out with a outstanding results.
          </p>
          <Link to={"/"}>
            {" "}
            <button>Get started here</button>
          </Link>
        </div>
      </div>
      <div className="col-md-12 all-learners mt">
        <center>
          <div className="col-md-5">
            <h4 style={{ fontFamily: "   font-family: rebondG-Bold" }}>
              For all learners
            </h4>
            <p>
              Whether you’re a student preparing for standardized tests, a
              professional seeking certification, or someone on a lifelong
              learning journey, our platform is designed to cater to your unique
              needs
            </p>
          </div>
        </center>
        <div className="col-md-10 offset-md-1 row row-cols-1 row-cols-lg-3 g-2 g-lg-3 discovered">
          <div className="col">
            <h1 className="step-num">01</h1>
            <div className="steps2">
              <h4>Sign Up</h4>
              <center>
                <span>ddddd</span>
              </center>
              <p>
                Join our platform by creating your account. It’s a quick
                process, providing access to all questions.
              </p>
            </div>
          </div>{" "}
          <div className="col">
            <h1>02</h1>
            <div className="steps2">
              <h4>Fund your Wallet</h4>
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
            <div className="steps2">
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
      <div className="testimonial-div flexy">
        <div className="col-md-3 offset-md-2 heading">
          <h4>People say about us</h4>
          <p>
            The only one platform who caters exam practice test for learners
            across the globe.
          </p>
        </div>
        <div className="col-md-4 offset-md-1">
          <Testimonials />
        </div>
      </div>
      <center>
        <h2>From the blog</h2>
        <p>The latest new product features, solutions and updates.</p>
      </center>
      <div className="col-md-10 offset-md-1  row row-cols-1 row-cols-lg-2 g-2 g-lg-3 mt3">
        {state.list2.map((data, index) => (
          <News data={data} key={"m" + index} />
        ))}
      </div>
      <center className="mt8">
        <Link to={"/news-page"}>
          {" "}
          <button className="blog-link ">View all posts</button>
        </Link>
      </center>
      <div className="col-md-8 offset-md-2 flexy prefooter mt">
        <div className="col-md-6">
          <h1>
            Start Your
            <br /> Exam Journey Now ⚡︎
          </h1>
          <p>
            Embrace the power of technology and learning and let's help you ace
            your exams
          </p>
        </div>
        <div className="col-md-3 offset-md-3">
          <Link to={"/authenticate"}>
            <button>Browse subjects</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};
