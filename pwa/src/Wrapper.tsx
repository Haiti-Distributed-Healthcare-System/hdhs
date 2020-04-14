import React from "react";
import { NavBar, Icon } from "antd-mobile";

import "./scss/Wrapper.scss";

type props = {
  children: React.ReactNode;
};

const Wrapper = (props: props) => {
  return (
    <div id="primary-wrapper">
      <div id="wrapper-contents">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log("onLeftClick")}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: "16px" }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >
          NavBar
        </NavBar>
        {props.children}
      </div>
    </div>
  );
};

export default Wrapper;
