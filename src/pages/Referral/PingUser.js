import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
function UserModal(props) {
  return (
    <div className="ping-user-modal">
      {" "}
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <center>
            {" "}
            <h5>Ping User</h5>
          </center>
          <center>
            <p>Chijioke of your Referral Team have been notified!</p>
            <button onClick={props.onHide} className="dismiss-btn">
              Dismiss
            </button>
          </center>
        </Modal.Body>
      </Modal>
    </div>
  );
}

function PingUser() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <button className="ping-btn" onClick={() => setModalShow(true)}>
        Ping user
      </button>

      <UserModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
export default PingUser;
