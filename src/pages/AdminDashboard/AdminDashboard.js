import React, {useContext, useEffect, useRef, useState} from "react";
import "./AdminDashboard.scss"
import {useDispatch, useSelector} from "react-redux";
import {getAdminDashboard} from "../../store/actions/adminActions";

export const AdminDashboard = ({handle}) => {
    const dispatch = useDispatch();
    const { adminsdata } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAdminDashboard({ }));
    }, []);

    return (
        <>
            <div className="col-md-10 offset-md-1 mt6">
                <center>
                    <h3 style={{ fontFamily: "   font-family: rebondG-Bold" }}>
                       User Overview
                    </h3>
                </center>
                <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
                    <div className="col">
                        <div className="exam-container  ">
                        <center>
                            {" "}
                            <h1>{adminsdata.stats?.total_number_of_registered_users}</h1>
                            <h6>Total number of registered users</h6>
                        </center>
                        </div>
                    </div>{" "}
                    <div className="col">
                        <div className="exam-container  ">
                        <center>
                            {" "}
                            <h1>{adminsdata.stats?.total_number_of_questions_practised}</h1>
                            <h6>Total number of exams practised</h6>
                        </center>
                        </div>
                    </div>{" "}
                    <div className="col">
                        <div className="exam-container  ">
                            <center>
                                {" "}
                                <h1>{adminsdata.stats?.total_number_of_questions_finished}</h1>
                                <h6>Total number of exams completed</h6>
                            </center>
                        </div>
                    </div>{" "}
                    <div className="col">
                        <div className="exam-container  ">
                        <center>
                            {" "}
                            <h1>{adminsdata.stats?.total_number_of_users_activated}</h1>
                            <h6>Total number of activated users</h6>
                        </center>
                        </div>
                    </div>{" "}
                    <div className="col">
                        <div className="exam-container  ">
                        <center>
                            {" "}
                            <h1>{adminsdata.stats?.total_number_of_users_practised}</h1>
                            <h6>Total number of users who have practised</h6>
                        </center>
                        </div>
                    </div>{" "}
                    <div className="col">
                        <div className="exam-container  ">
                        <center>
                            {" "}
                            <h1>{adminsdata.stats?.total_number_of_users_yet_practised}</h1>
                            <h6>Total number of users who are yet to practised</h6>
                        </center>
                        </div>
                    </div>{" "}
                    <div className="col">
                        <div className="exam-container  ">
                            <center>
                                {" "}
                                <h1>{adminsdata.stats?.total_number_of_referred_users}</h1>
                                <h6>Total number of users that registered through referral</h6>
                            </center>
                        </div>
                    </div>
                    {" "}
                </div>
            </div>
        </>
    );
};
