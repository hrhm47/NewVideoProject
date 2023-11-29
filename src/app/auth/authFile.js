import axios from 'axios';
// import {useSelector} from 'react-redux';
import {BASE_URL, SIGNUP_URL, LOGIN_URL, PROFILE_URL} from '@env';

const SignUpAuth = async (
  fullName,
  cnic,
  email,
  password,
  Cpassword,
  imgrui,
) => {
  let data = new FormData();

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

  let returnData;
  try {
    console.log('first', BASE_URL);
    console.log('second', SIGNUP_URL);
    const response =fetch(`${BASE_URL}${SIGNUP_URL}`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
    
    response.then((res)=>{
        return res.text();
    }).then((res)=>{
        console.log("res", res);
        returnData=res;
    }).catch((err)=>{
        console.log("err", err);
    })
    
    // .then(response => response.text())
    //   .then(result => 
    //     {
    //         console.log(result);
    //     }
    //     )
    //   .catch(err => {
    //     console.log('err', err.message);
    //   });
  } catch (err) {
    console.log(err);
  }
  console.log("return data", returnData);
//   return returnData
  
};

// });

export default SignUpAuth;
