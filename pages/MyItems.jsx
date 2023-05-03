import dynamic from "next/dynamic";
const Header = dynamic(
  () => {
    return import("../layouts/Header");
  },
  { ssr: false }
);
import MyItemsContainer from "../containers/MyItems";
import Footer from "../layouts/Footer";

const MyItems = () => {
  return (
    <>
      <Header Title="My NFTs" />
      <MyItemsContainer />
      <Footer />
    </>
  );
};

export default MyItems;
