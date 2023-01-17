import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { InstagramIcon, LanguageIcon, TwitterIcon } from "../../Icons";
import { ToastContainer, toast } from 'react-toastify';
const EditProfile = () => {
  const {user} = useSelector((state) => state.generalReducers)
  const [email, setemail] = useState(user?.email);
  const [firstname, setfirstname] = useState(user?.firstname);
  const [lastname, setlastname] = useState(user?.lastname);
  const [profile_image, setprofile_image] = useState("");
  const [cover_image, setcover_image] = useState("");
  const [insta_url, setinsta_url] = useState(user?.insta_url);
  const [bio, setbio] = useState(user?.bio);
  const [twitter_url, settwitter_url] = useState(user?.twitter_url);
  const [discord_url, setdiscord_url] = useState(user?.discord_url);
  const [fb_url, setfb_url] = useState(user?.fb_url);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    setemail(user?.email);
    setfirstname(user?.firstname);
    setlastname(user?.lastname);
    setprofile_image("");
    setcover_image("");
    setinsta_url(user?.insta_url);
    setbio(user?.bio);
    settwitter_url(user?.twitter_url);
    setdiscord_url(user?.discord_url);
    setfb_url(user?.fb_url);
  },[user])
  const update_profile = async ()  => {
      if(!firstname || !lastname || !email ){
        return toast.error("Please fill all necessary fields")
      }
      let formData = new FormData();
      formData.append("email", email);
      formData.append("firstname", firstname);
      //formData.append("nft_property", {dasd : "asdsa"});
      formData.append("lastname", lastname);
      formData.append("profile_image", profile_image);
      formData.append("cover_image", cover_image);
      formData.append("id", user.id);
      formData.append("insta_url", insta_url);
      //formData.append("explicit_content", explicit_content);
      formData.append("bio", bio);
      formData.append("twitter_url", twitter_url);
      formData.append("discord_url", discord_url);
      formData.append("fb_url", fb_url);
      console.log("data",formData)
      console.log("formData",user.id,firstname,twitter_url)
      setloading(true)
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/profiles/updateUser`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      //window.location.href = "./nft";
      //const res = await axios.post(`${process.env.REACT_APP_API_URL}/collection/createCollection`,formData)
      toast("Profile Upadte successfully")
      console.log('res',res)
      if(res?.data){
        let data = JSON.parse(localStorage.getItem("nft_login"))
        console.log("login_cred",data)
        const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/profiles/getuserProfile/${data.id}`)
        console.log('res22',res2)
        if(res2?.data){
          dispatch({
            type: "GET_USER",
            payload: {...data,...res2.data},
          });
        }
        setloading(false)
      }  
    } catch (error) {
      console.log('error',error)
      console.log('error',error.response)
    }      
  }
  return (
    <div className="edit-profile flex">
      <div className="wrapWidth wrap flex flex-col">
        <div className="page-hdr flex flex-col">
          <div className="page-heading">Profile details </div>
          <div className="action flex items-center">
            <div className="btn button">Preview</div>
          </div>
        </div>
        <div className="wrapper">
          <div className="left flex flex-col">
            <div className="data-row flex flex-col">
              <div className="row-tag">First Name</div>
              <input
                type="text"
                className="txt cleanbtn"
                placeholder="Firstname"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
              />
            </div>
            <div className="data-row flex flex-col">
              <div className="row-tag">Last Name</div>
              <input
                type="text"
                className="txt cleanbtn"
                placeholder="Lastname"
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
              />
            </div>
            <div className="data-row flex flex-col">
              <div className="row-tag">Bio</div>
              <input type="text" 
              value={bio}
              onChange={(e) => setbio(e.target.value)}
              className="txt cleanbtn" placeholder="Bio" />
            </div>
            <div className="data-row flex flex-col">
              <div className="row-tag">Email Address</div>
              <input
                type="text"
                className="txt cleanbtn"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="data-row flex flex-col">
              <div className="row-tag">Soical Connections</div>
              <div className="desc">
                Help collection verify your accout by connectiing Twiter
              </div>
            </div>
            <div className="twitter-box flex items-center justify-between">
              <div className="le flex items-center">
                <div className="icon flex items-center justify-center">
                  <TwitterIcon />
                </div>
                <div className="icon-name">Twiter</div>
              </div>
              <div className="re">
                <div className="btn button">Connect</div>
              </div>
            </div>
            <div className="social-links flex flex-col">
              <div className="row-tag">Links</div>
              <div className="input-box flex items-center">
                <div className="icon">
                  <InstagramIcon />
                </div>
                <input
                  type="text"
                  className="txt cleanbtn"
                  placeholder="Instagram Link"
                  value={insta_url}
                  onChange={(e) => setinsta_url(e.target.value)}
                />
              </div>
              <div className="input-box flex items-center">
                <div className="icon">
                  <LanguageIcon />
                </div>
                <input
                  type="text"
                  className="txt cleanbtn"
                  placeholder="Web Link"
                  value={fb_url}
                  onChange={(e) => setfb_url(e.target.value)}
                />
              </div>
            </div>
            <div className="data-row flex flex-col">
              <div className="row-tag">Wallet Address</div>
              <input
                type="text"
                value={"0xaef0de5424ea78447791451e630fb3bdb7108be"}
                className="txt cleanbtn bg-black cfff"
                disable={true}
                placeholder="Wallet Address"
                value={user?.wallet_address}
                //onChange={(e) => setfb_url(e.target.value)}
              />
            </div>
            <div 
            onClick={update_profile}
            className="update-btn flex items-center">
              <div className="btn button">{loading ? "Updating..." : "Save"}</div>
            </div>
          </div>
          <div className="right flex flex-col">
            <div className="data-row flex flex-col">
              <div className="r-lbl flex flex-col">
                <div className="row-tag">Profile Image</div>
              </div>
              <div className="select-img flex aic jc">
                <div
                  className={`img-box flex flex-col aic jc round ${
                    profile_image ? "" : "bdr"
                  }`}
                  onClick={() => document.getElementById("upload_img").click()}
                >
                  {
                    !user?.profile_image ? 
                      
                        !profile_image ?
                        <img src="./images/upload-icon.svg" className="icon" />
                        :
                        (
                          <img src={URL.createObjectURL(profile_image)} className="img round" />
                        )
                       
                    : 
                      (
                        <>
                          <img src={user?.profile_image} className="icon " />
                        </>
                      )
                  }
                  <input
                    type="file"
                    accept="image/*"
                    title=""
                    id="upload_img"
                    className="select-file cleanbtn"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      //setImg(e.target.files[0]);
                      setprofile_image(file);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="data-row flex flex-col">
              <div className="r-lbl flex flex-col">
                <div className="row-tag">Profile Banner</div>
              </div>
              <div className="select-img flex aic jc">
                <div
                  className={`img-box flex flex-col aic jc img-box-c ${
                    cover_image ? "" : "bdr"
                  }`}
                  onClick={() => document.getElementById("banner_img").click()}
                >
                  {
                    !user?.cover_image ? 
                      
                        !cover_image ?
                        <img src="./images/upload-icon.svg" className="icon" />
                        :
                        (
                          <img src={URL.createObjectURL(cover_image)} className="img round" />
                        )
                       
                    : 
                      (
                        <>
                          <img src={user?.cover_image} className="icon " />
                        </>
                      )
                  }
                  <input
                    type="file"
                    accept="image/*"
                    title=""
                    id="banner_img"
                    className="select-file cleanbtn"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      setcover_image(file);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
