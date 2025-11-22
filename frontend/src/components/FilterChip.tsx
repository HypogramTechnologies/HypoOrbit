import React from 'react';
import '../styles/filterChip.css'; 

interface FilterChipProps {
    label: string;
    value: React.ReactNode; 
    icon?: React.ReactNode; 
}

export default function FilterChip({ label, value, icon}: FilterChipProps) {
    return (
        <div className={`filter-chip`}>
            {icon && <span className="chip-icon">{icon}</span>}
            <span className="chip-label">{label}: </span>
            <strong className="chip-value">{value}</strong>
        </div>
    );
};