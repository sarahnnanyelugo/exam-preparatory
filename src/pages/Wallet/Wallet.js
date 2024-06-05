import React, { useContext, useEffect, useState } from "react";
import "./wallet.scss";
import { Navbar } from "../../components/Navbar/Navbar";
import { Activity } from "./Activity";
import Pagination from "../../components/Pagination/Pagination";
// import api from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import {
  getWalletActivity,
  getWalletBalance,
} from "../../store/actions/walletActions";
import { useDispatch, useSelector } from "react-redux";
import { setActiveView } from "../../store/slices/walletActivitySlice";
import { ErrorView } from "../Helpers/errorView";
import { WalletModal } from "./TopUpModal/WalletModal";

export const Wallet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(AuthContext);
  const { activeView, balance, activity } = useSelector(
    (state) => state.wallet
  );
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
    dispatch(getWalletActivity({ user, pageSize, currentPage, activeView }));
    // console.log("i am called here after processing",currentPage)
  };
  const handleGotoLastPage = (page) => {
    setCurrentPage(page);
  };

  const handleTabChange = () => {
    if (activeView === "Credit") dispatch(setActiveView("Debit"));
    if (activeView === "Debit") dispatch(setActiveView("Credit"));
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getWalletActivity({ user, pageSize, currentPage, activeView }));
  }, [currentPage, activeView, pageSize, user]);

  return (
    <>
      <Navbar />
      <div
        className="col-md-10 offset-md-1 wallet-page "
        style={{ marginTop: "60px" }}
      >
        <div className="d-flex">
          <h6 style={{ flexGrow: "1" }}>Wallet</h6>
          <small>200 Naira = 200 units</small>
        </div>
        <div className="balance-sheet">
          <div className="flexy flexyM">
            <div style={{ flexGrow: 1 }}>
              <h6>Unit balance</h6>
              <h1>฿ {balance}</h1>
            </div>
            <div>
              {" "}
              <WalletModal reset={handleRefreshPage} />
              {/* <TopUpModal updateBal={getTransactions} /> */}
            </div>
          </div>
        </div>
        <div className="analysis-tab ">
          {" "}
          <div className="tabs ">
            <button
              className={`tab ${activeView === "Credit" ? "active2" : ""}`}
              onClick={handleTabChange}
            >
              Transactions
            </button>
            <button
              className={`tab ${activeView === "Debit" ? "active2" : ""}`}
              onClick={handleTabChange}
              style={{ marginLeft: "20px" }}
            >
              Activity
            </button>
          </div>
          <div className="panels" style={{ position: "relative" }}>
            <div className={`panel active2`}>
              <div className="row ">
                {activity?.data?.map((data, index) => (
                  <Activity key={index} data={data} active={activeView} />
                ))}
              </div>
            </div>
            {activity.data && (
              <Pagination
                itemsCount={activity?.pagination?.totalItems}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onGotoLastPage={handleGotoLastPage}
                onGotoFirstPage={handleGotoFirstPage}
                currentPage={currentPage}
              />
            )}
            {(!activity.data || !activity.data.length) && <ErrorView />}
          </div>
        </div>
      </div>
    </>
  );
};
