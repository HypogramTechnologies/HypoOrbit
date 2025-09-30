import React, { useState} from "react";
import { useFilter } from "../context/FilterMapContext";
import "leaflet/dist/leaflet.css";
import "../styles/mapFilter.css";
import {validateCoordinates} from "../utils/validateCoordinates";





const MapFilter: React.FC = () => {
    const { setFilter } = useFilter();
    
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const coordinates = e.target.value.trim();
        console.log(coordinates);
        
         //Validar se está dentro do formato esperado
        if (validateCoordinates(coordinates)){
            let collectionCoordinates = []
            collectionCoordinates = coordinates.split(',');
            console.log(collectionCoordinates);

            if(collectionCoordinates.length >= 1){
                const lat =  parseFloat(collectionCoordinates[0]);
                const lng = parseFloat(collectionCoordinates[1]);
                setFilter({ latitude: lat, longitude: lng })
            }
            
            console.log('Certo')
        }else{
            console.log('Erro')
        }
        
    }

  

   


    //Futuramento verificar se é algum endereço via api para transformar em latitude/longitude
    // setFilter({ latitude: lat, longitude: lng });

    return(
        <>
           <input id="input-search" type="text" defaultValue="" onBlur={inputChange} placeholder="ex: -15.793889, -47.882778" className="filter-container"/>
        </>
    );
};


export default MapFilter;