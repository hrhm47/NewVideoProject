import {combineReducers} from 'redux';

const initialState = {
  fullName: '',
  fullNameError: false,
  CNIC: 0,
  cnicError: false,
  pictureUri:null,
  pictureUriError: false,
  email: '',
  emailError: false,
  password: '',
  passwordError: false,
  confirmPassword: '',
  confirmPasswordError: false,
  otp: '',
};

const signupReducer = (state = initialState, action) => {
  // const {type,payload}=action
  // console.log('action', action.payload);
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        fullName: action.payload,
      };
    case 'SET_CNIC':
      return {
        ...state,
        CNIC: action.payload,
      };
    case 'SET_PICTURE':
      return {
        ...state,
        pictureUri: action.payload,
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.payload,
      };
    case 'SET_CONFIRM_PASSWORD':
      return {
        ...state,
        confirmPassword: action.payload,
      };
    case 'SET_OTP':
      return {
        ...state,
        otp: action.payload,
      };

    case 'SET_ER_NAME':
      return {
        ...state,
        fullNameError: action.payload,
      };
    case 'SET_ER_CNIC':
      return {
        ...state,
        cnicError: action.payload,
      };
    case 'SET_ER_PICTURE':
      return {
        ...state,
        pictureUriError: action.payload,
      };
    case 'SET_ER_EMAIL':
      return {
        ...state,
        emailError: action.payload,
      };
    case 'SET_ER_PASSWORD':
      return {
        ...state,
        passwordError: action.payload,
      };
    case 'SET_ER_CONFIRM_PASSWORD':
      return {
        ...state,
        confirmPasswordError: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  signupReducer: signupReducer,
});

export default rootReducer;
