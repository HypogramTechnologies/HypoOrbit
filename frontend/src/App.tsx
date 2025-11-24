import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Rotas from './routes/Routes';
import "./index.css";
import { FiltroProvider } from "./context/FilterMapContext"; 
import Help from "./components/Help";
import { ModalProvider } from "./context/ModalContext";
import "./config/leaflet";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <FiltroProvider>
        <div className="container-style">
          <BrowserRouter>
            <Rotas />
          </BrowserRouter>
          <Help />
        </div>
      </FiltroProvider>
    </ModalProvider>
  </StrictMode>
);
