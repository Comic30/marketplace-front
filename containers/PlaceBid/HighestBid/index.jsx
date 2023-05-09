import Head from "next/head";
import authors1 from "../../../assets/img/authors/1.png";
import { data } from "../../../data/data-containers/data-HighestBid.js";
import Countdown from "on-react-countdown";

// import data from './data.json'

const HighestBid = ({ tokenData }) => {
  const end_time = new Date(tokenData.end_time).getTime() / 1000;
  const diff = end_time - Date.now() / 1000;
  return (
    <>
      <div className="col-12 col-lg-3 mt-s">
        <h4 className="mb-15">Latest Bids</h4>
        <div className="highest-bid latest-bid bid-item">
          {data &&
            data.map((item, i) => (
              <div
                key={i}
                className={`author-item ${item.addMargin && "mb-0"}`}
              >
                <div className="author-img ml-0">
                  <img src={item.img.src} width="40" alt="" />
                </div>
                <div className="author-info">
                  <p>
                    by<span className="w-text"> {item.text}</span>
                  </p>
                  <p>
                    Bid at<span className="w-text"> {item.bid} TEZ</span>
                  </p>
                </div>
                <div className="bid-price">
                  <p>
                    <i className="fa fa-clock-o mr-5p"></i>
                    {item.time} AM
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="biding-end">
          {diff < 0 ? (
            <div>
              <h4 className="mb-15">Auction Ended</h4>
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

export default HighestBid;
