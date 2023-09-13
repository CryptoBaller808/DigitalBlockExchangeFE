import React from "react";
import "./style.css";
import Mainlogo from "../../Images/homepage-header-final.gif";

function CryptoComponent() {
  return (
    <div className="Maincrypto666">
      <div>
        {/* Your video element */}
        <video className="mainVideo" autoPlay loop muted>
          <source src="../../Images/homepage-header-final-new.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Your image */}
        {/*<img className="mainimg" src={Mainlogo} alt="" />*/}
      </div>
    </div>
  );
}

export default CryptoComponent;
