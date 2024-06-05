import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./news-page.scss";
import { News } from "../../components/News/News";
import { latestNews } from "../../TestData";
import Footer from "../../components/Footer/Footer";
import FIlter from "./Filter/FIlter";
import SearchBar from "../../components/SearchBar/SearchBar";
export const NewsPage = () => {
  const [state, setState] = useState({
    query: "",
    list: latestNews,
  });
  function reducer(dt) {
    setState(dt);
  }
  return (
    <>
      {" "}
      <div className="news-page">
        <center>
          <div className="col-md-5">
            {" "}
            <p>Our blog</p>
            <h1>Our Resources</h1>
            <p>
              Subscribe to learn about our new product features, latest on our
              exams platform, solutions and updates.
            </p>
          </div>
        </center>
        <div className="d-flex offset-md-4 col-md-4 mt4">
          <input placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>
      <div className="flexy col-md-10 offset-md-1 mt">
        <div className="col-md-3 ">
          {" "}
          <SearchBar callback={reducer} posts={latestNews} />
        </div>
        <div className=" flexy flexyM offset-md-7 col-md-2">
          <FIlter callback={reducer} posts={latestNews} />
        </div>
      </div>
      <div className="row row-cols-1 row-cols-lg-2  g-lg-2 col-md-10 offset-md-1 mt2">
        {state.list.map((data, index) => (
          <News data={data} key={data.id} />
        ))}
      </div>
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
