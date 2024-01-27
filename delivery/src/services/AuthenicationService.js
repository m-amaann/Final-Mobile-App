// import axios from 'axios';
// // import {getToken} from '../Store';
// import {authHeader} from '../utils/Generator';
// import ApiContants from '../constant/ApiContants';

// const AuthRequest = axios.create({
//   baseURL: ApiContants.BACKEND_API.BASE_API_URL,
// });

// const login = async driver => {
//   if (!driver?.email || !driver?.password) {
//     return {status: false, message: 'Please fill up all fields'};
//   }
//   try {
//     let requestBody = {
//       email: driver?.email,
//       password: driver?.password,
//     };
//     let loginResponse = await AuthRequest.post(
//       ApiContants.BACKEND_API.LOGIN,
//       requestBody,
//     );
//     return loginResponse?.data;
//   } catch (error) {
//     console.log(error);
//     return {status: false, message: 'Oops! Something went wrong'};
//   }
// };

// const checkUserExist = async (type, value) => {
//   try {
//     let params = {[type]: value};
//     let userCheckResponse = await AuthRequest.get(
//       ApiContants.BACKEND_API.USER_EXIST,
//       {params},
//     );
//     return userCheckResponse?.data;
//   } catch (error) {
//     console.log(error);
//     return {status: false, message: 'Oops! Something went wrong'};
//   }
// };

// const refreshToken = async () => {
//   try {
//     let tokenResponse = await AuthRequest.post(
//       ApiContants.BACKEND_API.REFRESH_TOKEN,
//       {headers: authHeader(getToken())},
//     );
//     if (tokenResponse?.status === 200) {
//       return {status: true, data: tokenResponse?.data};
//     } else {
//       return {status: false};
//     }
//   } catch (error) {
//     console.log(error);
//     return {status: false, message: 'Oops! Something went wrong'};
//   }
// };

// export default { login, checkUserExist, refreshToken};