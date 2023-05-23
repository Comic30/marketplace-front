import DetailedImg from "../../../assets/img/art-work/detailed.jpg";

const Detailed = ({ img }) => {
  return (
    <>
      <div className="col-12 col-lg-4">
        <div className="detailed-img">
          <img
            src={`https://ipfs.io/ipfs/${img.split("ipfs://")[1]}`}
            alt=""
            style={{ height: "300px", width: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default Detailed;
