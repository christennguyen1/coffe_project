const LOGIN_PAGE = "login-page";
const REGISTER_PAGE = "register-page";
const FIRSTNAME_ERROR_ID = "firstname-error";
const LASTNAME_ERROR_ID = "lastname-error";
const EMAIL_ERROR_ID = "email-error";
const PASSWORD_ERROR_ID = "password-error";
const CONFIRMPASSWORD_ERROR_ID = "confirmpassword-error";
const REGISTER_SUCCESS_ID = "register-success";
const LOGIN_ERROR_ID = "login-error";
const LOGIN_SUCCESS_ID = "login-success";
const USER_KEY = "user";

window.onload = function () {
  const page = location.pathname.includes(LOGIN_PAGE)
    ? LOGIN_PAGE
    : REGISTER_PAGE;

  switch (page) {
    case LOGIN_PAGE: {
      const formLogin = document.getElementById("form-login");
      formLogin.onsubmit = handleFormLoginSubmit;

      function handleFormLoginSubmit(e) {
        e.preventDefault();

        const loginInfo = {
          email: formLogin.email.value,
          password: formLogin.password.value,
        };

        const validateResult = [
          validate(
            loginInfo.email && loginInfo.email.includes("@"),
            EMAIL_ERROR_ID,
            "Invalid email address"
          ),
          validate(
            loginInfo.password.length > 5,
            PASSWORD_ERROR_ID,
            "Invalid password"
          ),
        ];

        if (!checkAllPassed(validateResult)) return;

        const user = getDataFromLocalStorage(USER_KEY);
        if (!user) {
          setText(LOGIN_ERROR_ID, "Please correct the email address");
          return;
        }

        if (user.password !== loginInfo.password) {
          setText(LOGIN_ERROR_ID, "Oops! Wrong password");
          return;
        }

        setText(LOGIN_ERROR_ID, "");
        setText(LOGIN_SUCCESS_ID, "Login successfully");
        setTimeout(() => {
          location.href = "/Trang chu/homePage.html";
        }, 2000);
      }

      break;
    }
    case REGISTER_PAGE: {
      const formRegister = document.getElementById("form-register");
      formRegister.onsubmit = handleFormRegisterSubmit;

      function handleFormRegisterSubmit(e) {
        e.preventDefault();

        const registerInfo = {
          firstname: formRegister.firstname.value,
          lastname: formRegister.lastname.value,
          email: formRegister.email.value,
          password: formRegister.password.value,
          confirmPassword: formRegister.confirmPassword.value,
        };

        const validateResult = [
          validate(
            registerInfo.firstname,
            FIRSTNAME_ERROR_ID,
            "Invalid firstname"
          ),
          validate(
            registerInfo.lastname,
            LASTNAME_ERROR_ID,
            "Invalid lastname"
          ),
          validate(
            registerInfo.email && registerInfo.email.includes("@"),
            EMAIL_ERROR_ID,
            "Invalid email"
          ),
          validate(
            registerInfo.password && registerInfo.password.length > 5,
            PASSWORD_ERROR_ID,
            "Password must be at least 6 characters"
          ),
          validate(
            registerInfo.confirmPassword === registerInfo.password,
            CONFIRMPASSWORD_ERROR_ID,
            "Invalid confirm password"
          ),
        ];

        const existedUser = getDataFromLocalStorage(USER_KEY);

        if (checkAllPassed(validateResult)) {
          if (existedUser && registerInfo.email === existedUser.email) {
            setText(EMAIL_ERROR_ID, "Email is existed");
            return;
          }

          const { confirmPassword, ...rest } = registerInfo;
          setDataToLocalStorage(USER_KEY, { ...rest });
          setText(REGISTER_SUCCESS_ID, "Register successfully");

          setTimeout(() => {
            location.href = "/login-page.html";
          }, 2000);
        }
      }

      break;
    }
  }
};

function setText(id, text) {
  document.getElementById(id).innerText = text;
}

function validate(condition, idErrorTag, messageError) {
  if (condition) {
    setText(idErrorTag, "");
    return true;
  }

  setText(idErrorTag, messageError);
  return false;
}

function checkAllPassed(formInfo) {
  for (const item of formInfo) {
    if (item === false) return false;
  }
  return true;
}

function setDataToLocalStorage(key, data) {
  const newData = JSON.stringify(data);
  localStorage.setItem(key, newData);
}

function getDataFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}
