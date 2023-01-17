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
import CollectionNft from "./Pages/CollectionNft";
import ExplorePage from "./components/ExplorePage";
import Profile from "./Pages/Profile";
import MyNftDetail from "./Pages/MyNftDetail";
import CreateNewItem from "./components/CreateNewItem";
import EditProfile from "./Pages/EditProfile";
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
  useEffect(() => {
    gettokenlocalstorage();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/buysell" element={<BuySell />} exact />
          <Route path="/orders/*" element={<Orders />} exact />
          <Route path="/nft" element={<Main />} exact />
          <Route path="/swap" element={<Swap />} exact />
          <Route path="/exchange" element={<Exchange />} exact />
          <Route path="/profile-edit" element={<EditProfile />} exact />
          <Route path="/nft-detail" element={<NftDetail />} exact />
          <Route path="/nft-create" element={<CreateNft />} exact />
          <Route path="/single-create" element={<SingleNft />} exact />
          <Route path="/collection-create" element={<CollectionNft />} exact />
          <Route path="/nft-explore" element={<ExplorePage />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/MyNftDetail" element={<MyNftDetail />} exact />
          <Route path="/create-item" element={<CreateNewItem />} exact />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
