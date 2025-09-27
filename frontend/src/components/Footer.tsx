import React from "react";
import "../styles/footer.css";
import FooterImg from "../assets/Footer.png"; 

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <img src={FooterImg} alt="Logo da HypoHeat" className="footer-logo" />
      <div className="text-container">
        <p>© 2025 Desenvolvido pela Hypogram. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;