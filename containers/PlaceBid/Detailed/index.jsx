import { useState } from "react";
const Detailed = ({ img }) => {
  console.log(img);
  const [bidPrice, setBidPrice] = useState(0);

  const bidNft = async (e) => {
    console.log("bid");
  };
  return (
    <>
      <div className="col-12 col-lg-5">
        <div className="detailed-img">
          <img
            src={`https://ipfs.io/ipfs/${img.split("ipfs://")[1]}`}
            alt=""
            style={{ height: "300px", width: "100%" }}
          />
        </div>
        <div className="price">
          <p>
            Price :
            <input
              type="number"
              name="price"
              id="price"
              value={bidPrice}
              onChange={(e) => setBidPrice(e.target.value)}
              required
            />
          </p>
        </div>
        <div className="btn more-btn ml-50" onClick={bidNft}>
          Place Bid
        </div>
      </div>
    </>
  );
};

export default Detailed;
