import { useMutation } from "react-query";
import { apiClient } from "../utils/api-client";

const useLogout = (payload) => {
  return useMutation(async () => {
    const { data } = await apiClient.post(
      `/merchant/user/logout`,
      payload
    );
    return data;
  });
};

export default useLogout;
