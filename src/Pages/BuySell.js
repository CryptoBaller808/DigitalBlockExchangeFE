import React from "react";

const BuySell = () => {
  return (
    <div className="buy-sell flex flex-col">
      <div className="buy-sell-hero-sec"></div>
      <div className="wrap wrapWidth flex aic flex-col">
        <div className="buy-sell-card-block">
          <div className="card flex flex-col aic">
            <img src="./images/buySell.png" className="img" />
            <div className="meta flex flex-col">
              <div className="card-tag">Legend Trading</div>
              <div className="card-desc text-center py-7">
                Low fee: trading fee as low as 0.08% No wire fee for ACH USD
                payments. International Wire Transfer: USD/EUR/GBP/
                HKD/SGD/AUD/CHF/MXN available
              </div>
            </div>
            <div className="btn button">Buy/Sell</div>
          </div>
          <div className="card flex flex-col aic">
            <img src="./images/buy.png" className="img" />
            <div className="meta flex flex-col">
              <div className="card-tag">Credit Card - Simplex</div>
              <div className="card-desc text-center pt-7">
                Average of 10-30 mins for cryptocurrency to reach your wallet.
                Convenient: Visa and MasterCard accepted
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
            <div className="btn button">Buy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuySell;
