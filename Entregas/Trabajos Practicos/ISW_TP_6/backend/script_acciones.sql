CREATE table Acciones( 
              IdAccion INTEGER PRIMARY KEY
            , Denominacion TEXT NOT NULL UNIQUE
            , Ranking INTEGER NOT NULL
            , Vigente boolean NOT NULL
			, Origen INTEGER NOT NULL
			);

INSERT INTO Acciones (IdAccion, Denominacion, Ranking, Vigente, Origen) VALUES
    (1,'APPLE INC',1,1,10),
    (2, 'MICROSOFT CORPORATION', 2,1,10),
    (3,'AMAZON.COM INC', 3, 1,10),
    (4,'ALPHABET INC', 4, 1,10),
    (5,'FACEBOOK INC', 5, 1,10),
    (6,'JOHNSON & JOHNSON', 6, 1,10),
    (7,'JPMORGAN CHASE & CO', 7, 1,10),
    (8,'VISA INC', 8, 1,10),
    (9,'PROCTER & GAMBLE COMPANY', 9, 1,10),
    (10,'MASTERCARD INCORPORATED', 10, 1,10),
    (11,'WALT DISNEY COMPANY (THE)', 11, 1,11),
    (12,'INTEL CORPORATION', 12, 1,11),
    (13,'NIKE INC', 13, 1,11),
    (14,'COCA-COLA COMPANY (THE)', 14, 1,11),
    (15,'VERIZON COMMUNICATIONS INC', 15, 1,11),
    (16,'AT&T INC', 16, 1,11),
    (17,'HOME DEPOT INC (THE)', 17, 1,11),
    (18,'WALMART INC', 18, 1,11),
    (19,'CHEVRON CORPORATION', 19, 1,11),
    (20,'IBM', 20, 0,11);
CREATE table Regiones( 
              IdRegion INTEGER PRIMARY KEY
            , Region TEXT NOT NULL UNIQUE
			);
INSERT INTO Regiones (IdRegion, Region) VALUES
    (1,'America'),
    (2, 'Europa');