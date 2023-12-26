import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { DropDownIcon, MenuIcon } from "../Icons";
import LogoHorizontal from "../assets/DBX-new.png";
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "./Modal";
import WalletConnect from "./WalletConnect";
import { useSelector, useDispatch } from "react-redux";
import { setModalOpen } from "../redux/actions";
import DisconnectModal from "./Modal/DisconnectModal";
import NetworksSelection from "./Networks";

const Header = ({ openSidebar, setOpenSidebar }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const isWalletConnected = useSelector(state => state.authReducer.isWalletConnected);
  const balance = useSelector(state => state.signInData?.balance);

  const [BalanceData, setBalanceData] = useState(balance);
  //prepring user id string
  const accountStr = balance?.account;
  let dottedStr = accountStr?.substr(0, 5) + "..." + accountStr?.substr(accountStr?.length - 4);

  const network = useSelector(state => state.networkReducers.token);

  useEffect(() => {
    if (balance == null) {
      setBalanceData(balance);
    }
  }, []);
  const onHide = () => {
    setModalShow(false);
  };
  const handelDisconnect = () => {
    // dispatch(balanceAction.setBalanceEmpty());
    setModalShow(true);
  };
  // const { generalReducers, user } = useSelector(state => state);
  // console.log("generalReducers", generalReducers);
  //is wallet is connected or not
  const navList = [
    { id: 1, title: "Home", slug: "/", icon: "" },
    { id: 2, title: "Buy/Sell", slug: "/buysell", icon: "" },
    { id: 2, title: "Exchange", slug: "/exchange", icon: "" },
    { id: 3, title: "Swap", slug: "/swap", icon: "" },
    { id: 4, title: "NFT", slug: "/nft", icon: "" },
    {
      /*} { id: 5, title: "NFT", slug: "/nft", icon: "" },
    { id: 6, title: "Orders", slug: "/orders", icon: <DropDownIcon /> },
    { id: 7, title: "DBX Coin", slug: "/dbx_coin", icon: "" },
  { id: 8, title: "DBX Card", slug: "/dbx_card", icon: "" },*/
    },
  ];
  const handleClickOpen = () => {
    //if (location.pathname === "/exchange") {
    dispatch(setModalOpen(true));
    setOpen(true);
    //}
  };
  return (
    <div className="header-cmp flex aic">
      <div className="wrapWidth wrap flex aic">
        <div className="hdr-left flex aic">
          <Link to="/">
            <img src={LogoHorizontal} className="logo-img" />
          </Link>
          <div
            className="menu-icon"
            onClick={e => {
              setOpenSidebar(!openSidebar);
              e.stopPropagation();
            }}>
            <MenuIcon />
          </div>
        </div>
        <div className="hdr-center flex aic jc">
          <div className="nav-list flex aic">
            {navList.map((item, index) => (
              <NavLink
                key={index}
                to={`${item.slug}`}
                exact
                onClick={e => setActiveTab(item.title)}
                className={`li-item flex aic ${activeTab === item.title ? "active1" : ""}`}>
                {item.title}
                {item.icon && <div className="ico">{item.icon}</div>}
              </NavLink>
            ))}
          </div>
        </div>
        <NetworksSelection network={network}/>
        <div className="hdr-right flex aic">
          {/* {!generalReducers?.isAuthenticated ? (
            <button className="btn button cleanbtn" onClick={e => setOpen(true)}>
              Connect Wallet
            </button>
          ) : (
            <h1 style={{ color: "white" }}>{user?.firstname ? user?.firstname : "No name"}</h1>
          )} */}
          {isWalletConnected ? (
            balance?.success ? (
              <>
                <div className={dottedStr !== "undefined...undefined" && "mainbtnn btn button cleanbtn"}>
                  {/* <div>
                    <p className="xpr1">{balance?.balance}</p>
                  </div> */}

                  {dottedStr !== "undefined...undefined" && (
                    <>
                      {/* <div>
                        <p className="xpr1">XRP</p>
                      </div> */}
                      <div className="xpr33">
                        <p>{dottedStr}</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="disconnect-wallet btn button cleanbtn ml-4" onClick={handelDisconnect}>
                  <LogoutIcon fontSize="small" className="logout-icon " />
                </div>
              </>
            ) : (
              <button className="btn button cleanbtn" onClick={() => handleClickOpen()}>
                Connect Wallet
              </button>
            )
          ) : (
            <button className="btn button cleanbtn" onClick={() => handleClickOpen()}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <WalletConnect open={open} setOpen={setOpen} />
        </Modal>
      )}
      {modalShow && <DisconnectModal show={handelDisconnect} onHide={onHide} />}
    </div>
  );
};

export default Header;
