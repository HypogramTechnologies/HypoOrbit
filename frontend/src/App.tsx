import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Rotas from './routes/Routes';
import "./index.css";
import "./app.css";
import { FiltroProvider } from "./context/FilterMapContext"; 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FiltroProvider>
      <div className="container-style">
        <BrowserRouter>
          <Rotas />
        </BrowserRouter>
      </div>
    </FiltroProvider>
  </StrictMode>
);
