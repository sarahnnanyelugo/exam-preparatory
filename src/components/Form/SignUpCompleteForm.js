import React, {useContext, useEffect, useRef, useState} from "react";
import "./form.scss";
import {useNavigate, useSearchParams} from "react-router-dom";
import "react-phone-number-input/style.css";
import useApi from "../../hooks/useApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {DEFAULT_ERROR, GET_TEST_VERIFY_URL, REGISTER_URL, SEND_COUNTRIES_URL} from "../../api/urls";
import AuthContext from "../../context/AuthProvider";
import {useParams} from "react-router";
import {Loading} from "../loading";
import {useDispatch, useSelector} from "react-redux";
import {fetchCountries} from "../../store/actions/examActions";
import SearchableDropdown from "../dropDown/SearchableDropdown";
import {PrimaryButton} from "../button";
import {selectState, setExamMeta} from "../../store/slices/examSlice";
import api from "../../api/axios";
import {useMediaQuery} from "react-responsive";


function SignUpCompleteForm({handle}) {
  const useTabletAndBelowMediaQuery = () =>
      useMediaQuery({ query: '(max-width: 768px)' })
  const isTabletAndBelow = useTabletAndBelowMediaQuery();
  const { isLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { examsdata } = useSelector((state) => state.exam);
  const {id} = useParams();
  const [loadingCountry, setLoadingCountry] = useState(true);
  const [countryFilter, setCountryFilter] = useState("");
  const [statesFilter, setStatesFilter] = useState("");
  const states = useRef([]);

  useEffect(() => {
    dispatch(fetchCountries({}));
  }, [id]);

  useEffect(() => {
    if(examsdata.sendingloadingCountryDone) {
      setLoadingCountry(false);
      // console.log("i am here done");
    }
    // console.log("out side");
  },[examsdata.sendingloadingCountryDone]);


  const handleSchoolChange = (e) => {
    handleForm(e.target.name,e.target.value);
  }
  const handleForm = (name,value) => {
    setForm({
      ...form,
      [name]: value,
    });
  }
  const handleStateChange = (val) => {
    setStatesFilter(val);
    handleForm("state",val);
  }
  const handleCountryChange = (val,countryId) => {
    setCountryFilter(val);
    handleForm("country",val);
    dispatch(selectState({countryId: countryId}))
    // handleFilterChange(val,1);
    // console.log("i am called 3",val,countryId,form);
  };



  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const api = useApi();

  const [form, setForm] = useState({
    state: "",
    country: "",
    schoolName: "",
  });


  async function handleContinue(e) {
    e.preventDefault();
    if (!form?.country) {
      toast.error("Country is required");
    } else if (!form?.state) {
      toast.error("State is required");
    }  else if (!form.schoolName) {
      toast.error("School Name is required");
    } else {
      setIsLoading(true);
      await sendProfileComplete();
    }
  }


  const sendProfileComplete = async () => {
    try {
      const payload = {
        country: form.country,
        state: form.state,
        schoolName: form.schoolName,
      };
      await api.post(SEND_COUNTRIES_URL,payload);
      toast.success(
        "Your account has been updated."
      );
      fetchQuestion();
      window.scrollTo({top: 0, left: 0, behavior: 'instant'});
    } catch (error) {
      toast.error(getErrorMessage(error));
      setIsLoading(false);
    }
  };
  const getErrorMessage = (error) => {
    let msg  = (error.response.status === 403 && error?.response?.data) ||
        error.response.statusText;
    if(error.response.data && typeof error.response.data === 'object'
        && error.response.data.error){
      msg = error.response.data.error;
    }
    return (error.response.status !== 404 && msg) || DEFAULT_ERROR;
  };


  const formatMeta = (meta) => {
    const rowData = JSON.parse(localStorage.getItem(`meta-rowData-${id}`));
    localStorage.removeItem(`meta-rowData-${id}`);
    meta.subject = rowData.subject;
    meta.session = rowData.session;
    meta.duration = rowData.duration;
    meta.number = rowData.number;
    meta.examMarks = rowData.examMarks;
    const isContinue = rowData.continue === 1;
    return [meta,isContinue];
  };

  const fetchQuestion = async () => {
    try {
      const response = await api.get(`${GET_TEST_VERIFY_URL}/${id}`);
      const [meta,isContinue] = formatMeta(response.data.meta);
      dispatch(setExamMeta(meta));
      localStorage.setItem(`meta-${meta.uniqueId}`, JSON.stringify({ ...meta}));
      if(!isContinue) {
        navigate(`/test-instructions/${meta.uniqueId}`,{replace: true});
      }else{
        if(!isTabletAndBelow && meta.enable_fullscreen){
          handle.enter();
        }
        navigate(`/questions-dashboard/${meta.uniqueId}`,{replace: true});
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="sign-complete col-md-4 offset-md-4 auth-page">
        <div className="">
          {" "}
      <ToastContainer />
      <center className="logo-mar-btm">
        <div >
          <h5>Complete Your Profile to continue</h5>
        </div>
      </center>
      {loadingCountry?(
          <Loading size={70} style={{ padding: '64px 32px', minHeight: '50vh' }} />
      ):(
          <div className="">
            <form className=" form-container" action="" onSubmit={handleContinue}>
              <div className="form">
                <h6>Select Country <b>*</b></h6>
                <SearchableDropdown
                    options={examsdata.countries}
                    label="name"
                    finalVal="id"
                    id="id"
                    selectedVal={countryFilter}
                    handleChange={handleCountryChange}
                />
              </div>
              {examsdata.selectedStates.length?(
                  <div className="form" style={{marginTop: "2rem"}}>
                    <h6>Select State <b>*</b></h6>
                    <SearchableDropdown
                        options={examsdata.selectedStates}
                        label="name"
                        id="state"
                        selectedVal={statesFilter}
                        handleChange={handleStateChange}
                    />
                  </div>
              ):(
                  <div className="form" style={{marginTop: "2rem"}}>
                    <h6>School State <b>*</b></h6>
                    <input disabled={!!!countryFilter} type="text" name="state" onChange={handleSchoolChange} />
                  </div>
              )}

              <div className="form" style={{marginTop: "2rem"}}>
                <h6>School Name <b>*</b></h6>
                <input type="text" name="schoolName" onChange={handleSchoolChange} />
              </div>
              <PrimaryButton
                             isLoadingMsg="please wait..." size="sm" className={`${
                 "formButtonActive formbutton mb-5" 
              }`} isLoading={isLoading}>Continue</PrimaryButton>
            </form>
          </div>
      )}
        </div>
      </div>
    </>
  );
}

export default SignUpCompleteForm;
