import InfoComponent from "../InfoComponent";
import LiveAuctionsItem from "../LiveAuctionsItem";
import { useTezosCollectStore } from "api/store";
import { useEffect, useState } from "react";

function LiveAuctionsContainer() {
  const { auctionData, fetchAuctionData } = useTezosCollectStore();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    fetchAuctionData();
  }, []);

  useEffect(() => {
    if (auctionData) {
      console.log("auctionData", auctionData);
      // setFilteredData(tokenData.filter((item) => item.collectable == true));
    }
  }, [auctionData]);

  return (
    <section className="features  section-padding-50 ">
      <div className="container">
        <InfoComponent
          titleSm="Live auctions"
          titleLg="Live auctions"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo."
        />
        <div className="row align-items-center">
          {auctionData &&
            auctionData.map((item, i) => (
              <LiveAuctionsItem key={i} data={auctionData[i]} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default LiveAuctionsContainer;
