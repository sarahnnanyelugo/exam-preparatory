import React, {useContext, useEffect} from "react";
import "./test-instructions.scss";
import Alert from "../../assets/images/alert.svg";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AuthContext from "../../context/AuthProvider";
import {setExamMeta} from "../../store/slices/examSlice";
import {useParams} from "react-router";
import {Loading} from "../../components/loading";
import {useMediaQuery} from "react-responsive";

export const TestInstructions = ({handle}) => {
  const useTabletAndBelowMediaQuery = () =>
      useMediaQuery({ query: '(max-width: 768px)' })
  const isTabletAndBelow = useTabletAndBelowMediaQuery();
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const examSummary = useSelector((state) => state.exam.meta);
  const { state } = useLocation();


  // const testdata = useSelector((state) => state.exam.testdata);
  // const [showWelcome, setShowWelcome] = useState(testdata.showWelcome);

  // console.log(examSummary);



  useEffect(() => {
    const metaBack = JSON.parse(localStorage.getItem(`meta-${id}`));
    if(!metaBack?.uniqueId){
      navigate('/');
    }
    dispatch(setExamMeta(metaBack));
  }, [id]);



  const startTest = () => {
  }

  return (
      <>
        {examSummary?.session ? (<div className="test-instructions-div">
          <div className="col-md-8 offset-md-2 T-instructions">
            <div className="title-div">
              {" "}
              <h4>Test Instructions</h4>
            </div>
            <div className="flexy inner">
              <div className="col-md-5">
                <h6>
                  Welcome &nbsp;&nbsp;&nbsp;&nbsp;<span>{user?.name}</span>
                </h6>
                <div className="flexy flexyM">
                  {" "}
                  <h6 className="col-md-2 col-3">Subject:</h6>
                  <p>{examSummary?.subject}</p>
                </div>
                <div className="flexy flexyM test-title">
                  <h6 className="col-md-2 col-3">Test Title:</h6>
                  <p>{examSummary?.session}</p>
                </div>
                <ul className="list-unstyled">
                      <li className="flexy flexyM">
                        <img src={Alert} alt="logo" width="18px" height="18px" />
                        Attempt all questions.
                      </li>
                  <li>
                    {" "}
                    <img src={Alert} alt="logo" width="18px" height="18px" />
                    You can’t leave once you start
                  </li>
                  <li>
                    <img src={Alert} alt="logo" width="18px" height="18px" />
                    If you close this window, we assume you’re done with your test.
                  </li>
                </ul>
              </div>
              <div className="col-md-2 offset-md-2 details">
                <div className="flexy flexyM">
                  {" "}
                  <h6 className="col-md-7 col-3">Total Mark:</h6>
                  <p>{examSummary?.examMarks} Marks</p>
                </div>{" "}
                <div className="flexy flexyM">
                  {" "}
                  <h6 className="col-md-6 col-4">Duration:</h6>
                  <p>{examSummary.duration} Mins</p>
                </div>{" "}
                <div className="flexy flexyM">
                  {" "}
                  <h6 className="col-md-6 col-4">Questions:</h6>
                  <p className="col-md-7 col-4">{examSummary.number} Questions</p>
                </div>
              </div>
              <div className="col-md-3 instruction-btns">
                {" "}
                <center>
                  <Link to={"/"}>
                    <button className="back-btn">Go back</button>
                  </Link>
                  <Link  state={state} to={`/questions-dashboard/${examSummary.uniqueId}`}>
                    <button onClick={()=>(!isTabletAndBelow && examSummary.enable_fullscreen)?handle.enter():""} className="proceed-btn">Proceed</button>
                  </Link>
                </center>
              </div>
            </div>
          </div>
        </div>):(
        <Loading size={70} style={{ padding: '64px 32px', minHeight: '50vh' }} />
        )}
      </>

  );
};
