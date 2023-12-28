import React from "react";
import Banxa from '../Images/banxa.png';
import Topper from '../Images/topper.png';
import { Link } from "react-router-dom";

const BuySell = () => {

  // handle on click buy 
  const handleOnBuy = (option) => {
    if(option === "banxa"){
      
    }else if(option === "topper"){

    }
  }
  return (
    <div className="buy-sell flex flex-col">
      <div className="buy-sell-hero-sec"></div>
      <div className="wrap wrapWidth flex aic flex-col">
        <div className="buy-sell-card-block">
          <div className="card flex flex-col aic">
            <img src={Banxa} className="img" />
            <div className="meta flex flex-col">
              <div className="card-tag">Banxa OnRamp</div>
              <div className="card-desc text-center py-7">
                Upfront fees: FREE to 1.99% for ACH or Card payments.
                <br />
                Credit/Debit Card, Apple Pay, Google Pay or ACH accepted!
              </div>
              <div className="payment-method-logos flex aic jc">
                <img src="./images/visa1.png" className="pm-logo h-10" />
                <img
                  src="./images/MastercardLogo1.png"
                  className="pm-logo h-14 px-3"
                />
                <img src="./images/apple-pay1.png" className="pm-logo h-16" />
              </div>
            </div>
            <Link to="https://xumm.app/detect/xapp:banxa.onofframp" target="_blank" className="btn button">Buy/Sell</Link>
          </div>
          <div className="card flex flex-col aic">
            <img src={Topper} className="img" />
            <div className="meta flex flex-col">
              <div className="card-tag mb-3">Topper OnRamp</div>
              <div className="card-desc text-center pt-7 mb-4">
                Upfront fees: $1 to 3.9%.
              </div>
              <div className="card-desc text-center mb-4">
                Use your Credit or Debit Card!
              </div>
              <div className="payment-method-logos flex aic jc mt-4">
                <img src="./images/visa1.png" className="pm-logo h-10" />
                <img
                  src="./images/MastercardLogo1.png"
                  className="pm-logo h-14 px-3"
                />
              </div>
            </div>
            <Link to="https://xumm.app/detect/xapp:uphold.topper" target="_blank" className="btn button">Buy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuySell;
