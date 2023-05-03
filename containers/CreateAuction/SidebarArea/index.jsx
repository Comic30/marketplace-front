import Link from "next/link";
import iconsf1 from "../../../assets/img/icons/f1.png";
import authors8 from "../../../assets/img/authors/8.png";
import authors2 from "../../../assets/img/authors/2.png";
import artworkfire from "../../../assets/img/art-work/fire.png";
import details from "../../../data/data-containers/data-ItemDetails-SidebarArea.json";
import { useState } from "react";

const SidebarArea = () => {
  const [fixedPrice, setFixedPrice] = useState();

  return (
    <>
      <div className="col-12 col-lg-4 mt-s">
        <div className="sidebar-area">
          <div className="donnot-miss-widget">
            <div className="who-we-contant">
              <div className="filers-list">
                <Link href="/Discover">
                  <a className="filter-item">
                    <img src={iconsf1.src} alt="" />
                    Crypto Art
                  </a>
                </Link>
              </div>
              <h4>Floyd Mayweather Jr.</h4>
            </div>
            <div className="details-list">
              {details &&
                details.map((item, i) => (
                  <p key={i}>
                    {item.text1} : <span>{item.text2}</span>
                  </p>
                ))}
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
            <Link href="#test-popup">
              <a className="open-popup-link more-btn width-100 mt-30">
                Fixed Price Sale
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarArea;
