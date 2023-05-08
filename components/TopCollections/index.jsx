import TopCollectionsItem from "../TopCollectionsItem";
import InfoComponent from "../InfoComponent";
import { TopCollectionsData } from "../../data/data-components/data-TopCollections.js";
// import TopCollectionsData from './data.json'
import { useTezosCollectStore } from "api/store";
import { useEffect, useState } from "react";

function TopCollectionsContainer() {
  const { tokenData, fetchNft } = useTezosCollectStore();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    fetchNft();
  }, []);

  useEffect(() => {
    if (tokenData) {
      setFilteredData(tokenData.filter((item) => item.collectable == true));
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
                is_own={false}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default TopCollectionsContainer;
