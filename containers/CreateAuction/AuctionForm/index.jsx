import Link from "next/link";
import Head from "next/head";
import authors1 from "../../../assets/img/authors/1.png";
import Countdown from "on-react-countdown";
import { useState } from "react";

// import data from './data.json'

const AuctionForm = () => {
  const [expiryDate, setExpiryDate] = useState();
  const [expectedPrice, setExpectedPrice] = useState();
  const onChange = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="col-12 col-lg-3 mt-s">
        <div className="sidebar-area">
          <div className="donnot-miss-widget">
            <h4 className="mb-15 mt-30">History</h4>
            <div className="highest-bid bid-item">
              <div className="author-item mb-0">
                <div className="author-img ml-0">
                  <img src={authors1.src} width="40" alt="" />
                </div>
                <div className="author-info">
                  <p>
                    Listed by<span className="w-text"> Amillia Nnor</span>
                  </p>
                  <p>
                    Price<span className="w-text mr-15"> 0.212 ETH</span>
                    <span>
                      <i className="fa fa-clock-o mr-5p"></i>01:36 AM
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="biding-end">
              <h4 className="mb-15">Auction End At :</h4>
              <p>
                {" "}
                End Date :{" "}
                <input
                  type="date"
                  name="expiry-date"
                  value={expiryDate}
                  onChange={onChange}
                />
              </p>
            </div>
            <div className="blank">
              <span />{" "}
            </div>
            <div className="price">
              <p>
                Expected Price :{" "}
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  required
                />
              </p>
            </div>
            <Link href="#test-popup">
              <a className="open-popup-link more-btn width-100 mt-30">
                Create Auction
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionForm;
