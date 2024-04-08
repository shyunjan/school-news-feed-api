const RESULT_CODE = (<T extends { [key: string]: number }>(arg: T): T => arg)({
  OK: 0, // 정상

  /* COMMON 에러 - 100XX */
  INVALID_PARAMETER: 10001,
  INVALID_REQUEST_DATE: 10002,
  UNDEFINED_PAGE: 10011,

  /* AUTH 관련 에러 - 102XX */
  AUTH_NEED_LOGIN: 10201,
  AUTH_NEED_ADMIN: 10202,
  AUTH_WRONG_ID_PW: 10205,
  AUTH_UNAPPROVED_ACCOUNT: 10206,
  AUTH_SUSPENDED_ACCOUNT: 10207,
  AUTH_WITHDRAWN_ACCOUNT: 10212,
  AUTH_INVALID_USER_ID: 10208,
  AUTH_INVALID_VERIFICATION_CODE: 10209,
  AUTH_FAILED_TO_REQUEST_TOKEN: 10210,
  AUTH_FAILED_TO_VERIFY_TOKEN: 10210,
  AUTH_NEW_PASSWORD_IS_SAME_WITH_CURRENT_PASSWORD: 10211,
  AUTH_INVALID_USER_PASSWORD: 10212,
  DUPLICATED_PHONE: 10213,
  NOT_FOUND_USER: 10214,
  NOT_FOUND_ADMIN: 10215,
  NOT_PERMISSION: 10215,
  DUPLICATED_ADMIN_ID: 10216,
  AUTH_NEED_ACCESS_ID: 10217,
  BODY_VALIDATION_ERROR: 10218,
  AUTH_OTHER_LOGGED_IN: 10219,
  AUTH_NEED_NAME: 12220,
  AUTH_NEED_PASSWORD: 12221,
  AUTH_NEED_ADMIN_ID: 12222,

  /* NEWS 관련 에러 - 104XX */
  FAIL_TO_CREATE_NEWS: 10401,

  VALIDATION_ERROR: 99000, // Request Validation 오류
  UNKNOWN_ERROR: 99999, // 알 수 없는 오류
});

export default RESULT_CODE;
