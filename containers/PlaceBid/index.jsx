import Breadcumb from "../../components/Breadcumb";
import Detailed from "./Detailed";
import SidebarArea from "./SidebarArea";
import LatestBid from "./LatestBid";

import { useRouter } from "next/router";
import { useTezosCollectStore } from "api/store";
import { useEffect, useState } from "react";

// import '../../assets/css/itemDetails.css'

const PlaceBidContainer = () => {
  const router = useRouter();
  const { id } = router.query;
  const { auctionData, fetchAuctionData } = useTezosCollectStore();
  const [currentToken, setCurrentToken] = useState();
  useEffect(() => {
    fetchAuctionData();
  }, [id]);

  useEffect(() => {
    if (auctionData) {
      setCurrentToken(auctionData.filter((item) => item.token_id == id));
    }
  }, [auctionData]);

  return (
    <>
      {/* <Breadcumb namePage="Create Auction" title="Create Auction" /> */}
      <section className="section-padding-100">
        <div className="container">
          {currentToken && currentToken[0] && currentToken[0].image ? (
            <div className="row">
              <Detailed tokenData={currentToken[0]} />

              <SidebarArea tokenData={currentToken[0]} />

              <LatestBid tokenData={currentToken[0]} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default PlaceBidContainer;
