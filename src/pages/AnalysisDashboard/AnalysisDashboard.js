import React, { useState, lazy, Suspense, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../../components/Badge/Badge";
import { Navbar } from "../../components/Navbar/Navbar";
import { examSummary, questions } from "../../TestData";
import "./analysis-dashboard.scss";
import { AnswerSummary } from "./AnswerSummary";
import QuestionChart from "./QuestionChart.js/QuestionChart";
import SubjectChart from "./SubjectChart/SubjectChart";
import TimeChart from "./TimeChart/TimeChart";
import Prev from "../../assets/images/previous.svg";
import {
  getTestAnalysisDetails,
  getTestData,
} from "../../store/actions/examActions";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ActiveExamError } from "../../components/activeExamError";
import parse from "html-react-parser";
import { QuestionComprehensionAnalysis } from "../../components/Questions/questionComprehensionAnalysis";
import { Loading, LoadingCard, LoadingGallery } from "../../components/loading";
import { ExportButton } from "../../components/ExportButton/ExportButton";
export const AnalysisDashboard = ({ isAdmin, isBusiness }) => {
  // isAdmin = (isAdmin || isBusiness);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeIndex2, setActiveIndex2] = useState(1);
  const { analysisdata } = useSelector((state) => state.exam);
  const [startTestrefmain, setStartTestrefmain] = useState(false);
  const examTypes = useSelector((state) => state.exam.examTypes);

  const handleClick = (index) => setActiveIndex2(index);

  const checkActive = (index, className) =>
    activeIndex2 === index ? className : "";
  const [state, setState] = useState({
    query: "",
    list: questions,
    answers: JSON.parse(localStorage.getItem("myArray")) || [],
  });
  function getAnswer(id) {
    const index = state.answers?.find((item) => item.id === id);
    return index?.value || null;
  }

  useEffect(() => {
    dispatch(getTestAnalysisDetails(id));
  }, [id]);
  useEffect(() => {
    if (analysisdata.doneLoading) {
      setStartTestrefmain(true);
      // setStartTest(true);
    }
  }, [analysisdata.doneLoading]);

  const goBack = () => {
    navigate(
      isAdmin
        ? `/admin/analysis`
        : isBusiness
        ? `/business/analysis`
        : "/test-analysis"
    );
  };

  return (
    <>
      {isAdmin || isBusiness ? "" : <Navbar />}
      <div className="col-md-10 offset-md-1 mt5 analysis-container">
        <Link
          to={
            isAdmin
              ? `/admin/analysis`
              : isBusiness
              ? `/business/analysis`
              : "/test-analysis"
          }
        >
          {" "}
          <img src={Prev} alt="img" width="44px" height="21px" className="" />
          Back
        </Link>
        <h4 className="mt3 title-btn">Test Analysis </h4>
        <div style={{ float: "right" }}>
          {" "}
          {startTestrefmain && <ExportButton className="exp-btn" id={id} />}
        </div>
        {analysisdata.error && (
          <ActiveExamError msg={analysisdata.error} goBack={goBack} />
        )}
        {startTestrefmain ? (
          <div className="analysis-tab">
            <div className="tabs ">
              <button
                className={`tab ${checkActive(1, "active2")}`}
                onClick={() => handleClick(1)}
              >
                Analysis
              </button>
              <button
                className={`tab ${checkActive(2, "active2")}`}
                onClick={() => handleClick(2)}
                style={{ marginLeft: "20px" }}
              >
                Questions and Answers
              </button>
            </div>
            <div className="panels">
              <div className={`panel ${checkActive(1, "active2")}`}>
                <div className="profile-div">
                  <h6>Test Details</h6>

                  <hr />
                  <div className="flexy">
                    <div className="col-md-4">
                      <div className="flexy flexyM t-title">
                        <h6>Subject: </h6>
                        <p>{analysisdata.meta.subject}</p>
                      </div>
                      <div className="flexy  flexyM t-title">
                        <h6>Test Title:</h6>
                        <p>{analysisdata.meta.title}</p>
                      </div>
                      <div className="flexy  flexyM t-title">
                        <h6>Date Attempted:</h6>
                        <p>{analysisdata.meta.attempt_date}</p>
                      </div>
                      <div className="flexy  flexyM t-title">
                        <h6>Result Status:</h6>
                        <div>
                          <Badge
                            text={`${analysisdata.meta.result_publish_msg}`}
                            cls={`${analysisdata.meta.result_publish_cls}`}
                            border="solid 1px #5EAA42"
                            color="#5EAA42"
                            background="#5EAA421A"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="flexy  flexyM t-title result">
                        <h6>Total Mark:</h6>
                        <p>{analysisdata.meta.total_marks}</p>
                      </div>
                      <div className="flexy  flexyM t-title result">
                        <h6>Duration:</h6>
                        <p>{analysisdata.meta.duration}</p>
                      </div>
                      <div className="flexy  flexyM t-title result">
                        <h6>Questions:</h6>
                        <p>{analysisdata.meta.total_questions}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="flexy  flexyM t-title result">
                        <h6>Percentage Mark:</h6>
                        <p>{analysisdata.details.perc}</p>
                      </div>
                      <div className="flexy  flexyM t-title result">
                        <h6>Mark per Question:</h6>
                        <p>{analysisdata.meta.mark_per_question}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-3">
                  <div className="col">
                    {" "}
                    <div className=" chart-div">
                      <h6>Question Chart (Performance)</h6>
                      <hr />
                      <div className="col-md-9 col-12">
                        <QuestionChart analysisdata={analysisdata} />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    {" "}
                    <div className=" chart-div">
                      <h6>Test Overview</h6>
                      <hr />
                      {parse(analysisdata.details.view)}
                    </div>
                  </div>
                </div>
                <div className=" chart-div2">
                  <h6>Time on Question Chart</h6>
                  <hr />
                  <TimeChart analysisdata={analysisdata} />
                </div>
                <div className=" chart-div2">
                  <h6>Subject Topic Chart</h6>
                  <hr />
                  <SubjectChart analysisdata={analysisdata} />
                </div>
              </div>
              <div className={`panel ${checkActive(2, "active2")}`}>
                <div className="offset-md-8 badges">
                  <center>
                    <Badge text="Correct" cls="correct" />
                    <Badge text="Incorrect" cls="incorrect" />
                    <Badge text="Unanswered" cls="unanswered" />
                  </center>
                </div>
                <div className=" questions-div2">
                  <div className="row ">
                    {analysisdata.questions.map((data, index) => (
                      <React.Fragment key={index}>
                        {(data.option_type_id === examTypes.singleAnswer ||
                          data.option_type_id === examTypes.multipleAnswer) && (
                          <AnswerSummary data={data} key={index} />
                        )}
                        {data.option_type_id === examTypes.comprehension && (
                          <QuestionComprehensionAnalysis
                            question={data}
                            key={index}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {!analysisdata.error && (
              <Loading
                size={50}
                style={{ padding: "64px 32px", minHeight: "50vh" }}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};
