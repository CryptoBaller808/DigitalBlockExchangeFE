import React from "react";
import "./style.css";
import Mainlogo from "../../Images/header-final.svg";
// import Mainlogo2 from "../../Images/header-mobile-device1 1.png";

function CryptoComponent() {
  return (
    <div className="Maincrypto666">
      <div>
        <img className="mainimg" src={Mainlogo} alt="" />
        {/* <div className="mainimg2">
          <img src={Mainlogo2} alt="" />
        </div> */}
      </div>
    </div>
  );
}

export default CryptoComponent;
