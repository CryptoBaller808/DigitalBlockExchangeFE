import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "./style.scss";

const ListingApplication = () => {
  const [inputData, setInputData] = useState({
    contactInfo: {
      contactName: "",
      contactTitle: "",
      contactEmail: "",
      contactNumber: "",
    },
    companyInfo: {
      companyBriefIntro: "",
      companyName: "",
      companyAddress: "",
      companyCoreInfo: "",
    },
    tokenInfo: {
      t_name: "",
      t_symbol: "",
      t_contract_address: "",
      t_total_supply: "",
      t_total_circulation: "",
      link: "",
    },
    projectInfo: {
      description: "",
      linkRoadMap: "",
      currentStage: "",
      whitePaperLink: "",
      githubLink: "",
    },
  });
  console.log("inputData....", inputData);
  const handleContactInfoData = e => {
    const { name, value } = e.target;

    setInputData(prevInputData => ({
      ...prevInputData,
      contactInfo: {
        ...prevInputData.contactInfo,
        [name]: value,
      },
    }));
  };
  const handleCompanyInfoData = e => {
    const { name, value } = e.target;

    setInputData(prevInputData => ({
      ...prevInputData,
      companyInfo: {
        ...prevInputData.companyInfo,
        [name]: value,
      },
    }));
  };
  const handleTokenInfoData = e => {
    const { name, value } = e.target;

    setInputData(prevInputData => ({
      ...prevInputData,
      tokenInfo: {
        ...prevInputData.tokenInfo,
        [name]: value,
      },
    }));
  };
  const handleProjectInfoData = e => {
    const { name, value } = e.target;

    setInputData(prevInputData => ({
      ...prevInputData,
      projectInfo: {
        ...prevInputData.projectInfo,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/mail/listingApplication`,
      data: inputData,
    });
    toast.success("Email Submitted successfully");
    if (res.status === 200) {
      window.location.reload();
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="listing-application-page flex">
      <div class="wrap wrapWidth flex justify-center">
        <div className="page_block flex">
          <form onSubmit={handleSubmit} className="form_block flex flex-col">
            <img src="./DBX-horizontal1.svg" className="logo" />
            <h1 className="title mb-8">Listing Application</h1>
            <div className="row2 mb-6">
              <div className="row1">
                <div className="section-title">Contact Information</div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Contact Name</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="contactName"
                    value={inputData.contactInfo.contactName}
                    onChange={handleContactInfoData}
                    className="txt w-full"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Contact Title</div>
                  </div>
                  <input
                    type="text"
                    name="contactTitle"
                    required
                    value={inputData.contactInfo.contactTitle}
                    onChange={handleContactInfoData}
                    className="txt w-full"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Contact Email</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="contactEmail"
                    value={inputData.contactInfo.contactEmail}
                    onChange={handleContactInfoData}
                    className="txt w-full"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Contact Phone Number</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="contactNumber"
                    value={inputData.contactInfo.contactNumber}
                    onChange={handleContactInfoData}
                    className="txt w-full"
                  />
                </div>
              </div>
              <div className="row1">
                <div className="section-title">Company Information</div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Brief introduction of the company</div>
                  </div>
                  <textarea
                    type="text"
                    required
                    name="companyBriefIntro"
                    value={inputData.companyInfo.companyBriefIntro}
                    onChange={handleCompanyInfoData}
                    className="txt w-full min-h-[100px]"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Company Name</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="companyName"
                    value={inputData.companyInfo.companyName}
                    onChange={handleCompanyInfoData}
                    className="txt w-full"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Company Address</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="companyAddress"
                    value={inputData.companyInfo.companyAddress}
                    onChange={handleCompanyInfoData}
                    className="txt w-full"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Core Executive Name and Background (include LinkedIn profile, if available)</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="companyCoreInfo"
                    value={inputData.companyInfo.companyCoreInfo}
                    onChange={handleCompanyInfoData}
                    className="txt w-full"
                  />
                </div>
              </div>
            </div>
            <div className="row2 mb-6">
              <div className="row1">
                <div className="section-title">Token Information</div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Full Name of Token</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="t_name"
                    value={inputData.tokenInfo.t_name}
                    onChange={handleTokenInfoData}
                    className="txt w-full"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Ticker symbol</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="t_symbol"
                    value={inputData.tokenInfo.t_symbol}
                    onChange={handleTokenInfoData}
                    className="txt w-full"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Token contract address</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="t_contract_address"
                    value={inputData.tokenInfo.t_contract_address}
                    onChange={handleTokenInfoData}
                    className="txt w-full"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Total Supply</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="t_total_supply"
                    value={inputData.tokenInfo.t_total_supply}
                    onChange={handleTokenInfoData}
                    className="txt w-full"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Total tokens in circulation</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="t_total_circulation"
                    value={inputData.tokenInfo.t_total_circulation}
                    onChange={handleTokenInfoData}
                    className="txt w-full"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Link to Tokenomics</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="link"
                    value={inputData.tokenInfo.link}
                    onChange={handleTokenInfoData}
                    className="txt w-full"
                  />
                </div>
              </div>
              <div className="row1">
                <div className="section-title">Project Information</div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Description of the project</div>
                  </div>
                  <textarea
                    type="text"
                    required
                    name="description"
                    value={inputData.projectInfo.description}
                    onChange={handleProjectInfoData}
                    className="txt w-full min-h-[100px]"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Link to Roadmap</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="linkRoadMap"
                    value={inputData.projectInfo.linkRoadMap}
                    onChange={handleProjectInfoData}
                    className="txt w-full"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Current stage of project</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="currentStage"
                    value={inputData.projectInfo.currentStage}
                    onChange={handleProjectInfoData}
                    className="txt w-full"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">White Paper link</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="whitePaperLink"
                    value={inputData.projectInfo.whitePaperLink}
                    onChange={handleProjectInfoData}
                    className="txt w-full"
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="flex flex-col">
                    <div className="field-lbl">Is it open source? If yes, please provide github link</div>
                  </div>
                  <input
                    type="text"
                    required
                    name="githubLink"
                    value={inputData.projectInfo.githubLink}
                    onChange={handleProjectInfoData}
                    className="txt w-full"
                  />
                </div>
              </div>
            </div>

            <div className="action flex items-center justify-center">
              <button type="submit" className="btn-submit button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListingApplication;
