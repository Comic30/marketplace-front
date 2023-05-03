import dynamic from "next/dynamic";
const Header = dynamic(
  () => {
    return import("../../layouts/Header");
  },
  { ssr: false }
);
import CreateAuctionContainer from "../../containers/CreateAuction";
import Footer from "../../layouts/Footer";

// import '../../assets/css/itemDetails.css'

const CreateAuctions = () => {
  return (
    <>
      <Header Title="Create Auction" />
      <CreateAuctionContainer />
      <Footer />
    </>
  );
};

export default CreateAuctions;
