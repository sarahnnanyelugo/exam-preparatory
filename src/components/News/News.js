import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Arrow from "../../assets/images/link-arrow.png";

import "./news.scss";
export const News = ({ data }) => {
  const [blogId, setBlogId] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setBlogId(data.id);
  });

  return (
    <div className="news-component col-md-6 flexy flexyM">
      <div
        className="col-md-6 col-6 news-img"
        // style={{ backgroundImage: `url(${data.img})` }}
      >
        <img src={data.img} width="100%" />
      </div>
      <div className="col-md-6 col-6 news-details">
        <h6>{data.newsHeading}</h6>
        <small>{data.date}</small>

        <p>{data.newsDetails}</p>
        <Link
          className="news-link"
          to={"/main-news/" + data.id}
          state={{ blog_id: blogId }}
        >
          Read More <img src={Arrow} width="17px" />
        </Link>
      </div>
    </div>
  );
};
