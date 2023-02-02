import {
  ACCOUNT_OFFERS_PROCESSING,
  SET_ACCOUNT_OFFERS,
  STOP_SET_ACCOUNT_OFFERS_PROCESSING,
} from "./type";

const defaultReducer = {
  accountOffer: [],
  processing: false,
};

const accountOffersReducer = (state = defaultReducer, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACCOUNT_OFFERS_PROCESSING: {
      return {
        ...state,
        processing: true,
      };
    }

    case SET_ACCOUNT_OFFERS: {
      return {
        ...state,
        accountOffer: payload,
        processing: false,
      };
    }

    case STOP_SET_ACCOUNT_OFFERS_PROCESSING: {
      return {
        ...state,
        processing: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default accountOffersReducer;
