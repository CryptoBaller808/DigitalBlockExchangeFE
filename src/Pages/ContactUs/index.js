import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.scss";

const ContactUs = () => {
  const [contactUsData, setContactUsData] = useState({
    userName: "",
    email: "",
    mailSubject: "",
    mailDescription: "",
  });
  const handleContactUsData = e => {
    setContactUsData({ ...contactUsData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/mail/contactUs`,
      data: contactUsData,
    });
    toast.success("Data Submitted successfully");
    console.log("contact us res..../", res);
    if (res.status === 200) {
      window.location.reload();
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="contact-up-page flex">
      <div class="wrap wrapWidth flex justify-center">
        <div className="page_block flex">
          <form onSubmit={handleSubmit} className="form_block flex flex-col">
            <img src="./DBX-horizontal1.svg" className="logo" />
            <h1 className="title mb-8">Contact Us</h1>
            <div className="input-field flex flex-col mb-3">
              <div className="field-lbl">Name:</div>
              <input
                type="text"
                required
                name="userName"
                value={contactUsData.userName}
                onChange={handleContactUsData}
                className="txt w-full"
              />
            </div>
            <div className="input-field flex flex-col mb-3">
              <div className="field-lbl">Your email address:</div>
              <input type="email" required name="email" value={contactUsData.email} onChange={handleContactUsData} className="txt w-full" />
            </div>
            <div className="input-field flex flex-col mb-3">
              <div className="field-lbl">Subject:</div>
              <input
                type="text"
                required
                name="mailSubject"
                value={contactUsData.mailSubject}
                onChange={handleContactUsData}
                className="txt w-full"
              />
            </div>
            <div className="input-field flex flex-col mb-4">
              <div className="field-lbl">Description:</div>
              <textarea
                type="text"
                required
                name="mailDescription"
                value={contactUsData.mailDescription}
                onChange={handleContactUsData}
                className="txt w-full min-h-[110px]"
              />
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

export default ContactUs;
