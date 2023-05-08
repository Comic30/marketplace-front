import dynamic from "next/dynamic";
const Header = dynamic(
  () => {
    return import("../../layouts/Header");
  },
  { ssr: false }
);
import PlaceBidContainer from "../../containers/PlaceBid";
import Footer from "../../layouts/Footer";

// import '../../assets/css/itemDetails.css'

const PlaceBid = () => {
  return (
    <>
      <Header Title="Create Auction" />
      <PlaceBidContainer />
      <Footer />
    </>
  );
};

export default PlaceBid;
