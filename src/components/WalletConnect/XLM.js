import QRCode from "react-qr-code";
import { useState, useEffect } from "react";
import { connectWallet } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useSocket } from "../../context/socket";
import * as balanceAction from "../../redux/xummBalance/action";
import { toast } from "react-toastify";
import { CrossIcon } from "../../Icons";

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
      toast.success("Wallet connected successfully.");
      if (args) {
        dispatch(connectWallet(true));
        setOpen(false);
      }
    });

    socket.on("wallet_disconnect", () => {
      dispatch(balanceAction.setBalance(null));
      dispatch(connectWallet(false));
      toast.warning("Wallet disconnected.");
    });

    socket.on("connection");
  };

  const openApp = async () => {
  };
  const close = async () => {
    setOpen(false)
  };
  useEffect(() => {
    connectXlmWallet();
  }, []);

  return (
    <div className="p-8 bg-white">
       <div onClick={close} className="absolute right-2 top-2">
        <CrossIcon />
      </div>
      <span className="font-bold mb-2 text-lg">Connect using LOBSTR</span>  

      <div className="desc mt-2 mb-1">Scan QR code to connect</div>
      {uri ? (
        <QRCode size={240} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={uri} viewBox={`0 0 256 256`} />
      ) : (
        "Loading..."
      )}
      <button onClick={openApp} class="mt-4 bg-green w-full text-gray-800 p-2 font-semibold  border border-green-400 rounded">
        Open LOBSTR App{" "}
      </button>
    </div>
  );
};

export default StellarWalletConnect;
