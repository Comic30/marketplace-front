import Link from "next/link";

function ItemTimeline({ FullTime, Time, title, text, name = "", bid = "" }) {
  return (
    <li>
      <div className="timelineDot"></div>
      <div className="timelineDate">
        <p>
          <i className="fa fa-calendar mr-6p"></i>
          {FullTime.substring(0, 10)}
        </p>
        <p>
          <i className="fa fa-clock-o mr-6p"></i>
          {new Date(Time).toLocaleTimeString("en-US")}
        </p>
      </div>
      <div className="timelineWork">
        <h6>{title}</h6>
        <span>
          {name} : {text}
          {bid !== ""
            ? "for" + <span className="w-text">{bid} MUTEZ Each</span>
            : ""}{" "}
        </span>
      </div>
    </li>
  );
}

export default ItemTimeline;
