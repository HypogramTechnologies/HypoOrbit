import { Request, Response } from "express";
import { IStacCollection } from "../types/IStacCollection";
import { StacSearchParams } from "../types/IStacSearchParams";
import { StacService } from "../services/stac";
import { SatelliteService } from "../services/satellite";

const stacService: StacService = new StacService();
const satelliteService: SatelliteService = new SatelliteService();

export class SyncSatelliteController {
  //Valida se o satélite existe, se não existir a inserção será feita
  async syncSatellitesById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ message: "Parâmetro 'id' é obrigatório." });
      }
      const collection = await satelliteService.getSatelliteById(id);
      if (!collection) {
        const stacCollection: IStacCollection | null = await stacService.getCollection(id);
        if (!stacCollection) {
          return res.status(404).json({ message: "Falha ao buscar coleções do STAC." });
        }else {
          const newSatellite = await satelliteService.createSatelliteFromStac(stacCollection);
          return res.status(201).json({ message: "Satélite sincronizado com sucesso.", satellite: newSatellite });
        }
      }else{
        return res.status(200).json(collection);
      }
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ message: "Erro ao sincronizar satélite.", erro });
    }
  }

  //Inserção em massa de satélites
  async setupSatellites(req: Request, res: Response) {
    try {
      const collectionsData = await stacService.getCollections();
      const collections: IStacCollection[] = collectionsData || [];

      console.log(collections[0])
      if (!collections) {
        return res.status(500).json({ message: "Falha ao buscar coleções do STAC." });
      }

      await Promise.all(
        collections.map(
          (element: IStacCollection) =>
        satelliteService.createSatelliteFromStac(element)
        )
      );

      return res
        .status(201)
        .json({ message: "Satélites sincronizados com sucesso.", collections});
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao inserir satélites.", error });
    }
  }
}
