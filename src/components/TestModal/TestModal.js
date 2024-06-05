import React, {useState, useContext, useEffect, useRef} from "react";
import Modal from "react-bootstrap/Modal";
import "./test-modal.scss";
import Time from "../../assets/images/time.svg";
import Question from "../../assets/images/question.svg";
import Tick from "../../assets/images/tick.svg";
import Play from "../../assets/images/play.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setExamMeta } from "../../store/slices/examSlice";
import { setExamQuestions } from "../../store/slices/examSlice";
import {GET_COUNTRIES_URL, GET_PASTQUESTIONS_URL, GET_TEST_VERIFY_URL} from "../../api/urls";
import { toast } from "react-toastify";
import api from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import {useMediaQuery} from "react-responsive";
import {GoogleButton} from "../GoogleButton/GoogleButton";
import PhoneInput from "react-phone-number-input";
import {Password} from "../Form/Password";
import {PrimaryButton} from "../button";
import SearchableDropdown from "../dropDown/SearchableDropdown";
import {fetchCountries} from "../../store/actions/examActions";
import {Loading} from "../loading";

export const TestModal = ({ rowData,isContinue,handle,openTest,
                            setOpenTest,isProfileNotComplete}) => {
  const useTabletAndBelowMediaQuery = () =>
      useMediaQuery({ query: '(max-width: 768px)' })
  const isTabletAndBelow = useTabletAndBelowMediaQuery();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { balance } = useSelector((state) => state.wallet);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timeout = useRef("");

  const handleClose = () => {
    if (balance >= rowData.unitNum) {
      fetchQuestion();
    }
    setShow(false);
    handleHelper();
  };

  const handleShow = () => {
    if(isContinue){
      fetchQuestion();
    }
    else{
        setShow(true);
    }
  }

  const handleHelper = () => {
    if(setOpenTest) {
      timeout.current = setTimeout(() => {
        setOpenTest("");
      }, 50);
    }
  }
  const handleCancel = () => {
    setShow(false);
    handleHelper();
  };



  const formatMeta = (meta) => {
    meta.subject = rowData.examDetails.subject;
    meta.session = rowData.examDetails.session;
    meta.duration = rowData.examAttr.duration;
    meta.number = rowData.examAttr.number;
    meta.examMarks = rowData.examMarks;
    return meta;
  };

  const fetchQuestion = async () => {
    try {
      if(isProfileNotComplete){
        setLoading(true);
        localStorage.setItem(`meta-rowData-${rowData.id}`, JSON.stringify({
          subject: rowData.examDetails.subject,
          session: rowData.examDetails.session,
          duration: rowData.examAttr.duration,
          number: rowData.examAttr.number,
          examMarks: rowData.examMarks,
          continue: isContinue?1:0
        }));
        setTimeout(() => {
          navigate(`/complete/profile/${rowData.id}`);
        }, 0);


      }
      else {
        setLoading(true);
        const response = await api.get(`${GET_TEST_VERIFY_URL}/${rowData.id}`);
        const meta = formatMeta(response.data.meta);
        dispatch(setExamMeta(meta));
        localStorage.setItem(`meta-${meta.uniqueId}`, JSON.stringify({...meta}));
        if (!isContinue) {
          navigate(`/test-instructions/${meta.uniqueId}`);
        } else {
          if (!isTabletAndBelow && meta.enable_fullscreen) {
            handle.enter();
          }
          navigate(`/questions-dashboard/${meta.uniqueId}`);
        }
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      if(timeout.current){
        clearTimeout(timeout.current);
      }
    }
  },[])
  useEffect(() => {
    if(openTest === rowData.id) {
      handleShow();
    }
  },[openTest]);


  return (
    <>
      <div className="test-modal-div">
        {" "}
        <button className={isContinue?"continue-btn":""} onClick={handleShow} style={{ border: "none" }}>
          {isContinue?"Continue":"Practice"}
        </button>
        <Modal show={show} onHide={handleCancel} centered>
          {balance >= rowData.unitNum ? (
            <>
              <Modal.Header>
                <div className="flexy col-md-12 flexyM">
                  <div className="modal-tops">
                    {" "}
                    <h5>{rowData.examDetails.subject}</h5>
                    <p style={{ fontSize: "14px" }}>{rowData.examDetails.session}</p>
                  </div>
                  <button className="attempts-btn ">
                    {rowData.attempts}
                    <br />
                    Attempt{rowData.attempts>1?"s":""}
                  </button>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div className="test-body flexy">
                  {" "}
                  <div>
                    {" "}
                    <div className="flexy time">
                      <img src={Time} alt="logo" width="22px" height="22px" />
                      <small>{rowData.examAttr.duration} Mins</small>
                    </div>
                    <div className="flexy">
                      <img src={Question} alt="logo" width="22px" height="22px" />
                      <small>{rowData.examAttr.number} Questions</small>
                    </div>
                  </div>
                  <div className="flexy offset-md-2">
                    <img src={Tick} alt="logo" width="22px" height="22px" />
                    <small>{rowData.examMarks} Marks</small>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button onClick={handleCancel} className="cance-btn">
                  Cancel
                </button>
                <div className="flexy flexyM start-btn">
                  <h6>{rowData.unitNum === 0 ? "Free" : `${rowData.unitNum} Units`}</h6>
                  <Link state={rowData}>
                  <button onClick={handleClose} className="">
                      <img src={Play} alt="logo" width="18px" height="18px" /> Start Test
                    </button>
                  </Link>
                </div>
              </Modal.Footer>
            </>
          ) : (
            <>
              {" "}
              <Modal.Header>
                <div className="flexy col-md-12 flexyM">
                  <div className="modal-tops">
                    <h5>You don't have sufficient units to take this test. Kindly top-up your wallet</h5>
                  </div>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div className="test-body flexy">
                  {" "}
                  <div>
                    {" "}
                    <div className="flexy" style={{ marginBottom: "7px" }}>
                      <h6>Wallet Balance</h6>
                    </div>
                    <div className="flexy">
                      <small>{balance} Units</small>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button onClick={handleCancel} className="cance-btn">
                  Go back
                </button>
                <div className="wallet-btn">
                  <Link to={"/wallet"}>
                    <button className="">Take me to my wallet</button>
                  </Link>
                </div>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};
