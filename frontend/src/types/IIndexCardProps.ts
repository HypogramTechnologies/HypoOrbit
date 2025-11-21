interface IIndexStats {
    avg: number;
    max: number;
    min: number;
}

export interface IIndexCardProps {
    indexName: string; 
    fullName: string; 
    description: string; 
    stats: IIndexStats; 
    colorClass: 'nbr' | 'ndvi' | 'evi'; 
}