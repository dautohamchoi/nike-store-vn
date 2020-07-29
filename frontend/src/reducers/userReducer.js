const { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } = require("../constants/userConstant");

function userSigninReducer(state = {}, action) {
  switch(action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true};
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload};
    default:
      return state;
  }
}

function userSignupReducer(state = {}, action) {
  switch(action.type) {
    case USER_SIGNUP_REQUEST:
      return { loadingSignup: true};
    case USER_SIGNUP_SUCCESS:
      return { loadingSignup: false, userInfoSignup: action.payload };
    case USER_SIGNUP_FAIL:
      return { loadingSignup: false, errorSignup: action.payload};
    default:
      return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch(action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true};
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload};
    default:
      return state;
  }
}

export {userSigninReducer , userSignupReducer, userUpdateReducer};