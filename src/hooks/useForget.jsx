import { useMutation } from "react-query";
import { apiClient } from "../utils/api-client";

const useForget = (payload) => {
  return useMutation(async () => {
    const { data } = await apiClient.post(
      `/api/v1/user/auth/updatePassword`,
      payload
    ).catch(function (error) {
      // handle error
    });
    return data;
  });
};

export default useForget;