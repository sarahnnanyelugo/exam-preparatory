import React, {useState, useContext, useRef} from "react";
import Modal from "react-bootstrap/Modal";
import "./test-modal.scss";
import paymentIcon from "../../../assets/images/switch_app.png";
import voucherIcon from "../../../assets/images/voucher.png";
import { ButtonGroup} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import {TopUpModal} from "./TopUpModal";

export const WalletModal = ({reset}) => {
  const [show, setShow] = useState(false);
  const [currentIndex,setCurrentIndex] = useState(0);

    const handleChanged = (e) => {
      handleClicked(e.target.value);
    };
  const handleClicked= (value) => {
    setCurrentIndex(+value);
  };

  const [form, setForm] = useState({
    voucherCode: "",
    amount: "",
  });
  function handleChangedValue(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }


  const handleShow = () => setShow(true);

  const handleClose = () => {
    resetData();
  };

  const resetData = () => {
    setShow(false);
    reset();
    setForm({
      voucherCode: "",
      amount: "",
    });
    setCurrentIndex(0);
  }
  const handleCancel = () => {
    resetData();
  };



  const handleInitiateTopUp = async () => {
    handleShow();
  };

  return (
    <>
      <div className="test-modal-div">
        {" "}
        <div className="test-modal-div">
          <button onClick={handleInitiateTopUp} style={{ border: "none" }}>
            Top up balance
          </button>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          {(
            <>
              <Modal.Header>
                <div className="flexy col-md-12 flexyM">
                  <div className="modal-tops">
                   Select Payment Method
                  </div>
                </div>
              </Modal.Header>
              <Modal.Body>
                <ListGroup>
                  <ListGroup.Item onClick={() => handleClicked(currentIndex)}>
                    <div  className="mb-3">
                      <Form.Check feedbackTooltip={true} id={`check-api-2`}  type="radio" >
                        <Form.Check.Input type="radio" id={`check-api-2`}  value={0}  checked={currentIndex === 0}
                                          onChange={handleChanged} />
                        <Form.Check.Label><img src={paymentIcon} alt="logo"  /></Form.Check.Label>
                        <Form.Control.Feedback>
                          Pay with Switch App
                        </Form.Control.Feedback>
                      </Form.Check>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item onClick={() => handleClicked(currentIndex)}>
                    <div className="mb-3">
                      <Form.Check feedbackTooltip={true}  type="radio" id={`check-api-1`}>
                        <Form.Check.Input type="radio"  id={`check-api-1`} onChange={handleChanged} checked={currentIndex === 1}  value={1}
                        />
                        <Form.Check.Label><img src={voucherIcon} width="391" height="150" alt="logo"  /></Form.Check.Label>
                        <Form.Control.Feedback>
                          Redeem Voucher Code
                        </Form.Control.Feedback>
                      </Form.Check>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="mb-3">
                      {currentIndex === 1?(<>
                        <Form.Label htmlFor="vid">Voucher Code</Form.Label>
                        <Form.Control
                            type="text"
                            id="vid"
                            name="voucherCode"
                            value={form.voucherCode}
                            placeholder={"Enter Your Voucher Code"}
                            onChange={handleChangedValue}
                        />
                        <Form.Text id="vid" muted>
                          Redeem your Voucher code here.You can enter multiple Voucher code seperated by a comma.
                        </Form.Text>
                      </>):(
                          <>
                            <Form.Label htmlFor="sid">Enter Amount</Form.Label>
                            <Form.Control
                                type="number"
                                id="sid"
                                name="amount"
                                value={form.amount}
                                placeholder={"Enter Amount"}
                                onChange={handleChangedValue}
                            />
                            <Form.Text id="sid" muted>
                              Note: Minimum to purchase is 2000Unit
                            </Form.Text>
                          </>
                          )}
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Modal.Body>
              <Modal.Footer>
                <div className="flexy start-btn">
                  <ButtonGroup>
                    <button onClick={handleCancel} className="cancel-btn btn-danger">
                      Cancel
                    </button>
                    <div>
                      {" "}
                      <TopUpModal currentIndex={currentIndex} form={form} handleClose={handleClose} />
                    </div>
                  </ButtonGroup>
                </div>

              </Modal.Footer>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};
