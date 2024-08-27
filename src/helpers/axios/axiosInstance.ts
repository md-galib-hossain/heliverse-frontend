// import { IGenericErrorResponse, TResponseSuccessType } from "@/types";
// import axios from "axios";

// const instance = axios.create();
// instance.defaults.headers.post["Content-Type"] = "application/json";
// instance.defaults.headers["Accept"] = "application/json";
// instance.defaults.timeout = 60000;

// // Add a request interceptor
// instance.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent

//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// instance.interceptors.response.use(
//   //@ts-ignore
//   function (response) {
//     const responseObject: TResponseSuccessType = {
//       data: response?.data?.data,
//       meta: response?.data?.meta,
//     };
//     return responseObject;
//   },
//   async function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     const config = error.config;
//     if (error?.response?.status === 401 && !config.sent) {
//       config.sent = true;

//       return Promise.reject(error);
//     } else {
//       const responseObject: IGenericErrorResponse = {
//         statusCode: error?.response?.data?.statusCode || 500,
//         message: error?.response?.data?.message || "Something went wrong!!!",
//         errorMessages: error?.response?.data?.message,
//       };
//       return Promise.reject(responseObject);
//     }
//   }
// );

// export { instance };

import { IGenericErrorResponse, TResponseSuccessType } from "@/types";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response: AxiosResponse): AxiosResponse<TResponseSuccessType> {
    // Transforming the Axios response into your custom type
    const responseObject: TResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };

    // Return the response with your custom data but within the structure of AxiosResponse
    return {
      ...response,
      data: responseObject,
    };
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const config = error.config;
    if (error?.response?.status === 401 && !config.sent) {
      config.sent = true;
      return Promise.reject(error);
    } else {
      const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessages: error?.response?.data?.message,
      };
      return Promise.reject(responseObject);
    }
  }
);

export { instance };

