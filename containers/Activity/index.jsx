import Breadcumb from "../../components/Breadcumb";
import SidebarAreaContainer from "../../components/SidebarArea";
import TimelineBox from "./TimelineBox";
// import '../../assets/css/activity.css'

const ActivityContainer = () => {
  return (
    <>
      <section className="blog-area section-padding-100">
        <div className="container">
          <div className="row">
            <TimelineBox />
            <SidebarAreaContainer />
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivityContainer;
