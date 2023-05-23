import Link from "next/link";
import Countdown from "on-react-countdown";
import {
  LiveAuctionsArtwork1,
  LiveAuctionsAuthors2,
} from "../../utils/allImgs";

function LiveAuctionsItem({ data }) {
  return (
    <div className="col-lg-3 col-sm-6 col-xs-12">
      <div className="pricing-item ">
        <div className="wraper">
          <img
            style={{ height: "250px", width: "100%" }}
            src={`https://ipfs.io/ipfs/${data.image.split("ipfs://")[1]}`}
            alt=""
          />
          <h4>{data.name}</h4>
          {/* <div className="owner-info">
            <img src={LiveAuctionsAuthors2.src} width="40" alt="" />
            <Link href="/profile">
              <h3>{data.name}</h3>
            </Link>
          </div> */}
          <span>
            <span className="g-text">Price</span> {data.current_price} MUTEZ{" "}
          </span>
          <div className="count-down titled circled text-center">
            <Countdown end={0} />
            <div className="admire">
              <Link href={`/PlaceBid/${data.token_id}`}>
                <a className="btn more-btn w-100 text-center my-0 mx-auto ">
                  Place Bid
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveAuctionsItem;
