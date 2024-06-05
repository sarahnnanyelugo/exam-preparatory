import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { analysis } from "../../TestData";
import { Analysis } from "./Analysis/Analysis";
import "./test-analysis.scss";
import Icon from "../../assets/images/search.svg";

import Table from "react-bootstrap/Table";
import AuthContext from "../../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionAnalysis } from "../../store/actions/examActions";
import { GhostExamListLoader } from "../../components/Loaders/GhostExamListLoader";
import { ExamAnalysis } from "../../components/Exams/ExamAnalysis";
import { useMediaQuery } from "react-responsive";
import { GhostExamListMobileLoader } from "../../components/Loaders/GhostExamListMobileLoader";
import { ExamCardAnalysis } from "../../components/Exams/ExamCardAnalysis";
import { AnalysisFilter } from "../AnalysisDashboard/AnalysisFilter";
import { setGlobalAnalysisFilter } from "../../store/slices/adminSlice";
import Form from "react-bootstrap/Form";

export const TestAnalysis = ({ isAdmin, isBusiness }) => {
  isAdmin = isAdmin || isBusiness;
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleSetShow = () => setShow(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sort, setSort] = useState("");
  const { user, isLoggedIn } = useContext(AuthContext);
  const { analysisdata, adminsdata } = useSelector((state) => state.exam);
  const dispatch = useDispatch();
  // const sortData = ["Newest", "Oldest", "Subject", "Year"];
  const [filterData, setFilterData] = useState({ search: "" });
  const [date, setDate] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const sortData = ["", "Highest Score"];
  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleGoToNext = (page) => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleGoToPrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleResetCurrentPage = () => {
    setCurrentPage((prev) => 1);
  };

  const handleSetFilter = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
    // handleSearch();
  };

  const handleSearch = () => {
    const data = { pageSize, currentPage, sort };

    data.isSearch = true;
    // if (filterData.search.length > 0) data.search = filterData.search;
    handleApiData(data);
  };

  const handleApiData = (data) => {
    const filters = JSON.parse(localStorage.getItem(`analysisFilters`) || "{}");

    if (filters.subjectFilter && filters.subjectFilter.length > 0) {
      data.subject = filters.subjectFilter;
    }

    if (filters.typeFilter && filters.typeFilter.length > 0) {
      data.type = filters.typeFilter;
    }
    if (filters.yearFilter && filters.yearFilter.length > 0) {
      data.year = filters.yearFilter;
    }
    if (isAdmin && adminsdata.types.length === 0) data.is_filter = true;
    data.isAdmin = isAdmin;
    if (data.isAdmin) {
      data.start_date = date;
      data.end_date = dateEnd;
    }
    if (data.isSearch) {
      handleResetCurrentPage();
      data.currentPage = 1;
    }
    dispatch(getQuestionAnalysis(data));
  };

  useEffect(() => {
    handleApiData({ pageSize, currentPage, sort });
  }, [pageSize, currentPage]);

  useEffect(() => {
    return () => {
      const payload = {
        typeFilter: "",
        yearFilter: "",
        subjectFilter: "",
      };
      dispatch(setGlobalAnalysisFilter(payload));
    };
  }, []);

  return (
    <>
      <div>{isAdmin ? "" : <Navbar />}</div>
      <Desktop>
        <div className="test-analysis-div col-md-10 offset-md-1">
          <div className="flexy flexyM search-bar mt6">
            <div className="lisxt ">{!isAdmin && <h5>Test List</h5>}</div>
          </div>
          {isAdmin && !analysisdata.loading && analysisdata.pastQuestions && (
            // <div className="col-md-2 search-input offset-md-9 offset-2">
            //   <input name="search" type="search" placeholder="search JAMB, WAEC... Chemistry, Physics...
            //    " onChange={handleSetFilter}/>
            //   <img src={Icon} alt=""/>
            // </div>
            <>
              <AnalysisFilter
                isAdmin={isAdmin}
                handleClose={handleClose}
                show={show}
                Desktop={Desktop}
                TabletAndBelow={TabletAndBelow}
                handleSearch={handleSearch}
              />
              <div className="flexy sort flexyM filter">
                <div className="App">
                  <div>
                    <label htmlFor="datestart">Start Date</label>
                    <Form.Control
                      type="date"
                      name="datestart"
                      placeholder="DateRange"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="dateend">End Date</label>
                    <Form.Control
                      type="date"
                      name="dateend"
                      placeholder="DateRange"
                      value={dateEnd}
                      onChange={(e) => setDateEnd(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <h6>Sort by:</h6>
                  <select value={sort} onChange={handleSort}>
                    {sortData.map((item, idx) => (
                      <option key={idx} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
          {analysisdata.loading &&
            Array(pageSize)
              .fill()
              .map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <GhostExamListLoader></GhostExamListLoader>
                  </React.Fragment>
                );
              })}
          {!analysisdata.loading && analysisdata.pastQuestions && (
            <ExamAnalysis
              globalFilter={filterData}
              onGlobalFilterChange={handleSearch}
              data={analysisdata.pastQuestions}
              meta={analysisdata.questionsMeta}
              onGotoNextPage={handleGoToNext}
              onGotoPrevPage={handleGoToPrev}
              currentPage={currentPage}
              isAdmin={isAdmin}
              isBusiness={isBusiness}
            />
          )}
        </div>
      </Desktop>
      <TabletAndBelow>
        <div className="mobile-ms">
          {analysisdata.loading &&
            Array(pageSize)
              .fill()
              .map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <GhostExamListMobileLoader></GhostExamListMobileLoader>
                  </React.Fragment>
                );
              })}
          {!analysisdata.loading && analysisdata.pastQuestions && (
            // <ExamAnalysis
            //     globalFilter={filterData}
            //     onGlobalFilterChange={handleSearch}
            //     data={analysisdata.pastQuestions}
            //     meta={analysisdata.questionsMeta}
            //     onGotoNextPage={handleGoToNext}
            //     onGotoPrevPage={handleGoToPrev}
            //     currentPage={currentPage}
            // />
            <ExamCardAnalysis
              globalFilter={filterData}
              onGlobalFilterChange={handleSearch}
              data={analysisdata.pastQuestions}
              meta={analysisdata.questionsMeta}
              handleGotoNext={handleGoToNext}
              handleGotoPrevious={handleGoToPrev}
              currentPage={currentPage}
            />
          )}
        </div>
      </TabletAndBelow>
    </>
  );
};
