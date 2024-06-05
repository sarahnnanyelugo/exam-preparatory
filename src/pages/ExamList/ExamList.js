import React, { useContext, useEffect, useRef, useState } from "react";
import { Exams } from "../../components/Exams/Exams";
import "./exam-list.scss";
import { Navbar } from "../../components/Navbar/Navbar";
import AuthContext from "../../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { getWalletBalance } from "../../store/actions/walletActions";
import { getPastQuestions } from "../../store/actions/examActions";
import { GhostExamListLoader } from "../../components/Loaders/GhostExamListLoader";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ExamCards } from "../../components/Exams/ExamCards";
import { ExamCardEmpty } from "../../components/Exams/ExamCardEmpty";
import { ExamFilter } from "../../components/Exams/ExamFilter";
import { NavbarFooter } from "../../components/Navbar/NavbarFooter";
import { GhostExamListMobileLoader } from "../../components/Loaders/GhostExamListMobileLoader";

export const ExamList = ({ handle }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("Newest");
  const [show, setShow] = useState(false);
  const [filterData, setFilterData] = useState({
    type: "",
    subject: "",
    year: "",
  });
  const { balance } = useSelector((state) => state.wallet);
  const { examsdata } = useSelector((state) => state.exam);
  const dispatch = useDispatch();
  const pageSize = 10;

  const sortData = ["Newest", "Oldest", "Subject", "Year"];

  useEffect(() => {
    if (!user.navUrl) {
      dispatch(getWalletBalance(user));
    }
    if (user.navUrl) {
      navigate(user.navUrl, { replace: true });
    }
    return () => {
      localStorage.removeItem(`filters`);
    };
  }, []);
  useEffect(() => {
    if (!user.navUrl) {
      handleSearch();
    }
  }, [pageSize, currentPage, sort]);

  const useDesktopMediaQuery = () =>
    useMediaQuery({ query: "(min-width: 769px)" });

  const useTabletAndBelowMediaQuery = () =>
    useMediaQuery({ query: "(max-width: 768px)" });

  const Desktop = ({ children }) => {
    const isDesktop = useDesktopMediaQuery();
    return isDesktop ? children : null;
  };

  const TabletAndBelow = ({ children }) => {
    const isTabletAndBelow = useTabletAndBelowMediaQuery();
    return isTabletAndBelow ? children : null;
  };

  const handleClose = () => setShow(false);
  const handleSetShow = () => setShow(true);

  const handleGoToNext = (page) => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleGoToPrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleSetFilter = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  const handleSearch = (flag) => {
    const data = { pageSize, currentPage, sort };
    const filters = JSON.parse(localStorage.getItem(`filters`) || "{}");

    if (filters.subjectFilter && filters.subjectFilter.length > 0) {
      data.subject = filters.subjectFilter;
    }
    if (filters.typeFilter && filters.typeFilter.length > 0) {
      data.type = filters.typeFilter;
    }
    if (filters.yearFilter && filters.yearFilter.length > 0) {
      data.year = filters.yearFilter;
    }
    if (examsdata.types.length === 0) data.is_filter = true;
    dispatch(getPastQuestions(data));
    if (flag) {
      handleClose();
    }
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <Desktop>
        <div className="home-div col-md-10 offset-md-1 mt5">
          <div className="flexy flexyM unit">
            <h3>Search Questions</h3>
            <Link to={"/wallet"}>
              <button>Units balance: {balance}</button>
            </Link>
          </div>
          <ExamFilter
            handleClose={handleClose}
            show={show}
            Desktop={Desktop}
            TabletAndBelow={TabletAndBelow}
            handleSearch={handleSearch}
          />
          <br />
          <div className="d-flex sort  ">
            <h3>Explore Past Questions</h3>
            <div className="d-flex">
              <h6>Sort by:</h6>
              <div className="select-div">
                {" "}
                <select value={sort} onChange={handleSort}>
                  {sortData.map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {examsdata.loading &&
            Array(pageSize)
              .fill()
              .map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <GhostExamListLoader></GhostExamListLoader>
                  </React.Fragment>
                );
              })}
          {!examsdata.loading && examsdata.pastQuestions && (
            <Exams
              globalFilter={filterData}
              onGlobalFilterChange={handleSearch}
              data={examsdata.pastQuestions}
              meta={examsdata.questionsMeta}
              onGotoNextPage={handleGoToNext}
              onGotoPrevPage={handleGoToPrev}
              currentPage={currentPage}
              handle={handle}
            />
          )}
        </div>
      </Desktop>

      <TabletAndBelow>
        {/*<div><NavbarMobile /></div>*/}
        <div className="mobile-ms">
          {/*<div className="flexy flexyM unit">*/}
          {/*  <Link to={"/wallet"}>*/}
          {/*    <button>Units balance: {balance}</button>*/}
          {/*  </Link>*/}
          {/*</div>*/}
          <div className="flexy sort flexyM unit">
            <h3>Explore Past Questions</h3>
            {/*<div className="flexy flexyM">*/}
            {/*  <select value={sort} onChange={handleSort}>*/}
            {/*    {sortData.map((item, idx) => (*/}
            {/*        <option key={idx} value={item}>*/}
            {/*          {item}*/}
            {/*        </option>*/}
            {/*    ))}*/}
            {/*  </select>*/}
            {/*</div>*/}
            <Link to={"/wallet"}>
              <button>Units balance: {balance}</button>
            </Link>
          </div>
          {examsdata.loading &&
            Array(pageSize)
              .fill()
              .map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <GhostExamListMobileLoader></GhostExamListMobileLoader>
                  </React.Fragment>
                );
              })}
          {!examsdata.loading && !!examsdata.pastQuestions?.length && (
            <ExamCards
              globalFilter={filterData}
              onGlobalFilterChange={handleSearch}
              data={examsdata.pastQuestions}
              meta={examsdata.questionsMeta}
              handleGotoNext={handleGoToNext}
              handleGotoPrevious={handleGoToPrev}
              currentPage={currentPage}
              handle={handle}
            />
          )}
          {!examsdata.loading && !!!examsdata.pastQuestions?.length && (
            <ExamCardEmpty />
          )}
        </div>
        {/*<FabCard setShow={handleSetShow} show={show}/>*/}
        <ExamFilter
          handleClose={handleClose}
          show={show}
          Desktop={Desktop}
          TabletAndBelow={TabletAndBelow}
          handleSearch={handleSearch}
        />
        <div>
          {!!!show && (
            <NavbarFooter
              setShow={handleSetShow}
              handleSort={handleSort}
              sort={sort}
              sortData={sortData}
            />
          )}
        </div>
      </TabletAndBelow>
    </>
  );
};
