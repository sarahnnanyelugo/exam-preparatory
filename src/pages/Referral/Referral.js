import React, { useContext, useEffect, useState } from "react";
import "./referral.scss";
import { Navbar } from "../../components/Navbar/Navbar";
import Pagination from "../../components/Pagination/Pagination";
// import api from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import {
  getReferralActivity,
  getWalletBalance,
} from "../../store/actions/walletActions";
import { useDispatch, useSelector } from "react-redux";
import { ErrorView } from "../Helpers/errorView";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { Loading } from "../../components/loading";
import { Activity } from "../Wallet/Activity";
import { ActivityReferral } from "./ActivityReferral";
import Icon from "../../assets/images/profile.svg";

import Icon1 from "../../assets/images/blue-fb.svg";
import Icon2 from "../../assets/images/x.svg";
import Icon3 from "../../assets/images/ig.svg";
import Icon4 from "../../assets/images/whatsapp2.svg";
import Icon5 from "../../assets/images/link.svg";
import Icon6 from "../../assets/images/friend.svg";
import Icon7 from "../../assets/images/reward.svg";
import { Profile } from "./Profile";
import { CompletedProfile } from "./CompletedProfile";
import { Link } from "react-router-dom";
import { ExamHistory } from "./ExamHistory";

export const Referral = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(AuthContext);
  const {
    referralUrl,
    totalEarned,
    bonusData,
    doneLoading,
    currentUnit,
    freeUnit,
  } = useSelector((state) => state.wallet);
  const [startTestrefmain, setStartTestrefmain] = useState(false);

  const dispatch = useDispatch();
  const pageSize = 10;
  useEffect(() => {
    dispatch(getWalletBalance(user));
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGotoFirstPage = () => {
    setCurrentPage(1);
  };
  const handleRefreshPage = () => {
    // dispatch(getWalletActivity({ user, pageSize, currentPage, activeView }));
  };
  const handleGotoLastPage = (page) => {
    setCurrentPage(page);
  };

  const handleTabChange = () => {
    // if (activeView === "Credit") dispatch(setActiveView("Debit"));
    // if (activeView === "Debit") dispatch(setActiveView("Credit"));
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getReferralActivity({ user, pageSize, currentPage }));
  }, [currentPage, pageSize, user]);

  useEffect(() => {
    if (doneLoading) {
      setStartTestrefmain(true);
    }
  }, [doneLoading]);

  function copyInviteCode() {
    navigator.clipboard.writeText(
      `To join educare Exam portal, click this link: ${referralUrl}`
    );
    toast.success("Copied!");
  }
  ////////////////////////////////////////////////////////////////////

  const [isVisible, setIsVisible] = useState(false);
  const [referralCode, setReferralCode] = useState("https/ufhhiru444jfj");

  const [tipContent, setTipContent] = useState("Copy");

  const handleCopyClick = () => {
    // Create a temporary text area element to hold the text to be copied
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = referralCode;

    document.body.appendChild(tempTextArea);

    tempTextArea.select();

    document.execCommand("copy");

    document.body.removeChild(tempTextArea);
    setTipContent("COPIED!");
  };
  const handleShareFacebookClick = () => {
    // sample URL for sharing on Facebook
    const facebookShareUrl = `https://www.facebook.com/ukoha.sarah?mibextid=ZbWKwL=${encodeURIComponent(
      referralCode
    )}`;
    window.open(facebookShareUrl, "_blank");
  };
  const handleShareWhatsAppClick = () => {
    // sample WhatsApp share link
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      referralCode
    )}`;

    // Open the WhatsApp share link in a new window
    window.open(shareUrl, "_blank");
  };

  const handleShareInstagramClick = () => {
    // sample  instagram share link
    const shareUrl = `https://www.instagram.com/ukohasarah/=${encodeURIComponent(
      referralCode
    )}`;

    // Open the instagram share link in a new window
    window.open(shareUrl, "_blank");
  };
  const handleShareTwitterClick = () => {
    // sample  Twitter share link
    const shareUrl = `https://www.twitter.com/ukohasarah/=${encodeURIComponent(
      referralCode
    )}`;

    // Open the Twitter share link in a new window
    window.open(shareUrl, "_blank");
  };
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const [activeIndex2, setActiveIndex2] = useState(1);
  const handleClick = (index) => setActiveIndex2(index);

  const checkActive = (index, className) =>
    activeIndex2 === index ? className : "";
  const [showFirstContent, setShowFirstContent] = useState(true);

  const toggleContent = () => {
    setShowFirstContent(!showFirstContent);
  };
  return (
    // <>
    //   <Navbar />
    //   {startTestrefmain && (
    //   <div className="col-md-10 offset-md-1 wallet-page" style={{ marginTop: "60px" }}>
    //         <div className="flexy flexyM">
    //           <h6 style={{ flexGrow: "1" }}>Get up to {currentUnit} units for referrals</h6>
    //         </div>
    //         <div className="balance-sheet">
    //           <div className="flexy flexyM">
    //             <div style={{ flexGrow: 8 }}>
    //               <h6>Total bonus unit earned</h6>
    //               <h1>฿ {totalEarned}</h1>
    //             </div>
    //           </div>
    //           <div className="flexy flexyM">
    //             <div>
    //               Get rewarded for sharing the best exams platform with your network. Earn <b>{currentUnit}</b> units for every friend who activates their account and your friend will get <b>{freeUnit}</b> units too. They can sign up for the portal with your link and you will get your bonus units the minute they activate.
    //             </div>
    //           </div>
    //           <div className="flexy flexyM">

    //           </div>
    //         </div>
    //         <div className="col-md-8 mt-3 mb-5">
    //           <>
    //             <Form.Label className="invite-header" htmlFor="sid">Copy your referral link</Form.Label>
    //             <div className="invite-col">
    //               <Form.Control
    //                   type="text"
    //                   id="sid"
    //                   name="url"
    //                   disabled={true}
    //                   value={referralUrl}
    //               />
    //               <button onClick={copyInviteCode} className="copy-cls">Copy</button>
    //             </div>
    //           </>
    //         </div>

    //         <div className="analysis-tab ">
    //           {" "}
    //           <div className="tabs ">
    //             <button className={`tab "active2"`} onClick={handleTabChange}>
    //               From referrals
    //             </button>
    //           </div>
    //           <div className="panels" style={{ position: "relative" }}>
    //             <div className={`panel active2`}>
    //               <div className="row ">
    //                 {bonusData?.data?.map((data, index) => (
    //                     <ActivityReferral key={index} data={data}  />
    //                 ))}
    //               </div>
    //             </div>
    //             {bonusData?.data && (
    //                 <Pagination
    //                     itemsCount={bonusData?.pagination?.totalItems}
    //                     pageSize={pageSize}
    //                     onPageChange={handlePageChange}
    //                     onGotoLastPage={handleGotoLastPage}
    //                     onGotoFirstPage={handleGotoFirstPage}
    //                     currentPage={currentPage}
    //                 />
    //             )}
    //             {(!bonusData.data || !bonusData.data.length) && (<ErrorView msg={"Track your referrals"} />)}
    //           </div>
    //         </div>
    //       </div>
    //   )}
    //   {!startTestrefmain && (<Loading size={50} style={{ padding: '64px 32px', minHeight: '50vh' }} />)}
    // </>

    <>
      <div>
        <Navbar />
      </div>
      <div className="d-md-flex col-md-10 offset-md-1 wallet-page">
        {" "}
        <div className=" col-md-6 pdr">
          {" "}
          <div className="col-md-12 ">
            <h5>Refer and Earn</h5>
            <small>Get 100 units for each person you refer</small>
            <hr />
            <br />
            <br />
            <h6>Share your unique referral link</h6>
            <div className="flexy flexyM">
              <input type="text" value={referralCode} readOnly />
              <button className="copy" onClick={handleCopyClick}>
                {tipContent}
              </button>
            </div>
            <br />
            <div className="row row-cols-4 row-cols-lg-4 g-2 g-lg-2 mt4">
              <div
                className="col"
                onClick={handleShareFacebookClick}
                title="share on facebook"
              >
                <div className="share-options">
                  {" "}
                  <center>
                    {" "}
                    <img src={Icon1} alt="icon" />
                    <h6>Facebook</h6>
                  </center>
                </div>
              </div>{" "}
              <div
                className="col"
                onClick={handleShareTwitterClick}
                title="share on X"
              >
                <div className="share-options">
                  {" "}
                  <center>
                    {" "}
                    <img src={Icon2} alt="icon" />
                    <h6>X</h6>
                  </center>
                </div>
              </div>{" "}
              <div
                className="col"
                onClick={handleShareInstagramClick}
                title="share on instagram"
              >
                <div className="share-options">
                  {" "}
                  <center>
                    {" "}
                    <img src={Icon3} alt="icon" />
                    <h6>Instagram</h6>
                  </center>
                </div>
              </div>{" "}
              <div
                className="col"
                onClick={handleShareWhatsAppClick}
                title="share on whatsapp"
              >
                <div className="share-options">
                  <center>
                    {" "}
                    <img src={Icon4} alt="icon" />
                    <h6>Whatsapp</h6>
                  </center>
                </div>
              </div>
            </div>
            <div className="wallet-page2">
              <div className="flexy flexyM">
                <img src={Icon5} alt="icon" />
                <div>
                  <h6>Share your referral link</h6>
                  <small>
                    Invite your friends to join using your referral link.
                  </small>
                </div>
              </div>{" "}
              <hr />
              <div className="flexy flexyM">
                <img src={Icon6} alt="icon" />
                <div>
                  <h6>Your friend joins</h6>
                  <small>
                    When you friend joins through we become <br />
                    part of their success.
                  </small>
                </div>
              </div>{" "}
              <hr />
              <div className="flexy flexyM">
                <img src={Icon7} alt="icon" />
                <div>
                  <h6>You both earn a reward</h6>
                  <small>You and your friend both earn 100 units each.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 pdl">
          {showFirstContent ? (
            <div>
              <h5 className="exam-heading">Referral History</h5>
              <hr />
              <div className="col-md-12 unit-div d-flex">
                <div className="col-md-6 col-6 d-flex">
                  <img src={Icon5} height="27px" width="27px" />
                  <div>
                    {" "}
                    <h6>Total units</h6>
                    <h2>500</h2>
                  </div>
                </div>{" "}
                <div className="col-md-6 col-6 d-flex">
                  <img src={Icon5} height="27px" width="27px" />
                  <div>
                    {" "}
                    <h6>Total invites</h6>
                    <h2>5</h2>
                  </div>
                </div>
              </div>
              <div className="transaction-page">
                <div className="tabs">
                  <button
                    className={`tab ${checkActive(1, "active2")}`}
                    onClick={() => handleClick(1)}
                  >
                    Invited
                  </button>
                  <button
                    className={`tab ${checkActive(2, "active2")}`}
                    onClick={() => handleClick(2)}
                  >
                    Completed
                  </button>
                </div>
                <hr />
                <div className="panels">
                  <div className={`panel ${checkActive(1, "active2")}`}>
                    <Profile
                      user="Chigioke Onuamaka"
                      date="Mar 24th, 2024 . "
                      time="10:02:58"
                    />{" "}
                    <br />
                    <Profile
                      user="Chigioke Onuamaka"
                      date="Mar 24th, 2024 . "
                      time="10:02:58"
                    />{" "}
                    <br />
                    <Profile
                      user="Chigioke Onuamaka"
                      date="Mar 24th, 2024 . "
                      time="10:02:58"
                    />{" "}
                    <br />
                    <Profile
                      user="Chigioke Onuamaka"
                      date="Mar 24th, 2024 . "
                      time="10:02:58"
                    />
                  </div>
                  <div className={`panel ${checkActive(2, "active2")}`}>
                    <div className="profile-div d-flex">
                      <div className="d-flex" style={{ flexGrow: 1 }}>
                        {" "}
                        <img src={Icon} width="23px" />
                        <div>
                          <h6>Chigioke Onuamaka</h6>
                          <small>Mar 24th, 2024 . 10:02:58</small>
                        </div>
                      </div>

                      <div>
                        <p className="offset-6">100+</p>

                        <Link className="view-btn" onClick={toggleContent}>
                          View details
                        </Link>
                      </div>
                    </div>
                    <br />{" "}
                    <div className="profile-div d-flex">
                      <div className="d-flex" style={{ flexGrow: 1 }}>
                        {" "}
                        <img src={Icon} width="23px" />
                        <div>
                          <h6>Chigioke Onuamaka</h6>
                          <small>Mar 24th, 2024 . 10:02:58</small>
                        </div>
                      </div>

                      <div>
                        <p className="offset-6">100+</p>

                        <Link className="view-btn" onClick={toggleContent}>
                          View details
                        </Link>
                      </div>
                    </div>
                    <br />{" "}
                    {/* <CompletedProfile
                      user="Chigioke Onuamaka"
                      date="Mar 24th, 2024 . "
                      time="10:02:58"
                    />{" "} */}
                    <div className="profile-div d-flex">
                      <div className="d-flex" style={{ flexGrow: 1 }}>
                        {" "}
                        <img src={Icon} width="23px" />
                        <div>
                          <h6>Chigioke Onuamaka</h6>
                          <small>Mar 24th, 2024 . 10:02:58</small>
                        </div>
                      </div>

                      <div>
                        <p className="offset-6">100+</p>

                        <Link className="view-btn" onClick={toggleContent}>
                          View details
                        </Link>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="second-content">
              <button onClick={toggleContent} className="exam-heading">
                Back
              </button>
              <hr />
              <div className="d-flex" style={{ flexGrow: 1 }}>
                {" "}
                <img src={Icon} width="64px" />
                <div>
                  <h6>Chigioke Onuamaka</h6>
                  <small>Mar 24th, 2024 . 10:02:58</small>
                </div>
              </div>
              <hr />
              <h5 className="exam-heading">Exams History</h5>
              <ExamHistory
                user="Chigioke Onuamaka"
                date="Mar 24th, 2024 . "
                time="10:02:58"
                score="30/50"
                colo="#2F67D8"
                unitAmount="200"
                exam="2010 JAMB Chemistry practice"
              />
              <br />
              <ExamHistory
                user="Chigioke Onuamaka"
                date="Mar 24th, 2024 . "
                time="10:02:58"
                score="25/50"
                colo="#D52143"
                unitAmount="400"
                exam="2011 WAEC Physics practice"
              />{" "}
              <br />
              <ExamHistory
                user="Chigioke Onuamaka"
                date="Mar 24th, 2024 . "
                time="10:02:58"
                score="40/50"
                colo="#2F67D8"
                unitAmount="400"
                exam="2011 WAEC Biology practice"
              />
              <br />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
