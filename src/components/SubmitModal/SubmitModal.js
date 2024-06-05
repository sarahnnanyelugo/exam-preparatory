import Modal from "react-bootstrap/Modal";
import "./submit-modal.scss";
import {useSelector} from "react-redux";

export const SubmitModal = ({submitQuestion,showSubmit,handleSubmit}) => {
  const finalQuestions = useSelector((state) => state.exam.finalQuestions);
  const handleClose = () => {
    handleSubmit(false);
  }
  const handleShow = () => {
    handleSubmit(true);
  }


  return (
    <>
      <div className="submit-modal-div">
        {" "}
        <button onClick={handleShow} className="next-btn " style={{ border: "none" }}>
          Submit
        </button>
        <Modal show={showSubmit} onHide={handleClose} centered>
          <Modal.Body>
            <div className="test-body">
              <div className="submit-query">
                {" "}
                <h6>Are You Sure?</h6>
                <p>
                  Clicking <span>YES</span> will End the Test. Make sure you have answered all the question(s).
                </p>
              </div>
              <div className="flexy">
                {" "}
                <div className="col-md-6">
                  <h6>Attempted Questions</h6>
                  <p>{finalQuestions?.questionAttended}</p>
                </div>
                <div className="">
                  <h6>Unattempted Questions</h6>
                  <p>{finalQuestions?.questionNotAttended}</p>
                </div>
              </div>
              <Modal.Footer>
                {" "}
                <div className="flexy ">
                  {" "}
                  <button className="not-done-btn " onClick={handleClose}>
                    No, I’m not done
                  </button>
                  {/*<Link to={"/summary-page"}>*/}
                  {/*  {" "}*/}
                    <button className="done-btn offset-md-5" onClick={submitQuestion}>
                      Yes, I’m done
                    </button>
                  {/*</Link>*/}
                </div>
              </Modal.Footer>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
