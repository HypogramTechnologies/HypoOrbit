import type { ISatelliteCardProps } from "../types/ISatelliteCardProps";


const SatelliteCard: React.FC<ISatelliteCardProps> = ({ id, updatedTime, gsd, spectralIndices }) => {


    return(
        <div>
            {id && <h3>{id}</h3>}
            {updatedTime && <p>Tempo de atualização: {updatedTime}</p>}
            {gsd && <p>GSD: {gsd} m</p>}
            {spectralIndices && spectralIndices.length > 0 && (
                <ul>
                {spectralIndices.map((variable:any, index:any) => (
                    <li key={index}>{variable}</li>
                ))}
                </ul>
             )}
        </div>
    );
}

export default SatelliteCard;