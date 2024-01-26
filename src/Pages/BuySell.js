import React from "react";
import Banxa from '../Images/banxa.png';
import Topper from '../Images/topper.png';
import { Link } from "react-router-dom";

const BuySell = () => {

  // handle on click buy 
  const handleOnBuy = (option) => {
    if (option === "banxa") {

    } else if (option === "topper") {

    }
  }
  return (
    <div className="buy-sell flex flex-col">
      <div className="buy-sell-hero-sec"></div>
      <div className="wrap wrapWidth flex aic flex-col">
        <div className="buy-sell-card-block">
          <div className="card flex flex-col aic">
            <img src="./banxa.png" className="img" />
            <div className="meta flex flex-col justify-between">
              <div className="flex flex-col">
                <div className="card-tag">Banxa OnRamp</div>
                <div className="card-desc text-center pt-7">Upfront fees: FREE to 1.99% for ACH or Card payments.</div>
                <div className="card-desc text-center">Credit/Debit Card, Apple Pay, Google Pay or ACH accepted!</div>
              </div>
              <div className="payment-method-logos flex items-center justify-center gap-3 mb-2">
                <img src="./images/visa1.png" className="pm-logo" />
                <img src="./images/MastercardLogo1.png" className="pm-logo" />
                <img src="./images/apple-pay1.png" className="pm-logo" />
              </div>
            </div>
            <Link to="https://xumm.app/detect/xapp:banxa.onofframp" target="_blank" className="btn button">Buy/Sell</Link>
          </div>
          <div className="card flex flex-col aic">
            <img src="./topper.png" className="img" />
            <div className="meta flex flex-col justify-between">
              <div className="flex flex-col">
                <div className="card-tag">Topper OnRamp</div>
                <div className="card-desc text-center pt-7">Upfront fees: $1 to 3.9%</div>
                <div className="card-desc text-center pt-7">Use your Credit or Debit Card!</div>
              </div>
              <div className="payment-method-logos flex items-center justify-center gap-3 mb-2">
                <img src="./images/visa1.png" className="pm-logo" />
                <img src="./images/MastercardLogo1.png" className="pm-logo" />
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
