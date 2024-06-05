// import { blueGrey } from "@material-ui/core/colors";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Badge } from "../../components/Badge/Badge";
import parse from "html-react-parser";
import Flag2 from "../../assets/images/flag2.png";
import Flag from "../../assets/images/flag.png";
import { useMediaQuery } from "react-responsive";
import { PrimaryButton } from "../../components/button";
import { toggleQuestionFlag } from "../../store/actions/examActions";
import { useDispatch, useSelector } from "react-redux";
import { setFlaggedArray } from "../../store/slices/examSlice";
import { FlaggedModal } from "../../components/SubmitModal/FlaggedModal";

export const AnswerSummary = ({ data, isComp, isCompSub }) => {
  const dispatch = useDispatch();
  const { analysisdata } = useSelector((state) => state.exam);
  const [isOpenModalFlag, setIsOpenModalFlag] = useState(false);
  const tempFlagData = useRef({});
  useEffect(() => {
    // if(!analysisdata.questionFlags[data.question_id]){
    dispatch(
      setFlaggedArray({ questionId: data.question_id, flagged: data.flagged })
    );
    // }
  }, []);
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

  // const handleFlagClicked = (questionId,flagged) => {
  //     // console.log("Flag Clicked", questionId);
  //     dispatch(toggleQuestionFlag({questionId,flagged:flagged?1:0}));
  // }
  const handleFlaggedClosed = () => {};
  const handleFlagClicked = (questionId, flagged) => {
    tempFlagData.current = {
      questionId,
      flagged,
    };
    if (!flagged) {
      setFlagged("");
    } else {
      setIsOpenModalFlag(true);
    }
  };
  const setFlagged = (reason) => {
    dispatch(
      toggleQuestionFlag({
        questionId: tempFlagData.current.questionId,
        flagged: tempFlagData.current.flagged ? 1 : 0,
        reason: reason,
      })
    );
  };
  return (
    <div className={`flexy summary-div2 ${isCompSub ? "sub-cls" : ""}`}>
      <div className="col-md-12">
        <h6 className="col-md-2">{data.questionNum}</h6>
        <hr />
        <div className="flexy">
          <div className="col-md-10 question-break">
            {" "}
            <>{parse(data.question)}</>
            {!isComp ? (
              <>
                <div className="flexy flexyM">
                  <h6 className="col-md-2 col-6">Your Answer:</h6>
                  <>
                    {data.student_answer
                      ? parse(data.student_answer)
                      : "Not Answered"}
                  </>
                </div>{" "}
                <div className="flexy flexyM">
                  <h6 className="col-md-2 col-6">Correct Answer:</h6>
                  <>{parse(data.correct_answer)}</>
                </div>
                <div className="flexy flexyM">
                  <h6 className="col-md-2 col-6 marks">Mark Obtained:</h6>

                  <Badge
                    cls={data.isCorrect ? "num mtop" : "zero mtop"}
                    text={data.score}
                  />
                </div>
                <div className="flexy answer-expla ">
                  {data.answer_explanation && (
                    <h6 className="col-md-2">Answer Explanation:</h6>
                  )}
                  <div>
                    {data.answer_explanation && (
                      <>
                        {data.answer_explanation
                          ? parse(data.answer_explanation)
                          : ""}
                      </>
                    )}
                    {data.options?.map((item, index) => {
                      return (
                        <div key={index}>
                          <label>
                            {item.label}. {item.text}
                          </label>
                        </div>
                      );
                    })}
                    {data.comments && (
                      <p>{data.comments ? parse(data.comments) : ""}</p>
                    )}
                  </div>
                </div>
                <Desktop>
                  <div className="flexy flexyM diffculty">
                    <h6 className="col-md-2 col-4"> Difficulty:</h6>
                    <Badge cls="level" text={data.difficulty} />
                  </div>
                </Desktop>
                <TabletAndBelow>
                  <div className="flexy flexyM diffculty">
                    <div>
                      <h6 className=""> Difficulty:</h6>
                      <Badge cls="level" text={data.difficulty} />
                    </div>
                    {!isComp ? (
                      <>
                        <div className="flag-btn-cls">
                          {" "}
                          <Badge
                            text={
                              data.isCorrect === null
                                ? "Unanswered"
                                : data.isCorrect
                                ? "Correct"
                                : "Incorrect"
                            }
                            cls={
                              data.isCorrect === null
                                ? "unanswered"
                                : data.isCorrect
                                ? "correct"
                                : "incorrect"
                            }
                          />
                          {analysisdata.questionFlags[data.question_id] && (
                            <PrimaryButton
                              isLoading={
                                analysisdata.questionFlags[data.question_id]
                                  .sendingloading
                              }
                              onClick={(e) => {
                                handleFlagClicked(
                                  data.question_id,
                                  !analysisdata.questionFlags[data.question_id]
                                    .flagged
                                );
                              }}
                              isLoadingMsg=" "
                              className={`pFlag ${
                                analysisdata.questionFlags[data.question_id]
                                  .flagged
                                  ? "flagged"
                                  : ""
                              }`}
                            >
                              <img
                                className={`logo`}
                                src={
                                  analysisdata.questionFlags[data.question_id]
                                    .flagged
                                    ? Flag2
                                    : Flag
                                }
                                alt="Scholar"
                              />
                            </PrimaryButton>
                          )}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </TabletAndBelow>
              </>
            ) : (
              ""
            )}
          </div>
          {!isComp ? (
            <>
              <Desktop>
                <div className="offset-md-1 flag-btn-cls">
                  {" "}
                  <Badge
                    text={
                      data.isCorrect === null
                        ? "Unanswered"
                        : data.isCorrect
                        ? "Correct"
                        : "Incorrect"
                    }
                    cls={
                      data.isCorrect === null
                        ? "unanswered"
                        : data.isCorrect
                        ? "correct"
                        : "incorrect"
                    }
                  />
                  {analysisdata.questionFlags[data.question_id] && (
                    <PrimaryButton
                      isLoading={
                        analysisdata.questionFlags[data.question_id]
                          .sendingloading
                      }
                      onClick={(e) => {
                        handleFlagClicked(
                          data.question_id,
                          !analysisdata.questionFlags[data.question_id].flagged
                        );
                      }}
                      isLoadingMsg=" "
                      className={`pFlag ${
                        analysisdata.questionFlags[data.question_id].flagged
                          ? "flagged"
                          : ""
                      }`}
                    >
                      <img
                        className={`logo`}
                        src={
                          analysisdata.questionFlags[data.question_id].flagged
                            ? Flag2
                            : Flag
                        }
                        alt="Scholar"
                      />
                    </PrimaryButton>
                  )}
                </div>
              </Desktop>
            </>
          ) : (
            ""
          )}
        </div>
        <hr className="last-hr" />
      </div>
      <FlaggedModal
        handleFlaggedClosed={handleFlaggedClosed}
        handleSubmitMain={setFlagged}
        isOpenModalFlag={isOpenModalFlag}
        setIsOpenModalFlag={setIsOpenModalFlag}
      />
    </div>
  );
};
