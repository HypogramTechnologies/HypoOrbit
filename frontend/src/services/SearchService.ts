import api from "./api";

export class SearchService {
  async createSearch(latitude: number, longitude: number) {
    const data = await api.post("/searches", { latitude, longitude });
    return data;
  }

  async getLastSearches() {
    const data = await api.get("/searches/lasts");
    return data;
  }
}
