/* 4 - COMPARAÇÃO COM SQL (PostgreSQL) */
CREATE DATABASE hypoorbit;
USE hypoorbit;

/* CREATES */
CREATE TABLE satellite (
    id TEXT PRIMARY KEY,         
    type TEXT,
    stac_version TEXT,
    title TEXT,
    version TEXT,
    deprecated BOOLEAN,
    description TEXT,
    created TIMESTAMPTZ,
    updated TIMESTAMPTZ,
    bdc_type TEXT,
    bdc_public BOOLEAN,
    license TEXT
);

CREATE TABLE satellite_provider (
    id SERIAL PRIMARY KEY,
    satellite_id TEXT REFERENCES satellite(id) ON DELETE CASCADE,
    name TEXT,
    url TEXT
);

CREATE TABLE satellite_processing_parameters (
    id SERIAL PRIMARY KEY,
    provider_id INT REFERENCES satellite_provider(id) ON DELETE CASCADE,
    bands TEXT[],
    spectral_indices TEXT[],
    epochs INT,
    optimizer TEXT,
    batch_size INT
);

CREATE TABLE satellite_item_assets (
    id SERIAL PRIMARY KEY,
    satellite_id TEXT REFERENCES satellite(id) ON DELETE CASCADE,
    key TEXT,
    type TEXT,
    roles TEXT[],
    title TEXT,
    bands JSONB 
);

/* INSERTS */
INSERT INTO satellite (id, type, stac_version, title, version, deprecated, description, created, updated, bdc_type, bdc_public, license)
VALUES (
  'LCC_L8_30_16D_STK_Cerrado-1',
  'Collection',
  '1.0.0',
  'LCC - Cerrado - LC8 30m 16D STK',
  '1',
  FALSE,
  'This is a land cover classification map of Brazilian Cerrado...',
  '2025-01-31T16:38:01.400305Z',
  '2025-01-31T16:38:01.400312Z',
  'classification',
  TRUE,
  'Creative-Commons-Attribution-4.0-International'
);

INSERT INTO satellite_item_assets (satellite_id, key, type, roles, title, bands)
VALUES 
('LCC_L8_30_16D_STK_Cerrado-1', 'lcc', 'image/tiff; application=geotiff; profile=cloud-optimized', ARRAY['data'], 'Land Cover Classification Image', NULL),
('LCC_L8_30_16D_STK_Cerrado-1', 'thumbnail', 'image/png', ARRAY['thumbnail'], 'Thumbnail', '{"red":"lcc","blue":"lcc","green":"lcc"}');

/* CONSULTAS */
SELECT id, title, created, updated
FROM satellite
WHERE created >= '2025-01-01T00:00:00Z'
  AND created <= '2025-12-31T23:59:59Z';

SELECT s.id, s.title, sia.key, sia.type, sia.roles, sia.title AS asset_title
FROM satellite s
LEFT JOIN satellite_item_assets sia ON sia.satellite_id = s.id;


