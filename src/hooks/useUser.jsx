import { useMutation } from "react-query";
import { apiClient } from "../utils/api-client";

  export const useJoinQueue = (payload) => {
    return useMutation(async () => {
        const { data } = await apiClient.post(
          `/api/v1/link/fetch/wait/join`,
          payload
        ).catch(function (error) {
          // handle error
        });
        return data;
      });
    };


