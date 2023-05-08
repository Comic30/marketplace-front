import Breadcumb from "../../components/Breadcumb";
import Detailed from "../ItemDetails/Detailed";
import SidebarArea from "./SidebarArea";
import HighestBid from "./HighestBid";

import { useRouter } from "next/router";
import { useTezosCollectStore } from "api/store";
import { useEffect } from "react";

// import '../../assets/css/itemDetails.css'

const PlaceBidContainer = () => {
  const router = useRouter();
  const { id } = router.query;
  const { auctionData, fetchAuctionData } = useTezosCollectStore();

  useEffect(() => {
    fetchAuctionData();
  }, [id]);

  return (
    <>
      {/* <Breadcumb namePage="Create Auction" title="Create Auction" /> */}
      <section className="section-padding-100">
        <div className="container">
          {auctionData && auctionData[id] ? (
            <div className="row">
              <Detailed img={auctionData[id].image} />

              <SidebarArea tokenData={auctionData[id]} />

              <HighestBid tokenData={auctionData[id]} />
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
