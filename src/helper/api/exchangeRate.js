import axios from "axios";

const getExchangeRate = data => {
  return new Promise((resolve, reject) => {
    const curA = data.curA;
    const issuerA = data.issuerA;
    const curB = data.curB;
    const issuerB = data.issuerB;

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
  });
};

export default getExchangeRate;
