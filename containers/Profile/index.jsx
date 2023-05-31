import { useEffect } from "react";
import dynamic from "next/dynamic";
// import { NavLink } from "react-router-dom";
import { SortingCard } from "../../utils";
// import CollectionItem from './CollectionItem'
import Breadcumb from "../../components/Breadcumb";
// import FilterSec from '../../components/FilterSec'
import { useTezosCollectStore } from "api/store";

const FilterSec = dynamic(
  () => {
    return import("../../components/FilterSec");
  },
  { ssr: false }
);

const CollectionItem = dynamic(
  () => {
    return import("./CollectionItem");
  },
  { ssr: false }
);

// import '../../assets/css/profile.css'

const ProfileContainer = () => {
  const { tokenData, fetchNft, currentUser } = useTezosCollectStore();
  let ProfileData = [];
  useEffect(() => {
    fetchNft();
  }, []);
  useEffect(() => {
    if (tokenData) {
      tokenData.map((item, i) => {
        const data = {
          ClassChange: "design",
          imgBig: `https://ipfs.io/ipfs/${item.image.split("ipfs://")[1]}`,
          imgSm: currentUser.avatar.substring(2),
          title: "@Smith Wright",
          price: 0.081,
          bid: 0.081,
        };
        ProfileData.push(data);
      });
      console.log(ProfileData);
    }
  }, tokenData);
  return (
    <>
      <section className="blog-area section-padding-100">
        <div className="container">
          <div className="row">
            <CollectionItem />

            <FilterSec ClassCol="col-12 col-md-9" data={ProfileData} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileContainer;
