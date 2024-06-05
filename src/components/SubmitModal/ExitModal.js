import Modal from "react-bootstrap/Modal";
import "./submit-modal.scss";

export const ExitModal = ({isOpenModal,setIsOpenModal,handleSubmitMain,handle}) => {
  const handleClose = (flag) => {
    setIsOpenModal(false);
    handle.enter();
  }
  const handleSubmit = () => {
    handleSubmitMain(true);
    setIsOpenModal(false);
  }

  return (
    <>
      <div className="submit-modal-div">
        <Modal show={isOpenModal} centered>
          <Modal.Body>
            <div className="test-body">
              <div className="submit-query exit">
                <h6>Are You Sure?</h6>
                <p>
                  Clicking <span>YES</span> will End the Test. Make sure you have answered all the question(s).
                </p>
              </div>
              <Modal.Footer>
                <div className="flexy ">
                  {" "}
                  <button className="not-done-btn " onClick={handleClose}>
                    No, I’m not done
                  </button>
                    <button className="done-btn offset-md-5" onClick={handleSubmit}>
                      Yes, I’m done
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
