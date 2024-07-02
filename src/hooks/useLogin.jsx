import { useMutation } from "react-query";
import { apiClient } from "../utils/api-client";
//import { Notify } from "../components/notification";

const useLogin = (payload) => {
  return useMutation(async () => {
    const { data } = await apiClient
      .post(`/api/v1/user/auth/login`, payload)
      .catch(function (error) {
        // handle error
        // Notify(
        //   "error",
        //   "Network Error!",
        //   "Please check your internet connection!",
        //   10
        // );
      });
    return data;
  });
};

export default useLogin;
