import React, { Fragment } from "react";
import { SpinnerImg } from "../../utils/allImgs";
const Spinner = () => {
  return (
    <Fragment>
      <img
        src={SpinnerImg}
        style={{
          width: "200px",
          margin: "auto",
          display: "block",
        }}
        alt="Loading..."
      />
    </Fragment>
  );
};

export default Spinner;
