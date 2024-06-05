import React, {useState, useContext, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import "./action-btn.scss";
import Time from "../../assets/images/time.svg";
import Question from "../../assets/images/question.svg";
import Tick from "../../assets/images/tick.svg";
import Play from "../../assets/images/play.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {refreshFlaggedTable, setExamMeta} from "../../store/slices/examSlice";
import {DEFAULT_ERROR, GET_ANALYSIS_DATA_URL, GET_TEST_VERIFY_URL, TOGGLE_FLAGGED_ANALYSIS_URL} from "../../api/urls";
import { toast } from "react-toastify";
import api from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import {PrimaryButton} from "../button";
import {getTestAnalysisDetails} from "../../store/actions/examActions";

export const ActionButton = ({ id,className,title='export',
                             mode}) => {
  const [show, setShow] = useState(false);
  const [isLoading, setiIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleAction= async (e) => {
    sendAction();
  }
  const sendAction = async () => {
    try {
      setiIsLoading(true);
      const response = await api.post(`${TOGGLE_FLAGGED_ANALYSIS_URL}`,
          {
            mode: mode,
            questionId: id
          });
      dispatch(refreshFlaggedTable(1));
      setiIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || DEFAULT_ERROR);
    }
    setiIsLoading(false);
  };

  return (
    <>
        <PrimaryButton onClick={handleAction}
                       isLoadingMsg=" " size="sm"
                       className={`formButtonActive formbutton no-mag 
                       ${className} ${isLoading?"cls-loading":""}` }
                       isLoading={isLoading}>
          {title}
        </PrimaryButton>
    </>
  );
};
