import "../index.css";
import Menu from "../components/Menu";
import SatelliteList from "../components/SatelliteList";

export default function SatelliteView() {
  return (
    <div className="container">
      <Menu />
      <SatelliteList />
    </div>
  );
}
