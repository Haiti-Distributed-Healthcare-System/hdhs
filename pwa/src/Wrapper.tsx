import React from "react";

import "./scss/Wrapper.scss";

type props = {
  children: React.ReactNode;
};

const Wrapper = (props: props) => {
  return (
    <div id="primary-wrapper">
      <div id="wrapper-contents">{props.children}</div>
    </div>
  );
};

export default Wrapper;
