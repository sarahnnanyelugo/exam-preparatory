import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import "./flaggedQuestion.scss";

import Table from "react-bootstrap/Table";
import AuthContext from "../../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  getFlaggedQuestionAnalysis,
  getQuestionAnalysis,
} from "../../store/actions/examActions";
import { GhostExamListLoader } from "../../components/Loaders/GhostExamListLoader";
import { ExamAnalysis } from "../../components/Exams/ExamAnalysis";
import { useMediaQuery } from "react-responsive";
import { GhostExamListMobileLoader } from "../../components/Loaders/GhostExamListMobileLoader";
import { ExamCardAnalysis } from "../../components/Exams/ExamCardAnalysis";
import { AnalysisFilter } from "../AnalysisDashboard/AnalysisFilter";
import {
  setGlobalAnalysisFilter,
  setGlobalFlaggedFilter,
} from "../../store/slices/adminSlice";
import { FlaggedFilter } from "./FlaggedFilter";
import { FlaggedAnalysis } from "../../components/Exams/FlaggedAnalysis";
import { refreshFlaggedTable } from "../../store/slices/examSlice";
import Form from "react-bootstrap/Form";

export const FlaggedQuestions = ({ isAdmin, isBusiness }) => {
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
  const { user, isLoggedIn } = useContext(AuthContext);
  const { analysisdata, adminsdata } = useSelector((state) => state.exam);
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState({ search: "" });

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
    const data = { pageSize, currentPage };

    data.isSearch = true;
    // if (filterData.search.length > 0) data.search = filterData.search;
    handleApiData(data);
  };

  const handleApiData = (data) => {
    const filters = JSON.parse(localStorage.getItem(`flaggedFilters`) || "{}");
    if (filters.subjectFilter && filters.subjectFilter.length > 0) {
      data.subject = filters.subjectFilter;
    }

    if (filters.typeFilter && filters.typeFilter.length > 0) {
      data.type = filters.typeFilter;
    }
    if (filters.yearFilter && filters.yearFilter.length > 0) {
      data.year = filters.yearFilter;
    }
    if (filters.searchFilter && filters.searchFilter.length > 0) {
      data.search = filters.searchFilter;
    }
    if (filters.sort && filters.sort.length > 0) {
      data.sort = filters.sort;
    } else {
      data.sort = "Pending";
    }
    if (isAdmin && adminsdata.types.length === 0) data.is_filter = true;
    data.isAdmin = isAdmin;
    if (data.isSearch) {
      handleResetCurrentPage();
      data.currentPage = 1;
    }
    // console.log(data.isAdmin,adminsdata.types,data);
    dispatch(getFlaggedQuestionAnalysis(data));
  };

  useEffect(() => {
    handleApiData({ pageSize, currentPage });
  }, [pageSize, currentPage]);

  useEffect(() => {
    return () => {
      const payload = {
        typeFilter: "",
        yearFilter: "",
        subjectFilter: "",
        searchFilter: "",
        sort: "",
      };
      dispatch(setGlobalFlaggedFilter(payload));
    };
  }, []);
  useEffect(() => {
    if (analysisdata.isRefresh) {
      dispatch(refreshFlaggedTable(0));
      handleSearch();
    }
  }, [analysisdata.isRefresh]);

  return (
    <>
      <div>{isAdmin ? "" : <Navbar />}</div>
      <Desktop>
        <div className="flag-cls test-analysis-div col-md-10 offset-md-1">
          <div className="flexy flexyM search-bar mt6">
            <div className="lisxt ">{!isAdmin && <h5>Test List</h5>}</div>
          </div>
          {/*{(isAdmin && !analysisdata.loading && analysisdata.flaggedQuestions) && (*/}
          {/*     <div className="col-md-2 search-input offset-md-9 offset-2">*/}
          {/*       <input name="search" type="search" placeholder="search JAMB, WAEC... Chemistry, Physics...*/}
          {/*        " onChange={handleSetFilter}/>*/}
          {/*       /!*<img src={Icon} alt=""/>*!/*/}
          {/*    </div>*/}
          <FlaggedFilter
            handleClose={handleClose}
            show={show}
            Desktop={Desktop}
            TabletAndBelow={TabletAndBelow}
            handleSearch={handleSearch}
          />
          <div className="flexy sort flexyM filter"></div>

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
          {!analysisdata.loading && analysisdata.flaggedQuestions && (
            <FlaggedAnalysis
              globalFilter={filterData}
              onGlobalFilterChange={handleSearch}
              data={analysisdata.flaggedQuestions}
              meta={analysisdata.meta}
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
        <div className="flag-cls  mobile-ms">
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
