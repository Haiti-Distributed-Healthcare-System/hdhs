import React from "react";

type props = {
  children: React.ReactNode;
};

const Wrapper = (props: props) => {
  return <div className="primary-wrapper">{props.children}</div>;
};

export default Wrapper;
