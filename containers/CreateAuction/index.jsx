import Breadcumb from "../../components/Breadcumb";
import Detailed from "../ItemDetails/Detailed";
import SidebarArea from "./SidebarArea";

import { useRouter } from "next/router";
import { useTezosCollectStore } from "api/store";
import { useEffect } from "react";
import AuctionForm from "./AuctionForm";

// import '../../assets/css/itemDetails.css'

const CreateAuctionContainer = () => {
  const router = useRouter();
  const { id } = router.query;
  const { tokenData, list_with_fixed_price, fetchNft } = useTezosCollectStore();

  useEffect(() => {
    fetchNft();
  }, [id]);

  return (
    <>
      {/* <Breadcumb namePage="Create Auction" title="Create Auction" /> */}
      <section className="section-padding-100">
        <div className="container">
          {tokenData && tokenData[id] ? (
            <div className="row">
              <Detailed img={tokenData[id].image} />

              <SidebarArea tokenData={tokenData[id]} />
              <AuctionForm tokenData={tokenData[id]} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default CreateAuctionContainer;
