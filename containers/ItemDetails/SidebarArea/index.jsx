import Link from "next/link";
import authors8 from "../../../assets/img/authors/8.png";
import { useTezosCollectStore } from "../../../api/store";
import { useRouter } from "next/router";

const SidebarArea = ({ tokenData }) => {
  const { activeAddress, collectNft, makeShort } = useTezosCollectStore();
  const router = useRouter();

  const purchaseNft = async (e) => {
    e.preventDefault();
    try {
      await collectNft(tokenData.token_id, tokenData.price);
      router.push("/MyItems");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className="col-12 col-lg-4 mt-s">
        <div className="sidebar-area">
          <div className="donnot-miss-widget">
            <div className="mb-15 gray-text">
              <span className="w-text mr-15">
                Current Price: {tokenData.price} MUTEZ{" "}
              </span>
            </div>
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
            <div className="author-item mb-30">
              <div className="author-img ml-0">
                <img src={authors8.src} width="70" alt="" />
              </div>
              <div className="author-info">
                <Link href="/Profile">
                  <h5 className="author-name">Owner</h5>
                </Link>
                <p className="author-earn mb-0">{makeShort(tokenData.owner)}</p>
              </div>
            </div>
            {activeAddress != tokenData.owner ? (
              <div
                className="btn more-btn width-100 mt-30"
                onClick={purchaseNft}
              >
                Purchase Now
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarArea;
