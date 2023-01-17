import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { DropDownIcon, MenuIcon } from "../Icons";

import Logo from "../assets/Logo-f.svg";
import LogoHorizontal from "../assets/DBXhorizontal-logo.svg";

import Modal from "./Modal";
import WalletConnect from "./WalletConnect";
import { useSelector, useDispatch } from "react-redux";
const Header = ({ openSidebar, setOpenSidebar }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const {generalReducers,user} = useSelector(state => state)
  console.log('generalReducers',generalReducers,user)
  const navList = [
    { id: 1, title: "Home", slug: "/", icon: "" },
    { id: 2, title: "Buy/Sell", slug: "/buysell", icon: "" },
    { id: 3, title: "Exchange", slug: "/exchange", icon: "" },
    { id: 4, title: "Swap", slug: "/swap", icon: "" },
    { id: 5, title: "NFT", slug: "/nft", icon: "" },
    { id: 6, title: "Orders", slug: "/orders", icon: <DropDownIcon /> },
    { id: 7, title: "DBX Coin", slug: "/dbx_coin", icon: "" },
    { id: 8, title: "DBX Card", slug: "/dbx_card", icon: "" },
  ];
  return (
    <div className="header-cmp flex aic">
      <div className="wrapWidth wrap flex aic">
        <div className="hdr-left flex aic">
          <Link to="/">
            <img src={LogoHorizontal} className="logo-img" />
          </Link>
          <div
            className="menu-icon"
            onClick={(e) => {
              setOpenSidebar(!openSidebar);
              e.stopPropagation();
            }}
          >
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
                onClick={(e) => setActiveTab(item.title)}
                className={`li-item flex aic ${
                  activeTab === item.title ? "active1" : ""
                }`}
              >
                {item.title}
                {item.icon && <div className="ico">{item.icon}</div>}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="hdr-right flex aic">
          {
            !generalReducers?.isAuthenticated
            ? 
              <button
              className="btn button cleanbtn"
              onClick={(e) => setOpen(true)}
              >
                Connect Wallet
              </button>
            :
              <h1 style={{color : 'white'}}>{generalReducers?.user?.firstname ? generalReducers?.user?.firstname : "No name"}</h1>
          }
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <WalletConnect open={open} setOpen={setOpen} />
      </Modal>
    </div>
  );
};

export default Header;
