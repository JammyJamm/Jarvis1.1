import DailyData from "./dailyData";
// import OfflineWebsite from "./OfflineWebsite";
import OfficeRules from "./rule";
import "./style.css";
const Office = () => {
  return (
    <div>
      <OfficeRules />
      <DailyData />
      {/* <OfflineWebsite /> */}
    </div>
  );
};
export default Office;
