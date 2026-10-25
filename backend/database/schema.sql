DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS productores;
DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias (
    id     SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    icono  VARCHAR(10) DEFAULT '📦'
);

CREATE TABLE productores (
    id     SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    lugar  VARCHAR(100) NOT NULL DEFAULT 'Chiloé',
    rubro  VARCHAR(100) NOT NULL DEFAULT 'General',
    UNIQUE (nombre, lugar)
);

CREATE TABLE productos (
    id           SERIAL PRIMARY KEY,
    nombre       VARCHAR(150) NOT NULL,
    precio       INTEGER NOT NULL CHECK (precio > 0),
    imagen       VARCHAR(255),
    categoria_id INTEGER NOT NULL REFERENCES categorias(id) ON DELETE RESTRICT,
    productor_id INTEGER REFERENCES productores(id) ON DELETE SET NULL
);

INSERT INTO categorias (nombre) VALUES ('Miel'), ('Textiles'), ('Quesos');

INSERT INTO productores (nombre, lugar, rubro) VALUES
('Juan Pérez',   'Castro',   'Apicultura'),
('Ana Gómez',    'Chonchi',  'Conservas'),
('María Silva',  'Chonchi',  'Textiles'),
('Pedro Soto',   'Ancud',    'Textiles'),
('Luis Díaz',    'Dalcahue', 'Lácteos'),
('Carmen Ruiz',  'Quellón',  'Agricultura'),
('Diego Torres', 'Castro',   'Cervecería');

INSERT INTO productos (nombre, precio, imagen, categoria_id, productor_id) VALUES
('Miel de Ulmo',      5000,  'miel-ulmo.jpg',   1, 1),
('Mermelada de Murta', 4500,  'mermelada.jpg',   1, 2),
('Miel de Bosque',    6000,  'miel-bosque.jpg', 1, 1),
('Chomba de Lana',    15000, 'tejido.jpg',      2, 3),
('Calcetines de Lana', 5000,  'calcetines.jpg',  2, 3),
('Bufanda de Lana',   8000,  'bufanda.jpg',     2, 4),
('Queso de Campo',    7000,  'queso.jpg',       3, 5),
('Papas Nativas',     3000,  'papas.jpg',       3, 6),
('Cerveza Artesanal', 4000,  'cerveza.jpg',     3, 7);