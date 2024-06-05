import React, {useEffect, useRef, useState} from "react";
import "./summary.scss";
import Alert from "../../assets/images/alert.svg";
import {Link, useNavigate} from "react-router-dom";
import {getTestData, sendTestData} from "../../store/actions/examActions";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {sendToNetwork, updateExamError} from "../../store/slices/examSlice";
import {ActiveExamError} from "../../components/activeExamError";
import parse from "html-react-parser";
import {Loading, LoadingGallery} from "../../components/loading";

export const SummaryPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {testdata} = useSelector((state) => state.exam);
  const finalQuestions = useSelector((state) => state.exam.finalQuestions);
  const forceStopped = useRef(false);
  const [isSuccess,setIsSuccess] = useState(false);

  useEffect(() => {
    dispatch(sendToNetwork(id));
  }, [id]);

  useEffect(() => {
    if(testdata.startSending){
      dispatch(sendTestData({uniqueId:id,...finalQuestions}));
    }
  },[testdata.startSending])

  useEffect(() => {
    if(testdata.sendingDoneLoading){
    }
  },[testdata.sendingDoneLoading])

  const goBack = () => {
    navigate("/");
  }
  return (
      <>
        {testdata.sendingDoneLoading? (
            <div className="test-instructions-div">
              <div className="test-instructions-div col-md-12">
              <div className="test-body col-md-4 offset-md-4">
                <div className="col-md-10 offset-md-1 summary-body">
                  {!testdata.sendingError && (
                      <>
                        <div className="submit-query flexy flexyM">
                            <h3 className="col-md-5">Your answers were submitted</h3>
                            <button className="summary-btn  offset-md-4">
                              Your Score
                              <br />
                              {testdata.resultData.result_data.total_scored}/{testdata.resultData.result_data.total_mark}
                            </button>
                        </div>
                        <div className="flexy flexyM">
                          <div className="col-md-6">
                            <h6>Attempted Questions</h6>
                            <p>{testdata.resultData.result_data.questionAttended}</p>
                          </div>
                          <div className="">
                            <h6>Unattempted Questions</h6>
                            <p>{testdata.resultData.result_data.questionNotAttended}</p>
                          </div>
                        </div>
                        <div className="flexy flexyM">
                          <div className="col-md-6">
                            <h6>Incorrect Answers</h6>
                            <p>{testdata.resultData.result_data.total_incorrect}</p>
                          </div>
                          <div className="">
                            <h6>Unanswered Question</h6>
                            <p>{testdata.resultData.result_data.total_unanswered}</p>
                          </div>
                        </div>
                      </>
                  )}
                  {testdata.sendingError && (
                      <div className="flexy flexyM student-details text-error-test">
                        <div>
                          <p>{parse(testdata.sendingError)}</p>
                        </div>
                      </div>
                  )}
                  <div style={{ borderTop:!testdata.sendingError? "solid 1px #e7e7e7":''}} className="mt4">
                    {" "}
                    <center>
                      {!testdata.sendingError && (<Link to={`/analysis-dashboard/${id}`}>
                        {" "}
                        <button className="return-analysis-btn mt3">Click to view Detailed Analysis</button>
                      </Link>)}
                      {" "}
                      <Link to={"/"}>
                        {" "}
                        <button className="return-btn mt3">Return to Main Windows</button>
                      </Link>
                    </center>
                  </div>
                </div>
              </div>
            </div>
            </div>
        ):(
          <LoadingGallery size={70} style={{ padding: '64px 32px', minHeight: '50vh' }} />
          )}
      </>

  );
};
