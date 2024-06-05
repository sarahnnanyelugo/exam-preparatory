import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { AuthenticationPage } from "./pages/AuthenticationPage/AuthenticationPage";
import { ExamList } from "./pages/ExamList/ExamList";
import ScrollToTop from "./components/scrollToTop";
import { TestInstructions } from "./pages/TestInstructions/TestInstructions";
import { Wallet } from "./pages/Wallet/Wallet";
import { QuestionsDashboard } from "./pages/Question/QuestionsDashboard";
import { SummaryPage } from "./pages/SummaryPage/SummaryPage";
import { ReviewPage } from "./pages/ReviewPage/ReviewPage";
import { TestAnalysis } from "./pages/TestAnalysis/TestAnalysis";
import { AnalysisDashboard } from "./pages/AnalysisDashboard/AnalysisDashboard";
import { Home } from "./pages/Home/Home";
import { AuthPage } from "./pages/LoginPage/LoginPage";
import { AnswerSummary } from "./pages/AnalysisDashboard/AnswerSummary";
import { MyAccount } from "./pages/MyAccount/MyAccount";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import theme from "./components/theme";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import useAuth from "./hooks/useAuth";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { UserList } from "./pages/UserList/UserList";
import { AdminDashboard } from "./pages/AdminDashboard/AdminDashboard";
import { BusinessDashboard } from "./pages/BusinessDashboard/BusinessDashboard";
import { AuthenticateBusinessPage } from "./pages/AuthenticationPage/AuthenticateBusinessPage";
import { Partner } from "./pages/Partner/Partner";
import { Referral } from "./pages/Referral/Referral";
import { FlaggedQuestions } from "./pages/FlaggedQuestions/FlaggedQuestions";
import { BusinessTopup } from "./pages/BusinessTopup/BusinessTopup";
import SignUpCompleteForm from "./components/Form/SignUpCompleteForm";
import { MainNews } from "./pages/NewsPage/MainNews/MainNews";
import { NewsPage } from "./pages/NewsPage/NewsPage";

const ROLES = {
  ADMINAREA: 2000,
  LUSERS: 2001,
  LANALYSIS: 2002,
  BUSINESSAREA: 3000,
  BUSERS: 3001,
  BANALYSIS: 3002,
};

function App() {
  const handle = useFullScreenHandle();
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) logout();
  }, [isLoggedIn]);

  return (
    <>
      <FullScreen handle={handle}>
        <ThemeProvider theme={theme}>
          <ScrollToTop />
          <ToastContainer />
          <Routes>
            <Route path="login" element={<AuthPage isLoggin={true} />} />
            <Route path="buy-voucher" element={<AuthPage isVoucher={true} />} />
            <Route path="password-reset" element={<AuthPage />} />
            <Route
              path="login/verify/user"
              element={<AuthPage isVerify={true} />}
            />
            <Route
              path="login/verify/business"
              element={<AuthPage isVerifyBusiness={true} />}
            />
            <Route
              path="login/invite/:id"
              element={<AuthPage isInviteBusiness={true} />}
            />
            <Route
              path="signup/invite/:id"
              element={<AuthenticationPage isInvite={true} />}
            />
            <Route
              path="login/reset/user"
              element={<AuthPage isPassword={true} />}
            />
            <Route path="authenticate" element={<AuthenticationPage />} />
            <Route
              path="authenticate-business"
              element={<AuthenticateBusinessPage />}
            />
            <Route path="/partnership" element={<Partner />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            {isLoggedIn ? (
              <>
                {/*<Route path="/" element={<Home/>}/>*/}
                <Route path="/" element={<ExamList handle={handle} />} />{" "}
                <Route
                  path="/exam-list"
                  element={<ExamList handle={handle} />}
                />{" "}
                <Route
                  path="test-instructions/:id"
                  element={<TestInstructions handle={handle} />}
                />{" "}
                <Route
                  path="complete/profile/:id"
                  element={<SignUpCompleteForm handle={handle} />}
                />{" "}
                <Route
                  path="questions-dashboard/:id"
                  element={<QuestionsDashboard handle={handle} />}
                />
                <Route path="wallet" element={<Wallet />} />{" "}
                <Route path="test-analysis" element={<TestAnalysis />} />{" "}
                <Route path="summary-page/:id" element={<SummaryPage />} />{" "}
                <Route path="review-page" element={<ReviewPage />} />{" "}
                <Route
                  path="analysis-dashboard/:id"
                  element={<AnalysisDashboard />}
                />{" "}
                <Route path="my-account" element={<MyAccount />} />{" "}
                <Route
                  path="settings"
                  element={<MyAccount isBusiness={true} />}
                />{" "}
                <Route path="answer-summary" element={<AnswerSummary />} />
                <Route path="referrals" element={<Referral />} />
                <Route
                  element={<RequireAuth allowedRoles={[ROLES.ADMINAREA]} />}
                >
                  <Route path="admin/dashboard" element={<AdminDashboard />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.LUSERS]} />}>
                  <Route path="admin/users" element={<UserList />} />
                </Route>
                <Route
                  element={<RequireAuth allowedRoles={[ROLES.LANALYSIS]} />}
                >
                  <Route
                    path="admin/analysis"
                    element={<TestAnalysis isAdmin={true} />}
                  />{" "}
                </Route>
                <Route
                  element={<RequireAuth allowedRoles={[ROLES.LANALYSIS]} />}
                >
                  <Route
                    path="admin/flagged"
                    element={<FlaggedQuestions isAdmin={true} />}
                  />{" "}
                </Route>
                <Route
                  element={<RequireAuth allowedRoles={[ROLES.LANALYSIS]} />}
                >
                  <Route
                    path="admin/analysis-dashboard/:id"
                    element={<AnalysisDashboard isAdmin={true} />}
                  />{" "}
                </Route>
                <Route
                  element={
                    <RequireAuth
                      isBusiness={true}
                      allowedRoles={[ROLES.BUSINESSAREA]}
                    />
                  }
                >
                  <Route
                    path="business/dashboard"
                    element={<BusinessDashboard />}
                  />
                </Route>
                <Route
                  element={
                    <RequireAuth
                      isBusiness={true}
                      allowedRoles={[ROLES.BUSERS]}
                    />
                  }
                >
                  <Route
                    path="business/users"
                    element={<UserList isBusiness={true} />}
                  />
                </Route>
                <Route
                  element={
                    <RequireAuth
                      isBusiness={true}
                      allowedRoles={[ROLES.BANALYSIS]}
                    />
                  }
                >
                  <Route
                    path="business/analysis"
                    element={<TestAnalysis isBusiness={true} />}
                  />{" "}
                </Route>
                <Route
                  element={
                    <RequireAuth
                      isBusiness={true}
                      allowedRoles={[ROLES.BANALYSIS]}
                    />
                  }
                >
                  <Route
                    path="business/analysis-dashboard/:id"
                    element={<AnalysisDashboard isBusiness={true} />}
                  />{" "}
                </Route>
                <Route
                  element={
                    <RequireAuth
                      isBusiness={true}
                      allowedRoles={[ROLES.BUSINESSAREA]}
                    />
                  }
                >
                  <Route path="business/topup" element={<BusinessTopup />} />{" "}
                </Route>
                <Route path="/*" element={<AuthPage isLoggin={true} />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="news-page" element={<NewsPage />} />

                <Route path="main-news/:blog_id" element={<MainNews />} />
                <Route path="/*" element={<AuthPage isLoggin={true} />} />
              </>
            )}
          </Routes>
        </ThemeProvider>
      </FullScreen>
    </>
  );
}

export default App;
