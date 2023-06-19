import React, { useState, useEffect } from "react";
import { RoundCrossIcon } from "../Icons";
import Modal from "./Modal";
import Completecheckout from "./Completecheckout";
import WalletConnect from "./WalletConnect";
import PlaceBid from "./PlaceBid";
import Filters from "./Filters";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ShareModal from "./ShareModal";
import { FaShare } from 'react-icons/fa';

const NftDetail = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [data, setdata] = useState();
  const [selecteditem, setselecteditem] = useState();
  const [loading, setLoading] = useState(false);
  const [isBought, setIsBought] = useState(false);
  const [shareLinkModal, setShareLinkModal] = useState(false);
  const signInData = useSelector(state => state.generalReducers?.user);
  const { user } = useSelector((state) => state.generalReducers)
  console.log(signInData);
  const getNftById = async id => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/mint/getNftById/${id}`);
    console.log("getNftById", res?.data);
    if (res?.data) {
      setdata(res?.data);
      setselecteditem(res?.data);
    }
  };
  const searchs = useLocation().search;
  const id = new URLSearchParams(searchs).get("id");

  //  handle accept nft
  const handleAcceptNft = async () => {
    const item = {
      item_id: id,
      user_id: user.id
    }
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/sale/buyFixPriceNFTs`, { ...item });
      const data = res.data;
      setLoading(false);
      toast.success(res?.data);
      getNftById(id);
      setIsBought(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error(e?.response?.data)
    }
  }


  useEffect(() => {
    getNftById(id);
  }, []);

  // handle share link 
  const handleShareLink = () => {
    setShareLinkModal(true);
  }

  return (
    data && (

      <div className="nft-detail flex flex-col">

        {shareLinkModal && <ShareModal shareLinkModal={shareLinkModal} setShareLinkModal={setShareLinkModal}/>}
        <div className="nft-detail-filter flex aic flex-col">
          <Filters />
        </div>
        <div className="wrapWidth wrap flex flex-col">
          <div className="container flex">
            <div className="left flex flex-col aic">
              <div className="box flex aic jc">
                <img src={data.image_uri} className="img" />
              </div>
              <div className="property-box flex flex-col">
                <div className="tag">Properties</div>
                <div className="property-tag flex">
                  {data?.item_properties_details?.length ? (
                    <>
                      {data?.item_properties_details?.map(item => (
                        <div className="bx flex flex-col">
                          <div className="lbl">{item?.property_name}</div>
                          <div className="lbl2">{item?.property_value}</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    "Property detail null"
                  )}

                  {/* <div className="bx flex flex-col">
                  <div className="lbl">body</div>
                  <div className="lbl2">Skeletal</div>
                  <div className="val">9.5% rarity</div>
                </div>
                <div className="bx flex flex-col">
                  <div className="lbl">teeth prop</div>
                  <div className="lbl2">ETH Coin</div>
                  <div className="val">3.3 % rarity</div>
                </div>
                <div className="bx flex flex-col">
                  <div className="lbl">head</div>
                  <div className="lbl2">Global Facer Pirate</div>
                  <div className="val">1.9% rarity</div>
                </div>

                <div className="bx flex flex-col">
                  <div className="lbl">extras</div>
                  <div className="lbl2">Honey Bees</div>
                  <div className="val">0.02% rarity</div>
                </div>
                <div className="bx flex flex-col">
                  <div className="lbl">top</div>
                  <div className="lbl2">White Hair</div>
                  <div className="val">32.8% rarity</div>
                </div> */}
                </div>
              </div>
              <div className="detail-box flex flex-col">
                <div className="tag">Details</div>
                <div className="blk flex flex-col">
                  <div className="item flex aic">
                    <div className="le flex aic">
                      <RoundCrossIcon />
                      <p className="lbl1">XRP</p>
                    </div>
                    <div className="ri">
                      <a target="_blank" href={`${process.env.REACT_APP_XRPL_EXPLORER}/${data?.token_id}`} className="lbl">
                        View on XRPL Explorer
                      </a>
                    </div>
                  </div>
                  <div className="item flex aic">
                    <div className="le flex aic">
                      <p className="lbl">Contract address</p>
                    </div>
                    <div className="ri">
                      <p className="lbl">{data?.sc_address}</p>
                    </div>
                  </div>
                  <div className="item flex aic">
                    <div className="le flex aic">
                      <p className="lbl">Category</p>
                    </div>
                    <div className="ri flex aic">
                      <img src="./images/NFT Art 1.svg" className="ico" />
                      <p className="lbl"> {data?.item_collection?.category_details?.category_name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right flex flex-col">
              <div className="exploded-box flex flex-col">
                {/* <div className="hdr-tag">{data?.title}</div> */}
                <div className="num">{data?.title}</div>
                {data?.item_sale_info && (
                  <div className="sale-tag flex aic">
                    <div className="s-lbl">On sale for </div> <span className="s-tag">{data?.item_sale_info?.price} XRP</span>
                  </div>
                )}

                <div className="desc">{data?.explicit_content}</div>
                <div className="collector-sec">
                  <div className="item flex flex-col">
                    <div className="lbl">Creator</div>
                    <div className="nft-img flex aic">
                      <img src={data.creator?.profile_image || "unkdownload.jpeg"} className="img" />
                      <div className="nft-name">
                        {data.creator?.firstname || "Anonymous"} {data.creator?.lastname}
                      </div>
                    </div>
                  </div>
                  <div className="item flex flex-col">
                    <div className="lbl">Collection</div>
                    <div className="nft-img flex aic">
                      <img src={data.item_collection?.profile_image} className="img" />
                      <div className="nft-name">{data.item_collection?.name}</div>
                    </div>
                  </div>
                  <div className="item flex flex-col">
                    <div className="lbl">Owner</div>
                    <div className="nft-img flex aic">
                      <img src={data.current_owner_details?.profile_image || "unkdownload.jpeg"} className="img" />
                      <div className="nft-name">{data.current_owner_details?.firstname || "Anonymous"}</div>
                    </div>
                  </div>
                  <div className="item flex aic">
                    <div className="social flex flex-col aic jc">
                      <img src="./images/heart-icon.svg" className="icon" />
                      <div className="numb">{data.wishlist_count?.count}</div>
                      <div className="lbl">favorites</div>
                    </div>
                    {/* <div className="social flex flex-col aic jc">
                    <img src="./images/copies-icon.svg" className="icon" />
                    <div className="numb">10K</div>
                    <div className="lbl">editions</div>
                  </div>
                  <div className="social flex flex-col aic jc">
                    <img src="./images/group-users-icon.svg" className="icon" />
                    <div className="numb">374</div>
                    <div className="lbl">owners</div>
                  </div> */}
                    <div className="social flex flex-col aic jc">
                      {/* <img src="./images/share-icon.svg" className="icon" alt="icon" style={{ cursor: 'pointer' }} onClick={handleShareLink}/> */}
                      <FaShare className="icon" alt="icon" style={{ cursor: 'pointer' }} onClick={handleShareLink}/>
                      <div className="lbl"  >share</div>
                    </div>
                  </div>
                </div>
                <div className="actions">
                  {data?.item_sale_info?.sale_type == 1 ?
                    (
                      <>
                        {signInData?.wallet_address === data?.creator?.wallet_address ?
                          <button className="btn button" disabled onClick={e => setOpen(true)}>
                            Buy for {data?.item_sale_info?.price} XRP
                          </button>
                          :
                          <>
                            {selecteditem?.current_owner_details?.wallet_address !== signInData?.wallet_address &&
                              <>
                                {!isBought ? <div className="btn button" onClick={e => setOpen(true)}>
                                  Buy for {data?.item_sale_info?.price} XRP
                                </div> :
                                  <div className="btn button" onClick={handleAcceptNft}>
                                    {loading ? "Waiting for the response" : "Accept The Nft"}
                                  </div>}
                              </>
                            }
                          </>

                        }
                      </>
                    ) : (
                      <>
                        {signInData?.wallet_address === data?.creator?.wallet_address ?
                          <button className="btn button" disabled onClick={e => setOpen2(true)}>
                            Place a bid
                          </button>
                          :
                          <div className="btn button" onClick={e => setOpen2(true)}>
                            Place a bid
                          </div>
                        }
                      </>

                    )}
                </div>
              </div>
              <div className="history-box flex flex-col">
                <div className="tag">Details</div>
                <div className="blk flex flex-col">
                  {data?.item_activity?.map(item => (
                    <div className="item flex aic">
                      <div className="le flex aic">

                        {/* sale type 1 - img */}
                        {item?.type === 1 && <img src={item?.buyer_details?.profile_image || "unkdownload.jpeg"} className="img" />}

                        {/* sale type 2 - img */}
                        {item?.type === 2 && <img src={item?.seller_details?.profile_image || "unkdownload.jpeg"} className="img" />}

                        {/* sale type 3 - img */}
                        {item?.type === 3 && <img src={item?.buyer_details?.profile_image || "unkdownload.jpeg"} className="img" />}

                        {/* sale type 4 - img */}
                        {item?.type === 4 && <img src={item?.seller__details?.profile_image || "unkdownload.jpeg"} className="img" />}

                        {/* sale type 5 - img */}
                        {item?.type === 5 && <img src={item?.buyer_details?.profile_image || "unkdownload.jpeg"} className="img" />}

                        {/* sale type 6 - img */}
                        {item?.type === 6 && <img src={item?.seller_details?.profile_image || "unkdownload.jpeg"} className="img" />}

                      </div>
                      <div className="ri">

                        {/* sale type 1 */}
                        {item?.type === 1 &&
                          <p className="lbl">
                            NFT bought, {moment(new Date(item?.entry_date))?.fromNow()}
                            <br />

                            <span className="tkn"> {item?.buyer_details?.wallet_address}</span>
                          </p>}

                        {/* sale type 2 */}
                        {item?.type === 2 &&
                          <p className="lbl">
                            On Sale, {moment(new Date(item?.entry_date))?.fromNow()}
                            <br />

                            <span className="tkn"> {item?.seller_details?.wallet_address}</span>
                          </p>}
                        {/* sale type 3 */}

                        {item?.type === 3 &&
                          <p className="lbl">
                            Buy offer, {moment(new Date(item?.entry_date))?.fromNow()}
                            <br />

                            <span className="tkn"> {item?.buyer_details?.wallet_address}</span>
                          </p>}
                        {/* sale type 4 */}
                        {item?.type === 4 &&
                          <p className="lbl">
                            NFT Sale Cancel, {moment(new Date(item?.entry_date))?.fromNow()}
                            <br />

                            <span className="tkn"> {item?.seller__details?.wallet_address}</span>
                          </p>}
                        {/* sale type 5 */}
                        {item?.type === 5 &&
                          <p className="lbl">
                            NFT Buy Cancel, {moment(new Date(item?.entry_date))?.fromNow()}
                            <br />

                            <span className="tkn"> {item?.buyer_details?.wallet_address}</span>
                          </p>}
                        {/* sale type 6 */}
                        {item?.type === 6 &&
                          <p className="lbl">
                            NFT minted, {moment(new Date(item?.entry_date))?.fromNow()}
                            <br />

                            <span className="tkn"> {item?.seller_details?.wallet_address}</span>
                          </p>}
                        {/* {<p className="lbl">
                          NFT bought {moment(new Date(item?.entry_date))?.fromNow()}
                          <br />
                          to
                          <span className="tkn"> {item?.tx_id}</span>
                        </p>} */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Completecheckout open={open} setOpen={setOpen} setIsBought={setIsBought} id={id} iteminfo={{ ...selecteditem, ...selecteditem?.item_sale_info }} getNftById={getNftById} />
        </Modal>
        <Modal open={open2} onClose={() => setOpen2(false)}>
          <PlaceBid open={open2} setOpen={setOpen2} selecteditem={{ ...selecteditem, ...selecteditem?.item_sale_info }} getNftById={getNftById} />
        </Modal>
      </div>
    )
  );
};

export default NftDetail;
