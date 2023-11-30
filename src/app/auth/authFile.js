// import axios from 'axios';
// // import {useSelector} from 'react-redux';
import {
  BASE_URL,
  SIGNUP_URL,
  LOGIN_URL,
  PROFILE_URL,
  EMAIL_VERIFICATION_URL,
  RESET_PASSWORD_URL,
  OTP_VERIFICATION_URL
} from '@env';

// const SignUpAuth = async (
//   fullName,
//   cnic,
//   email,
//   password,
//   Cpassword,
//   imgrui,
// ) => {
//   let data = new FormData();

//   data.append('fullName', fullName);
//   data.append('cnic', cnic);
//   data.append('image', {
//     uri: imgrui.uri,
//     name: imgrui.fileName,
//     type: imgrui.type,
//   });
//   data.append('email', email);
//   data.append('password', password);
//   data.append('confirmPassword', Cpassword);

// //   let returnData;
//    SigUpAuth(data).then((res)=>{
//     return res
//    }).catch((err)=>{
//         console.log("err in outer function", err);
//    })

// };

// const SigUpAuth = async (data) => {
//     try {
//         // console.log('first', BASE_URL);
//         // console.log('second', SIGNUP_URL);
//         const response=await fetch(`${BASE_URL}${SIGNUP_URL}`, {
//           method: 'post',
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           body: data,
//         }).then((res)=>{
//           // console.log("type of res", typeof( res));

//             return res.json()
//         }).then((res)=>{
//           console.log("res message in 2nd then", res);
//           return res

//         }).catch((err)=>{
//             console.log("err", err);
//         })
//             return response;
//         // returnData=response;
//          } catch (err) {
//         console.log(err);
//       }
// }

// export default SignUpAuth;

const SignUpAuth = async (
  fullName,
  cnic,
  email,
  password,
  Cpassword,
  imgrui,
) => {
  try {
    const data = new FormData();
    data.append('fullName', fullName);
    data.append('cnic', cnic);
    data.append('image', {
      uri: imgrui.uri,
      name: imgrui.fileName,
      type: imgrui.type,
    });
    data.append('email', email);
    data.append('password', password);
    data.append('confirmPassword', Cpassword);

    const response = await fetch(`${BASE_URL}${SIGNUP_URL}`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });

    if (!response.ok) {
      return response.json();
    }

    const result = await response.json();
    // console.log('result', response.json().);
    return result;
  } catch (error) {
    console.log('Error in SignUpAuth:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

const LogInAuth = async (email, password) => {
  try {
    const loginFormData = new FormData();
    loginFormData.append('email', email);
    loginFormData.append('password', password);

    const loginResponse = await fetch(`${BASE_URL}${LOGIN_URL}`, {
      method: 'post',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!loginResponse.ok) {
      // return loginResponse.json();
      console.log('loginResponse', loginResponse.json());
      throw new Error('Login failed!');
    }

    const result = await loginResponse.json();
    console.log('result ', result);
    return result;
  } catch (error) {
    console.log('error in login auth', error);
  }
};

const Email_Verification = async email => {
  try {
    // const emailVerify=new FormData();
    // emailVerify.append('email', email);

    const emailVerifyResponse = await fetch(
      `${BASE_URL}${EMAIL_VERIFICATION_URL}`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      },
    );

    if (!emailVerifyResponse.ok) {
      return emailVerifyResponse.json();
      // throw new Error('Email Verification failed!');
    } else {
      const result = await emailVerifyResponse.json();
      // console.log('result ', result);
      return result;
    }
  } catch (error) {
    console.log('error in email verification', error);
  }
};

const OTP_Verification = async (email,otp) => {
  try {
    const OTP_Response=await fetch(`${BASE_URL}${OTP_VERIFICATION_URL}`,{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "email":email,
        "otp":otp
      })  
    });

    if(!OTP_Response.ok){
      return OTP_Response.json();
    }

    const result=await OTP_Response.json();
    return result;
  } catch (error) {

  }
};

const Reset_Password=async(email,newPassword,confirmPassword)=>{
  try {
    const Reset_Response=await fetch(`${BASE_URL}${RESET_PASSWORD_URL}`,{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "email":email,
        "newPassword":newPassword,
        "confirmPassword":confirmPassword
      })
    });

    if (!Reset_Response.ok) {
      return Reset_Response.json();
    }

    const result=await Reset_Response.json();
    return result;
  } catch (error) {
    
  }
}






export {SignUpAuth, LogInAuth, Email_Verification,OTP_Verification,Reset_Password};
