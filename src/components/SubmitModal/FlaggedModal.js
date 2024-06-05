import Modal from "react-bootstrap/Modal";
import "./submit-modal.scss";
import React, {useState} from "react";

export const FlaggedModal = ({isOpenModalFlag,setIsOpenModalFlag,
                               handleSubmitMain,handleFlaggedClosed}) => {
  const [form, setForm] = useState({
    reason: "",
  });
  const handleClose = () => {
    setIsOpenModalFlag(false);
    handleFlaggedClosed();
  }
  const handleReasonChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = () => {
    if(!form.reason || form.reason.length < 1){
      window.scrollTo({top: 0, left: 0, behavior: 'instant'});
      return handleClose();
    }
    handleSubmitMain(form.reason);
    setIsOpenModalFlag(false);
    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
  }

  return (
    <>
      <div className="submit-modal-div">
        <Modal show={isOpenModalFlag} centered>
          <Modal.Body>
            <div className="test-body">
              <div className="submit-query exit">
                <h6>State the reason for flagging question</h6>
                  <div className="form" style={{marginTop: "2rem"}}>
                    <h6>Reason <b>*</b></h6>
                    <textarea  rows="6" style={{width: "100%"}}
                            name="reason" onChange={handleReasonChange} />
                  </div>
              </div>
              <Modal.Footer>
                <div className="flexy ">
                  {" "}
                  <button className="not-done-btn " onClick={handleClose}>
                    cancel
                  </button>
                    <button className="done-btn offset-md-5" onClick={handleSubmit}>
                      Flag
                    </button>
                </div>
              </Modal.Footer>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
