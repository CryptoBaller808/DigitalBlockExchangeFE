import React, { useState, useEffect, useContext } from "react";
import { SearchIcon, ExchangeIcon, SunIcon, MenuIcon2 } from "../../Icons";
//new updateimport getExchangeRate from "../../helper/api/exchangeRate";
import currency from "../../helper/currencies";
import getExchangeRate from "../../helper/api/exchangeRate";
import Loader from "../../components/Loader";
import { getTradesData } from "../../helper";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../../context/soket";
//redux
import * as tradesAction from "../../redux/tradesData/action";
import moment from "moment";
const dateFormat = "YYYY/MM/DD";

const ExchangeRatesComponent = ({ getData, currencyData2, dropVal, setDropVal }) => {
  console.log("currencyData2", currencyData2);
  const [tokenTabSelected, setTokenTabSelected] = useState("XRP");
  const [currencyData, setCurrencyData] = useState([]);
  const [rowData, setRowData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [tokenList, setTokenList] = useState([]);
  const [currencyDataLoaded, setCurrencyDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const [decimalVal, setDecimalVal] = useState(7);

  const tradesData = useSelector(state => state.trades?.trades);
  const tradesDataProcessing = useSelector(state => state.trades?.processing);

  const [tradeLoading, setTradeLoading] = useState(true);
  const [tradesList, setTradeList] = useState(tradesData);
  const socket = useContext(SocketContext);

  //get all currency data list
  const getAllCurrencyData = async () => {
    const selectedCurrency = currency.find(obj => obj.currency === tokenTabSelected);
    const currencyDataPromise = currency
      .filter(val => selectedCurrency.currency !== val.currency)
      .map(obj => {
        const exchangeData = {
          curA: tokenTabSelected,
          issuerA: selectedCurrency.issuer,
          curB: obj.currency,
          issuerB: obj.issuer,
        };
        return getExchangeRate(exchangeData);
      });
    const price = await Promise.all(currencyDataPromise);
    let titleData = currency
      .filter(val => selectedCurrency.currency !== val.currency)
      .map((obj, indx) => {
        const data = {
          id: indx,
          title: `${tokenTabSelected}/${obj.currency}`,
          stat: "-22.45",
          curA: tokenTabSelected,
          issuerA: selectedCurrency.issuer,
          curB: obj.currency,
          issuerB: obj.issuer,
        };
        return data;
      });

    price.map((price, indx) => {
      titleData[indx].price = price;
    });

    return titleData;
  };

  //set all currency data as select the currency

  useEffect(() => {
    if (currencyData.length) {
      setRowData(currencyData[0]);
      getData(currencyData[0]);
      setLoadingData(false);
      setCurrencyDataLoaded(true);
    } else {
      getAllCurrencyData().then(val => {
        setCurrencyData(val);
      });
    }
  }, [currencyData]);

  useEffect(() => {
    setLoadingData(true);
    getAllCurrencyData().then(val => {
      console.log("local 22222 :: ", val);
      setCurrencyData(val);
      // setTrade
    });
    setLoadingData(false);
  }, [tokenTabSelected]);
  // console.log("currencyData", currencyData);
  const handleRow = data => {
    // console.log("data", data);
    setRowData(data);
    getData(data);
  };
  //FOR TRADES DATA
  useEffect(() => {
    socket.on("drops-val", args => {
      const drops = Number(args);
      setDropVal(drops);
    });
    setTradeList(tradesData);
  }, [tradesData]);

  const dataSource = tradesData.map((obj, indx) => {
    // const price = tokenTabSelected === "XRP" ? dropVal * Number(obj.quality) : Number(obj.quality);
    const price = parseFloat(obj.price).toFixed(decimalVal);
    // const amount = Number(obj?.TakerPays?.value);
    const date = obj.time;
    const volume = price * parseFloat(obj.amount).toFixed(decimalVal);
    // amount: "3";
    // buyer: "rhRNP4rkxrV5oFuCDyUUj3Y5xiXFxNaHxt";
    // executed_at: "2022-10-14T09:36:30Z";
    // id: "750520690000230000";
    // is_seller_taker: true;
    // price: "0.5005911430939767";
    // quote_amount: "1.50177342928193";
    // seller: "rEMyxQPe5J6h59XnwHJVdWc5eUgiiEvSdo";
    // symbol: "XRP/USD+rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq";
    // time: "2022-10-14T09:36:30Z";
    return {
      id: indx + 1,
      time: moment(date).format("YYYY/MM/DD HH:mm"),
      price: price,
      vol: volume.toFixed(decimalVal),
    };
  });
  // console.log("tradesData PARSED ARRAY :: ", tradesData);
  useEffect(() => {
    async function fetchData() {
      if (currencyData2?.info) {
        const acc = {
          curA: currencyData2?.info?.curA,
          curB: currencyData2?.info?.curB,
          issuerB: currencyData2?.info?.issuerB,
        };
        await getTradesData(acc)
          .then(res => {
            if (res.data.success) {
              // console.log("FROM SERVER CHART DATA ----------->", res.data.data);
              // setTradeLoading(true);
              dispatch(tradesAction.setTradesProcessing());
              dispatch(tradesAction.setTrades(res.data.data));

              dispatch(tradesAction.setStopTradesProcessing());
              // setTradeLoading(false);
            } else {
              dispatch(tradesAction.setTradesProcessing());
              dispatch(tradesAction.setTrades([]));
              dispatch(tradesAction.setStopTradesProcessing());
            }
          })
          .catch(err => console.log("CHART DATA", err));
      }
    }
    fetchData();
  }, [currencyData2]);

  // useEffect(() => {
  //   setTradeLoading(true);
  //   setTradeList(tradesData);
  //   // const price = currentCurrency === "XRP" ? dropVal * Number(obj.quality) : Number(obj.quality);

  //   // const amount = Number(obj?.TakerPays?.value);

  //   // const volume = price * amount.toFixed(decimalVal);
  //   setTradeLoading(false);
  // }, [tradesData]);

  //TRADES DATA LOADER
  useEffect(() => {
    if (tradesDataProcessing) {
      setTradeLoading(true);
    } else {
      setTimeout(() => {
        setTradeLoading(false);
      }, 2000);
    }
  }, [tradesDataProcessing]);

  return (
    <div className="left flex flex-col">
      {/* Left price bar start */}
      <div className="le-top flex flex-col">
        <div className="search-box flex items-center justify-between">
          <div className="icon">
            <SearchIcon />
          </div>
          <input type="text" className="txt cleanbtn w-full" placeholder="Search" />
        </div>
        <div className="token_tabs flex">
          <div className={`item ${tokenTabSelected === "DBX" ? "active" : ""}`} onClick={e => setTokenTabSelected("DBX")}>
            DBX
          </div>
          <div
            className={`item ${tokenTabSelected === "XRP" ? "active" : ""}`}
            onClick={e => {
              setTokenTabSelected("XRP");
            }}>
            XRP
          </div>
          {/* <div className={`item ${tokenTabSelected === "USDC" ? "active" : ""}`} onClick={e => setTokenTabSelected("USDC")}>
            USDC
          </div>
          <div className={`item ${tokenTabSelected === "ALTS" ? "active" : ""}`} onClick={e => setTokenTabSelected("ALTS")}>
            ALTS
          </div> */}
        </div>
        <div className="token-table flex">
          <div className="table-block flex flex-col w-full">
            <div className="tbl-row flex">
              <div className="row-item">Pair</div>
              <div className="row-item">Price</div>
              <div className="row-item flex items-center justify-end">
                24h Chg
                <spna className="ml-1">
                  <ExchangeIcon />
                </spna>
              </div>
            </div>
            {loadingData ? (
              <Loader />
            ) : (
              currencyData.map((item, i) => (
                <div className="tbl-row flex" key={i} onClick={() => handleRow(item)}>
                  <div className="row-item flex items-center">
                    <span className="name1">{item.title}</span>
                    {/* /<span className="name2">{tokenTabSelected}</span> */}
                  </div>
                  <div className="row-item">{item.price}</div>
                  <div className={`row-item flex items-center justify-end ${item.stat < 0 ? "red" : "green"}`}>{item.stat}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Left price bar end */}

      {/* Left Trades bar start */}
      <div className="le-btm flex flex-col">
        <div className="sec-tag">Trades</div>
        <div className="token-table flex">
          <div className="table-block flex flex-col w-full">
            <div className="tbl-row flex">
              <div className="row-item">Price ({tokenTabSelected})</div>
              <div className="row-item">Vol ({currencyData2?.info?.curB})</div>
              <div className="row-item flex items-center justify-end">Time</div>
            </div>
            {tradeLoading ? (
              <Loader />
            ) : dataSource.length > 0 ? (
              dataSource.map((item, i) => {
                return (
                  <div className="tbl-row flex" key={i}>
                    <div className="row-item flex items-center">{item.price}</div>
                    <div className="row-item">{item.vol}</div>
                    {/* ${item.type === "red" ? "red" : "green"} */}
                    <div className={`row-item flex items-center justify-end `}>{item.time}</div>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center no-result">No result found</div>
            )}
          </div>
        </div>
      </div>
      {/* Left Trades bar end */}
    </div>
  );
};

export default ExchangeRatesComponent;
