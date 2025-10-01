import React, { useState } from "react";

const Teste: React.FC = () => {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Função de busca assíncrona
  const handleSearch = async () => {
    if (!address) return;

    try {
      setError(null);
      setResult(null);

      const response = await fetch(
        `http://localhost:3000/geocode?q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data.status === "ok" && data.results.length > 0) {
        setResult(data.results[0]); // pega o primeiro resultado
      } else {
        setError("Nenhum resultado encontrado.");
      }
    } catch (err) {
      setError("Erro ao consultar a API.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Buscar coordenadas</h2>

      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Digite um endereço"
        className="border p-2 w-full mb-2 rounded"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {result && (
        <div className="mt-4 p-2 border rounded bg-gray-50">
          <p>
            <strong>Endereço:</strong> {result.formatted_address}
          </p>
          <p>
            <strong>Latitude:</strong> {result.geometry.location.lat}
          </p>
          <p>
            <strong>Longitude:</strong> {result.geometry.location.lng}
          </p>
        </div>
      )}
    </div>
  );
};

export default Teste;
