import Link from "next/link";
import Head from "next/head";
import authors1 from "../../../assets/img/authors/1.png";
import Countdown from "on-react-countdown";
import { useState } from "react";
import authors8 from "../../../assets/img/authors/8.png";
import { useTezosCollectStore } from "api/store";
import { useRouter } from "next/router";

// import data from './data.json'

const AuctionForm = ({ tokenData }) => {
  const { listWithAuction, listWithFixedPrice, makeShort } =
    useTezosCollectStore();
  const [expiryDate, setExpiryDate] = useState();
  const [startPrice, setStartPrice] = useState(0);
  const router = useRouter();

  const onChange = (e) => {
    e.preventDefault();
    setExpiryDate(new Date(e.target.valueAsNumber).toISOString());
  };

  const listNft = async (e) => {
    e.preventDefault();
    try {
      const ret = await listWithAuction({
        start_price: startPrice,
        token_id: tokenData.token_id,
        end_time: expiryDate,
      });
      if (ret == true) {
        router.push("/LiveAuctions");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="col-12 col-lg-4 mt-s">
        <div className="sidebar-area">
          <div className="donnot-miss-widget">
            <div className="author-item mb-30">
              <div className="author-img ml-0">
                <img src={authors8.src} width="70" alt="" />
              </div>
              <div className="author-info">
                <Link href="/Profile">
                  <h5 className="author-name">{makeShort(tokenData.owner)}</h5>
                </Link>
                <p className="author-earn mb-0">Item Owner</p>
              </div>
            </div>

            <div className="biding-end">
              <h4 className="mb-12">Auction End At :</h4>
              <p>
                {" "}
                End Date :{" "}
                <input type="date" name="expiry-date" onChange={onChange} />
              </p>
            </div>
            <div className="price">
              <p>
                Price :{" "}
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={startPrice}
                  onChange={(e) => setStartPrice(e.target.value)}
                  required
                />
              </p>
            </div>
            <div className="btn more-btn ml-50" onClick={listNft}>
              Create Auction
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionForm;
