import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { HorzontalMenuIcon, RoundCrossIcon, HeartIcon } from "../Icons";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Keyboard, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HotBids = () => {
  const [hotbids, sethotbids] = useState("");
  const { user } = useSelector((state) => state.generalReducers);
  const getFixedItemsOnSale = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/sale/getFixedItemsOnSale`
      );
      console.log("hotbid_res", res);
      if (res?.data) {
        sethotbids(res.data?.rows);
        console.log("HotBids List", hotbids);
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error?.response);
      if (error?.response?.data == "No items found") {
        sethotbids([]);
      }
    }
  };

  useEffect(() => {
    getFixedItemsOnSale();
  }, []);
  var settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [numbs, setNumbs] = useState([
    {
      img: "/images/nft1.png",
      name: "New Age Soldier",
      numb: "Tommy #700",
      rate: "22.2",
      like: "15",
    },
    {
      img: "/images/nft2.png",
      name: "EXPLODED",
      numb: "Facer Pirate #09",
      rate: "10.0",
      like: "1",
    },
    {
      img: "/images/nft3.png",
      name: "SUPAH Trooperzzz",
      numb: "Pep Troopers.",
      rate: "56.7",
      like: "89",
    },
  ]);
  console.log("HotBids List", hotbids);
  return (
    <div className="hot-bids flex aic">
      <div className="wrapWidth wraps flex flex-col">
        <div className="p-hdr flex">Hot bids</div>
        <div className="hot-bids-nft  flex ">
          <div className="blk wrapper flex aic">
            {hotbids.length > 0 ? (
              <Swiper
                slidesPerView={4}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  440: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  540: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  820: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1200: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
                spaceBetween={20}
                keyboard={{
                  enabled: true,
                }}
                navigation={true}
                modules={[Keyboard, Navigation]}
                className="mySwiper"
              >
                {hotbids?.map((item, index) => (
                  <SwiperSlide>
                    <Card item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="lbl">Not Items found</div>
            )}
            {/* <Slider {...settings}>
              {
                hotbids &&
                <>
                {
                hotbids.length > 0 ?
                hotbids.map((item, index) => (
                  <Card item={item}/>
                ))
                :
                <div className="lbl">Not Items found</div>
                }
                </>
              }
              
            </Slider> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotBids;
