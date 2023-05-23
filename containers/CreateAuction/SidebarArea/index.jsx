import Link from "next/link";
import iconsf1 from "../../../assets/img/icons/f1.png";
import authors2 from "../../../assets/img/authors/2.png";
import artworkfire from "../../../assets/img/art-work/fire.png";
import details from "../../../data/data-containers/data-ItemDetails-SidebarArea.json";
import { useState } from "react";
import { useTezosCollectStore } from "api/store";
import { useRouter } from "next/router";

const SidebarArea = ({ tokenData }) => {
  const { listWithFixedPrice } = useTezosCollectStore();
  const [fixedPrice, setFixedPrice] = useState(0);
  const router = useRouter();

  const listNft = async (e) => {
    e.preventDefault();
    try {
      await listWithFixedPrice({
        price: fixedPrice,
        token_id: tokenData.token_id,
      });
    } catch (e) {
      console.error(e);
    }
    router.push("/Discover");
  };
  return (
    <>
      <div className="col-12 col-lg-4 mt-s">
        <div className="sidebar-area">
          <div className="donnot-miss-widget">
            <div className="details-list">
              <p>
                Artist : <span>{tokenData.artist}</span>
              </p>
              <p>
                Size : <span>{tokenData.size}</span>
              </p>
              <p>
                Created : <span>{"Created At"}</span>
              </p>
              <p>
                Collection : <span>{tokenData.collection}</span>
              </p>
            </div>
            <div className="price">
              <p>
                Fixed Price :{" "}
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={fixedPrice}
                  onChange={(e) => setFixedPrice(e.target.value)}
                  required
                />
              </p>
            </div>
            <div className="btn more-btn ml-50" onClick={listNft}>
              Fixed Price Sale
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarArea;
