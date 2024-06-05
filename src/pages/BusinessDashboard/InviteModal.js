import React, {useState, useContext, useRef} from "react";
import Modal from "react-bootstrap/Modal";
import {ButtonGroup} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import {useDispatch, useSelector} from "react-redux";
import "./BusinessDashboard.scss"
import {TagInput} from "./TagInput";
import {toggleInviteModal} from "../../store/slices/adminSlice";
import {PrimaryButton} from "../../components/button";
import {toast} from "react-toastify";
import {DEFAULT_ERROR, REGISTER_PARTNER_URL, SEND_INVITE_URL} from "../../api/urls";
import useApi from "../../hooks/useApi";
import AuthContext from "../../context/AuthProvider";

export const InviteModal = ({showRef}) => {
    const dispatch = useDispatch();
    const api = useApi();
    const { businessdata } = useSelector((state) => state.admin);
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useContext(AuthContext);


    const [form, setForm] = useState({
        voucherCode: "",
        emails: "",
    });

    function copyInviteCode() {
        navigator.clipboard.writeText(`To join ${user.name}'s Channel on exam portal, click this link: ${businessdata.inviteUrl}`);
        toast.success(
            "Copied!"
        );
    }
    function handleChangedValue(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }



    const onChangeMain = (tags) => {
        setForm({
            ...form,
            ["emails"]: tags,
        });
    };

    const handleCancel = () => {
        dispatch(toggleInviteModal({action: false }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
         if (!form.emails) {
            toast.error("email is required");
        } else {
            setIsLoading(true);
            await sendInviteCode();
        }
    }

    const sendInviteCode = async () => {
        try {
            await api.post(SEND_INVITE_URL, {
                emails: form.emails,
            });
            toast.success(
                "Invite sent successfully"
            );
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
                    <Modal show={businessdata.isInviteModal}  centered>
                        {(
                            <>
                                <Modal.Header>
                                    <div className="flexy col-md-12 flexyM close-btn">
                                        <div className="modal-tops">
                                            Invite Learners to your channel. <br/>
                                            <small>New members Joining your channel will be visible in Dashboard.</small>
                                        </div>
                                        <button onClick={handleCancel}>X</button>
                                    </div>
                                </Modal.Header>
                                <Modal.Body>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <div className="mb-3">
                                                <>
                                                    <Form.Label className="invite-header" htmlFor="sid">Copy your invite link</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        id="sid"
                                                        name="amount"
                                                        disabled={true}
                                                        value={businessdata.inviteUrl}
                                                    />
                                                    <button onClick={copyInviteCode} className="copy-cls">Copy</button>
                                                </>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="mb-3">
                                                    <>
                                                        <Form.Label className="invite-header" htmlFor="sid">Invite by email</Form.Label>
                                                        {/*<Form.Control*/}
                                                        {/*    type="text"*/}
                                                        {/*    id="iemail"*/}
                                                        {/*    name="email"*/}
                                                        {/*    value={form.emails}*/}
                                                        {/*    placeholder={"Email, comma or space separated"}*/}
                                                        {/*    onChange={handleChangedValue}*/}
                                                        {/*/>*/}
                                                        <TagInput onChangeMain={onChangeMain}/>
                                                        {/*<button className="copy-cls">Send Invite</button>*/}
                                                        <PrimaryButton onClick={handleSubmit} isLoadingMsg="sending invite..." size="sm"
                                                                       className={`formButtonActive formbutton`}
                                                                       isLoading={isLoading}>Send Invite</PrimaryButton>
                                                    </>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Modal.Body>
                                {/*<Modal.Footer>*/}
                                {/*    <div className="flexy start-btn">*/}
                                {/*        <ButtonGroup>*/}
                                {/*            <button onClick={handleCancel} className="cancel-btn btn-danger">*/}
                                {/*                Cancel*/}
                                {/*            </button>*/}
                                {/*            <div>*/}
                                {/*                {" "}*/}
                                {/*            </div>*/}
                                {/*        </ButtonGroup>*/}
                                {/*    </div>*/}

                                {/*</Modal.Footer>*/}
                            </>
                        )}
                    </Modal>
                </div>
            </div>
        </>
    );
};
