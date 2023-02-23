import React, { useState, useEffect } from "react";
import { TokenIcon, DropDownIcon, ExchangeIcon, ExchangeArrowIcon } from "../Icons";
import Modal from "../components/Modal";
import WalletConnect from "../components/WalletConnect";
import Select from "react-select";
import currency from "../helper/currencies";

const Swap = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(null);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  // handleChange = selectedOption => {
  //   setState(selectedOption);
  // };
  const [selectedOption, setSelectedOption] = useState(null);
  console.log("currency", currency);
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
                  <div className="token-info flex w-full">
                    <div className="icon flex aic jc">
                      <TokenIcon />
                    </div>
                    <div className="about-token flex flex-col w-full">
                      <div className="lbl">Swap From :</div>
                      <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        getOptionLabel={option => option.currency}
                        getOptionValue={option => option.currency}
                        options={currency}
                        placeholder="Select Currency"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="field flex">
                  <input type="text" className="txt cleanbtn" placeholder="Swap amount" />
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
                  <div className="token-info flex w-full">
                    <div className="icon flex aic jc">
                      <img src="./images/DBXIcon.png" className="token-img" />
                    </div>
                    <div className="about-token flex flex-col w-full">
                      <div className="lbl">Swap To:</div>
                      <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        getOptionLabel={option => option.currency}
                        getOptionValue={option => option.currency}
                        options={currency}
                        placeholder="Select Currency"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="field flex">
                  <input type="text" className="txt cleanbtn" placeholder="Swap amount" />
                </div>
              </div>
            </div>
          </div>
          <div className="action">
            <div className="btn button" onClick={e => setOpen(true)}>
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
