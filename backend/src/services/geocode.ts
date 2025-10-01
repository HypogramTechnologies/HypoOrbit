import geocode from "../config/geocode";
import express from "express";

export class GeocodeService {
  // GET /search/?q=
  async getAddress(address: string) {
    const response = await geocode.get(`/`, {
      params: { q: address, limit: 10 },
    });
    return response.data;
  }
}