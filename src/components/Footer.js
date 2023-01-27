import React from "react";
import { TelegramIcon, TwitterIcon } from "../Icons";
import Logo from "../assets/Logo-f.svg";
import LogoHorizontal from "../assets/DBXhorizontal-logo.svg";
const Footer = () => {
  return (
    <div className="footer-pg flex">
      <div className="wrapWidth wrap flex aic">
        <div className="left flex flex-col">
          <img src={LogoHorizontal} className="logo-img" />
          <div className="social flex aic">
            <div className="icon flex aic jc">
              <TelegramIcon />
            </div>
            <div className="icon flex aic jc">
              <TwitterIcon />
            </div>
          </div>
        </div>
        <div className="right flex">
          <div className="items flex flex-col">
            <div className="tag">Useful Link</div>
            <a href="/" className="lbl">
              About Us
            </a>
            <a href="/" className="lbl">
              Help Center
            </a>
            <a href="/" className="lbl">
              White Paper
            </a>
            <a href="/" className="lbl">
              Tokenomics
            </a>
          </div>
          <div className="items flex flex-col">
            <div className="tag">Legal</div>
            <a href="/" className="lbl">
              Terms
            </a>
            <a href="/" className="lbl">
              Privacy
            </a>
          </div>
          <div className="items flex flex-col">
            <div className="tag">Trading</div>
            <a href="/" className="lbl">
              Fees
            </a>
          </div>
          <div className="items flex flex-col">
            <div className="tag">Contact Us</div>
            <a href="/" className="lbl">
              Submit a request
            </a>
            <a href="/" className="lbl">
              Locate a Lost Deposit
            </a>
            <a href="/" className="lbl">
              Telegram
            </a>
            <a href="/" className="lbl">
              Listing Application
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
