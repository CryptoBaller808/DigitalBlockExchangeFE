import React from "react";
import { Row, Col } from "antd";
import "./style.css";

function AccountComponent() {
  return (
    <div className="Mainaccount">
      <div>
        <img className="accimg" src="acc.png" alt="" />
        <Row justify="space-between">
          <Col xs={24} md={10} lg={12} className="accountcol">
            <div>
              <h1 className="accounttext">Subscribe to DBX Newsletter</h1>
            </div>
          </Col>
          <Col xs={24} md={10} lg={10} className="accountcol1">
            <div>
              <div className="accinputdiv">
                <p className="addtext">Enter your email address</p>
                <div className="accsignbtn">
                  <p className="addtext1"> Sign up now</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AccountComponent;
