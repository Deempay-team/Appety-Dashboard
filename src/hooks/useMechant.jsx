import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { apiClient } from "../utils/api-client";
import storage from "../utils/storage";
import { Modal } from "antd";


  export const useUpdateQueue = (payload) => {
    const navigate = useNavigate();
    const tokenExpired = () => {
      storage.clear();
      navigate("/login");
    };
    const token = storage.fetch("token");
    apiClient.defaults.headers.common["auth_token"] = token;
    return useMutation(async () => {
      const { data } = await apiClient
        .post(`/api/v1/wait/update`, payload)
        .catch(function (error) {
        });
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

  export const useGetQueue = (payload) => {
    const navigate = useNavigate();
    const tokenExpired = () => {
      storage.clear();
      navigate("/login");
    };
    const token = storage.fetch("token");
    apiClient.defaults.headers.common["auth_token"] = token;
    return useMutation(async () => {
      const { data } = await apiClient
        .get(`/api/v1/wait/query`, payload)
        .catch(function (error) {
        });
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

  export const useQueryWaitType = (payload) => {
    const navigate = useNavigate();
    const tokenExpired = () => {
      storage.clear();
      navigate("/login");
    };
    const token = storage.fetch("token");
    apiClient.defaults.headers.common["auth_token"] = token;
    return useMutation(async () => {
      const { data } = await apiClient
        .post(`/merchant/user/merchantDetail`, payload)
        .catch(function (error) {
        });
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

  export const useCreateWaitType = (payload) => {
    const navigate = useNavigate();
    const tokenExpired = () => {
      storage.clear();
      navigate("/login");
    };
    const token = storage.fetch("token");
    apiClient.defaults.headers.common["auth_token"] = token;
    return useMutation(async () => {
      const { data } = await apiClient
        .post(`/api/v1/wait/type/create`, payload)
        .catch(function (error) {
        });
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

  export const useEditWaitType = (payload) => {
    const navigate = useNavigate();
    const tokenExpired = () => {
      storage.clear();
      navigate("/login");
    };
    const token = storage.fetch("token");
    apiClient.defaults.headers.common["auth_token"] = token;
    return useMutation(async () => {
      const { data } = await apiClient
        .post(`/api/v1/wait/type/create`, payload)
        .catch(function (error) {
        });
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