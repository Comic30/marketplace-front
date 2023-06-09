import PartProfile from "../../../components/PartProfile";
import CreateItemProfileheader from "../../../assets/img/art-work/profile-header.jpg";
import CreateItemAuthors2 from "../../../assets/img/authors/2.png";
import CreateItemArtworkfire from "../../../assets/img/art-work/fire.png";
import CreateItemDataIcon from "../../../data/data-containers/data-CollectionItem-Profile.json";
import { useTezosCollectStore } from "api/store";

const CollectionItem = () => {
  const { currentUser, activeAddress, makeShort } = useTezosCollectStore();

  return (
    <>
      <PartProfile
        img1={CreateItemProfileheader}
        img2={CreateItemAuthors2}
        img3={CreateItemArtworkfire}
        data={CreateItemDataIcon}
        user={currentUser}
        wallet={makeShort(activeAddress)}
      />
    </>
  );
};

export default CollectionItem;
