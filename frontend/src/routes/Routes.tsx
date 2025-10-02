import { Route, Routes } from "react-router-dom";
import MapView from '../pages/MapView';
import TimeSeriesView from '../pages/TimeSeriesView';
import SatelliteView from '../pages/SatelliteView';
import Message from '../components/Message';
import Teste from '../components/teste';

export default function Rotas() {
  return (
    <Routes>
      {/* <Route path="/" element={<MapView />} /> */}
      <Route path="/" element={<MapView />} />
      <Route path="/teste" element={<Teste />} />
      <Route path="/map" element={<MapView />} />
      <Route path="/satellite" element={<SatelliteView />} />
      <Route path="/timeseries" element={<TimeSeriesView />} />
    </Routes>
  );
}