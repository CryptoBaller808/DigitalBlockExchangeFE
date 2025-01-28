import { httpClient } from "../client/CommonApi";

export const addWalletData = async (params) => {
  return await httpClient.post(`/admindashboard/user/addWallet`,params);
};
 