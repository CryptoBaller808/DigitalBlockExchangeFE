import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowBackIcon, DropDownIcon, PlusIcon } from "../Icons";
import Toggle from "../components/Toggle";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SingleNft = ({}) => {
  const [is_unlockable_content, setis_unlockable_content] = useState(false);
  const [unlockable_content, setunlockable_content] = useState("");
  const [is_explicit_content, setis_explicit_content] = useState(false);
  const [explicit_content, setexplicit_content] = useState("");
  const { user } = useSelector(state => state.generalReducers);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [img, setImg] = useState();
  console.log("img", img);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [statusData, setStatusData] = useState([
    // { id: 1, title: "1 day" },
    // { id: 2, title: "2 days" },
    // { id: 3, title: "3 days" },
  ]);
  let navigate = useNavigate();
  const [addProp, setAddProp] = useState([{ key: "", value: "" }]);
  const [nftdata, setnftdata] = useState({
    // name : '',
    description: description,
    collection: "",
    properties: "",
    collection_id: "",
    user_id: user?.id,
    nft_property: addProp,
    nftimage: "",
    is_unlockable_content: "",
    unlockable_content: "",
    is_explicit_content: "",
    explicit_content: "",
    title,
    description: "",
    external_link: "",
  });
  const getCollections = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/collection/getCollectionbyUserId/${user.id}`);
      console.log("resp1", res);
      if (res?.data) {
        setStatusData(res?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (user) {
      getCollections();
    }
  }, [user]);
  const [api_loading, setapi_loading] = useState(false);
  const create_singlenft = async () => {
    let formData = new FormData();
    let nft_property = {};
    addProp.map(item => {
      nft_property[item.key] = item.value;
    });
    if (!title || !description) {
      return toast.error("Please input title and description");
    } else if (!img) {
      return toast.error("Please select an image");
    } else if (!selectioncollection) {
      return toast.error("Please select a collection");
    }
    formData.append("description", description);
    formData.append("collection_id", selectioncollection?.id);
    //formData.append("nft_property", {dasd : "asdsa"});
    formData.append("nftimage", img);
    formData.append("is_unlockable_content", is_unlockable_content);
    formData.append("unlockable_content", unlockable_content);
    formData.append("user_id", user?.id);
    formData.append("is_explicit_content", is_explicit_content);
    //formData.append("explicit_content", explicit_content);
    formData.append("title", title);
    formData.append("explicit_content", "asd");
    console.log("formData", formData);
    toast.info("Please accept request from your app");
    try {
      console.log("reached");
      setapi_loading(true);
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/mint/mintNFT`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      //window.location.href = "./nft";
      //const res = await axios.post(`${process.env.REACT_APP_API_URL}/collection/createCollection`,formData)
      console.log("create_singlenft_res", res);
      setis_unlockable_content("");
      setunlockable_content("");
      setis_explicit_content("");
      setexplicit_content("");
      settitle("");
      setdescription("");
      setImg("");
      toast("Nft added successfully");
      if (res?.data) {
        console.log("res", res);
        setapi_loading(false);
        navigate(`/create-item?item_id=${res?.data?.id}`);
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response);
      setapi_loading(false);
      if (error?.response?.data) {
        toast.success(`${error?.response?.data}`);
      }
    }
  };
  const [selectioncollection, setselectioncollection] = useState();
  const [xrp, setxrp] = useState();
  useEffect(() => {
    document.addEventListener("click", () => {
      setHide(false);
      setHide2(false);
    });
  }, []);

  return (
    <div className="single-nft flex">
      <div className="wrapWidth wrap flex flex-col aic">
        <div className="pg-hdr flex">
          <Link to="/nft-create" className="back-btn flex aic">
            <ArrowBackIcon />
            <div className="lbl">Go Back</div>
          </Link>
        </div>
        <div className="meta flex flex-col">
          <div className="pg-tag">Create New Item</div>
          <div className="blk flex flex-col">
            <div className="req-lbl flex aic">
              <span className="star">*</span>Required field.
            </div>
            <div className="row flex flex-col">
              <div className="r-lbl flex flex-col">
                <div className="lbl-1">
                  Image, Video, Audio or 3D Model <spna className="star">*</spna>
                </div>
                <div className="lbl-2">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</div>
              </div>
              <div className="select-img flex aic jc">
                <div
                  className={`img-box flex flex-col aic jc ${img ? "" : "bdr"}`}
                  onClick={() => document.getElementById("upload_img").click()}>
                  {img ? (
                    <img src={URL.createObjectURL(img)} className="img" />
                  ) : (
                    <>
                      <img src="./images/upload-icon.svg" className="icon" />
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    title=""
                    id="upload_img"
                    className="select-file cleanbtn"
                    onChange={e => {
                      let file = e.target.files[0];
                      //setImg(e.target.files[0]);
                      setImg(file);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row flex flex-col">
              <div className="r-lbl flex flex-col">
                <div className="lbl-1">
                  Name
                  <spna className="star">*</spna>
                </div>
              </div>
              <input
                type="text"
                className="txt cleanbtn"
                placeholder="Item name"
                value={title}
                onChange={e => {
                  settitle(e.target.value);
                }}
              />
            </div>
            <div className="row flex flex-col">
              <div className="r-lbl flex flex-col">
                <div className="lbl-1">
                  Description
                  <spna className="star"></spna>
                </div>
                <div className="lbl-2">The description will be underneath the image on the item's detail page.</div>
              </div>
              <textarea
                type="text"
                className="txt cleanbtn h100"
                placeholder="Description..."
                value={description}
                onChange={e => {
                  setdescription(e.target.value);
                }}
              />
            </div>
            <div className="row flex flex-col">
              <div className="r-lbl flex flex-col">
                <div className="lbl-1">Collection</div>
                <div className="lbl-2">Select the Collection where this item will appear.</div>
              </div>
              <div className="dropDown flex aic jc flex-col rel">
                <div className="category flex aic">
                  <div
                    className="cbox cleanbtn flex aic rel"
                    onClick={e => {
                      e.stopPropagation();
                      setHide(!hide);
                    }}>
                    <div className="slt flex aic">
                      <div className="unit-name flex aic font s14 b4">
                        <span className="unit-eng flex aic font s14 b4" placeholder="Select collection">
                          {selectioncollection ? ` ${selectioncollection.name} - ${selectioncollection.id}` : "Select collection"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <DropDownIcon />
                    </div>
                  </div>
                </div>
                <div className={`block flex aic abs ${hide ? "show" : ""}`}>
                  <div className="manue flex aic col anim">
                    {statusData.map((item, index) => (
                      <div
                        key={index}
                        className="slt flex aic"
                        onClick={e => {
                          setHide(!hide);
                          setselectioncollection(item);
                        }}>
                        <div className="unit-name flex aic font s14 b4">
                          <span className="unit-eng flex aic font s14 b4">
                            {item.name} - {item.id}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="row flex flex-col">
              <div className="r-lbl flex flex-col">
                <div className="lbl-1"> Properties (optional)</div>
              </div>
              <div className="add-more flex">
                <div className="btn button flex aic jc">
                  <div className="btn-lbl" onClick={e => setAddProp([...addProp, { key: "", value: "" }])}>
                    <PlusIcon />
                  </div>
                </div>
              </div>
              <div className="input-boxs">
                {addProp.map((item, index) => (
                  <>
                    <input
                      type="text"
                      className="txt"
                      placeholder="e.g background"
                      onChange={e => {
                        addProp[index]["key"] = e.target.value;
                        setAddProp([...addProp]);
                      }}
                    />
                    <input
                      type="text"
                      className="txt"
                      placeholder="e.g solid"
                      onChange={e => {
                        addProp[index]["value"] = e.target.value;
                        setAddProp([...addProp]);
                      }}
                    />
                  </>
                ))}
              </div>
            </div>
            <div className="row flex aic">
              <div className="left flex flex-col">
                <div className="lbl1">Unlockable Content</div>
                <div className="lbl2">Include unlockable content that can only be accessed by the owner of the item.</div>
                {is_unlockable_content && (
                  <textarea
                    onChange={e => {
                      setunlockable_content(e.target.value);
                    }}
                    className="txt-area cleanbtn"
                  />
                )}
              </div>
              <div className="right flex aic">
                <Toggle setToggle={setis_unlockable_content} />
              </div>
            </div>
            <div className="row flex aic">
              <div className="left flex flex-col">
                <div className="lbl1">Explicit and sensitive content</div>
                <div className="lbl2">Set this collection as explicit and sensitive content</div>
              </div>
              <div className="right flex aic">
                <Toggle setToggle={setis_explicit_content} />
              </div>
            </div>
            <div className="row flex flex-col">
              <div className="r-lbl flex flex-col">
                <div className="lbl-1">Supply</div>
                <div className="lbl-2">The number of items that can be minted. ".00001 XRP"</div>
              </div>
              <input disabled type="text" className="txt cleanbtn w-1/2" placeholder="1" />
            </div>
            {/* <div className="row flex flex-col">
              <div className="r-lbl flex flex-col">
                <div className="lbl-1">Blockchain</div>
                <div className="lbl-2">
                  Select the blockchain where you would like new items added to
                  this collection.
                </div>
              </div>
              <div className="dropDown flex aic jc flex-col rel">
                <div className="category flex aic">
                  <div
                    className="cbox cleanbtn flex aic rel"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHide2(!hide2);
                    }}
                  >
                    <div className="slt flex aic">
                      <div className="unit-name flex aic font s14 b4">
                        <span
                          className="unit-eng flex aic font s14 b4"
                          placeholder="XRP"
                        >
                          {xrp ? xrp.title : "XRP"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <DropDownIcon />
                    </div>
                  </div>
                </div>
                <div className={`block flex aic abs ${hide2 ? "show" : ""}`}>
                  <div className="manue flex aic col anim">
                    {statusData.map((item, index) => (
                      <div
                        key={index}
                        className="slt flex aic"
                        onClick={(e) => {
                          setHide2(!hide2);
                          setxrp(item);
                        }}
                      >
                        <div className="unit-name flex aic font s14 b4">
                          <span className="unit-eng flex aic font s14 b4">
                            {item.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div
            onClick={() => {
              create_singlenft();
            }}
            className="action flex aic jc">
            <div className="btn button">{api_loading ? "Loading..." : "Create NFT"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNft;
