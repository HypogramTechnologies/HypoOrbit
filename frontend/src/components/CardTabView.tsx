import IndexCard from "./IndexCard";
import "../styles/cardTabView.css";
import type { ICardTabViewProps } from "../types/ICardTabViewProps";

const INDEX_METADATA = {
  NBR: {
    fullName: "Normalized Burn Ratio",
    description:
      "Índice utilizado para identificar áreas queimadas e avaliar a severidade do fogo em áreas de vegetação.",
    colorClass: "nbr",
  },
  NDVI: {
    fullName: "Normalized Difference Vegetation Index",
    description:
      "Mede a densidade e saúde da vegetação através da análise da luz refletida pelas plantas.",
    colorClass: "ndvi",
  },
  EVI: {
    fullName: "Enhanced Vegetation Index",
    description:
      "Versão aprimorada do NDVI que minimiza influências atmosféricas e de fundo do solo.",
    colorClass: "evi",
  },
};

export default function CardTabView({ statisticsData }: ICardTabViewProps) {
  if (!statisticsData || !statisticsData.statistics) {
    return (
      <div className="card-tab-view-empty">
        <p>Nenhuma estatística disponível para visualização.</p>
      </div>
    );
  }

  const { statistics } = statisticsData;
  const indicesToRender = Object.keys(statistics).filter(
    (index) =>
      statistics[index] && INDEX_METADATA[index as keyof typeof INDEX_METADATA]
  ) as ("NBR" | "NDVI" | "EVI")[];

  return (
    <div className="card-tab-view">
      <h2 className="tab-title">Estatísticas dos índices</h2>
      <p className="tab-subtitle">
        Valores médios, máximos e mínimos das séries temporais analisadas.
      </p>

      <div className="index-cards-container">
        {indicesToRender.map((indexName) => {
          const stats = statistics[indexName]!;
          const meta = INDEX_METADATA[indexName];

          return (
            <IndexCard
              key={indexName}
              indexName={indexName}
              fullName={meta.fullName}
              description={meta.description}
              stats={stats}
              colorClass={meta.colorClass as "nbr" | "ndvi" | "evi"}
            />
          );
        })}
      </div>
    </div>
  );
}
