import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import signInData from "./xummBalance";
import QRCodeReducer from "./xummQRCode";
import paymentQRCodeReducer from "./xummPaymentQRCode/index";
import paymentResponseReducer from "./xummPaymentResponse";
import bookOffers from "./bookOffers";
import accountOffers from "./accountOffers";
import historyOffers from "./historyOffers";
import trades from "./tradesData";
import chart from "./chartData";
import generalReducers from './general'

const rootReducer = combineReducers({
  authReducer,
  signInData,
  QRCodeReducer,
  paymentQRCodeReducer,
  paymentResponseReducer,
  bookOffers,
  accountOffers,
  historyOffers,
  trades,
  chart,
  generalReducers
});
export default rootReducer;
