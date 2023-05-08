import Link from "next/link";
import InfoComponent from "../../components/InfoComponent";
import { useTezosCollectStore } from "api/store";
import { useEffect, useState } from "react";
import TopCollectionsItem from "../../components/TopCollectionsItem";

function MyItemsContainer() {
  const { activeAddress, tokenData, fetchNft } = useTezosCollectStore();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    fetchNft();
  }, []);

  useEffect(() => {
    if (tokenData) {
      setFilteredData(
        tokenData.filter(
          (item) => item.owner == activeAddress && item.collectable == false
        )
      );
    }
  }, [tokenData]);
  return (
    <section className="section-padding-100 clearfix">
      <div className="container">
        <InfoComponent
          titleSm="Our Top Collections"
          titleLg="Popular Collections"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo."
        />
        <div className="row">
          {filteredData &&
            filteredData.map((item, i) => (
              <TopCollectionsItem
                key={i}
                img={item.image}
                price={item.amount}
                name={item.name}
                token_id={item.token_id}
                owner={item.owner}
                is_own={true}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default MyItemsContainer;
