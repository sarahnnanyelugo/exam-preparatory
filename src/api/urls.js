export const LOGIN_URL = "/login";
export const PASSWORD_RESET = "/login/reset";
export const PASSWORD_VERIFY_RESET = "/login/reset/user";
export const BUY_VOUCHER = "/charge/voucher";
export const VERIFY_PAYMENT_BUY_URL = "/charge/voucher/verify";
export const VERIFY_EMAIL = "/login/verify/user";
export const VERIFY_BUSINESS_EMAIL = "/login/verify/business";
export const CHARGE_REQUEST_URL = "/charge/request";
export const FUND_ACCOUNT_URL = "/wallet/fund";
export const REGISTER_URL = "/user/register";
export const REGISTER_PARTNER_URL = "/business/register";
export const SEND_INVITE_URL = "/business/invite";
export const SEND_UNINVITE_URL = "/business/uninvite";
export const VERIFY_INVITE_URL = "/business/invite/verify";
export const VERIFY_PAYMENT_URL = "/charge/verify";
export const GET_PASTQUESTIONS_URL = "/pastquestions";
export const GET_ANALYSIS_URL = "/pastquestions/analysis/index";
export const GET_FLAGGED_ANALYSIS_URL = "/pastquestions/flagged/analysis/index";
export const TOGGLE_FLAGGED_ANALYSIS_URL = "/pastquestions/flagged/analysis/toggle";
export const GET_ANALYSIS_DATA_URL = "/pastquestions/analysis/data";
export const GET_TEST_VERIFY_URL = "/pastquestions/verify";
export const GET_COUNTRIES_URL = "/pastquestions/countries/index";
export const SEND_COUNTRIES_URL = "/pastquestions/countries/set";
export const MARK_ATTEMPTED_URL = "/pastquestions/attempt";
export const VERIFY_GOOGLE_USER = "/login/verifyGoogleAuth";
export const DEFAULT_ERROR = "Service Unavailable";
export const SUBMIT_ERROR = [
    'Test Duration Elapsed',
];
export const GET_USERS_ADMIN_URL = "/admin/users";
export const GET_ADMIN_URL = "/admin";
export const GET_BUSINESS_URL = "/business";
export const GET_TOPUP_BUSINESS_URL = "/business/topup/users";
export const GET_TOPUP_ACTIVITY_BUSINESS_URL = "/business/topup/activity";
export const UNAUTHENTICATED_URLs = [
    "/login",
    "/buy-voucher",
    "/password-reset",
    "/login/verify/user",
    "/login/verify/business",
    "/login/reset/user",
    "/authenticate",
    "/authenticate-business",
    "/partnership",
    "/unauthorized",
    "/signup/invite/:id",
    "/login/invite/:id",
];
