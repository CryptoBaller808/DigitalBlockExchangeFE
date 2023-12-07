/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import axios from "axios";

import "./App.css";
import "./css/App.scss";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Main from "./Pages/Main";
import Exchange from "./Pages/Exchange";
import BuySell from "./Pages/BuySell";
import Swap from "./Pages/Swap";
import CreateNft from "./Pages/CreateNft";
import SingleNft from "./Pages/SingleNft";
import CreatedNFT from "./Pages/CreatedNFT";
import CollectionNft from "./Pages/CollectionNft";
import ExplorePage from "./components/ExplorePage";
import Profile from "./Pages/Profile";
import MyNftDetail from "./Pages/MyNftDetail";
import CreateNewItem from "./components/CreateNewItem";
import EditProfile from "./Pages/EditProfile";
import ContactUs from "./Pages/ContactUs";
import ListingApplication from "./Pages/ListingApplication";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
// New Pages
import LandingPage from "./Pages/landingPage/LandingPage";
// import BuySell from "./Pages/buySell/BuySell";
// import Swap from "./Pages/swap/Swap";
// import Earn from "./Pages/earn/Earn";
// import EarnOne from "./Pages/earnone/EarnOne";
// import StakeBtr from "./Pages/stakeBtr/StakeBtr";
// import StakeBtrOne from "./Pages/stakeBtrOne/StakeBtrOne";
// import NftHome from "./Pages/nftHome/nftHome";
import Orders from "./Pages/orders/Orders";
// import Assets from "./Pages/assets/Assets";
// import ExchangeNew from "./Pages/exchange/Exchange";
// import Navbar1Component from "./components/navbar1Component/Nabra1Component";
// import Navbar2Component from "../components/navbar2Component/Navbar2Component";
// import Navbar3Component from "./components/navbar3Component/Navbar3Component";
// import Navbar4Component from "./components/navbar4Component/Navbar4Component";
// import FooterComponent from "./components/footerComponent/FooterComponent";
// import { useSelector } from "react-redux";
// import ExchangeModel from "../exchangeModel/ExchangeModel";

import Sidebar from "./components/Sidebar";
import NftDetail from "./components/NftDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Resale from "./Pages/Resale";
function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const dispatch = useDispatch();
  const gettokenlocalstorage = async () => {
    let data = JSON.parse(localStorage.getItem("nft_login"));
    console.log("login_cred", data);
    const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/profiles/getuserProfile/${data?.id}`);
    console.log("res22", res2);
    if (res2?.data) {
      dispatch({
        type: "GET_USER",
        payload: { ...data, ...res2?.data },
      });
    }
  };
  // Function to get the saved mode from localStorage or use the default (light) mode
  const getSavedMode = () => {
    const savedMode = localStorage.getItem("mode");
    return savedMode ? JSON.parse(savedMode) : false;
  };
  const [selectedToken, setSelectedToken] = useState({ lbl: "XRP Ledger", value: "xrp", icon: "./images/Invest1.png" });
  const tokenList = [
    { lbl: "XRP Ledger", value: "xrp", icon: "./images/Invest1.png" },
    { lbl: "XLM Network", value: "xlm", icon: "./images/XMLicon.png" },
  ];
  const [isDarkMode, setIsDarkMode] = useState(getSavedMode);

  // Function to handle the checkbox change and toggle between dark and light mode
  const handleCheckboxChange = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem("mode", JSON.stringify(newMode));
      return newMode;
    });
  };

  // Effect to set the class on the body based on the current mode
  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  useEffect(() => {
    gettokenlocalstorage();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Header
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          tokenList={tokenList}
        />
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/buysell" element={<BuySell />} exact />
          <Route path="/orders/*" element={<Orders />} exact />
          <Route path="/nft" element={<Main />} exact />
          <Route
            path="/swap"
            element={<Swap selectedToken={selectedToken} setSelectedToken={setSelectedToken} tokenList={tokenList} />}
            exact
          />
          <Route path="/exchange" element={<Exchange isDarkMode={isDarkMode} />} exact />
          <Route path="/profile-edit" element={<EditProfile />} exact />
          <Route path="/nft-detail" element={<NftDetail />} exact />
          <Route path="/nft-create" element={<CreateNft />} exact />
          <Route path="/single-create" element={<SingleNft />} exact />
          <Route path="/creatednft/:id" element={<CreatedNFT />} exact />
          <Route path="/collection-create" element={<CollectionNft />} exact />
          <Route path="/nft-explore" element={<ExplorePage />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/nft-detail/:name" element={<MyNftDetail />} exact />
          <Route path="/create-item" element={<CreateNewItem />} exact />
          <Route path="nft-detail/resale/:id" element={<Resale />} exact />
          <Route path="/collection/:name" element={<MyNftDetail />} exact />
          <Route path="/contactUs" element={<ContactUs />} exact />
          <Route path="/listing-application" element={<ListingApplication />} exact />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} exact />
        </Routes>
        <Footer />
      </BrowserRouter>

      <div className="color-toggle" onClick={handleCheckboxChange}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" fill="none" viewBox="0 0 26 24">
          <path
            fill="#333539"
            d="M12.085 1.5h1.61v3.75h-1.61V1.5zM17.467 6.675l2.822-2.63 1.138 1.061-2.822 2.63-1.138-1.06zM20.134 11.25h4.024v1.5h-4.024v-1.5zM17.467 17.325l1.138-1.06 2.822 2.63-1.138 1.06-2.822-2.63zM12.085 18.75h1.61v3.75h-1.61v-3.75zM4.352 18.894l2.822-2.63 1.138 1.062-2.822 2.63-1.138-1.062zM1.62 11.25h4.025v1.5H1.621v-1.5zM4.352 5.106L5.49 4.045l2.822 2.63-1.138 1.06-2.822-2.629zM12.89 9c.636 0 1.259.176 1.788.506.53.33.942.798 1.186 1.346a2.81 2.81 0 01.183 1.733 2.943 2.943 0 01-.881 1.536 3.3 3.3 0 01-1.649.821 3.44 3.44 0 01-1.86-.17 3.18 3.18 0 01-1.445-1.105A2.856 2.856 0 019.67 12c0-.795.34-1.558.944-2.12A3.347 3.347 0 0112.889 9zm0-1.5c-.956 0-1.89.264-2.684.758a4.585 4.585 0 00-1.779 2.02 4.216 4.216 0 00-.274 2.6 4.414 4.414 0 001.321 2.304 4.948 4.948 0 002.473 1.231 5.158 5.158 0 002.79-.256 4.773 4.773 0 002.168-1.657c.53-.74.814-1.61.814-2.5 0-1.194-.509-2.338-1.415-3.182C15.4 7.974 14.17 7.5 12.89 7.5z"></path>
        </svg>
      </div>
    </div>
  );
}

export default App;
