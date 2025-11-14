import geocode from "../config/geocode";
import express from "express";

export class GeocodeService {
  // GET /search/?q=
  async getAddress(address: string) {
    const response = await geocode.get(`/api`, {
      params: { q: address, limit: 10 },
    });
    return response.data;
  }

  // GET /reverse?lat=&lon=
  async reverseGeocode(lat: number, lon: number) {
    const response = await geocode.get(`/reverse`, {
      params: { lon, lat },
    });
    return response.data;
  }
}