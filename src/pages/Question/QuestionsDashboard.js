import React, {useContext, useEffect, useRef, useState} from "react";
import "./question.scss";
import Prev from "../../assets/images/previous.svg";
import Next from "../../assets/images/next.svg";
import { Link } from "react-router-dom";
import { Questions } from "../../components/Questions/Questions";
import { QuestionNum } from "../../components/QuestionNum/QuestionNum";
import { SubmitModal } from "../../components/SubmitModal/SubmitModal";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAnswered,
  setExamQuestions,
  setExamMeta,
  saveAnswered,
  updateCurrentAnswer,
  prepareReview,
  updateExamError,
  prepareSubmit,
  sendToNetwork,
  setTimeFinished,
  exitCleanUp,
  setDurationFormatted
} from "../../store/slices/examSlice";
import {getTestData, sendTestData} from "../../store/actions/examActions";
import {getWalletBalance} from "../../store/actions/walletActions";
import AuthContext from "../../context/AuthProvider";
import { useParams } from 'react-router';
import {useNavigate} from "react-router-dom";
import {ReviewPage} from "../ReviewPage/ReviewPage";
import {Loading, LoadingGallery} from "../../components/loading";
import {ExitModal} from "../../components/SubmitModal/ExitModal";
import {ActiveExamHeader} from "../../components/Questions/activeExamHeader";
import {ActiveExamError} from "../../components/activeExamError";
import {useMediaQuery} from "react-responsive";
import {NavbarExamFooter} from "../../components/Navbar/NavbarExamFooter";
import {FlaggedModal} from "../../components/SubmitModal/FlaggedModal";


export const QuestionsDashboard = ({handle}) => {
  const useDesktopMediaQuery = () =>
      useMediaQuery({ query: '(min-width: 621px)' })

  const useTabletAndBelowMediaQuery = () =>
      useMediaQuery({ query: '(max-width: 620px)' })

  const Desktop = ({ children }) => {
    const isDesktop = useDesktopMediaQuery();

    return isDesktop ? children : null;
  }

  const TabletAndBelow = ({ children }) => {
    const isTabletAndBelow = useTabletAndBelowMediaQuery();

    return isTabletAndBelow ? children : null;
  }
  const isTabletAndBelow = useTabletAndBelowMediaQuery();
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {testdata} = useSelector((state) => state.exam);
  const examSummary = useSelector((state) => state.exam.meta);
  const examQuestions = useSelector((state) => state.exam.questions);
  const examAnswers = useSelector((state) => state.exam.questionAnswers);
  const stateData = useSelector((state) => state.exam.stateData);
  const examTypes = useSelector((state) => state.exam.examTypes);
  const stateClass = useSelector((state) => state.exam.stateClass);
  const [startTest,setStartTest] = useState(false);
  const isSubmit = useRef(false);
  const [startId,setStartId] = useState(false);
  const forceStopped = useRef(false);
  const oldTimer = useRef(0);
  const startTestref = useRef(false);
  const startTestrefmain = useRef(false);
  const [startReviewrefmain,SetStartReviewrefmain] = useState(false);
  const currentIndex = useRef(-1);
  const previousIndex = useRef(-1);
  const firstQuestion = useRef(true);
  const lastQuestion = useRef(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalFlag, setIsOpenModalFlag] = useState(false);
  const [stop, setStop] = useState(false);
  const {user} = useContext(AuthContext);
  const metaBack = useRef(JSON.parse(localStorage.getItem(`meta-${id}`)));
  const fullScreenLock = useRef(false);
  const tempFlagData = useRef({});

  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (metaBack.current && (!isTabletAndBelow && metaBack.current.enable_fullscreen) && !Boolean(document.fullscreenElement)) {
        return  navigate(`/test-instructions/${id}`);
      }
      else {
        setStartId(true);
      }
    },100);
    if(metaBack.current && (!isTabletAndBelow && metaBack.current.enable_fullscreen)) {
      const onFullscreenChange = () => {
        if (!Boolean(document.fullscreenElement) && !fullScreenLock.current) {
          setIsOpenModal(true);
        }
      }
      document.addEventListener('fullscreenchange', onFullscreenChange);
      return () => {
        document.removeEventListener('fullscreenchange', onFullscreenChange)
        if(Boolean(document.fullscreenElement)){
          handle.exit(); //TODO Enable before building.
          setIsOpenModal(false);
        }
        dispatch(exitCleanUp(id));
      };
    }
    else{
      return () => {
        dispatch(exitCleanUp(id));
      }
    }
  },[]);

  useEffect(() => {
    if(startId){
      dispatch(getTestData({uniqueId:id}));
    }
  }, [startId]);

  useEffect(() => {
    if(testdata.doneLoadingReset){
      dispatch(getTestData({uniqueId:id,is_reset:true}));
    }
  }, [testdata.doneLoadingReset]);

  useEffect(() => {
    if(testdata.doneLoading){
      currentIndex.current  = testdata.currentIndex;
      if(testdata.isOldValue){
        previousIndex.current = +testdata.previousIndex;
      }
      startTestref.current = true;
      setStartTest(true);
    }
  }, [testdata.doneLoading]);

  useEffect(() => {
    if (startTestref.current) {
      startTestref.current = false;
      if(testdata.isOldValue){
        setVisited();
      }
      else{
        setNextQuestion();
      }
      startTestrefmain.current = true;
    }
  }, [startTest]);
  const requestExit = (is_hidden) => {
    updateCurrentAnswerHelper({
    },currentIndex.current,2);
  }
  const resetAnswers = () => {
    updateCurrentAnswerHelper({
    },currentIndex.current,2);
  }
  const reviewAnswers = () => {
    setCurrentState(currentIndex.current);
    dispatch(prepareReview({}));
  }
  useEffect(() => {
    if(testdata.isDoneReviewIndex !== -1){
      currentIndex.current = testdata.isDoneReviewIndex;
      previousIndex.current = testdata.isDoneReviewIndex-1;
      setVisited();
      SetStartReviewrefmain(false);
      dispatch(prepareReview({flag:3}));
    }

  },[testdata.isDoneReviewIndex]);

  const setNextQuestion = () => {
    previousIndex.current = +currentIndex.current;
    currentIndex.current  = currentIndex.current+1;
    setVisited();
  }
  useEffect(() => {
    if(testdata.isDoneReview){
      SetStartReviewrefmain(true);
      handleClose();
    }

  },[testdata.isDoneReview])

  const setPreviousQuestion = () => {
    previousIndex.current = currentIndex.current;
    currentIndex.current  = currentIndex.current-1;
    setVisited();
  }

  const setChecked =(cIndex,value,compId='') => {
    updateCurrentAnswerHelper({
      answer: value,
      comp_id: compId
    },cIndex,1);
  }

  const handleFlaggedClosed =(cIndex,value,compId='') => {
    if((!isTabletAndBelow && metaBack.current.enable_fullscreen)) {
      fullScreenLock.current = false;
      handle.enter();
    }
  }
  const setFlaggedHandle =(cIndex,value,compId='') => {
    if(examAnswers[cIndex]['flagged']){
      setFlagged('');
    }
    else{
      setIsOpenModalFlag(true);
      tempFlagData.current = {
        cIndex,value,compId
      };
    }

  }
  const setFlagged =(reason) => {
    updateCurrentAnswerHelper({
      reason: reason,
      answer: tempFlagData.current.value,
      comp_id: tempFlagData.current.compId
    },tempFlagData.current.cIndex,4);
  }

  const setVisited = () => {
    if(previousIndex.current !== -1){
      setCurrentState(previousIndex.current);
      firstQuestion.current = false;
      lastQuestion.current = false;
    }
    if(currentIndex.current < 1) {
      firstQuestion.current = true;
    }
    if(currentIndex.current === (examAnswers.length -1)){
      lastQuestion.current = true;
    }
    updateCurrentQuestion(currentIndex.current);
    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
  }

  const updateCurrentQuestion = (index) => {
    const payload = {
        start_time: Date.now(),
        state: stateData.selected,
        current_index: currentIndex.current,
    };
    updateCurrentAnswerHelper(payload,index);
    saveCurrentState();
  }

  const updateCurrentAnswerHelper = (payload,index,flag=0) => {
    dispatch(updateCurrentAnswer({detail:payload,flag:flag,index:index}));
  }
  const saveCurrentState = () => {
    const currentStateDetails = {
      'current_index': currentIndex.current,
      'questions': examAnswers,
      'previous_index': previousIndex.current};
    dispatch(saveAnswered(currentStateDetails));
  }
  const setCurrentState = (index,flag) => {
    const questionAnswer = {...examAnswers[index]};
    questionAnswer.end_time = Date.now();
    timeDiff(questionAnswer);
    let state = stateData.viewed;
    if(questionAnswer.option_type_id === examTypes.singleAnswer){
      if (isDefined(questionAnswer.answer)) {
            state = stateData.attended;
      }
    }
    else if(questionAnswer.option_type_id === examTypes.multipleAnswer){
      if (isDefined(questionAnswer.answer) &&
          Object.keys(questionAnswer.answer).length) {
           state = stateData.attended;
      }
    }
    else if(questionAnswer.option_type_id === examTypes.subjective){
      if(questionAnswer.option_answer_type_id === examTypes.textBox) {
        if (isDefined(questionAnswer.answer)) {
          state = stateData.attended;
        }
      }
      else if (questionAnswer.option_answer_type_id === examTypes.media) {
        if (isDefined(questionAnswer.answer) &&
            Object.keys(questionAnswer.answer).length) {
          state = stateData.attended;
        }
      }
    }
    else if (questionAnswer.option_type_id === examTypes.comprehension) {
        var is_all_answer = true;
      Object.keys(questionAnswer.answers).forEach((subQuesId) => {
          var is_answer =  isDefined(questionAnswer['answers'][subQuesId].answer);
          if(!is_answer)
            is_all_answer = false;
        })
        if(is_all_answer) {
          state = stateData.attended;
        }
    }
    const tpPayload = {
      state: state,
      time: questionAnswer.time
    };
    if(flag){
      return tpPayload;
    }
    updateCurrentAnswerHelper(tpPayload,questionAnswer.index);
  }

  const isDefined = (answer) => {
    return (typeof answer !== undefined) && (typeof answer !== 'undefined');
  }
  const timeDiff = (questionAnswer) => {
    questionAnswer.time = questionAnswer.end_time - questionAnswer.start_time;
  }

  const goBack = () => {
    navigate("/");
  }

  const setNewIndex = (index) => {
    previousIndex.current = currentIndex.current;
    currentIndex.current  = index;
    setVisited();
  };

  const handleSubmitFromFullExit = (flag) => {
    handleSubmit(true,true);
    if(flag)
    submitQuestion(false);
  }
  const handleSubmit = (flag,forceExit) => {
    if(flag) {
      const stateTime = setCurrentState(currentIndex.current,true);
      dispatch(prepareSubmit({
        end_date: Date.now(),
        detail:{
          state: stateTime.state,
          time: stateTime.time,
        },
        index: currentIndex.current,
        previous_index: previousIndex.current,
        forceExit: forceExit,
      }));
    }
    else{
      if((!isTabletAndBelow && metaBack.current.enable_fullscreen)) {
        fullScreenLock.current = false;
        handle.enter();
      }
      setShowSubmit(false);
      dispatch(prepareSubmit({
       flag: 2
      }));
      setNewIndex(currentIndex.current);
    }
  }
  useEffect(() => {
    if(testdata.isDoneFinalReview){
      if(testdata.timefinished){
        submitQuestion(true);
      }
      else{
        setShowSubmit(true);
        if((!isTabletAndBelow && metaBack.current.enable_fullscreen)) {
          fullScreenLock.current = true;
          handle.exit();
        }
      }
    }
  },[testdata.isDoneFinalReview])

  useEffect(() => {
    if(testdata.timefinished){
      handleSubmit(true);
    }
  },[testdata.timefinished])

  const timeFinished = (formatted) => {
    handleSubmitFromFullExit(false);
    dispatch(setDurationFormatted(formatted));
  }

  const submitQuestion = (flag) => {
    if(isSubmit.current)return;
    if(flag)
      setCurrentState(currentIndex.current);
    stopTimer();
  }

  useEffect(() => {
    if(testdata.timeStoppedDuration){
      stopTimerHelper();
    }
  },[testdata.timeStoppedDuration])

  const stopTimer = () => {
    if(forceStopped.current){
      oldTimer.current = 0; //todo  find out why i am setting this to time
      forceStopped.current = false;
    }
    setStop(true);
  }
  const stopTimerHelper = () => {
    if(!forceStopped.current){
      submitQuestionMain();
    }
  }
  const submitQuestionMain = () => {
    navigate(`/summary-page/${id}`);
  }
  return (
    <>
      <div className={`test-instructions-div22${startReviewrefmain?"-review":''}`}>
      {testdata.error && (
              <ActiveExamError msg={testdata.error}  goBack={goBack}/>
          )}
        {startTestrefmain.current?(
            <div className="test-instructions-div22 sec">
              <ActiveExamHeader stop={stop} timeFinished={timeFinished}>
                {!startReviewrefmain && (
                <div className="col-md-8 offset-md-2 flexy">
                  <div className="col-md-8 ">
                    <div className="col-md-11  instructions">
                      <div className="row ">
                        {
                              <Questions
                                  question={examQuestions[currentIndex.current]}
                                  setChecked={setChecked}
                                  setFlagged={setFlaggedHandle}
                                  currentIndex={currentIndex.current}
                                  examAnswers={examAnswers}
                              />}<
                      /div>
                      <Desktop>
                        <div className="flexy pre-next-btns flexyM">
                          <button disabled={firstQuestion.current} className="previous-btn btn"
                                  onClick={setPreviousQuestion}>
                            <img src={Prev} alt="icon" width="20px" /> Previous
                          </button>

                          {lastQuestion.current ? (
                              <button onClick={handleShow} className="mobileview offcanvas-btn">
                                More options
                              </button>
                          ) : (
                              <button onClick={handleShow} className="mobileview offcanvas-btn">
                                Show numbers
                              </button>
                          )}
                          {lastQuestion.current ? (
                              <div className="">
                                <SubmitModal submitQuestion={submitQuestion} showSubmit={showSubmit} handleSubmit={handleSubmit}/>
                              </div>
                          ) : (<button disabled={lastQuestion.current} className="next-btn  " onClick={setNextQuestion}>
                            Next <img src={Next} alt="icon" />
                          </button>)}

                        </div>
                      </Desktop>
                      <TabletAndBelow>
                        <NavbarExamFooter>
                          <div className="flexy pre-next-btns flexyM">
                            <button disabled={firstQuestion.current} className="previous-btn btn"
                                    onClick={setPreviousQuestion}>
                              <img src={Prev} alt="icon" width="20px" /> Previous
                            </button>

                            {lastQuestion.current ? (
                                <button onClick={handleShow} className="mobileview offcanvas-btn">
                                  More options
                                </button>
                            ) : (
                                <button onClick={handleShow} className="mobileview offcanvas-btn">
                                  Show numbers
                                </button>
                            )}
                            {lastQuestion.current ? (
                                <div className="">
                                  <SubmitModal submitQuestion={submitQuestion} showSubmit={showSubmit} handleSubmit={handleSubmit}/>
                                </div>
                            ) : (<button disabled={lastQuestion.current} className="next-btn  " onClick={setNextQuestion}>
                              Next <img src={Next} alt="icon" />
                            </button>)}

                          </div>
                        </NavbarExamFooter>
                      </TabletAndBelow>
                    </div>
                  </div>
                  <div className="col-md-4 instructions4">
                    {" "}
                    <Offcanvas
                        show={show}
                        onHide={handleClose}
                        backdrop={false}
                        responsive="lg"
                        placement="bottom"
                        scroll={true}
                        style={{
                          height: "auto",
                          maxHeight: "100vh",
                          width: "100%",
                          maxWidth: "100%",
                        }}>
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title></Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <div>
                          {" "}
                          <h6>Question Navigation</h6>
                          <hr />
                          <div className="row row-cols-10 row-cols-lg-10 g-1 g-lg-1 ">
                            {examAnswers?.map((questionAnswer, index) => (
                                <QuestionNum key={index}
                                             bg={stateClass[questionAnswer.state]}
                                             questionAnswer={questionAnswer}
                                             callBack={setNewIndex} />
                            ))}
                          </div>
                          {(
                              <div className="flexy offset-md-2 offset-3" style={{ marginTop: "40px" }}>
                                {" "}
                                <button className="reset-btn " onClick={resetAnswers}>
                                  Reset question
                                </button>
                                  <button className="review-btn " onClick={reviewAnswers}>Review answer</button>
                              </div>
                          )}
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </div>
                </div>
                )}
                {startReviewrefmain && (
                    <ReviewPage>
                    </ReviewPage>
                )}
                <ExitModal handleSubmitMain={handleSubmitFromFullExit} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} handle={handle}/>
                <FlaggedModal handleFlaggedClosed={handleFlaggedClosed} handleSubmitMain={setFlagged}
                           isOpenModalFlag={isOpenModalFlag}
                           setIsOpenModalFlag={setIsOpenModalFlag}/>
              </ActiveExamHeader>
            </div>
        ): (<>
            {!testdata.error &&
            (<LoadingGallery size={70}
                             style={{ padding: '64px 32px', minHeight: '50vh' }}/>)}
            </>)
        }
        </div>
    </>
  );
}
