import axios from "axios";
import { GET_STELLAR_LIVE_PRICES } from "./url"
import { ApiCall } from "../index"

const getExchangeRate = data => {
  return new Promise(async(resolve, reject) => {
    const curA = data.curA;
    const issuerA = data.issuerA;
    const curB = data.curB;
    const issuerB = data.issuerB;

    if(data.mainToken === "XLM"){
      const resp = await ApiCall(GET_STELLAR_LIVE_PRICES, "get")
      if(resp.data && resp.data.success){
        resolve(resp.data.data)
      }
      else{
        resolve([])
      }
    }
    else{
      if (curA === "XRP") {
        axios
          .get(`https://data.ripple.com/v2/exchange_rates/${curA}/${curB}+${issuerB}`)
          .then(res => {
            if (res.data.result === "success") {
              resolve(res.data.rate);
            }
          })
          .catch(err => console.log("err", err));
      } else if (curB === "XRP") {
        axios
          .get(`https://data.ripple.com/v2/exchange_rates/${curA}+${issuerA}/${curB}`)
          .then(res => {
            if (res.data.result === "success") {
              resolve(res.data.rate);
            }
          })
          .catch(err => console.log("err", err));
      } else {
        axios
          .get(`https://data.ripple.com/v2/exchange_rates/${curA}+${issuerA}/${curB}+${issuerB}`)
          .then(res => {
            if (res.data.result === "success") {
              resolve(res.data.rate);
            }
          })
          .catch(err => console.log("err", err));
      }
    }
  });
};


export default getExchangeRate;
