import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { News } from "../../../components/News/News";
import { latestNews } from "../../../TestData";
import FB from "../../../assets/images/fbb.svg";
import Whatsapp from "../../../assets/images/whatsapp.svg";
import Copy from "../../../assets/images/copy.svg";
import DisplayImg from "../../../assets/images/blog-imgs.png";
import Footer from "../../../components/Footer/Footer";
import EducareNavBar from "../../../components/EducareNavBar/EducareNavBar";
import { Navbar } from "../../../components/Navbar/Navbar";

// import "../../research-group.scss";
export const MainNews = () => {
  const [data, setData] = useState({});
  const [id, setId] = useState(0);
  const location = useLocation();
  const { blog_id } = useParams();
  useEffect(() => {
    setId(blog_id);
    console.log(blog_id);
  }, [blog_id]);

  useEffect(() => {
    if (id !== 0)
      setData(
        latestNews.find((obj) => {
          return obj.id == id;
        })
      );
    // console.log(data, research, id);
  }, [id]);
  const [state, setState] = useState({
    query: "",
    list: latestNews.filter((newsItem) => {
      return newsItem.id > 4;
    }),
  });

  return (
    <>
      {/* <EducareNavBar /> */}
      <Navbar />
      {data ? (
        <>
          <div className="col-md-10 offset-md-1 d-md-flex mobile-padding main-news-body">
            <div className="col-md-7 ">
              {" "}
              <div
                className=" main-img2 "
                // style={{ backgroundImage: `url(${data.img})` }}
              >
                <img src={data.img} width="100%" />
              </div>
            </div>
            <div className="  news-body">
              <h4>{data.newsHeading}</h4>

              <p>{data.moreDetails}</p>
              <div className="flexy mt8">
                <ul className="list-unstyled list-inline share">
                  <li className="list-inline-item">
                    <button className="copied-btn">
                      {" "}
                      <img src={Copy} width="20px" />
                      Copy link
                    </button>
                  </li>
                  <li className="list-inline-item">Published:</li>
                  <li className="list-inline-item">
                    <img src={FB} width="40px" />
                  </li>
                  <li className="list-inline-item">
                    <img src={Whatsapp} width="40px" />
                  </li>

                  <li className="list-inline-item">
                    <i class="icofont-linkedin"></i>{" "}
                    <img src={FB} width="40px" />
                  </li>
                </ul>
              </div>
              <p style={{ color: "#605F5F" }}>Published:{data.date}</p>
            </div>
            {/* <div className="col-md-3 offset-md-1">
              <h3>Older News</h3>
              <div className="row row-cols-1 row-cols-lg-1">
                {state.list.map((data, index) => (
                  <News data={data} key={data.id} />
                ))}
              </div>
            </div> */}
          </div>
          <div className="col-md-6 offset-md-3 blog-extra-details mobile-padding mt6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo
              massa. Eu dolor aliquet risus gravida nunc at feugiat consequat
              purus. Non massa enim vitae duis mattis. Vel in ultricies vel
              fringilla.{" "}
            </p>
            <h3>Introduction</h3>
            <p>
              {" "}
              Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
              suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum
              quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris
              posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At
              feugiat sapien varius id. Eget quis mi enim, leo lacinia pharetra,
              semper. Eget in volutpat mollis at volutpat lectus velit, sed
              auctor. Porttitor fames arcu quis fusce augue enim. Quis at
              habitant diam at. Suscipit tristique risus, at donec. In turpis
              vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac
              volutpat.
            </p>
            <img src={DisplayImg} width="100%" />
            <small>Image courtesy of Lagos Preparatory School (LPSS)</small>
            <p className="mt3 special-quote">
              <em>
                {" "}
                “In a world older and more complete than ours they move finished
                and complete, gifted with extensions of the senses we have lost
                or never attained, living by voices we shall never hear.”
              </em>
            </p>
            <small>
              {" "}
              <em>— Alex Onyia, CEO EDUCARE</em>
            </small>
            <p className="mt3 ">
              Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
              nulla odio nisl vitae. In aliquet pellentesque aenean hac
              vestibulum turpis mi bibendum diam. Tempor integer aliquam in
              vitae malesuada fringilla. Elit nisi in eleifend sed nisi.
              Pulvinar at orci, proin imperdiet commodo consectetur convallis
              risus. Sed condimentum enim dignissim adipiscing faucibus
              consequat, urna. Viverra purus et erat auctor aliquam. Risus,
              volutpat vulputate posuere purus sit congue convallis aliquet.
              Arcu id augue ut feugiat donec porttitor neque. Mauris, neque
              ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget
              nunc lectus in tellus, pharetra, porttitor.
            </p>
            <hr />
            <div className="d-flex">
              {" "}
              <h6 style={{ flexGrow: 1 }}>Share this post</h6>
              <ul className="list-unstyled list-inline share">
                <li className="list-inline-item">
                  <button className="copied-btn">
                    {" "}
                    <img src={Copy} width="20px" />
                    Copy link
                  </button>
                </li>
                <li className="list-inline-item">
                  <img src={FB} width="40px" />
                </li>
                <li className="list-inline-item">
                  <img src={Whatsapp} width="40px" />
                </li>

                <li className="list-inline-item">
                  <i class="icofont-linkedin"></i> <img src={FB} width="40px" />
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="col-md-8 offset-md-2 flexy prefooter mt mobile-padding">
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
