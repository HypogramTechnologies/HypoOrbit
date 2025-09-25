import { Route, Routes } from "react-router-dom";
import MapView from '../pages/MapView';

import Home from '../components/Home';

export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<MapView />} />
    </Routes>
  );
}