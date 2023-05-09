import { useState } from "react";
import { useTezosCollectStore } from "api/store";

const Detailed = ({ tokenData }) => {
  const { activeAddress, placeBid } = useTezosCollectStore();
  const [bidPrice, setBidPrice] = useState(0);
  console.log(tokenData);

  const bidNft = async (e) => {
    await placeBid(tokenData.token_id, bidPrice);
  };
  return (
    <>
      <div className="col-12 col-lg-5">
        <div className="detailed-img">
          <img
            src={`https://ipfs.io/ipfs/${tokenData.image.split("ipfs://")[1]}`}
            alt=""
            style={{ height: "300px", width: "100%" }}
          />
        </div>
        {activeAddress && tokenData.owner != activeAddress ? (
          <div>
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
        ) : (
          <div />
        )}
      </div>
    </>
  );
};

export default Detailed;
