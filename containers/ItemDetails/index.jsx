import Breadcumb from "../../components/Breadcumb";
import Detailed from "./Detailed";
import SidebarArea from "./SidebarArea";
import HighestBid from "./HighestBid";
import TestPopup from "./TestPopup";

import { useRouter } from "next/router";
import { useTezosCollectStore } from "api/store";
import { useEffect } from "react";

// import '../../assets/css/itemDetails.css'

const ItemDetailsContainer = () => {
  const router = useRouter();
  const { id } = router.query;
  const { tokenData, fetchNft } = useTezosCollectStore();

  console.log("+++++++++++++++", id);
  console.log("tokenData", tokenData);
  useEffect(() => {
    fetchNft();
  }, [id]);

  return (
    <>
      <Breadcumb namePage="Item Details" title="Item Details" />
      <section className="section-padding-100">
        <div className="container">
          {tokenData && tokenData[id] ? (
            <div className="row">
              <Detailed img={tokenData[id].image} />

              <SidebarArea />

              <HighestBid />
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
      <TestPopup />
    </>
  );
};

export default ItemDetailsContainer;
