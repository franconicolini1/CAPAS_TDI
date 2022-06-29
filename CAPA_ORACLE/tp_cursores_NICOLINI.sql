-- CABECERA

PROCEDURE PRC_AUTOGENERATE_PLAYLIST (P_ERROR       OUT VARCHAR2,
                                         P_ERROR_ORA   OUT VARCHAR2);

-- BODY

PROCEDURE PRC_AUTOGENERATE_PLAYLIST (P_ERROR       OUT VARCHAR2,
                                         P_ERROR_ORA   OUT VARCHAR2)
    IS
        V_ID              VARCHAR2 (50);
        V_PLAYLIST_ID     VARCHAR2 (50);
        V_PLAYLIST_NAME   VARCHAR2 (50);
        V_USER_PLAY       VARCHAR2 (50);
        V_LUGAR           VARCHAR2 (50);
        V_SECUENCIA       NUMBER := 1;
    BEGIN
          SELECT ID_USER, NAME_US
            INTO V_ID, V_PLAYLIST_NAME
            FROM CAPA_USERS
        ORDER BY DBMS_RANDOM.VALUE
           FETCH FIRST 1 ROW ONLY;

        SELECT ID_PLAYLIST.NEXTVAL
          INTO V_PLAYLIST_ID
          FROM CAPA_PLAYLIST_CAB;

        V_LUGAR := 'Insertando en CAPA_PLAYLIST_CAB';
        INSERT INTO CAPA_PLAYLIST_CAB (ID_PLAYLIST,
                                       PLAY_NAME,
                                       PLAY_USER,
                                       DATE_CREATED,
                                       USER_CREATED)
             VALUES (V_PLAYLIST_ID,
                     V_PLAYLIST_NAME || '''s List',
                     V_USER_PLAY,
                     SYSDATE,
                     GET_USER ());

        DECLARE
            CURSOR CUR_ALBUM IS
                SELECT CAL.ID_ALBUM,
                       CAL.ID_ARTIST,
                       RELEASE_DATE,
                       ID_TRACK
                  FROM CAPA_ALBUMS CAL, CAPA_ARTISTS CAR, CAPA_TRACKS CAT
                 WHERE     CAR.ID_ARTIST = CAL.ID_ARTIST
                       AND CAT.ID_ALBUM = CAL.ID_ALBUM
                       AND TRACK_NUMBER = 1;
        BEGIN
            FOR REG IN CUR_ALBUM
            LOOP
                V_LUGAR := 'Insertando en CAPA_PLAYLIST_DET el elemento '||V_SECUENCIA;  
                INSERT INTO CAPA_PLAYLIST_DET (ID_PLAYLIST,
                                               N_SECUENCIA,
                                               ID_TRACK)
                     VALUES (V_PLAYLIST_ID,
                             V_SECUENCIA,
                             REG.ID_TRACK);
                V_SECUENCIA := V_SECUENCIA + 1;
            END LOOP;
        END;
        
        EXCEPTION
        WHEN OTHERS
        THEN
            P_ERROR := 'Hubo un error '||V_LUGAR;
            P_ERROR_ORA := SQLERRM;
    END;
