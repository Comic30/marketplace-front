import Breadcumb from "../../components/Breadcumb";
import CollectionItem from "./CollectionItem";
import CreatorSec from "./CreatorSec";
import { useRouter } from "next/router";
import { useTezosCollectStore } from "api/store";
import { useEffect } from "react";

// import '../../assets/css/createItem.css'

const CreateItemContainer = () => {
  const { currentUser } = useTezosCollectStore();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <section className="blog-area section-padding-100">
        <div className="container">
          <div className="row">
            <CollectionItem />

            <div className="col-12 col-lg-8">
              <CreatorSec />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateItemContainer;
