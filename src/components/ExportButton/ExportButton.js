import React, {useState, useContext, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import "./export-btn.scss";
import Time from "../../assets/images/time.svg";
import Question from "../../assets/images/question.svg";
import Tick from "../../assets/images/tick.svg";
import Play from "../../assets/images/play.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setExamMeta } from "../../store/slices/examSlice";
import {DEFAULT_ERROR, GET_ANALYSIS_DATA_URL, GET_TEST_VERIFY_URL} from "../../api/urls";
import { toast } from "react-toastify";
import api from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import {PrimaryButton} from "../button";
import {getTestAnalysisDetails} from "../../store/actions/examActions";

export const ExportButton = ({ id,className }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setiIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleExport= async (e) => {
    // console.log("i am here");
    fetchDetails();
  }
  const fetchDetails = async () => {
    try {
      setiIsLoading(true);
      const response = await api.get(`${GET_ANALYSIS_DATA_URL}/${id}?is_pdf=${true}`);
      download(response.data.path);
      setiIsLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.error || DEFAULT_ERROR);
    }
    setiIsLoading(false);
  };

  const download = async (fileURL, fileName) => {
    if (!window.ActiveXObject) {
      var save = document.createElement('a');
      save.href = fileURL;
      save.target = '_blank';
      var filename = fileURL.substring(fileURL.lastIndexOf('/') + 1);
      save.download = fileName || filename;
      if (navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
        document.location = save.href;
      } else {
        var evt = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': false
        });
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      }
    }
// for IE < 11
    else if (!!window.ActiveXObject && document.execCommand) {
      var _window = window.open(fileURL, '_blank');
      _window.document.close();
      _window.document.execCommand('SaveAs', true, fileName || fileURL)
      _window.close();
    }
  }

  return (
    <>
        <PrimaryButton onClick={handleExport} isLoadingMsg="Exporting..." size="sm" className={`formButtonActive formbutton ${className} ${isLoading?"cls-loading":""}` } isLoading={isLoading}>
          Export
        </PrimaryButton>
    </>
  );
};
