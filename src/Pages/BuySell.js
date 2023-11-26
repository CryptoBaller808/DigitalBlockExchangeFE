import React from "react";

const BuySell = () => {
  return (
    <div className="buy-sell flex flex-col">
      <div className="buy-sell-hero-sec"></div>
      <div className="wrap wrapWidth flex aic flex-col">
        <div className="buy-sell-card-block">
          <div className="card flex flex-col aic">
            <img src="./banxa.png" className="img" />
            <div className="meta flex flex-col">
              <div className="card-tag">Banxa OnRamp</div>
              <div className="card-desc text-center pt-7">Upfront fees: FREE to 1.99% for ACH or Card payments.</div>
              <div className="card-desc text-center mb-7">Credit/Debit Card, Apple Pay, Google Pay or ACH accepted!</div>
              <div className="payment-method-logos flex items-center justify-center gap-3">
                <img src="./images/visa1.png" className="pm-logo" />
                <img src="./images/MastercardLogo1.png" className="pm-logo" />
                <img src="./images/apple-pay1.png" className="pm-logo" />
              </div>
            </div>
            <div className="btn button">Buy/Sell</div>
          </div>
          <div className="card flex flex-col aic">
            <img src="./topper.png" className="img" />
            <div className="meta flex flex-col">
              <div className="card-tag">Topper OnRamp</div>
              <div className="card-desc text-center pt-7">Upfront fees: $1 to 3.9%</div>
              <div className="card-desc text-center pt-7 mb-7">Use your Credit or Debit Card!</div>
              <div className="payment-method-logos flex items-center justify-center gap-3">
                <img src="./images/visa1.png" className="pm-logo" />
                <img src="./images/MastercardLogo1.png" className="pm-logo" />
              </div>
            </div>
            <div className="btn button">Buy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuySell;
