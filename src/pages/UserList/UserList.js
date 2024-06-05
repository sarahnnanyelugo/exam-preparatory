import React, {useContext, useEffect, useRef, useState} from "react";
import "./user-list.scss";
import AuthContext from "../../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { GhostExamListLoader } from "../../components/Loaders/GhostExamListLoader";
import { useMediaQuery } from 'react-responsive';
import {Users} from "../../components/Admins/Users";
import {getAdminUsers} from "../../store/actions/adminActions";
import {UserFilter} from "./UserFilter";

export const UserList = ({handle,isBusiness}) => {
  const useDesktopMediaQuery = () =>
      useMediaQuery({ query: '(min-width: 769px)' })

  const useTabletAndBelowMediaQuery = () =>
      useMediaQuery({ query: '(max-width: 768px)' })

  const Desktop = ({ children }) => {
    const isDesktop = useDesktopMediaQuery()
    return isDesktop ? children : null;
  }

  const TabletAndBelow = ({ children }) => {
    const isTabletAndBelow = useTabletAndBelowMediaQuery()
    return isTabletAndBelow ? children : null
  }
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sort, setSort] = useState("Newest");
  const { user, isLoggedIn } = useContext(AuthContext);
  const { balance } = useSelector((state) => state.wallet);
  const { adminsdata } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const sortData = ["Newest", "Oldest"];


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleSetShow = () => setShow(true);
  const [filterData, setFilterData] = useState({ type: "", subject: "", year: "" });

  const handleGoToNext = (page) => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleGoToPrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleResetCurrentPage = () => {
    setCurrentPage((prev) => 1);
  };

  useEffect(() => {
    const data = { pageSize, currentPage, sort };
    handleApiRequest(data);
  }, [pageSize, currentPage, sort]);





  const handleApiRequest = (data) => {
    const filters = JSON.parse(localStorage.getItem(`filterUsers`) || "{}");
    if (filters.typeFilter && filters.typeFilter.length > 0) {
      data.search = filters.typeFilter;
    }
    if(data.isSearch){
      handleResetCurrentPage();
      data.currentPage = 1;
    }
    dispatch(getAdminUsers(data));
  }
  const handleSearch = (flag) => {
    const data = { pageSize, currentPage, sort };
    data.isSearch = true;
    handleApiRequest(data);
    if(flag){
      handleClose();
    }
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      <Desktop>
        <div className="home-div col-md-10 offset-md-1 mt5">
          <UserFilter handleClose={handleClose} show={show} Desktop={Desktop} TabletAndBelow={TabletAndBelow} handleSearch={handleSearch} />
          <div className="flexy sort flexyM">
            <h3>User List</h3>
            <div className="flexy flexyM">
              <h6>Sort by:</h6>
              <select value={sort} onChange={handleSort}>
                {sortData.map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                ))}
              </select>
            </div>
          </div>
          {adminsdata.loading &&
          Array(pageSize)
              .fill()
              .map((item,index) => {
                return  (<React.Fragment key={index}>
                  <GhostExamListLoader>
                  </GhostExamListLoader>
                </React.Fragment>)
              })}
          {!adminsdata.loading && adminsdata.users && (
              <Users
                  globalFilter={filterData}
                  onGlobalFilterChange={handleSearch}
                  data={adminsdata.users}
                  meta={adminsdata.usersMeta}
                  onGotoNextPage={handleGoToNext}
                  onGotoPrevPage={handleGoToPrev}
                  currentPage={currentPage}
                  handle={handle}
                  isBusiness={isBusiness}
              />
          )}
        </div>
      </Desktop>

      {/*<TabletAndBelow>*/}
      {/*  <div className="mobile-ms">*/}
      {/*    <div className="flexy sort flexyM unit">*/}
      {/*      <h3>User List</h3>*/}
      {/*      <Link to={"/wallet"}>*/}
      {/*        <button>Units balance: {balance}</button>*/}
      {/*      </Link>*/}
      {/*    </div>*/}
      {/*    {adminsdata.loading &&*/}
      {/*    Array(pageSize)*/}
      {/*        .fill()*/}
      {/*        .map((item,index) => {*/}
      {/*          return  (<React.Fragment key={index}>*/}
      {/*            <GhostExamListMobileLoader>*/}
      {/*            </GhostExamListMobileLoader>*/}
      {/*          </React.Fragment>)*/}
      {/*        })}*/}
      {/*    {!adminsdata.loading && !!adminsdata.pastQuestions?.length && (*/}
      {/*        <ExamCards*/}
      {/*            globalFilter={filterData}*/}
      {/*            onGlobalFilterChange={handleSearch}*/}
      {/*            data={adminsdata.pastQuestions}*/}
      {/*            meta={adminsdata.questionsMeta}*/}
      {/*            handleGotoNext={handleGoToNext}*/}
      {/*            handleGotoPrevious={handleGoToPrev}*/}
      {/*            currentPage={currentPage}*/}
      {/*            handle={handle}*/}
      {/*        />*/}
      {/*    )}*/}
      {/*    {!adminsdata.loading && !!!adminsdata.pastQuestions?.length && (*/}
      {/*        <ExamCardEmpty*/}
      {/*        />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  <ExamFilter handleClose={handleClose} show={show} Desktop={Desktop} TabletAndBelow={TabletAndBelow} handleSearch={handleSearch} />*/}
      {/*  <div>*/}
      {/*    {!!!show &&  <NavbarFooter setShow={handleSetShow} handleSort={handleSort} sort={sort} sortData={sortData}  />}*/}
      {/*    </div>*/}
      {/*</TabletAndBelow>*/}
    </>
  );
};
