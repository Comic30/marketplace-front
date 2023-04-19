import dynamic from "next/dynamic";
import HeroContainer from '../components/Hero'
import TopSellers from '../components/TopSellers'
import TopCollections from '../components/TopCollections'
import ListedItems from '../components/ListedItems'
import LiveAuctions from '../components/LiveAuctions'
// import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const Header = dynamic(
  () => {
    return import('../layouts/Header');
  },
  { ssr: false }
);

const Home = () => {
  return (
  	<>
      <Header Title='NFT Market Place - Comic' />
      <HeroContainer
        ClassDiv="hero-section moving section-padding"
        addMoving={true}
        title="All NFTs You need in One Marketplace"
        textUp="The Best Place to Collect , Buy and Sell"
        SpanTex="Awesome NFTs"
        textDown="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet dolorem blanditiis ad perferendis, labore delectus dolor adipisicing elit sit amet, adipisicing elit. Eveniet adipisicing elit."
        linkUp="Explore More"
        linkDown="Collect NFT"
      />
      <TopCollections />
      <TopSellers />
      <ListedItems />
      <LiveAuctions />
      <Footer />
    </>
  );
}

export default Home;

