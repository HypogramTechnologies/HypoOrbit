import { Route, Routes } from "react-router-dom";
import MapView from '../pages/MapView';

export default function Rotas() {
  return (
    <Routes>
      <Route path="/map" element={<MapView />} />
    </Routes>
  );
}