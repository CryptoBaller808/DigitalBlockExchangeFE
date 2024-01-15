import React, { useState } from "react";
import { DropDownIcon } from "../Icons";

const TokenListDropDown = ({ dropDownList, selectedValue, setSelectedValue }) => {
  const [hide, setHide] = useState(false);

  return (
    <div className="dropDown token-drop-down flex items-center justify-center flex-col relative">
      <div className="category flex items-center">
        <div
          className="cbox cleanbtn flex items-center relative pointer gap-3"
          onClick={e => {
            e.stopPropagation();
            setHide(!hide);
          }}>
          <div className="slt flex items-center gap-1">
            <div className="icon flex items-center justify-center h-5 w-5">
              <img src={selectedValue.icon} className="h-full w-full object-contain" />
            </div>
            <div className="unit-name flex items-center font s14 b4">
              <span className="unit-eng flex items-center font s14 b4" placeholder="Ethereum Network">
                {selectedValue ? selectedValue.lbl : ""}
              </span>
            </div>
          </div>

          <div className="arrow-icon flex items-center justify-center h-5 w-5">
            <DropDownIcon />
          </div>
        </div>
      </div>
      <div className={`block flex items-center absolute ${hide ? "show" : ""}`}>
        <div className="manue flex items-center flex-col anim gap-1">
          {dropDownList.map((item, index) => (
            <div
              key={index}
              className="slt flex items-center gap-2"
              onClick={e => {
                setHide(!hide);
                setSelectedValue(item);
              }}>
              <div className="icon flex items-center justify-center h-5 w-5">
                <img src={item.icon} className="h-full w-full object-contain" />
              </div>
              <div className="unit-name flex aic font s14 b4">
                <span className="unit-eng flex aic font s14 b4">{item.lbl}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenListDropDown;
