import Head from "next/head";
import authors from "../../../assets/img/authors/2.png";
import { data } from "../../../data/data-containers/data-HighestBid.js";
import Countdown from "on-react-countdown";
import { useTezosCollectStore } from "api/store";

// import data from './data.json'

const LatestBid = ({ tokenData }) => {
  const end_time = new Date(tokenData.end_time).getTime() / 1000;
  const diff = end_time - Date.now() / 1000;
  const { makeShort } = useTezosCollectStore();

  return (
    <>
      <div className="col-12 col-lg-4 mt-s">
        <h4 className="mb-15">Latest Bids</h4>
        <div className="highest-bid latest-bid bid-item">
          {tokenData.bid_data &&
            tokenData.bid_data.map((item, i) => (
              <div key={i} className={`author-item mb-0`}>
                <div className="author-img ml-0">
                  <img src={authors.src} width="40" alt="" />
                </div>
                <div className="author-info">
                  <p>
                    by<span className="w-text"> {makeShort(item.bidder)}</span>
                  </p>
                  <p>
                    Bid at<span className="w-text"> {item.price} MUTEZ</span>
                  </p>
                </div>
                <div className="bid-price">
                  <p>
                    <i className="fa fa-clock-o mr-5p"></i>
                    {item.bid_time}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="biding-end">
          {diff < 0 ? (
            <div>
              <h4 className="mb-15">Auction Ended</h4>
              <div>{tokenData.end_time.substring(0, 10)}</div>
            </div>
          ) : (
            <div>
              <h4 className="mb-15">Auction Ends In :</h4>
              <div className="count-down titled circled text-center">
                <Countdown end={end_time} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LatestBid;
