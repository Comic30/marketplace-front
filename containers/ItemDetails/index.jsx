import Detailed from "./Detailed";
import SidebarArea from "./SidebarArea";
import HighestBid from "./HighestBid";

import { useRouter } from "next/router";
import { useTezosCollectStore } from "api/store";
import { useEffect } from "react";

const ItemDetailsContainer = () => {
  const router = useRouter();
  const { id } = router.query;
  const { tokenData, fetchNft } = useTezosCollectStore();

  useEffect(() => {
    fetchNft();
  }, [id]);

  return (
    <>
      <section className="section-padding-100">
        <div className="container">
          {tokenData && tokenData[id] ? (
            <div className="row">
              <Detailed img={tokenData[id].image} />

              <SidebarArea tokenData={tokenData[id]} />

              <HighestBid tokenData={tokenData[id]} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default ItemDetailsContainer;
