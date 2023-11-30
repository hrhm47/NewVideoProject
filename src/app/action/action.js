const addName = text => {
  return {
    type: 'SET_NAME',
    payload: text,
  };
};
const addCnic = text => {
  return {
    type: 'SET_CNIC',
    payload: text,
  };
};

const addPicture = (text) => {
  return {
    type: 'SET_PICTURE',
    payload: text
  };
};

const addEmail = text => {
  return {
    type: 'SET_EMAIL',
    payload: text,
  };
};

const addPassword = text => {
  return {
    type: 'SET_PASSWORD',
    payload: text,
  };
};

const addConfirmPassword = text => {
  return {
    type: 'SET_CONFIRM_PASSWORD',
    payload: text,
  };
};

const addOtp = text => {
  return{
    type: 'SET_OTP',
    payload: text
  }
}


// user errors will be handled here

const addERName = err => {
  return {
    type: 'SET_ER_NAME',
    payload: err,
  };
};

const addERCnic = err => {
  return {
    type: 'SET_ER_CNIC',
    payload: err,
  };
};

const addERPicture = err => {
  return {
    type: 'SET_ER_PICTURE',
    payload: err,
  };
};

const addEREmail = err => {
  return {
    type: 'SET_ER_EMAIL',
    payload: err,
  };
};

const addERPassword = err => {
  return {
    type: 'SET_ER_PASSWORD',
    payload: err,
  };
};

const addERConfirmPassword = err => {
  return {
    type: 'SET_ER_CONFIRM_PASSWORD',
    payload: err,
  };
};

const actionFunctions = {
  ACFC: {
    addName,
    addCnic,
    addPicture,
    addEmail,
    addPassword,
    addConfirmPassword,
    addOtp,
    addERName,
    addERCnic,
    addERPicture,
    addEREmail,
    addERPassword,
    addERConfirmPassword,
  },
};

export {actionFunctions};
