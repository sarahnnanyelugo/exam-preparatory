import "./businessTopup.scss";
import React, {useContext, useEffect, useState} from "react";
import api from "../../api/axios";
import {Alert} from "react-bootstrap";
import paymentIcon from "../../assets/images/switch_app.png";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import {BUY_VOUCHER, DEFAULT_ERROR, VERIFY_PAYMENT_BUY_URL} from "../../api/urls";
import SwitchAppCheckout from "@switchappgo/switchapp-inline";
import {toast, ToastContainer} from "react-toastify";
import parse from "html-react-parser";
import {PrimaryButton} from "../../components/button";
import AuthContext from "../../context/AuthProvider";
import MultiDropdownNew from "../../components/dropDown/MultiDropdownNew";
import {useDispatch, useSelector} from "react-redux";
import {getTopUpActivity, getTopUpIndex} from "../../store/actions/adminActions";
import Pagination from "../../components/Pagination/Pagination";
import {ErrorView} from "../Helpers/errorView";
import {Loading} from "../../components/loading";
import {ActivityTop} from "./ActivityTop";

export const BusinessTopup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [payload, setPayload] = useState({});
    const [activeView, setActiveView] = useState(1);
    const [isTransactionLoaded, setIsTransactionLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentIndex,setCurrentIndex] = useState(0);
    const { user } = useContext(AuthContext);
    const { businessdata } = useSelector((state) => state.admin);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const dispatch = useDispatch();

    let switchappClient;

    const handleChanged = (e) => {
        handleClicked(e.target.value);
    };
    const handleClicked= (value) => {
        setCurrentIndex(+value);
    };

    const [form, setForm] = useState({
        type: 2,
        amount_qty: 1,
        customers: [],
        amount: 2000,
        email: user.email,
    });
    function handleChangedType(e) {
        setForm({
            ...form,
            type: +e.target.value,
            amount_qty: 1,
        });
    }

    function handleComboChanged(usersList) {
        setForm({
            ...form,
            customers: usersList,
        });
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
                setIsLoading(false);
            });

    }, [payload]);

    const verifyPayment = async (tx_ref) => {
        try {
            setIsLoading(true);
            const response = await api.get(`${VERIFY_PAYMENT_BUY_URL}/${tx_ref}`);
            setErrorMsg(response.data.success);
            toast.success(response.data.success);
            setSuccessMsg(true);
        } catch (error) {
            let tempError =  error?.response?.data || DEFAULT_ERROR;
            if(typeof tempError === 'object'){
                tempError = (tempError.error.length < 15 && tempError.error) || DEFAULT_ERROR;
            }
            setErrorMsg(tempError);
            toast.error(tempError);
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

    useEffect(() => {
        dispatch(getTopUpIndex({ }));
    }, []);

    function handleTabChange(tabIndex) {
        setActiveView(tabIndex);
        if(tabIndex === 2 && !isTransactionLoaded){
            handleRefreshPage();
        }
    }


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleGotoFirstPage = () => {
        setCurrentPage(1);
    };
    const handleRefreshPage = () => {
        dispatch(getTopUpActivity({ pageSize, currentPage, type: activeView }));
    };
    const handleGotoLastPage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        dispatch(getTopUpActivity({ pageSize, currentPage, type: activeView }));
    }, [currentPage, pageSize]);

    useEffect(() => {
        if(businessdata.isTransactionLoaded){
            setIsTransactionLoaded(true);
        }
    }, [businessdata.isTransactionLoaded]);

    return (
        <>
            <ToastContainer />
            <div className="busi-top col-md-8 offset-md-2 auth-page">
                <center>
                    <h3 style={{ fontFamily: "font-family: rebondG-Bold" }}>
                        TopUp Manager
                    </h3>
                </center>
                <div className="analysis-tab ">
                    {" "}
                    <div className="tabs ">
                        <button className={`tab ${activeView === 1 ? "active2" : ""}`} onClick={() => handleTabChange(1)}>
                            Top Up
                        </button>
                        <button className={`tab ${activeView === 2 ? "active2" : ""}`} onClick={() => handleTabChange(2)} style={{ marginLeft: "20px" }}>
                            Transactions
                        </button>
                    </div>
                    {activeView === 1?(
                        <div className="panels" style={{ position: "relative",marginTop: "1rem"}}>
                            <div className="col-md-8 offset-md-2">

                                <form className="form-container" action="" onSubmit={handleSubmit}>
                                    <Alert show={!!errorMsg} variant={successMsg?"success":"danger"}>
                                        <p>
                                            {errorMsg && parse(errorMsg)}
                                        </p>
                                    </Alert>

                                    <>
                                        <ListGroup>
                                            <b>Select Payment Type</b>
                                            <ListGroup.Item>
                                                <div className="mb-3">
                                                    <>
                                                        {/*<Form.Label className={"vHead"} htmlFor="sid">Payment Type</Form.Label>*/}
                                                        <Form.Select
                                                            size="lg"
                                                            defaultValue={form.type}
                                                            placeholder={"Select Type"}
                                                            onChange={handleChangedType}>
                                                            <option value="2">Voucher Purchase</option>
                                                            <option value="1">Direct Payment</option>
                                                        </Form.Select>
                                                    </>
                                                </div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                        <h6 className="form-heading">
                                            {form.type === 2?(
                                                "Generate Voucher"
                                            ):(
                                                "Direct Payment"
                                            )}
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
                                                {form.type === 2?(
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
                                                ):(
                                                    <>
                                                        <div className="mb-3">
                                                            <>
                                                                <Form.Label className={"vHead"} htmlFor="sid">Select Learners</Form.Label>
                                                                <MultiDropdownNew
                                                                    type={1} selectedValues={users}
                                                                    handleChange={handleComboChanged}
                                                                    options={businessdata.learners}>
                                                                </MultiDropdownNew>

                                                            </>
                                                        </div>
                                                    </>
                                                )}
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
                                        <PrimaryButton isLoadingMsg="Processing..." size="sm" className="formButtonActive formbutton" isLoading={isLoading}>Pay Now
                                            {(form.type === 2 && form.amount && form.amount_qty) && `(${form.amount*form.amount_qty})`}{(form.type === 1 && !!form.customers?.length && form.amount) && `(${form.amount*form.customers.length})`}</PrimaryButton>
                                    </>
                                </form>
                            </div>
                        </div>
                    ):(
                        <div className="panels" style={{ position: "relative" }}>

                               {isTransactionLoaded?(
                                   <>
                                       <div className={`panel active2`}>
                                           <div className="row ">
                                               {businessdata.activity?.data?.map((data, index) => (
                                                   <ActivityTop key={index} data={data} active={activeView} />
                                               ))}
                                           </div>
                                       </div>
                                       {businessdata.activity.data && (
                                           <Pagination
                                               itemsCount={businessdata.activity?.pagination?.totalItems}
                                               pageSize={pageSize}
                                               onPageChange={handlePageChange}
                                               onGotoLastPage={handleGotoLastPage}
                                               onGotoFirstPage={handleGotoFirstPage}
                                               currentPage={currentPage}
                                           />
                                       )}
                                       {(!businessdata.activity.data || !businessdata.activity.data.length) && (<ErrorView  />)}
                                   </>
                               ):(
                                   <Loading size={50} style={{ padding: '64px 32px', minHeight: '50vh' }} />
                               )}

                        </div>
                    )}


                </div>
            </div>

        </>
    );
}
