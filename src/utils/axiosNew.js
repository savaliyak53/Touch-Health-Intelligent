import axios from 'axios';
import { getTokenExpiration } from './lib';

let isRefreshing = false;

export const setUpAxios = async (axiosInstance, token, expiration) => {
  axiosInstance.interceptors.request.use(async (config) => {
    if (token) {
      const now = Math.floor(Date.now() / 1000);
      console.log('Im going to checking expiration', expiration);
      console.log('Im going to checking expiration now', now);
      console.log('Im going to checking expiration now', expiration - now);

      if (expiration - now < 10) {
        if (!isRefreshing) {
          isRefreshing = true;
          console.log('refreshn now');

          try {
            const response = axiosInstance
              .get('/auth/token', {
                withCredentials: true,
              })
              .then((res) => {
                if (res.status === 200) {
                  // 1) put token to LocalStorage
                  const newToken = res?.data?.token;
                  const newExpiration = getTokenExpiration(newToken);
                  localStorage.setItem('token', newToken);
                  localStorage.setItem('expiration', newExpiration);

                  isRefreshing = false;

                  // 2) Change Authorization header
                  axios.defaults.headers.common['Authorization'] =
                    'Bearer ' + newToken;
                  // window.location.reload(true);
                  // 3) return originalRequest object with Axios.
                  return axios(config);
                }
              });

            // processQueue(null, newToken);
          } catch (error) {
            isRefreshing = false;
            // processQueue(error, null);
          }
        }

        // const retryOriginalRequest = new Promise((resolve, reject) => {
        //   failedQueue.push({ resolve, reject });
        // });

        // return retryOriginalRequest;
      } else {
        config.headers.Authorization = `Bearer ${localStorage.token}`;
      }
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 409) {
        return Promise.reject(error);
      } else if (error.response.status === 401) {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.clear();
        window.location = '/login';
        return Promise.reject(error);
      } else if (error.response.status === 403) {
        return Promise.reject(error);
      } else if (error.response.status === 429) {
        return Promise.reject(error);
      } else if (error.response.status === 422) {
        return Promise.reject(error);
      }
    }
  );
  return axiosInstance;
};

// import axios from 'axios';
// import { getTokenExpiration } from './lib';

// export const setUpAxios = async (axiosInstance, token, expiration) => {
//   console.log('Im setting up axios ');
//   axiosInstance.interceptors.request.use(async (config) => {
//     if (token) {
//       // Check if the token is expired or about to expire

//       const now = Math.floor(Date.now() / 1000);

//       console.log('Im going to checking expiration', expiration);
//       console.log('Im going to checking expiration now', now);
//       if (expiration - now < 300) {
//         console.log(
//           '---------------------I need to Refresh-----------------',
//           expiration
//         );
//         try {
//           // Obtain a new token from the backend
//           const response = await axiosInstance.get('/auth/token', {
//             withCredentials: true,
//           });
//           const newToken = response?.data?.token;
//           const newExpiration = getTokenExpiration(newToken);
//           localStorage.setItem('token', newToken);
//           localStorage.setItem('expiration', newExpiration);
//           console.log('newToken', newToken);
//         } catch (error) {
//           // Handle error
//         }
//       } else {
//         config.headers.Authorization = `Bearer ${localStorage.token}`;
//       }
//     }
//     console.log('Im out of If(token)');
//     return config;
//   });

//   axiosInstance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response.status === 409) {
//         return Promise.reject(error);
//       } else if (error.response.status === 401) {
//         localStorage.removeItem('userId');
//         localStorage.removeItem('token');
//         localStorage.clear();
//         window.location = '/login';
//         return Promise.reject(error);
//       } else if (error.response.status === 403) {
//         return Promise.reject(error);
//       } else if (error.response.status === 429) {
//         return Promise.reject(error);
//       } else if (error.response.status === 422) {
//         return Promise.reject(error);
//       }
//     }
//   );
//   return axiosInstance;
// };

// // import axios from 'axios';
// // import jwt_decode from 'jwt-decode';

// // export const setUpAxios = (axios) => {
// //   const token = localStorage.getItem('token');
// //   console.log('Im in axios', token);

// //   const expiration = localStorage.getItem('expiration');
// //   axios.interceptors.request.use(async (config) => {
// //     if (token) {
// //       // Check if the token is expired or about to expire
// //       console.log('Im going to checking expiration now');
// //       const now = Math.floor(Date.now() / 1000);
// //       console.log('Im have now', now);
// //       if (expiration - now < 10) {
// //         console.log('call v1/auth/token api', expiration);

// //         try {
// //           // Obtain a new token from the backend
// //           const response = await axios.get('/auth/token', {
// //             withCredentials: true,
// //           });
// //           //   const newToken = response.data.token;
// //           //   const newExpiration = response.data.expiration;
// //           const newToken = response?.data?.token;
// //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //           const decodedToken = jwt_decode(newToken);
// //           console.log('decoded_token', decodedToken);
// //           const newExpiration = decodedToken.exp;
// //           localStorage.setItem('token', newToken);
// //           localStorage.setItem('expiration', newExpiration);
// //           //   setToken(newToken);
// //           //   setExpiration(newExpiration);
// //         } catch (error) {
// //           // Handle error
// //         }
// //       } else {
// //         config.headers.Authorization = `Bearer ${localStorage.token}`;
// //       }
// //     }
// //     console.log('Im out of If(token)');
// //     return config;
// //   });

// //   axios.interceptors.response.use(
// //     (response) => {
// //       return response;
// //     },
// //     (error) => {
// //       if (error.response.status === 409) {
// //         return Promise.reject(error);
// //       } else if (error.response.status === 401) {
// //         localStorage.removeItem('userId');
// //         localStorage.removeItem('token');
// //         localStorage.clear();
// //         window.location = '/login';
// //         return Promise.reject(error);
// //       } else if (error.response.status === 403) {
// //         return Promise.reject(error);
// //       } else if (error.response.status === 429) {
// //         return Promise.reject(error);
// //       } else if (error.response.status === 422) {
// //         return Promise.reject(error);
// //       }
// //     }
// //   );
// //   return axios;
// // };

// // // export default apiClient;
