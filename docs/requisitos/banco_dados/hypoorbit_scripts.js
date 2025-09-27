/* 1 - CRIAÇÃO DO BANCO DE DADOS */
use hypoorbit;
db.createCollection("satellite"); /* DOCUMENTO PRINCIPAL (Principais informações do satélite) */
db.createCollection("satellite_item_assets"); /* DOCUMENTO REFERENCIADO (Arquivos ou produtos digitais que representam os dados capturados pelo satélite) */

/* 2 - MODELAGEM DE RELACIONAMENTOD */
/* INSERT */
db.satellite.insertMany([{
    id: "mosaic-cbers4a-paraiba-3m-1",
    type: "Collection",
    stac_version: "1.0.0",
    stac_extensions: [
        "https://stac-extensions.github.io/version/v1.0.0/schema.json",
        "https://stac-extensions.github.io/processing/v1.0.0/schema.json",
        "https://stac-extensions.github.io/item-assets/v1.0.0/schema.json",
        "https://stac-extensions.github.io/eo/v1.0.0/schema.json"
    ],
    title: "CBERS-4A/WFI Image Mosaic of Brazil Paraíba State - 3 Months",
    version: "1",
    deprecated: false,
    description: "CBERS-4A/WFI image mosaic of Brazil Paraíba State with 55m of spatial resolution...",
    keywords: ["mosaic","cbers","cbers-4a","wfi","visible wavelengths","ultraviolet wavelengths","paraiba state","cloud optimized geotiff","cog","earth observation","brazil"],
    providers: [
        {
            url: "https://data.inpe.br/big/",
            name: "National Institute for Space Research (INPE)",
            roles: ["host","processor","producer"],
            "processing:level": "L4",
            "processing:lineage": "Generation of Earth Observation Mosaic based on CBERS-4 L4 Data Cubes in Cloud Optimized GeoTIFF",
            "processing:facility": "BDC/BIG",
            "processing:software": { "bdc-cube-builder": "0.4.0" }
        }
    ],
    summaries: { gsd:[55], platform:["cbers-4a"], instruments:["wfi"], constellation:["cbers-4a"] },
    properties: {
        renders: { visual: { title:"visual", assets:["visual"], resampling:"nearest" } },
        "bdc:applications":["BDCExplorer"],
        created: ISODate("2024-05-03T17:58:15.432Z"),
        updated: ISODate("2024-05-03T17:58:15.432Z"),
        "eo:bands":[
            {name:"BAND14", common_name:"green", description:"B14 green band...", min:0, max:255, nodata:0, scale:1, data_type:"uint8", resolution_x:55, resolution_y:55, center_wavelength:0.555, full_width_half_max:0.07},
            {name:"BAND15", common_name:"red", description:"B15 red band...", min:0, max:255, nodata:0, scale:1, data_type:"uint8", resolution_x:55, resolution_y:55, center_wavelength:0.66, full_width_half_max:0.06},
            {name:"BAND16", common_name:"nir", description:"B16 nir band...", min:0, max:255, nodata:0, scale:1, data_type:"uint8", resolution_x:55, resolution_y:55, center_wavelength:0.83, full_width_half_max:0.12}
        ]
    },
    bdc_type: "mosaic",
    bdc_public: true,
    bdc_composite_function: "Least CC First",
    license: "Creative-Commons-Attribution-4.0-International",
    extent: {
        spatial: { bbox:[[-38.813489560006126,-8.397644349010521,-34.72237142526965,-5.876590026338112]] },
        temporal: { interval:[[ISODate("2020-07-01T00:00:00.000Z"), ISODate("2020-09-30T00:00:00.000Z")]] }
    },
    bdc_bands_quicklook:["BAND16","BAND15","BAND14"],
    links: [
        { href:"https://data.inpe.br/bdc/stac/v1/collections/mosaic-cbers4a-paraiba-3m-1", rel:"self", type:"application/json", title:"Link to this document" },
        { href:"https://data.inpe.br/bdc/stac/v1/collections/mosaic-cbers4a-paraiba-3m-1/items", rel:"items", type:"application/json", title:"Items of the collection" }
    ]
},
{
            "id": "AMZ1-WFI-L4-SR-1",
            "type": "Collection",
            "stac_version": "1.0.0",
            "stac_extensions": [
                "https://stac-extensions.github.io/version/v1.0.0/schema.json",
                "https://stac-extensions.github.io/processing/v1.0.0/schema.json",
                "https://stac-extensions.github.io/item-assets/v1.0.0/schema.json",
                "https://stac-extensions.github.io/eo/v1.0.0/schema.json"
            ],
            "title": "AMAZONIA-1/WFI - Level-4-SR - Cloud Optimized GeoTIFF",
            "version": "1",
            "deprecated": false,
            "description": "AMAZONIA-1/WFI - Level-4 Surface Reflectance product. L4 SR product provides orthorectified surface reflectance images. This dataset is provided as Cloud Optimized GeoTIFF (COG).",
            "keywords": [
                "amazonia",
                "amazonia-1",
                "wfi",
                "level-4",
                "surface reflectance",
                "cloud optimized geotiff",
                "cog",
                "earth observation",
                "brazil",
                "visible imagery"
            ],
            "providers": [
                {
                    "url": "https://data.inpe.br/big/",
                    "name": "National Institute for Space Research (INPE)",
                    "roles": [
                        "producer",
                        "licensor",
                        "host",
                        "processor"
                    ],
                    "processing:level": "L4 SR",
                    "processing:lineage": "Generation of L4 in Cloud Optimized GeoTIFF",
                    "processing:facility": "LGI",
                    "processing:software": {
                        "rio-cogeo": "3.0",
                        "bdc-collection-builder": "1.0"
                    }
                }
            ],
            "summaries": {
                "gsd": [
                    64
                ],
                "platform": [
                    "amazonia-1"
                ],
                "instruments": [
                    "wfi"
                ],
                "constellation": [
                    "amazonia-1"
                ],
                "view:off_nadir": [
                    0
                ]
            },
            "properties": {
                "renders": {
                    "rgb": {
                        "title": "True Color",
                        "assets": [
                            "BAND3",
                            "BAND2",
                            "BAND1"
                        ],
                        "rescale": [
                            [
                                0,
                                3500
                            ],
                            [
                                0,
                                3500
                            ],
                            [
                                0,
                                3500
                            ]
                        ],
                        "resampling": "nearest"
                    }
                },
                "sources": [
                    "http://www.inpe.br"
                ],
                "bdc:visual": {
                    "rgb": [
                        "BAND3",
                        "BAND2",
                        "BAND1"
                    ],
                    "rescale": [
                        [
                            0,
                            3500
                        ],
                        [
                            0,
                            3500
                        ],
                        [
                            0,
                            3500
                        ]
                    ]
                },
                "bdc:applications": [
                    "BDCExplorer"
                ],
                "created": "2024-03-05T17:05:56.773391Z",
                "updated": "2024-03-05T17:05:56.773400Z",
                "eo:bands": [
                    {
                        "name": "CMASK",
                        "common_name": "quality",
                        "description": "Cloud Mask Product",
                        "min": 0.0,
                        "max": 4.0,
                        "nodata": 255.0,
                        "scale": 1.0,
                        "scale_add": null,
                        "data_type": "uint8",
                        "resolution_x": 64.0,
                        "resolution_y": 64.0
                    },
                    {
                        "name": "BAND1",
                        "common_name": "blue",
                        "description": "B1 blue band from 0.45 to 0.52 micrometers",
                        "min": 0.0,
                        "max": 10000.0,
                        "nodata": -9999.0,
                        "scale": 0.0001,
                        "scale_add": null,
                        "data_type": "int16",
                        "resolution_x": 64.0,
                        "resolution_y": 64.0,
                        "center_wavelength": 0.485,
                        "full_width_half_max": 0.07
                    },
                    {
                        "name": "BAND4",
                        "common_name": "nir",
                        "description": "B4 nir band from 0.77 to 0.89 micrometers",
                        "min": 0.0,
                        "max": 10000.0,
                        "nodata": -9999.0,
                        "scale": 0.0001,
                        "scale_add": null,
                        "data_type": "int16",
                        "resolution_x": 64.0,
                        "resolution_y": 64.0,
                        "center_wavelength": 0.83,
                        "full_width_half_max": 0.12
                    },
                    {
                        "name": "BAND2",
                        "common_name": "green",
                        "description": "B2 green band from 0.52 to 0.59 micrometers",
                        "min": 0.0,
                        "max": 10000.0,
                        "nodata": -9999.0,
                        "scale": 0.0001,
                        "scale_add": null,
                        "data_type": "int16",
                        "resolution_x": 64.0,
                        "resolution_y": 64.0,
                        "center_wavelength": 0.555,
                        "full_width_half_max": 0.07
                    },
                    {
                        "name": "BAND3",
                        "common_name": "red",
                        "description": "B3 red band from 0.63 to 0.69 micrometers",
                        "min": 0.0,
                        "max": 10000.0,
                        "nodata": -9999.0,
                        "scale": 0.0001,
                        "scale_add": null,
                        "data_type": "int16",
                        "resolution_x": 64.0,
                        "resolution_y": 64.0,
                        "center_wavelength": 0.66,
                        "full_width_half_max": 0.06
                    }
                ]
            },
            "bdc:type": "collection",
            "bdc:public": true,
            "bdc:grs": "AMAZONIA1_WFI_GRID",
            "license": "Creative-Commons-Attribution-4.0-International",
            "extent": {
                "spatial": {
                    "bbox": [
                        [
                            -135.151782,
                            -45.619648,
                            106.18473,
                            63.78312
                        ]
                    ]
                },
                "temporal": {
                    "interval": [
                        [
                            "2024-01-01T00:00:00.000000Z",
                            "2025-09-19T00:00:00.000000Z"
                        ]
                    ]
                }
            },
            "bdc:bands_quicklook": [
                "BAND3",
                "BAND4",
                "BAND2"
            ],
            "links": [
                {
                    "href": "https://data.inpe.br/bdc/stac/v1/collections/AMZ1-WFI-L4-SR-1",
                    "rel": "self",
                    "type": "application/json",
                    "title": "Link to this document"
                },
                {
                    "href": "https://data.inpe.br/bdc/stac/v1/collections/AMZ1-WFI-L4-SR-1/items",
                    "rel": "items",
                    "type": "application/json",
                    "title": "Items of the collection AMZ1-WFI-L4-SR-1"
                },
                {
                    "href": "https://data.inpe.br/bdc/stac/v1/",
                    "rel": "parent",
                    "type": "application/json",
                    "title": "Link to catalog collections"
                },
                {
                    "href": "https://data.inpe.br/bdc/stac/v1/",
                    "rel": "root",
                    "type": "application/json",
                    "title": "API landing page (root catalog)"
                },
                {
                    "rel": "license",
                    "href": "https://creativecommons.org/licenses/by/4.0/",
                    "title": "Creative-Commons-Attribution-4.0-International"
                }
            ]
        }]);

db.satellite.insertOne({
            "id": "LCC_L8_30_16D_STK_Cerrado-1",
            "type": "Collection",
            "stac_version": "1.0.0",
            "stac_extensions": [
                "https://stac-extensions.github.io/version/v1.0.0/schema.json",
                "https://stac-extensions.github.io/processing/v1.0.0/schema.json",
                "https://stac-extensions.github.io/item-assets/v1.0.0/schema.json",
                "https://stac-extensions.github.io/eo/v1.0.0/schema.json"
            ],
            "title": "LCC - Cerrado - LC8 30m 16D STK",
            "version": "1",
            "deprecated": false,
            "description": "This is a land cover classification map of Brazilian Cerrado, from August 29th 2017 to August 29th 2018. This classification was made on top of Landsat-8 days data cubes with spatial resolution of 30 meters, using the best pixel composition function named as Least Cloud Cover First (LCF), which was previously named Stack in BDC older versions. The input datacube was Landsat-8 - OLI - Cube Stack 16 days - v001, which was deprecated. The classification model was trained using 48850 sample points spread across the Cerrado biome (Annual Crop 6887, Cerradao 4211, Cerrado 16251, Natural Non Vegetation 38, Open_Cerrado 5658, Pasture 12894, Perennial Crop 68, Silviculture 805, Sugarcane 1775, Water 263). The spectral band used were B1, B2, B3, B4, B5, B6, and B7 along with the vegetation indices EVI and NDVI; the clouded observation were identified using the Fmask4 algorithm and estimated using linear interpolation. The classification algorithm was TempCNN (Deep Learning). This product was funded by the Brazilian Development Bank (BNDES).",
            "keywords": [
                "classification",
                "landsat",
                "landsat-8",
                "thematic",
                "cloud optimized geotiff",
                "cog",
                "earth observation",
                "brazil",
                "machine learning",
                "tempcnn"
            ],
            "providers": [
                {
                    "url": "https://data.inpe.br/big/",
                    "name": "National Institute for Space Research (INPE)",
                    "roles": [
                        "producer",
                        "licensor",
                        "host",
                        "processor"
                    ],
                    "processing:level": "",
                    "processing:lineage": "Thematic Classification - TempCNN",
                    "processing:samples": {
                        "summary": {
                            "Water": 263,
                            "Cerrado": 16251,
                            "Pasture": 12894,
                            "Cerradao": 4211,
                            "Sugarcane": 1775,
                            "Nat_NonVeg": 38,
                            "Annual_Crop": 6887,
                            "Open_Cerrado": 5658,
                            "Silviculture": 805,
                            "Perennial_Crop": 68
                        }
                    },
                    "processing:facility": "BDC",
                    "processing:software": {
                        "sits": "0.11.0"
                    },
                    "processing:parameters": {
                        "bands": [
                            "B1",
                            "B2",
                            "B3",
                            "B4",
                            "B5",
                            "B6",
                            "B7"
                        ],
                        "epochs": 150,
                        "patience": 20,
                        "optimizer": "optim_adamw",
                        "batch size": 128,
                        "cnn layers": 3,
                        "cnn kernels": [
                            5,
                            5,
                            5
                        ],
                        "mininum delta": 0.01,
                        "spectralIndices": [
                            "NDVI",
                            "EVI"
                        ],
                        "validation split": 0.2,
                        "cnn dropout rates": [
                            0.5,
                            0.5,
                            0.5
                        ],
                        "dense layer nodes": 256,
                        "neurons for each layer": [
                            64,
                            64,
                            64
                        ],
                        "dense layer dropout rate": 0.5,
                        "learning rate decay rate": 0.95,
                        "learning rate decay epochs": 1
                    }
                }
            ],
            "summaries": {
                "gsd": [
                    30
                ],
                "platform": [
                    "landsat-8"
                ],
                "instruments": [
                    "oli"
                ],
                "constellation": [
                    "landsat"
                ],
                "view:off_nadir": [
                    0
                ]
            },
            "properties": {
                "renders": {
                    "lcc": {
                        "title": "lcc",
                        "assets": [
                            "lcc"
                        ],
                        "resampling": "nearest"
                    }
                },
                "bdc:applications": [
                    "BDCExplorer"
                ],
                "created": "2025-01-31T16:38:01.400305Z",
                "updated": "2025-01-31T16:38:01.400312Z",
                "eo:bands": [
                    {
                        "name": "lcc",
                        "common_name": "lcc",
                        "description": "This is a classification.",
                        "min": 1.0,
                        "max": 101.0,
                        "nodata": 255.0,
                        "scale": 1.0,
                        "scale_add": null,
                        "data_type": "uint8",
                        "resolution_x": 30.0,
                        "resolution_y": 30.0
                    }
                ]
            },
            "bdc:type": "classification",
            "bdc:public": true,
            "bdc:grs": "BDC_MD",
            "license": "Creative-Commons-Attribution-4.0-International",
            "extent": {
                "spatial": {
                    "bbox": [
                        [
                            -60.896285669333565,
                            -24.93649705630058,
                            -38.9639870921197,
                            -0.9037065044257321
                        ]
                    ]
                },
                "temporal": {
                    "interval": [
                        [
                            "2017-08-29T00:00:00.000000Z",
                            "2018-08-29T00:00:00.000000Z"
                        ]
                    ]
                }
            },
            "links": [
                {
                    "href": "https://data.inpe.br/bdc/stac/v1/collections/LCC_L8_30_16D_STK_Cerrado-1",
                    "rel": "self",
                    "type": "application/json",
                    "title": "Link to this document"
                },
                {
                    "href": "https://data.inpe.br/bdc/stac/v1/collections/LCC_L8_30_16D_STK_Cerrado-1/items",
                    "rel": "items",
                    "type": "application/json",
                    "title": "Items of the collection LCC_L8_30_16D_STK_Cerrado-1"
                },
                {
                    "href": "https://data.inpe.br/bdc/stac/v1/",
                    "rel": "parent",
                    "type": "application/json",
                    "title": "Link to catalog collections"
                },
                {
                    "href": "https://data.inpe.br/bdc/stac/v1/",
                    "rel": "root",
                    "type": "application/json",
                    "title": "API landing page (root catalog)"
                },
                {
                    "rel": "license",
                    "href": "https://creativecommons.org/licenses/by/4.0/",
                    "title": "Creative-Commons-Attribution-4.0-International"
                }
            ]
        });


db.satellite_item_assets.insertMany([
    {
        key: "visual",
        type: "image/tiff; application=geotiff; profile=cloud-optimized",
        roles: ["data"],
        title: "False Color Composition of the mosaic. Contains CBERS-4A/WFI Bands 16, 15 and 14.",
        satellite: db.satellite.findOne({ id: "mosaic-cbers4a-paraiba-3m-1" })._id
    },
    {
        key: "thumbnail",
        type: "image/png",
        roles: ["thumbnail"],
        bands: { red:"BAND16", blue:"BAND14", green:"BAND15" },
        title: "Thumbnail",
        satellite: db.satellite.findOne({ id: "mosaic-cbers4a-paraiba-3m-1" })._id
    },
    {
        "key": "BAND1",
        "type": "image/tiff; application=geotiff; profile=cloud-optimized",
        "roles": [
            "data"
        ],
        "title": "Band blue",
        satellite: db.satellite.findOne({ id: "AMZ1-WFI-L4-SR-1" })._id
    },
    {
        "key": "BAND2",
        "type": "image/tiff; application=geotiff; profile=cloud-optimized",
        "roles": [
            "data"
        ],
        "title": "Band green",
        satellite: db.satellite.findOne({ id: "AMZ1-WFI-L4-SR-1" })._id
    },
        {
        "key": "BAND3",
        "type": "image/tiff; application=geotiff; profile=cloud-optimized",
        "roles": [
            "data"
        ],
        "title": "Band red",
        satellite: db.satellite.findOne({ id: "AMZ1-WFI-L4-SR-1" })._id
    },
    {
        key: "BAND4",
        "type": "image/tiff; application=geotiff; profile=cloud-optimized",
        "roles": [
            "data"
        ],
        "title": "Band nir",
        satellite: db.satellite.findOne({ id: "AMZ1-WFI-L4-SR-1" })._id
    },
    {
        "key": "CMASK",
        "type": "image/tiff; application=geotiff; profile=cloud-optimized",
        "roles": [
            "data"
        ],
        "title": "Band cmask",
        satellite: db.satellite.findOne({ id: "AMZ1-WFI-L4-SR-1" })._id
    },
    {
        "key": "thumbnail",
        "type": "image/png",
        "bands": {
            "red": "BAND3",
            "blue": "BAND2",
            "green": "BAND4"
        },
        "roles": [
            "thumbnail"
        ],
        "title": "Thumbnail",
        satellite: db.satellite.findOne({ id: "AMZ1-WFI-L4-SR-1" })._id
    },
    {
        "key": "lcc",
        "type": "image/tiff; application=geotiff; profile=cloud-optimized",
        "roles": [
            "data"
        ],
        "title": "Land Cover Classification Image",
        satellite: db.satellite.findOne({ id: "LCC_L8_30_16D_STK_Cerrado-1" })._id
    },
    {
        "key": "thumbnail",
        "type": "image/png",
        "bands": {
            "red": "lcc",
            "blue": "lcc",
            "green": "lcc"
        },
        "roles": [
            "thumbnail"
        ],
        "title": "Thumbnail",
        satellite: db.satellite.findOne({ id: "LCC_L8_30_16D_STK_Cerrado-1" })._id
    }
]);

/* CONSULTA EMBEDDING */
db.satellite.findOne({ id: "mosaic-cbers4a-paraiba-3m-1" });

/* CONSULTA REFERENCING */
db.satellite.aggregate([
    {
        $lookup: {
            from: "satellite_item_assets",
            localField: "_id",
            foreignField: "satellite",
            as: "item_assets"
        }
    }
]);

/* EXPLICAÇÃO */
/* Embedding para as demais informações do satélite
    - As informações principais do satélite (como properties, providers, keywords, extent) são sempre acessadas junto com o satélite
    - Permite acessar todos os dados essenciais do satélite em uma única consulta

Referencing para item_assets
    - Cada satélite pode ter muitos assets (imagens, bandas, thumbnails) que podem ser grandes e detalhados.
    - Permite atualizar ou adicionar assets independentemente do satélite, sem precisar reescrever todo o documento principal
    - Facilita consultas específicas nos assets, por exemplo, filtrar por tipo de asset, banda ou resolução
*/ 


/* 3 - SCRIPTS MongoDB */
/* UPDATE PARA NORMALIZAR AS COLUNAS */
db.satellite.updateMany(
  { "properties.created": { $type: "string" } },
  [
    {
      $set: {
        "properties.created": {
          $dateFromString: { dateString: "$properties.created" }
        }
      }
    }
  ]
);

/* DEMAIS CONSULTAS */
db.satellite.find(
  {},
  {  
    title: 1, 
    "providers.processing:parameters.spectralIndices": 1, 
    _id: 0 
  }
);

db.satellite.find({
    $and: [
        { "properties.created": { $gte: ISODate("2025-01-01T00:00:00Z") } },
        { "properties.created": { $lte: ISODate("2025-12-31T23:59:59Z") } }
    ]
}, {
    id: 1,
    title: 1,
    "properties.created": 1,
    "properties.updated": 1,
    _id: 0
});

db.satellite.find({
    $and: [
        { "properties.created": { $gte: ISODate("2025-01-01T00:00:00Z") } },
        { "properties.created": { $lte: ISODate("2025-12-31T23:59:59Z") } }
    ]
}, {
    id: 1,
    title: 1,
    "properties.created": 1,
    "properties.updated": 1,
    _id: 0
});

db.satellite.find(
  {
    $and: [
      {
        $or: [
          { id: "mosaic-cbers4a-paraiba-3m-1" },
          { id: "AMZ1-WFI-L4-SR-1" }
        ]
      },
      { "properties.updated": { $type: "date" } }
    ]
  },
  {
    id: 1,
    title: 1,
    "properties.created": 1,
    "properties.updated": 1,
    _id: 0
  }
);
