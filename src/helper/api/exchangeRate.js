import axios from "axios";

// const getExchangeRate = data => {
//   return new Promise((resolve, reject) => {
//     const curA = data.curA;
//     const issuerA = data.issuerA;
//     const curB = data.curB;
//     const issuerB = data.issuerB;

//     if (curA === "XRP") {
//       axios
//         .get(`https://data.ripple.com/v2/exchange_rates/${curA}/${curB}+${issuerB}`)
//         .then(res => {
//           if (res.data.result === "success") {
//             resolve(res.data.rate);
//           }
//         })
//         .catch(err => console.log("err", err));
//     } else if (curB === "XRP") {
//       axios
//         .get(`https://data.ripple.com/v2/exchange_rates/${curA}+${issuerA}/${curB}`)
//         .then(res => {
//           if (res.data.result === "success") {
//             resolve(res.data.rate);
//           }
//         })
//         .catch(err => console.log("err", err));
//     } else {
//       axios
//         .get(`https://data.ripple.com/v2/exchange_rates/${curA}+${issuerA}/${curB}+${issuerB}`)
//         .then(res => {
//           if (res.data.result === "success") {
//             resolve(res.data.rate);
//           }
//         })
//         .catch(err => console.log("err", err));
//     }
//   });
// };

const getExchangeRate = async data => {
  try {
    const mainToken = data.mainToken;
    const otherPairs = data.otherPairs.map(pair => pair.currency);
    const res = await axios.get(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${mainToken}&tsyms=${otherPairs.join(
        ",",
      )}&api_key=bac264eae994de33ef198f85ecc926d0fa7a05a40cfc926b1dfc7fb3b15c8d38`,
    );
    if (res?.data) {
      return res.data ?? [];
    }
  } catch (error) {}
};

export default getExchangeRate;
