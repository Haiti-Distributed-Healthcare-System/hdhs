import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { useHistory } from "react-router-dom";

import "./scss/Wrapper.scss";

type props = {
  title: string;
  leftArrowText: string;
  leftArrowRoute: string;
  children: React.ReactNode;
};

const Wrapper = (props: props) => {
  const hist = useHistory();

  return (
    <div id="primary-wrapper">
      <div id="wrapper-contents">
        <NavBar
          mode="light"
          onLeftClick={() => hist.push(`${props.leftArrowRoute}`)}
          leftContent={[<Icon type="left" />, `${props.leftArrowText}`]}
        >
          {`${props.title}`}
        </NavBar>
        {props.children}
      </div>
    </div>
  );
};

export default Wrapper;
