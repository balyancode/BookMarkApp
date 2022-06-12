import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loader = ({ size }) => {
  return (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: size || 24 ,marginLeft:"90vh" ,marginTop:"10vh"}}  />}
    />
  );
};

export default Loader;
