import { useMutation } from "react-query";
import { apiClient } from "../utils/api-client";

const useSendEmail = (payload) => {
  return useMutation(async () => {
    const { data } = await apiClient.get(`
      /account_verification/resend`, 
      payload
    ).catch(function (error) {
      // handle error
    });
    return data;
  });
};

export default useSendEmail;
