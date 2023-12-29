import QRCode from "react-qr-code";
import { useState, useEffect } from "react";
import { connectWallet } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useSocket } from "../../context/socket";
import * as balanceAction from "../../redux/xummBalance/action";
import { toast } from "react-toastify";

const StellarWalletConnect = ({ setOpen }) => {
  const [uri, setUri] = useState(null);
  const dispatch = useDispatch();
  const socket = useSocket();

  const connectXlmWallet = async () => {
    socket.emit("xlm-qr-code");

    socket.on("qr-app-response", args => {
      setUri(args);
    });

    socket.on("connect-error", args => {
      toast.error("Error in connect wallet.");
      setOpen(false);
    });

    socket.on("account-response", args => {
      dispatch(balanceAction.setBalance(args));
      if (args) {
        dispatch(connectWallet(true));
        setOpen(false);
      }
    });

    socket.on("connection");
  };

  useEffect(() => {
    connectXlmWallet();
  }, []);

  return (
    <div className="p-8 bg-white">
      <div className="desc">Scan QR code to connect</div>
      {uri ? (
        <QRCode size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={uri} viewBox={`0 0 256 256`} />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default StellarWalletConnect;
