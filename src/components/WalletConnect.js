import React, { useState, useContext, useEffect } from "react";
import { CrossIcon } from "../Icons";
import axios from "axios";
import { useSelector, useDispatch, connect } from "react-redux";

import { setModalOpen, connectWallet } from "../redux/actions";
import * as balanceAction from "../redux/xummBalance/action";
import * as QRCodeAction from "../redux/xummQRCode/action";
// import setAuthToken from "../redux/actions/setHeaderToken";
import { SocketContext } from "../context/soket";
import XummLogo from "../Images/XummLogo.png";
import LegerLogo from "../Images/XRPLLogo.png";
const WalletConnect = ({ open, setOpen }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const [loading, setloading] = useState();
  const [xumppres, setxumppres] = useState("");
  const QRCodeResponse = useSelector((state) => state.QRCodeReducer.QRcode);

  const [qRCodeImage, setQRCodeImage] = useState(QRCodeResponse);

  // console.log("Wallet connenct socket", socket);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, []);

  const connectXumppwallet = async () => {
    setloading(true);
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/Accounts/connectwallet`);
    console.log("connectXumppwallet res22", res);
    if (res) {
      setxumppres(res?.data);
      setQRCodeImage(res?.data?.xumm_png)
    }
    let data = res?.data;
    //from redux

    // socket.emit("xumm-qr-code");
    // // console.log("QRCodeImage", QRCodeImage);

    // if (qRCodeImage == null) {
    //   socket.on("qr-response", (args) => {
    //     console.log("qr-response", args);
    //     dispatch(QRCodeAction.setQRCode(args));
    //     setQRCodeImage(args);
    //     setloading(false);
    //   });
    // }

    // socket.on("account-response", (args) => {
    //   dispatch(balanceAction.setBalance(args));
    //   if (args) {
    //     dispatch(connectWallet(true));
    //     setOpen(false);
    //   }
    // });

    // socket.on("connection");
  };
  const Verifywallet = async () => {
    console.log("Verifywallet");

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/Accounts/verifyWallet`,
      {
        verification_id: xumppres.verification_id,
      }
    );
    console.log("Verifywallet res22", res);
    if (res?.data == "User Haven't resolved the sign in request yet.") {
      return alert("Please scan qr code through xumpp app");
    } else {
      dispatch(connectWallet(true));
      setOpen(false);
    }
    let data = res?.data;
    // if(res){
    //   setAuthToken(data.access_token)
    // }
    // let data = {
    //   id: 124,
    //   wallet_address: "rK5adqWCSJs7chADSbBpc42RSFd8isMo3x",
    //   access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRfYWRkcmVzcyI6InJLNWFkcVdDU0pzN2NoQURTYkJwYzQyUlNGZDhpc01vM3giLCJpYXQiOjE2NTk4OTQ1NTksImV4cCI6MTY1OTk4MDk1OX0.pJ7Bq-E99jc_ince4sT0MaGZ5iZeRg_jYacaAaWIXts",
    //   request_token : "fe1e3903-63b0-4382-a567-92d5b5d7d2ee"
    // }
    const res2 = await axios.get(
      `${process.env.REACT_APP_API_URL}/profiles/getuserProfile/${data.id}`
    );
    console.log("getuserProfile", res2);
    if (res2?.data) {
      dispatch({
        type: "GET_USER",
        payload: { ...data, ...res2.data },
      });
      setOpen(false);
    }
  };
  // console.log("res22");
  return (
    <div className="wallet-connect flex flex-col">
      <div className="wrap flex flex-col">
        {qRCodeImage ? (
          <>
            <div className="hdr flex aic">
              <div className="lbl">Please verify through app</div>
              <div
                className="ico flex aic jc pointer"
                onClick={(e) => setOpen(false)}
              >
                <CrossIcon />
              </div>
            </div>
            <div className="desc">
              Please scan this qr code from mobile app:
            </div>
            <div className="action flex flex-col">
              <div className="avil-wallet flex flex-col aic jc">
                <div className="btn flex aic jc">
                  <img
                    style={{ width: 140, height: 140 }}
                    src={qRCodeImage}
                    className="img flex aic"
                  />
                  <p className="lbl flex aic">Qr scanned ?</p>
                </div>
              </div>
              <div className="new-wallet flex flex-col aic jc">
                <div className="qt-lbl"></div>
                <div onClick={Verifywallet} className="btn button">
                  Qr scanned ?
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="hdr flex aic">
              <div className="lbl">Select a Wallet</div>
              <div
                className="ico flex aic jc pointer"
                onClick={(e) => setOpen(false)}
              >
                <CrossIcon />
              </div>
            </div>
            <div className="desc">
              Connect your wallet using one of the following methods:
            </div>
            <div className="action flex flex-col">
              <div className="avil-wallet flex flex-col aic jc">
                <div
                  onClick={() => {
                    connectXumppwallet();
                  }}
                  className="btn flex aic jc"
                >
                  <img
                    src={XummLogo}
                    className="img flex aic"
                    alt="xumm logo"
                    style={{ height: "34px", marginRight: "5px" }}
                  />
                  <p className="lbl flex aic">
                    {loading ? "loading..." : "XUMM App"}
                  </p>
                </div>
                <div className="btn flex aic jc">
                  <img
                    src={LegerLogo}
                    className="img flex aic"
                    alt="leger logo"
                    style={{ height: "34px", marginRight: "5px" }}
                  />
                  <p className="lbl flex aic">Ledger Device</p>
                </div>
              </div>
              <div className="new-wallet flex flex-col aic jc">
                <div className="qt-lbl">Don’t have a wallet?</div>
                <div className="btn button">Create New Wallet</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;
