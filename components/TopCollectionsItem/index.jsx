import Link from "next/link";

function TopCollectionsItem({ img, name, price, token_id, owner, is_own }) {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <Link
        href={
          is_own == false
            ? `/ItemDetails/${token_id}`
            : `/CreateAuctions/${token_id}`
        }
      >
        <a>
          <div
            className="service_single_content collection-item"
            data-aos="fade-up"
          >
            <div className="collection_icon">
              <img
                style={{ height: "250px", width: "100%" }}
                src={`https://ipfs.io/ipfs/${img.split("ipfs://")[1]}`}
                alt=""
              />
            </div>
            <div className="collection_info">
              <h6>{name}</h6>
              <p>
                Owner : <span className="w-text">{owner}</span>
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default TopCollectionsItem;
