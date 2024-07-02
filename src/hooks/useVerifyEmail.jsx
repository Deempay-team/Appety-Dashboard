import { useMutation } from "react-query";
import { apiClient } from "../utils/api-client";

const useVerifyEmail = (payload) => {
  return useMutation(async () => {
    const { data } = await apiClient.post(
      `/merchant/user/register`,
       payload
      ).catch(function (error) {
      // handle error
    });
    return data;
  });
};

export default useVerifyEmail;
