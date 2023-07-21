import React, { useState, useEffect } from "react";
import { TelegramIcon, TwitterIcon } from "../Icons";
import Logo from "../assets/Logo-f.svg";
import LogoHorizontal from "../assets/DBXhorizontal-logo.svg";
const Footer = () => {

    // Function to get the saved mode from localStorage or use the default (light) mode
  const getSavedMode = () => {
    const savedMode = localStorage.getItem('mode');
    return savedMode ? JSON.parse(savedMode) : false;
  };

  const [isDarkMode, setIsDarkMode] = useState(getSavedMode);

  // Function to handle the checkbox change and toggle between dark and light mode
  const handleCheckboxChange = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('mode', JSON.stringify(newMode));
      return newMode;
    });
  };

  // Effect to set the class on the body based on the current mode
  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

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
            {/*<div className="tag">Useful Link</div>
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
          </a>*/}
          </div>
          <div className="items flex flex-col">
            <div className="tag">Legal</div>
            <a href="/" className="lbl">
              Privacy Policy
            </a>
            <a href="/" className="lbl">
              Terms of Service
            </a>
          </div>
          <div className="items flex flex-col">
            {/*<div className="tag">Trading</div>
            <a href="/" className="lbl">
              Fees
        </a>*/}
          </div>
          <div className="items flex flex-col">
            <div className="tag">Contact Us</div>
            {/*<a href="/" className="lbl">
              Submit a request
            </a>
            <a href="/" className="lbl">
              Locate a Lost Deposit
            </a>*/}
            <a href="/" className="lbl">
            FAQ
            </a>
            <a href="/" className="lbl">
              Listing Application
            </a>
          </div>
        </div>
      </div>
      <div className="color-toggle">
      <input type="checkbox" className="checkbox" checked={isDarkMode} onChange={handleCheckboxChange} id="checkbox" />
      <label for="checkbox" className="checkbox-label">
        <i className="fa fa-moon"></i>
        <i className="fa fa-sun"></i>
        <span className="ball"></span>
      </label>
    </div>
    </div>
    
  );
};

export default Footer;
