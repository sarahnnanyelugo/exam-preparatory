import React, { useEffect, useState } from "react";
import "./filter.scss";
import Arrow from "../../../assets/images/filter-arrow.png";
const FIlter = ({ callback, posts }) => {
  const [sortType, setSortType] = useState("ascending");

  // Sortby field i.e. title or description
  const [sortByField, setSortByField] = useState("date");

  // Store filter/latest posts
  const [result, setResult] = useState();

  const [state, setstate] = useState({
    query: "",
    list: posts,
  });
  // Filter posts on typing in search input
  const handleChange = (e) => {
    const results = posts.filter((post) => {
      if (e.target.value === "") return posts;
      return (
        post["newsHeading"]
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        post["newsDetails"].toLowerCase().includes(e.target.value.toLowerCase())
      );
    });

    setResult(results);

    setstate({
      query: e.target.value,
      list: sortFunc(results, sortType, sortByField),
    });
  };

  // Sort posts depending on sort type and available results
  function sortFunc(results, sortType, sortByField) {
    if (sortType === "ascending") {
      results.sort((a, b) => (a[sortByField] < b[sortByField] ? -1 : 1));
    } else if (sortType === "descending") {
      results.sort((a, b) => (b[sortByField] > a[sortByField] ? 1 : -1));
    }
    return results;
  }

  //   Dropdown to sort posts in ascending or descending order depending on title.
  function updatePosts(e) {
    setSortType(e);
    setstate({
      query: state.query,
      list: !result
        ? sortFunc(posts, e, sortByField)
        : sortFunc(result, e, sortByField),
    });
  }
  useEffect(() => {
    callback(state);
  }, [state]);

  function sortBy(e) {
    setSortByField(e);
    setstate({
      query: state.query,
      list: !result
        ? sortFunc(posts, sortType, e)
        : sortFunc(result, sortType, e),
    });
  }
  return (
    <>
      <div className=" sort-container ">
        <img className="filter-arrow" src={Arrow} alt="Scholar" width="20px" />{" "}
        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => updatePosts(e.target.value)}
        >
          <option value="DEFAULT" disabled>
            Order
          </option>
          <option value="ascending">Newest first</option>
          <option value="descending">Oldest first</option>
        </select>{" "}
      </div>
    </>
  );
};

export default FIlter;
