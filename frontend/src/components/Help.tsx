import { useState, type ReactNode } from "react";
import "../styles/help.css";

interface HelpItemData {
  id: "mapa" | "lista" | "series";
  title: string;
  subtitle: string;
  iconClass: string;
  content: ReactNode;
}

const helpItems: HelpItemData[] = [
  {
    id: "mapa",
    title: "Mapa",
    subtitle: "Selecione uma localização",
    iconClass: "fa-solid fa-map",
    content: (
      <>
        No mapa você pode informar uma localização de três formas: digitando coordenadas (latitude e longitude), digitando um endereço na barra de pesquisa, ou clicando diretamente no mapa.
        Após a seleção, um modal será aberto mostrando os satélites disponíveis para aquela área. Neste modal, é possível visualizar informações detalhadas dos satélites. Selecione os desejados para visualizar suas séries temporais.
      </>
    ),
  },
  {
    id: "lista",
    title: "Lista de satélites",
    subtitle: "Visualize todos os satélites",
    iconClass: "fa-solid fa-thumbtack",
    content: (
      <>
        Nesta aba você pode visualizar todos os satélites disponíveis no sistema e suas informações técnicas. Explore os detalhes de cada satélite, como especificações, órbita e capacidades de imageamento.
      </>
    ),
  },
  {
    id: "series",
    title: "Séries temporais",
    subtitle: "Análise, estatísticas e exportação de dados",
    iconClass: "fa-solid fa-chart-line",
    content: (
      <>
        Visualize as séries temporais dos satélites selecionados, realize análises estatísticas e exporte os dados completos. Para iniciar, utilize o botão de redirecionamento para voltar ao mapa e escolher a localização e os satélites de interesse.
      </>
    ),
  },
];

interface HelpItemProps {
  item: HelpItemData;
  selectedTab: HelpItemData["id"] | null;
  setSelectedTab: (id: HelpItemData["id"] | null) => void;
}

function HelpItem({ item, selectedTab, setSelectedTab }: HelpItemProps) {
  const isOpen = selectedTab === item.id;

  const handleClick = () => {
    setSelectedTab(isOpen ? null : item.id);
  };

  return (
    <div
      className={`help-item ${isOpen ? "open" : ""}`}
      onClick={handleClick}
      aria-expanded={isOpen}
      role="button"
      tabIndex={0}
    >
      <div className="help-item-header">
        <div className="help-item-icon">
          <i className={item.iconClass}></i>
        </div>
        <div className="help-item-texts">
          <p className="help-item-title">{item.title}</p>
          <p className="help-item-subtitle">{item.subtitle}</p>
        </div>
      </div>
      {isOpen && <div className="help-item-content">{item.content}</div>}
    </div>
  );
}

export default function Help() {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<HelpItemData["id"] | null>(null);

  return (
    <>
      <button
        className="help-button-close"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fechar ajuda" : "Abrir ajuda"}
      >
        <i className={open ? "fa-solid fa-xmark" : "fa-solid fa-circle-question"}></i>
      </button>

      <div className={`help-container ${open ? "open" : "closed"}`}>
        <div className="help-header">
          <h2 className="help-title-image">Como podemos ajudar?</h2>
        </div>

        <div className="help-items-list">
          {helpItems.map((item) => (
            <HelpItem
              key={item.id}
              item={item}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </div>

        <p className="help-text-footer">
          Clique em uma seção para ver mais detalhes
        </p>
      </div>
    </>
  );
}