import { useEffect } from "react";
import dynamic from "next/dynamic";
// import { NavLink } from "react-router-dom";
import { SortingCard } from "../../utils";
// import CollectionItem from './CollectionItem'
import Breadcumb from "../../components/Breadcumb";
// import FilterSec from '../../components/FilterSec'
import { ProfileData } from "../../data/data-containers/data-Profile.js";

const FilterSec = dynamic(
  () => {
    return import("../../components/FilterSec");
  },
  { ssr: false }
);

// import '../../assets/css/profile.css'

const ProfileContainer = () => {
  return (
    <>
      <section className="blog-area section-padding-100">
        <div className="container text-center">
          <h1>Profile Page...</h1>{" "}
        </div>
      </section>
    </>
  );
};

export default ProfileContainer;
