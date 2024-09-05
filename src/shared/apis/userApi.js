import axiosInstance from "../utils/authorizedAxios";

export const getMyProfileApi = async () => {
  const res = await axiosInstance.get("user/my-profile");
  return res.data;
};

export const updateMyProfileApi = async (data) => {
  const res = await axiosInstance.put("user/update", data);
  return res.data;
};

export const getMyWalletApi = async () => {
  const res = await axiosInstance.get("user/wallet");
  return res.data;
};
