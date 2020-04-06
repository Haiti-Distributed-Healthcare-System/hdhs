import React, { ReactElement } from "react";
import { WhiteSpace, Button } from "antd-mobile";
import Icon, { UserAddOutlined } from "@ant-design/icons";

import "../scss/LandingPage.scss";

export default function LandingPage(): ReactElement {
  /* istanbul ignore next */
  const patientLookup = () => {
    console.log("Clicked Patient Lookup");
  };

  /* istanbul ignore next */
  const newPatient = () => {
    console.log("Clicked New Patient");
  };
  return (
    <>
      <div id="buttonFlex">
        <Button onClick={patientLookup} icon="search">
          Patient Lookup
        </Button>
        <WhiteSpace />
      </div>
      <br />
      <div id="buttonFlex">
        <Button icon={<UserAddOutlined />} onClick={newPatient}>
          New Patient
        </Button>
        <WhiteSpace />
      </div>
    </>
  );
}
