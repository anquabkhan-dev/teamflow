import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': "application/json",
        "Accept": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token")

    console.log("Interceptor running");
    console.log("Token:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// api.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     async (error) => {
//         const orignalRequest = error.config

//         if (error.response?.status == 401 && !orignalRequest._retry) {
//             const refreshToken = localStorage.getItem("refresh_token")
//             orignalRequest._retry = true

//             try {



//                 if (!refreshPromise) {
//                     // Start refresh
//                     refreshPromise = api.post("/refresh", { refreshToken })
//                         .then(resp => resp.data)
//                         .then(access_token => {
//                             localStorage.setItem("access_token", access_token)
//                             return access_token
//                         })
//                         .finally(() => {
//                             refreshPromise = null
//                         })
//                     // try {
//                     //     console.log("This is where our refresh logic would run")
//                     //     const response = await api.post("/refresh", {
//                     //         refreshToken
//                     //     })
//                     //     console.log("inside expiry log")
//                     //     console.log(response)
//                     //     const { accessToken } = response?.data
//                     //     localStorage.setItem("access_token", accessToken)
//                     //     orignalRequest.headers.Authorization = `Bearer ${accessToken}`

//                     //     return api(orignalRequest)

//                     // } catch (refreshError) {

//                     //     localStorage.removeItem("access_token");
//                     //     localStorage.removeItem("refresh_token");
//                     //     localStorage.removeItem("userDetails");

//                     //     window.location.href = "/login";

//                     //     return Promise.reject(refreshError);

//                     // }

//                 }

//                 // Wait for refreshPromise
//                 const accessToken = await refreshPromise

//                 // Get new token

//                 // Retry original request
//                 orignalRequest.headers.Authorization = `Bearer ${accessToken}`
//                 return api(orignalRequest)
//             }
//             catch (refreshError) {

//                 localStorage.removeItem("access_token");
//                 localStorage.removeItem("refresh_token");
//                 localStorage.removeItem("userDetails");

//                 window.location.href = "/login";

//                 return Promise.reject(refreshError);
//                 }
//             }

//             return Promise.reject(error)
//         }
//     })

let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                // Start refresh only if one isn't already running
                if (!refreshPromise) {
                    const refreshToken = localStorage.getItem("refresh_token");

                    refreshPromise = api
                        .post("/refresh", {
                            refreshToken,
                        })
                        .then((response) => {
                            const { accessToken } = response.data;

                            localStorage.setItem("access_token", accessToken);

                            return accessToken;
                        })
                        .finally(() => {
                            refreshPromise = null;
                        });
                }

                // Wait for the existing refresh request
                const newAccessToken = await refreshPromise;

                // Retry the original request
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("userDetails");

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;

