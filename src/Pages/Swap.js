import React, { useState, useEffect } from "react";
import {
  TokenIcon,
  DropDownIcon,
  ExchangeIcon,
  ExchangeArrowIcon,
} from "../Icons";
import Modal from "../components/Modal";
import WalletConnect from "../components/WalletConnect";
const Swap = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="swap-page flex">
      <div className="wrap wrapWidth flex aic flex-col">
        <div className="swap-block flex flex-col">
          <div className="swap-tab flex item-center justify-center">
            <div className="swap-item">Swap</div>
          </div>
          <div className="swap-cards flex items-center">
            <div className="card-left flex">
              <div className="card flex flex-col">
                <div className="card-hdr flex items-center justify-between">
                  <div className="token-info flex">
                    <div className="icon flex aic jc">
                      <TokenIcon />
                    </div>
                    <div className="about-token flex flex-col">
                      <div className="lbl">Swap From :</div>
                      <div className="tag">XRP</div>
                    </div>
                  </div>
                  <div className="dropDown-box flex">
                    <div className="drop-icon flex aic jc cursor-pointer">
                      <DropDownIcon />
                    </div>
                  </div>
                </div>
                <div className="field flex">
                  <input
                    type="text"
                    className="txt cleanbtn"
                    placeholder="Swap amount"
                  />
                </div>
              </div>
            </div>
            <div className="card-center flex aic jc">
              <div className="exchange-icon flex aic jc">
                <ExchangeArrowIcon />
              </div>
            </div>
            <div className="card-right flex">
              <div className="card flex flex-col">
                <div className="card-hdr flex items-center justify-between">
                  <div className="token-info flex">
                    <div className="icon flex aic jc">
                      <img src="./images/DBXIcon.png" className="token-img" />
                    </div>
                    <div className="about-token flex flex-col">
                      <div className="lbl">Swap To:</div>
                      <div className="tag">DBX</div>
                    </div>
                  </div>
                  <div className="dropDown-box flex">
                    <div className="drop-icon flex aic jc cursor-pointer">
                      <DropDownIcon />
                    </div>
                  </div>
                </div>
                <div className="field flex">
                  <input
                    type="text"
                    className="txt cleanbtn"
                    placeholder="Swap amount"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="action">
            <div className="btn button" onClick={(e) => setOpen(true)}>
              Connect Wallet
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <WalletConnect open={open} setOpen={setOpen} />
      </Modal>
    </div>
  );
};

export default Swap;
