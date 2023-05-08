import Link from "next/link";
import iconsf1 from "../../../assets/img/icons/f1.png";
import authors8 from "../../../assets/img/authors/8.png";
import authors2 from "../../../assets/img/authors/2.png";
import artworkfire from "../../../assets/img/art-work/fire.png";
import details from "../../../data/data-containers/data-ItemDetails-SidebarArea.json";

const SidebarArea = ({ tokenData }) => {
  return (
    <>
      <div className="col-12 col-lg-4 mt-s">
        <div className="sidebar-area">
          <div className="donnot-miss-widget">
            <div className="mb-15 gray-text">
              <span className="w-text mr-15">
                Current Price: {tokenData.start_price} TEZ{" "}
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
                  <h5 className="author-name">LarySmith-30</h5>
                </Link>
                <p className="author-earn mb-0">Item Owner</p>
              </div>
            </div>
            <div className="highest-bid">
              <h5 className="w-text mb-15">Highest Bid</h5>
              <div className="admire">
                <div className="adm w-text">
                  <img src={authors2.src} width="30" alt="" className="mr-5p" />
                  Wadee-Nel
                </div>
                <div className="adm">
                  <img
                    src={artworkfire.src}
                    width="30"
                    alt=""
                    className="mr-5p"
                  />
                  <span className="bold mr-5p">
                    {tokenData.current_price} TEZ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarArea;
