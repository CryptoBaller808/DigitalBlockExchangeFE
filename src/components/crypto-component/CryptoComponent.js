import React, { useEffect, useState } from "react";
import "./style.css";
import Mainlogo from "../../Images/homepage-header-final.gif";
import { getBanners } from "../../api/executers/Banner";

function CryptoComponent() {
  const [banner, setbanner] = useState(null)

  const handleGetBanner = async type => {
    try {
      const resp = await getBanners(type);
      if (resp.success) {
        setbanner(resp.data.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetBanner("home");
  }, []);


  return (
    <>
      <div className="Maincrypto666">
        <div>
          {/* Your video element */}
          {/* <video className="mainVideo" autoPlay loop muted>
          <source src="../../images/homepage-header-final-new.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}

          {/* Your image */}
          {/*<img className="mainimg" src={Mainlogo} alt="" />*/}
        </div>

      </div>
      <div className="w-full">
        {
          banner && banner.endsWith("mp4") ? (
            <video src={banner}  autoPlay className="w-full" />
          ) : (
            <img src={banner} alt="Banner" className="h-[430px] w-full" />
          )
        }
      </div></>
  );
}

export default CryptoComponent;
