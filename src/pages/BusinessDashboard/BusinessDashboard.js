import React, {useContext, useEffect, useRef, useState} from "react";
import "./BusinessDashboard.scss"
import {useDispatch, useSelector} from "react-redux";
import {getBusinessDashboard} from "../../store/actions/adminActions";
import {InviteModal} from "./InviteModal";

export const BusinessDashboard = ({handle}) => {
    const dispatch = useDispatch();
    const { businessdata } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getBusinessDashboard({ }));
    }, []);



    return (
        <>
            <div className="col-md-10 offset-md-1 mt6">
                <center>
                    <h3 style={{ fontFamily: "font-family: rebondG-Bold" }}>
                       Current User Overview
                    </h3>
                </center>
                <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
                    <div className="col">
                        <div className="exam-container">
                        <center>
                            {" "}
                            <h1>{businessdata.stats?.total_number_of_subscribed_users}</h1>
                            <h6>Total number of subscribed learners</h6>
                        </center>
                        </div>
                    </div>{" "}
                    <div className="col">
                        <div className="exam-container  ">
                        <center>
                            {" "}
                            <h1>{businessdata.stats?.total_number_of_questions_practised}</h1>
                            <h6>Total number of exams practised</h6>
                        </center>
                        </div>
                    </div>{" "}
                    <div className="col">
                        <div className="exam-container  ">
                            <center>
                                {" "}
                                <h1>{businessdata.stats?.total_number_of_questions_finished}</h1>
                                <h6>Total number of exams completed</h6>
                            </center>
                        </div>
                    </div>{" "}
                    <div className="col">
                        <div className="exam-container  ">
                        <center>
                            {" "}
                            <h1>{businessdata.stats?.total_number_of_users_practised}</h1>
                            <h6>Total number of users who have practised</h6>
                        </center>
                        </div>
                    </div>{" "}
                    <div className="col">
                        <div className="exam-container  ">
                        <center>
                            {" "}
                            <h1>{businessdata.stats?.total_number_of_users_yet_practised}</h1>
                            <h6>Total number of users who are yet to practice</h6>
                        </center>
                        </div>
                    </div>{" "}
                </div>

            </div>
            <InviteModal />
        </>
    );
}
