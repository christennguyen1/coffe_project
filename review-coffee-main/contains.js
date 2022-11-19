export const STAR_KEY_PREFIX = "star-";

export const LOGIN_PAGE = "login-page";
export const REGISTER_PAGE = "register-page";
export const FIRSTNAME_ERROR_ID = "firstname-error";
export const LASTNAME_ERROR_ID = "lastname-error";
export const EMAIL_ERROR_ID = "email-error";
export const PASSWORD_ERROR_ID = "password-error";
export const CONFIRMPASSWORD_ERROR_ID = "confirmpassword-error";
export const REGISTER_SUCCESS_ID = "register-success";
export const LOGIN_ERROR_ID = "login-error";
export const LOGIN_SUCCESS_ID = "login-success";
export const USER_KEY = "user";

export function setDataToLocalStorage(key, data) {
  const newData = JSON.stringify(data);
  localStorage.setItem(key, newData);
}

export function getDataFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}
