import { useMutation } from "react-query";
import { apiClient } from "../utils/api-client";

const useRegister = (payload) => {
  return useMutation(async () => {
    const { data } = await apiClient.post(
      `/api/v1/user/auth/register`,
      payload
    ).catch(function (error) {
      // handle error
    });
    return data;
  });
};

export default useRegister;