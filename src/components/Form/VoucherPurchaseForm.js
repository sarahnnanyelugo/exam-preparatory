import "./form.scss";
import React, {useEffect, useState} from "react";
import {PrimaryButton} from "../button";
import api from "../../api/axios";
import {Alert} from "react-bootstrap";
import paymentIcon from "../../assets/images/switch_app.png";
import voucherIcon from "../../assets/images/voucher.png";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import {BUY_VOUCHER, DEFAULT_ERROR, VERIFY_PAYMENT_BUY_URL, VERIFY_PAYMENT_URL} from "../../api/urls";
import SwitchAppCheckout from "@switchappgo/switchapp-inline";
import {getWalletBalance} from "../../store/actions/walletActions";
import {toast} from "react-toastify";
import parse from "html-react-parser";

export const VoucherPurchaseForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [payload, setPayload] = useState({});
    const [show, setShow] = useState(false);
    const [currentIndex,setCurrentIndex] = useState(0);
    let switchappClient;

    const handleChanged = (e) => {
        handleClicked(e.target.value);
    };
    const handleClicked= (value) => {
        setCurrentIndex(+value);
    };

    const [form, setForm] = useState({
        amount_qty: 1,
        amount: 2000,
        email: "",
    });
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        // console.log({
        //     ...form,
        //     [e.target.name]: e.target.value,
        // });
    }

    function handleChangedValue(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        if (Object.keys(payload).length === 0) return;
        if(!switchappClient)
        {
            switchappClient = new SwitchAppCheckout({
                publicApiKey: payload.publicKey,
            });
        }
        delete payload.publicKey;
        switchappClient
            .showCheckoutModal({
                ...payload,
                onClose: () => {
                    verifyPayment(payload.tx_ref);
                    setPayload({});
                },
                onSuccess: () => {
                    verifyPayment(payload.tx_ref);
                    setPayload({});
                },
            })
            .then((p) => {
                // TO-DO - Verify payment before calling fund endpoint
                // console.log(`Initialized a new top-up`,p);
                setIsLoading(false);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payload]);

    const verifyPayment = async (tx_ref) => {
        try {
            setIsLoading(true);
            const response = await api.get(`${VERIFY_PAYMENT_BUY_URL}/${tx_ref}`);
            setErrorMsg(response.data.success);
            setSuccessMsg(true);
        } catch (error) {
            let tempError =  error?.response?.data || DEFAULT_ERROR;
            if(typeof tempError === 'object'){
                tempError = (tempError.error.length < 15 && tempError.error) || DEFAULT_ERROR;
            }
            setErrorMsg(tempError);
        }
        setIsLoading(false);
    };


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setIsLoading(true);
            setErrorMsg(false);
            setSuccessMsg(false);
            const response = await api.post(`${BUY_VOUCHER}`,
                { ...form});
            setPayload(response.data);
            // if(!isChangePassword) {
        } catch (error) {
            let tempError =  error?.response?.data || DEFAULT_ERROR;
            if(typeof tempError === 'object'){
                tempError = tempError.error;
            }
            setErrorMsg(tempError);
            // console.log(error?.response?.data)
            setIsLoading(false);
        }
    }


  return (
          <form className="form-container" action="" onSubmit={handleSubmit}>
                      <Alert show={!!errorMsg} variant={successMsg?"success":"danger"}>
                          <p>
                              {errorMsg && parse(errorMsg)}
                          </p>
                      </Alert>

                 <>
              <h6 className="form-heading">
                  Generate Voucher
              </h6>

                     <ListGroup>
                         <ListGroup.Item>
                             <div className="mb-3">
                                 <>
                                     <Form.Label className={"vHead"} htmlFor="sid">Enter Amount</Form.Label>
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
                             </div>
                             <div className="mb-3">
                                 <>
                                     <Form.Label className={"vHead"} htmlFor="qid">Qty</Form.Label>
                                     <Form.Control
                                         type="number"
                                         id="qid"
                                         step={1}
                                         name="amount_qty"
                                         value={form.amount_qty}
                                         placeholder={"Enter Quantity"}
                                         onChange={handleChangedValue}
                                     />
                                 </>
                             </div>
                             <div className="mb-3">
                                 <>
                                     <Form.Label className={"vHead"} htmlFor="eid">Email</Form.Label>
                                     <Form.Control
                                         type="email"
                                         id="eid"
                                         step={1}
                                         name="email"
                                         value={form.email}
                                         placeholder={"Enter Your Email"}
                                         onChange={handleChangedValue}
                                     />
                                     <Form.Text id="sid" muted>
                                         Note: Generated token will be sent to your Email.
                                     </Form.Text>
                                 </>
                             </div>
                         </ListGroup.Item>
                         <b>Payment Method</b>
                         <ListGroup.Item onClick={() => handleClicked(currentIndex)}>
                             <div  className="mb-3 b-v">
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
                     </ListGroup>


                {" "}
              <PrimaryButton isLoadingMsg="Processing..." size="sm" className="formButtonActive formbutton" isLoading={isLoading}>Pay Now {
                  (form.amount && form.amount_qty) && `(${form.amount*form.amount_qty})`}</PrimaryButton>
              </>
          </form>
  );
}
