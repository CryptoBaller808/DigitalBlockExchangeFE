import React, { useEffect, useState } from "react";
import { getTickersData } from "../../helper";
import { SunIcon } from "../../Icons";
const GraphHeadComponent = ({ currencyData2 }) => {
  const price = currencyData2?.info?.price;
  const title = currencyData2?.info?.title;

  const [tickersData, setTickersData] = useState(null)
  const [hourChange, setHourChange] = useState(0);
  const tempCurrency = title && title.split("/");

  const currentCurrency = tempCurrency?.length && tempCurrency[0];

  const baseCurrency = tempCurrency?.length && tempCurrency[1];

  useEffect(() => {
    async function fetchData() {
      if (currencyData2?.info) {
        let tickersInput = {
          symbols: [`${currencyData2.info.curA}/${currencyData2.info.curB === "SOLO" ? "534F4C4F00000000000000000000000000000000" : currencyData2.info.curB}+${currencyData2.info.issuerB}`],
        };
        getTickersData(tickersInput)
          .then(res => {
            if (res.data.success) {
              const apiResult = res.data.data;
              const data = Object.values(apiResult)[0];
              console.log("api result",apiResult);
              setTickersData(data);
              let hrChange = (data?.high_price - data?.low_price) / 100;
              console.log(hrChange);
            }
          })
          .catch(err => console.log("FROM SERVER CHART HEAD ERR", err));
        const acc = {
          curA: currencyData2?.info?.curA,
          curB: currencyData2?.info?.curB === "SOLO" ? "534F4C4F00000000000000000000000000000000" : currencyData2?.info?.curB,
          issuerB: currencyData2?.info?.issuerB,
        };
        // await getTradesData(acc)
        //   .then(res => {
        //     if (res.data.success) {
        //       // console.log("FROM SERVER CHART DATA ----------->", res.data.data);
        //       console.log("PARSED ARRAY :: ", res.data.data);
        //     } else {
        //     }
        //   })
        //   .catch(err => console.log("CHART DATA", err));
      }
    }
    fetchData();
  }, [currencyData2]);

  return (
    <div className="center-hdr flex items-center w-full">
      <div className="content-side flex item-center">
        <div className="cnt_left flex items-center">{title}</div>
        <div className="cnt_right flex">
          <div className="item flex items-center  justify-center flex-col">
            <div className="lbl">Price</div>
            <div className="val">{price}</div>
          </div>
          {/* <div className="item flex items-center  justify-center flex-col">
            <div className="lbl">24h Chg</div>
            <div className="val">{Number(tickersData?.high_price - tickersData?.low_price)}</div>
          </div> */}
          <div className="item flex items-center  justify-center flex-col">
            <div className="lbl">24h High</div>
            <div className="val">{Number(tickersData?.high_price || 0).toFixed(4) || 0}</div>
          </div>
          <div className="item flex items-center  justify-center flex-col">
            <div className="lbl">24h Vol({currentCurrency})</div>
            <div className="val">{Number(tickersData?.volume || 0)?.toFixed(4) || 0}</div>
          </div>
          <div className="item flex items-center  justify-center flex-col">
            <div className="lbl">24h Vol({baseCurrency})</div>
            <div className="val">{Number(tickersData?.inverted_volume || 0)?.toFixed(4) || 0}</div>
          </div>
        </div>
      </div>
      {/*<div className="icon cursor-pointer ml-3">
        <SunIcon />
      </div>*/}
    </div>
  );
};

export default GraphHeadComponent;
