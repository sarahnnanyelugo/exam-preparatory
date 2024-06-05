import React, {useState, useContext, useRef} from "react";
import Modal from "react-bootstrap/Modal";
import {useDispatch, useSelector} from "react-redux";
import { toggleSubscribeModal} from "../../store/slices/adminSlice";
import {toast} from "react-toastify";
import {DEFAULT_ERROR, REGISTER_PARTNER_URL, SEND_INVITE_URL, SEND_UNINVITE_URL} from "../../api/urls";
import useApi from "../../hooks/useApi";
import AuthContext from "../../context/AuthProvider";
import {ButtonGroup} from "react-bootstrap";
import {PrimaryButton} from "../button";
import "./navbar.scss";

export const UnsubscribeModal = () => {
    const dispatch = useDispatch();
    const api = useApi();
    const { headerData } = useSelector((state) => state.admin);
    const [isLoading, setIsLoading] = useState(false);

    const { user,userUpdate } = useContext(AuthContext);



    const handleCancel = () => {
        dispatch(toggleSubscribeModal({action: false }));
    };



    const sendUnInvite = async () => {
        try {
            setIsLoading(true);
            const resp = await api.post(SEND_UNINVITE_URL, {
            });
            toast.success(
                resp.data.success
            );
            const newUser = {...user};
            delete newUser.subscribed;
            userUpdate(newUser);
            setIsLoading(false);
            handleCancel();
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

    return (
        <>
            <div className="test-modal-div">
                <div className="test-modal-div">
                    <Modal show={headerData.isSubscribeModal}  centered>
                        {(
                            <>
                                <Modal.Header>
                                    <div className="flexy col-md-12 flexyM close-btn top">
                                        <div className="modal-tops">
                                           {user.subscribed.lastname}'s Channel <br/>
                                        </div>
                                        <button onClick={handleCancel}>X</button>
                                    </div>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>
                                        You are currently subscribed to <b>{user.subscribed.lastname}'s Channel</b>
                                    </p>
                                    <p className="subscribe-cls">
                                        You can unsubscribe at anytime by clicking the Unsubscribe button below.
                                    </p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div className="flexy start-btn">
                                        <ButtonGroup>
                                            <button onClick={handleCancel} className="cancel-btn btn-danger">
                                                Cancel
                                            </button>
                                            {/*<button onClick={sendUnInvite} className=" btn-primary">*/}
                                            {/*    Unsubscribe*/}
                                            {/*</button>*/}
                                            <PrimaryButton onClick={sendUnInvite} isLoadingMsg="sending request..." size="sm"
                                                           className={`formButtonActive`}
                                                           isLoading={isLoading}>Unsubscribe</PrimaryButton>
                                        </ButtonGroup>
                                    </div>
                                </Modal.Footer>
                            </>
                        )}
                    </Modal>
                </div>
            </div>
        </>
    );
};
