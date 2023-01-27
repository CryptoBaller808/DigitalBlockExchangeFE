import {
  ACCOUNT_OFFERS_PROCESSING,
  SET_ACCOUNT_OFFERS,
  STOP_SET_ACCOUNT_OFFERS_PROCESSING,
} from "./type";

export const setAccountOffersProcessing = () => {
  return {
    type: ACCOUNT_OFFERS_PROCESSING,
  };
};

export const setStopAccountOffersProcessing = () => {
  return {
    type: STOP_SET_ACCOUNT_OFFERS_PROCESSING,
  };
};

export const setAccountOffers = (payload) => {
  return {
    type: SET_ACCOUNT_OFFERS,
    payload,
  };
};
