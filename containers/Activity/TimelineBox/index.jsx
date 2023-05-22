import ItemTimeline from "./ItemTimeline";
import timelineData from "../../../data/data-containers/data-Timeline.json";
import { useTezosCollectStore } from "api/store";
import { useEffect } from "react";

const TimelineBox = () => {
  const { recentActivityData, fetchRecentTransactions, makeShort } =
    useTezosCollectStore();

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  return (
    <>
      <div className="col-12 col-md-9">
        <div className="timelineBox">
          <div className="timelineHeader">
            <h3>Recent Activity</h3>
          </div>
          <div className="timelineBody">
            <ul className="timeline">
              {recentActivityData &&
                recentActivityData.map((item, i) => (
                  <ItemTimeline
                    FullTime={item.timestamp}
                    Time={item.timestamp}
                    title={item.parameter.entrypoint}
                    text={item.parameter.entrypoint}
                    addLink={item.parameter.entrypoint}
                    name={makeShort(item.sender.address)}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimelineBox;
