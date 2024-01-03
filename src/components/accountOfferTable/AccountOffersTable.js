import React, { useState, useEffect } from "react";
import _ from "loadsh";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getBookOffers, getAccountOffers } from "../../helper/ws";
import * as bookOfferAction from "../../redux/bookOffers/action";
import * as accountOfferAction from "../../redux/accountOffers/action";
import * as historyOfferAction from "../../redux/historyOffers/action";
import { useSocket } from "../../context/socket";
import { Table, Space, Button } from "antd";
import Loader from "../loader/Loader";
import { getFullAccountOffers, getOrderHistory, getTickersData } from "../../helper";
import getExchangeRate from "../../helper/api/exchangeRate";
import { toast } from "react-toastify";
import ExchangeDeleteModal from "../loader/ExchangeDeleteModal";
import clsx from "clsx";

const AccountOffersTable = ({ currencyData2, dropVal, setDropVal }) => {
  const [orderTab, setOrderTab] = useState("open");
  const [accLoading, setAccLoading] = useState(true);
  const [hisLoading, setHisLoading] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const network = useSelector(state => state.networkReducers.token);

  //new update
  const balanceData = useSelector(state => state.signInData?.balance);
  const userAccount = network === "xrp" ? balanceData?.account : balanceData?.userToken;

  const dispatch = useDispatch();
  const accountOffer = useSelector(state => state.accountOffers?.accountOffer);
  const accountOfferProcessing = useSelector(state => state.accountOffers?.processing);

  const historyOffer = useSelector(state => state.historyOffers?.historyOffer);
  const historyOfferProcessing = useSelector(state => state.historyOffers?.processing);

  const [accountOfferData, setAccountOfferData] = useState(accountOffer);
  const [historyOfferData, setHistoryOfferData] = useState(historyOffer);
  const socket = useSocket();

  useEffect(() => {
    setAccLoading(true);
    socket.on("drops-val", args => {
      const drops = Number(args);
      setDropVal(drops);
    });
    if (dropVal !== undefined) {
      setTimeout(() => {
        setAccLoading(false);
      }, 2000);
    }
    setAccountOfferData(accountOffer);
  }, [accountOffer]);

  useEffect(() => {
    setHisLoading(true);
    setHistoryOfferData(historyOffer);
    setHisLoading(false);
  }, [historyOffer]);

  //   useEffect(() => {
  //     if (isWalletConnected) {
  //       getBookOffers(submitBookOfferData, userAccount)
  //         .then((res) => {
  //           if (res.status === "success" && res.result?.offers.length) {
  //             console.log("BookOffers", res);
  //             dispatch(bookOfferAction.setBookOffers(res.result.offers));
  //           }
  //         })
  //         .catch((err) => console.log("err", err));
  //     } else {
  //       dispatch(bookOfferAction.setBookOffers([]));
  //     }
  //   }, [paymentResponse]);

  const isWalletConnected = useSelector(state => state.authReducer.isWalletConnected);

  useEffect(() => {
    if (isWalletConnected) {
      //get account offers
      getFullAccountOffers({ accountNo: userAccount, network })
        .then(res => {
          if (res.data.success) {
            const offerResult = res.data.data;
            dispatch(accountOfferAction.setAccountOffersProcessing(true));
            dispatch(accountOfferAction.setAccountOffers(offerResult));
          } else {
            dispatch(accountOfferAction.setAccountOffers([]));
          }
        })
        .catch(err => console.log("getFullAccountOffers.error", err));
      dispatch(accountOfferAction.setAccountOffersProcessing(false));

      getOrderHistory(userAccount)
        .then(res => {
          // console.log("getOrderHistory res----------->", res);

          if (res.data.success) {
            // setAccLoading(true);
            // console.log("-------------HISTORY OFF------------------");

            dispatch(historyOfferAction.setHistoryOffersProcessing());
            dispatch(historyOfferAction.setHistoryOffers(res.data.data));
            dispatch(historyOfferAction.setStopHistoryOffersProcessing());
          }
        })
        .catch(err => console.log("err", err));
    } else {
      dispatch(accountOfferAction.setAccountOffersProcessing(true));
      dispatch(accountOfferAction.setAccountOffers([]));
      dispatch(accountOfferAction.setAccountOffersProcessing(false));

      dispatch(historyOfferAction.setHistoryOffersProcessing());
      dispatch(historyOfferAction.setHistoryOffers([]));
      dispatch(historyOfferAction.setStopHistoryOffersProcessing());
    }
  }, [isWalletConnected, userAccount]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Pair",
      dataIndex: "pair",
      key: "pair",
    },
    {
      title: "Type",
      dataIndex: "offerType",
      key: "offerType",
    },
    {
      title: "Side",
      dataIndex: "side",
      key: "side",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button danger type="text" onClick={e => onDelete(record.key, e)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const filteredColumns = columns?.filter(col => col.title !== "Action");

  const onDelete = (val, e) => {
    console.log("inside delete");
    e.preventDefault();
    // const data = bookOffer.filter(item => item.key !== key);
    const accInfo = {
      account: balanceData?.account,
      userToken: balanceData?.userToken,
      tx_id: val?.txId,
    };

    setisLoading(true);
    // socket.on("payment-response", args => {
    // })
    socket.emit("delete-offers", accInfo);

    socket.on("delete-offers-response", args => {
      setisLoading(false);
      if (args?.success === false) {
        toast.error(args?.message);
      } else if (args?.success === true) {
        toast.success(args?.message);

        // get account offer
        getFullAccountOffers({ accountNo: userAccount, network })
          .then(res => {
            if (res.data.success) {
              // setAccLoading(true);
              let offerResult = res?.data?.data;
              // offerResult = _.orderBy(offerResult, ["seq"], ["desc"]);
              dispatch(accountOfferAction.setAccountOffersProcessing(true));
              dispatch(accountOfferAction.setAccountOffers(offerResult));
            } else {
              dispatch(accountOfferAction.setAccountOffers([]));
            }
          })
          .catch(err => console.log("err", err));
        dispatch(accountOfferAction.setAccountOffersProcessing(false));

        //get offer history
        getOrderHistory(userAccount)
          .then(res => {
            // console.log("getOrderHistory res----------->", res);

            if (res.data.success) {
              // setAccLoading(true);
              // console.log("-------------HISTORY OFF------------------");

              dispatch(historyOfferAction.setHistoryOffersProcessing());
              dispatch(historyOfferAction.setHistoryOffers(res?.data?.data || []));
              dispatch(historyOfferAction.setStopHistoryOffersProcessing());
            }
          })
          .catch(err => console.log("err", err));
      }
    });
  };

  const dataSource = accountOfferData.map((obj, indx) => {
    const total = (obj.price * obj.amount).toFixed(5);
    const crrPair = obj.pair;
    const totalCurrency = crrPair.split("/");

    return {
      key: indx + 1,
      date: moment(obj.date).format("YYYY-MM-DD HH:mm:ss"),
      pair: obj.pair,
      offerType: obj.offerType,
      side: obj.side,
      amount: obj.amount,
      price: obj.price,
      total: `${total} ${totalCurrency[1]}`,
      action: obj,
    };
  });

  useEffect(() => {
    if (accountOfferProcessing) {
      setAccLoading(true);
    } else {
      setTimeout(() => {
        setAccLoading(false);
      }, 2000);
    }
  }, [accountOfferProcessing]);

  //history offers data
  const dataSourceHistory = historyOfferData.map((obj, indx) => {
    const total = (obj.price * obj.amount).toFixed(5);
    const crrPair = obj.pair;
    const totalCurrency = crrPair.split("/");

    return {
      key: indx + 1,
      date: moment(obj.date).format("YYYY-MM-DD HH:mm:ss"),
      pair: obj.pair,
      offerType: obj.offerType,
      side: obj.side,
      amount: obj.amount,
      price: obj.price,
      total: `${total} ${totalCurrency[1]}`,
      // action: obj,
    };
  });

  useEffect(() => {
    if (historyOfferProcessing) {
      setHisLoading(true);
    } else {
      setTimeout(() => {
        setHisLoading(false);
      }, 2000);
    }
  }, [historyOfferProcessing]);

  //get current A and B currency and it's issuer
  useEffect(() => {
    async function fetchData() {
      if (currencyData2?.info) {
        let tickersInput = {
          symbols: [`${currencyData2.info.curA}/${currencyData2.info.curB}+${currencyData2.info.issuerB}`],
        };
        getTickersData(tickersInput)
          .then(res => {
            if (res.data.success) {
              const apiResult = res.data.data;
              const data = Object.values(apiResult)[0];
              // console.log("FROM SERVER TICKERS  ----------->", data);
            }
          })
          .catch(err => console.log("FROM SERVER CHART HEAD ERR", err));
        const acc = {
          curA: currencyData2?.info?.curA,
          curB: currencyData2?.info?.curB,
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
    <>
      {isLoading && <ExchangeDeleteModal />}
      <div className="orders-sec flex flex-col">
        <div className="tabs-sec flex aic">
          <div className={`i-tab ${orderTab === "open" ? "active" : ""}`} onClick={e => setOrderTab("open")}>
            Open orders
          </div>
          <div className={`i-tab ${orderTab === "history" ? "active" : ""}`} onClick={e => setOrderTab("history")}>
            24h Order History (Last 50)
          </div>
        </div>
        <div className="table-block flex overflow-scroll">
          <div className="tbl-sec flex flex-col">
            <div className="tbl-row flex">
              {orderTab === "open" ? (
                <>
                  {columns.map(obj => {
                    return (
                      <div className="tbl-col" key={obj.key}>
                        {obj.title}
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {filteredColumns?.map(obj => {
                    return (
                      <div className="tbl-col" key={obj.key}>
                        {obj.title}
                      </div>
                    );
                  })}
                </>
              )}
              {/* <div className="tbl-col">Date</div>
            <div className="tbl-col">Pair</div>
            <div className="tbl-col">Type</div>
            <div className="tbl-col">Side</div>
            <div className="tbl-col">Price</div>
            <div className="tbl-col">Amount</div>
            <div className="tbl-col">Filled</div>
            <div className="tbl-col">Filled%</div>
            <div className="tbl-col">Total</div>
            <div className="tbl-col">Trigger rule</div>
            <div className="tbl-col">Action</div> */}
            </div>
            {/* {accLoading && <Loader />} */}
            {isWalletConnected ? (
              orderTab === "open" ? (
                !accLoading ? (
                  dataSource.length > 0 ? (
                    dataSource.map((item, index) => {
                      let total = (Number(item?.price) * Number(item?.amount)).toFixed(4);
                      return (
                        <div className="tbl-row flex" key={index}>
                          <div className="tbl-col">{item.date}</div>
                          <div className="tbl-col">{item.pair}</div>
                          <div className="tbl-col">{item.offerType}</div>
                          <div className={`tbl-col ${item.side == "Buy" ? "green" : "red"}`}>{item.side}</div>

                          <div className="tbl-col">{item.price}</div>
                          <div className="tbl-col">{item?.amount}</div>
                          <div className="tbl-col">{total}</div>
                          {/* <div className="tbl-col">{item.filled2}</div>
                      <div className="tbl-col">{item.total}</div>
                      <div className="tbl-col">{item.rule}</div> */}
                          {/* class of below : ${
                  item.action == "Cancel" ? "blue" : item.action == "Cancelled" ? "red" : item.history.status == "Filled" ? "green" : ""
                } */}
                          <div onClick={e => onDelete(item.action, e)} className={`tbl-col cursor-pointer red`}>
                            Delete
                            {/* {orderTab === "history" ? <> {item.history.status}</> : <>{item.action}</>} */}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <>
                      <div className="flex items-center justify-center no-result">No result found</div>
                    </>
                  )
                ) : (
                  <Loader />
                )
              ) : !hisLoading ? (
                dataSourceHistory.length > 0 ? (
                  dataSourceHistory.map((item, index) => (
                    <div className="tbl-row flex" key={index}>
                      <div className="tbl-col">{item.date}</div>
                      <div className="tbl-col">{item.pair}</div>
                      <div className="tbl-col">{item.offerType}</div>
                      <div className={`tbl-col ${item.side == "Buy" ? "green" : "red"}`}>{item.side}</div>

                      <div className="tbl-col">{item.amount}</div>
                      <div className="tbl-col">{item.price}</div>
                      <div className="tbl-col">{item.total}</div>
                      {/* <div className="tbl-col">{item.filled2}</div>
                      <div className="tbl-col">{item.total}</div>
                      <div className="tbl-col">{item.rule}</div> */}
                      {/* class of below : ${
                  item.action == "Cancel" ? "blue" : item.action == "Cancelled" ? "red" : item.history.status == "Filled" ? "green" : ""
                } */}
                      {/* <div
                        onClick={(e) => onDelete(item, e)}
                        className={`tbl-col cursor-pointer red`}
                      >
                        Delete
                        {/* {orderTab === "history" ? <> {item.history.status}</> : <>{item.action}</>} 
                      </div> */}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center justify-center no-result">No result found</div>
                  </>
                )
              ) : (
                <Loader />
              )
            ) : (
              <>
                <div className="flex items-center justify-center no-result">connect wallet</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountOffersTable;
