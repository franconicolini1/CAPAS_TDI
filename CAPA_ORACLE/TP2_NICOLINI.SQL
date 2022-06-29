/* Formatted on 2/6/2022 11:18:57 (QP5 v5.381) */
-- Modelo 1

CREATE TABLE FN_FACTURAS
(
    T_FACTURA    VARCHAR (1) NOT NULL,
    N_FACTURA    NUMBER NOT NULL,
    F_FACTURA    DATE NOT NULL,
    D_RAZSOC     VARCHAR2 (1000)
)
TABLESPACE DATOS
STORAGE (BUFFER_POOL DEFAULT);

CREATE TABLE FN_FACTURAS_DET
(
    T_FACTURA    VARCHAR2 (1) NOT NULL,
    N_FACTURA    NUMBER NOT NULL,
    N_ITEM       NUMBER NOT NULL,
    D_ITEM       VARCHAR2 (1000)
)
TABLESPACE DATOS
STORAGE (BUFFER_POOL DEFAULT);

ALTER TABLE FN_FACTURAS
    ADD CONSTRAINT ID_FACTURAS PRIMARY KEY (T_FACTURA, N_FACTURA)
            USING INDEX TABLESPACE INDICES ENABLE VALIDATE;

ALTER TABLE FN_FACTURAS_DET
    ADD CONSTRAINT ID_FACTURAS_DET PRIMARY KEY (T_FACTURA, N_FACTURA, N_ITEM)
            USING INDEX TABLESPACE INDICES ENABLE VALIDATE;

ALTER TABLE FN_FACTURAS_DET
    ADD CONSTRAINT FK_DET FOREIGN KEY (T_FACTURA, N_FACTURA)
            REFERENCES FN_FACTURAS (T_FACTURA, N_FACTURA)
            ENABLE VALIDATE;

-- Secuencia 

CREATE SEQUENCE FN_FACTUR_A START WITH 0
                            INCREMENT BY 1
                            MINVALUE 0
                            NOCACHE
                            NOCYCLE
                            NOORDER
                            NOKEEP
                            GLOBAL;

CREATE SEQUENCE FN_FACTUR_B START WITH 100000000
                            INCREMENT BY 1
                            MINVALUE 0
                            NOCACHE
                            NOCYCLE
                            NOORDER
                            NOKEEP
                            GLOBAL;

CREATE SEQUENCE FN_FACTUR_C START WITH 200000000
                            INCREMENT BY 1
                            MINVALUE 0
                            NOCACHE
                            NOCYCLE
                            NOORDER
                            NOKEEP
                            GLOBAL;

-- Inserciones

INSERT INTO FN_FACTURAS (T_FACTURA,
                         N_FACTURA,
                         F_FACTURA,
                         D_RAZSOC)
     VALUES ('A',
             1,
             '10/10/2021',
             'Geremias SA');

INSERT INTO FN_FACTURAS (T_FACTURA,
                         N_FACTURA,
                         F_FACTURA,
                         D_RAZSOC)
     VALUES ('A',
             2,
             '1/11/2018',
             'TDI SRL');

INSERT INTO FN_FACTURAS (T_FACTURA,
                         N_FACTURA,
                         F_FACTURA,
                         D_RAZSOC)
     VALUES ('A',
             3,
             '5/12/2018',
             'TDI SRL');

INSERT INTO FN_FACTURAS (T_FACTURA,
                         N_FACTURA,
                         F_FACTURA,
                         D_RAZSOC)
     VALUES ('B',
             100000001,
             '1/10/2021',
             'Homero Simpson');

INSERT INTO FN_FACTURAS (T_FACTURA,
                         N_FACTURA,
                         F_FACTURA,
                         D_RAZSOC)
     VALUES ('C',
             200000001,
             '03/02/2021',
             'Joaquín Aguilar');


-- Otras inserciones

INSERT INTO FN_FACTURAS_DET (T_FACTURA,
                             N_FACTURA,
                             N_ITEM,
                             D_ITEM)
     VALUES ('A',
             1,
             1,
             'Factura A1 - Línea 1');

INSERT INTO FN_FACTURAS_DET (T_FACTURA,
                             N_FACTURA,
                             N_ITEM,
                             D_ITEM)
     VALUES ('A',
             1,
             2,
             'Factura A1 - Línea 2');

INSERT INTO FN_FACTURAS_DET (T_FACTURA,
                             N_FACTURA,
                             N_ITEM,
                             D_ITEM)
     VALUES ('A',
             1,
             3,
             'Factura A1 - Línea 3');

INSERT INTO FN_FACTURAS_DET (T_FACTURA,
                             N_FACTURA,
                             N_ITEM,
                             D_ITEM)
     VALUES ('A',
             2,
             1,
             'Factura A2 - Línea 1');

INSERT INTO FN_FACTURAS_DET (T_FACTURA,
                             N_FACTURA,
                             N_ITEM,
                             D_ITEM)
     VALUES ('A',
             3,
             1,
             'Factura A3 - Línea 1');

INSERT INTO FN_FACTURAS_DET (T_FACTURA,
                             N_FACTURA,
                             N_ITEM,
                             D_ITEM)
     VALUES ('B',
             100000001,
             1,
             'Factura B 1-1 - Línea 1');

INSERT INTO FN_FACTURAS_DET (T_FACTURA,
                             N_FACTURA,
                             N_ITEM,
                             D_ITEM)
     VALUES ('B',
             100000001,
             2,
             'Factura B 1-1 - Línea 2');

INSERT INTO FN_FACTURAS_DET (T_FACTURA,
                             N_FACTURA,
                             N_ITEM,
                             D_ITEM)
     VALUES ('B',
             100000001,
             3,
             'Factura B 1-1 - Línea 3');

INSERT INTO FN_FACTURAS_DET (T_FACTURA,
                             N_FACTURA,
                             N_ITEM,
                             D_ITEM)
     VALUES ('C',
             200000001,
             1,
             'Factura C 1-1 - Línea 1');

-- Consultas

  SELECT FAC.N_FACTURA,
         FAC.T_FACTURA,
         FAC.D_RAZSOC,
         DET.D_ITEM
    FROM FN_FACTURAS FAC, FN_FACTURAS_DET DET
   WHERE     FAC.N_FACTURA = DET.N_FACTURA
         AND FAC.T_FACTURA = DET.T_FACTURA
         AND SUBSTR (FAC.F_FACTURA, -4, 4) = '2021'
ORDER BY FAC.T_FACTURA, FAC.N_FACTURA;

UPDATE FN_FACTURAS
   SET D_RAZSOC = 'DPR Neuquen'
 WHERE T_FACTURA = 'A' AND N_FACTURA = 2;

UPDATE FN_FACTURAS
   SET D_RAZSOC = 'DPR Neuquen'
 WHERE T_FACTURA = 'A' AND N_FACTURA = 3;

SELECT * FROM FN_FACTURAS;

-- Modelo 2

-- 1)

SELECT *
  FROM CAPA_COMPANY CC, CAPA_USERS CU
 WHERE     CC.ID_COMPANY = CU.ID_COMPANY
       AND CC.NAME = 'Hoeger LLC'
       AND INSTR (CU.EMAIL, 'gmail') != 0;

-- 2)

SELECT NAME_US                 AS NOMBRE_USUARIO,
       (SELECT ('<' || CG.LATITUDE || '> - <' || CG.LONGITUDE || '>')
          FROM CAPA_GEO CG)    AS GEOLOCALIZACIÓN
  FROM CAPA_USERS CU, CAPA_ADDRESS CA, CAPA_GEO CG
 WHERE     CA.ID_USER = CU.ID_USER
       AND CA.ID_ADDRESS = CG.ID_ADDRESS
       AND CA.CITY LIKE 'South%';

-- 3) 

SELECT CAL.NAME_ALBUM, CAL.RELEASE_DATE, CAL.LABEL_ALBUM AS COMPANIA
  FROM CAPA_ALBUMS CAL, CAPA_ARTISTS CAR
 WHERE     CAL.ID_ARTIST = CAR.ID_ARTIST
       AND CAR.NAME_ARTIST = 'Whitesnake'
       AND CAL.LATETEST = 'S';

-- 4)

SELECT CT.TRACK_NAME AS NOMBRE_CANCION, CT.DURATION_MS
  FROM CAPA_TRACKS CT
 WHERE ID_ALBUM =
       (SELECT CAL.ID_ALBUM     AS COMPANIA
          FROM CAPA_ALBUMS CAL, CAPA_ARTISTS CAR
         WHERE     CAL.ID_ARTIST = CAR.ID_ARTIST
               AND CAR.NAME_ARTIST = 'Whitesnake'
               AND CAL.LATETEST = 'S')
 ORDER BY CT.TRACK_NUMBER;

-- 5)

SELECT CAR.NAME_ARTIST, TC.CITY, TC.LISTENERS
  FROM CAPA_ARTISTS CAR, CAPA_TOPCITIES TC, CAPA_TBL_GRAL TG
 WHERE     TC.LISTENERS > 100000
       AND TC.ID_ARTIST = CAR.ID_ARTIST
       AND TC.COUNTRY IN
               (SELECT TG.C_DATA
                  FROM CAPA_TOPCITIES TC, CAPA_TBL_GRAL TG
                 WHERE     TG.N_TABLE = 1
                       AND TG.D_DATA1 = 'LATAM');

-- 6) 

  SELECT CAR.NAME_ARTIST, COUNT (1) AS CANTIDAD_CANCIONES
    FROM CAPA_ARTISTS     CAR,
         CAPA_PLAYLIST_DET PD,
         CAPA_TRACKS      CT,
         CAPA_ALBUMS      CAL
   WHERE     PD.ID_TRACK = CT.ID_TRACK
         AND CT.ID_ALBUM = CAL.ID_ALBUM
         AND CAL.ID_ARTIST = CAR.ID_ARTIST
GROUP BY CAR.NAME_ARTIST;

-- 7)

SELECT CT.TRACK_NAME AS NOMBRE_CANCION, CAL.NAME_ALBUM AS NOMBRE_ALBUM
  FROM CAPA_PLAYLIST_CAB  PC,
       CAPA_TRACKS        CT,
       CAPA_ALBUMS        CAL,
       CAPA_PLAYLIST_DET  PD
 WHERE     PC.PLAY_NAME LIKE 'Gustavo%'
       AND CT.ID_ALBUM = CAL.ID_ALBUM
       AND CT.ID_TRACK = PD.ID_TRACK
       AND PD.ID_PLAYLIST = PC.ID_PLAYLIST;
