// src/services/GeocodeService.ts
import api from "./api";

export class GeocodeService {
  async getAddress(query: string) {
    const response = await api.get(`/geocode/address`, {
      params: { q: query }
    });
    return response.data; 
  }
}
