import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { apiClient } from "../utils/api-client";
import storage from "../utils/storage";
import { Modal } from "antd";

export const useUpdateMerchantDetails = (payload) => {
  const navigate = useNavigate();
  const tokenExpired = () => {
    storage.clear();
    navigate("/login");
  };
  const token = storage.fetch("token");
  apiClient.defaults.headers.common["auth_token"] = token;
  return useMutation(async () => {
    const { data } = await apiClient
      .post(`/api/v1/user/superadmin/merchant/update`, payload)
      .catch(function (error) {});
    if (data?.code === "900009") {
      Modal.error({
        title: "Session Timeout!",
        content: "Sorry, please login again to continue",
        onOk: () => {
          tokenExpired();
          Modal.destroyAll();
        },
      });
    } else {
      return data;
    }
  });
};

