/* CRIANDO A BASE DE DADOS E AS COLLECTIONS */
use hypoorbit;
db.createCollection("satellites"); /* DOCUMENTO PRINCIPAL (Principais informações do satélite) */
db.createCollection("satellites_item_assets"); /* DOCUMENTO REFERENCIADO (Arquivos ou produtos digitais que representam os dados capturados pelo satélite) */


/* INSERT */
db.satellite.insertOne({
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
});

db.item_assets.insertMany([
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
    }
]);

/* CONSULTA EMBEDDING */
db.satellite.findOne({ id: "mosaic-cbers4a-paraiba-3m-1" });

/* CONSULTA REFERENCING */
db.satellite.aggregate([
    {
        $lookup: {
            from: "item_assets",
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