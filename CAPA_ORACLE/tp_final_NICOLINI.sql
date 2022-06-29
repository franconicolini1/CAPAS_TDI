-- En el header: 

/* Formatted on 7/6/2022 11:04:17 (QP5 v5.381) */
CREATE OR REPLACE PACKAGE CAPA.PAC_FN_CAPA
IS
    FUNCTION FUN_SALUDAR (P_NOMBRE IN VARCHAR2)
        RETURN VARCHAR2;

    PROCEDURE PRC_SALUDAR (P_NOMBRE      IN     VARCHAR2,
                           P_APELLIDO    IN     VARCHAR2,
                           P_ERROR          OUT VARCHAR2,
                           P_ERROR_ORA      OUT VARCHAR2);

    -- P_TABLE MUST BE ART, TRAC OR ALB
    FUNCTION FUN_GENERATE_PK (P_NAME IN VARCHAR2, P_TABLE IN VARCHAR2)
        RETURN VARCHAR2;

    PROCEDURE PRC_INS_UPDT_DEL_ARTIST (
        P_NAME        IN     VARCHAR2,
        P_VERIFIED    IN     VARCHAR2,
        P_BIOGRAPHY   IN     VARCHAR2 DEFAULT NULL,
        P_IMG_URL     IN     VARCHAR2,
        P_LISTENERS   IN     NUMBER,
        P_URL_INFO    IN     VARCHAR2,
        P_FOLLOWERS   IN     NUMBER,
        P_OPER        IN     VARCHAR2,
        P_ID          IN     VARCHAR2 DEFAULT NULL,
        P_ERROR          OUT VARCHAR2,
        P_ERROR_ORA      OUT VARCHAR2);

    PROCEDURE PRC_INS_UPDT_DEL_ALBUM (
        P_ID_ARTIST      IN     VARCHAR2,
        P_ID_ALBUM       IN     VARCHAR2 DEFAULT NULL,
        P_NAME           IN     VARCHAR2,
        P_TYPE           IN     VARCHAR2,
        P_RELEASE_DATE   IN     DATE,
        P_IMG_URL        IN     VARCHAR2,
        P_LABEL          IN     VARCHAR2,
        P_LATEST         IN     VARCHAR2,
        P_OPER           IN     VARCHAR2,
        P_ERROR             OUT VARCHAR2,
        P_ERROR_ORA         OUT VARCHAR2);

    PROCEDURE PRC_INS_UPDT_DEL_TRACKS (
        P_ID_ALBUM      IN     VARCHAR2,
        P_ID_TRACK      IN     VARCHAR2 DEFAULT NULL,
        P_NAME          IN     VARCHAR2,
        P_IS_PLAYABLE   IN     VARCHAR2,
        P_TYPE          IN     VARCHAR2,
        P_URL           IN     VARCHAR2,
        P_DURATION      IN     NUMBER,
        P_OPER          IN     VARCHAR2,
        P_ERROR            OUT VARCHAR2,
        P_ERROR_ORA        OUT VARCHAR2);
END;
/                             

-- En el body:

/* Formatted on 7/6/2022 11:06:18 (QP5 v5.381) */
CREATE OR REPLACE PACKAGE BODY CAPA.PAC_FN_CAPA
IS
    FUNCTION FUN_SALUDAR (P_NOMBRE IN VARCHAR2)
        RETURN VARCHAR2
    IS
        V_MENSAJE   VARCHAR2 (100) := 'Hola, como estas ';
        V_RESU      VARCHAR2 (100);
    BEGIN
        V_RESU := V_MENSAJE || P_NOMBRE;
        RETURN V_RESU;
    END;

    PROCEDURE PRC_SALUDAR (P_NOMBRE      IN     VARCHAR2,
                           P_APELLIDO    IN     VARCHAR2,
                           P_ERROR          OUT VARCHAR2,
                           P_ERROR_ORA      OUT VARCHAR2)
    IS
        V_MENSAJE   VARCHAR2 (100) := 'Hola, como estas ';
    BEGIN
        DBMS_OUTPUT.PUT_LINE (V_MENSAJE || P_NOMBRE || ' ' || P_APELLIDO);
    EXCEPTION
        WHEN OTHERS
        THEN
            P_ERROR := 'ERROR SALUDANDO';
            P_ERROR_ORA := SQLERRM;
            DBMS_OUTPUT.PUT_LINE (P_ERROR);
            DBMS_OUTPUT.PUT_LINE (P_ERROR_ORA);
    END;

    FUNCTION FUN_GENERATE_PK (P_NAME IN VARCHAR2, P_TABLE IN VARCHAR2)
        RETURN VARCHAR2
    IS
        V_PK                  VARCHAR2 (50);
        V_EXISTS              VARCHAR2 (50);
        V_PK_ALREADY_EXISTS   EXCEPTION;
    BEGIN
        SELECT SUBSTR (
                   REPLACE (
                       UTL_RAW.cast_to_varchar2 (
                           UTL_ENCODE.base64_encode (
                               STANDARD_HASH (TRIM (P_NAME), 'SHA1'))),
                       '/'),
                   0,
                   22)
          INTO V_PK
          FROM DUAL;

        CASE
            WHEN P_TABLE = 'ART'
            THEN
                SELECT COUNT (1)
                  INTO V_EXISTS
                  FROM CAPA_ARTISTS
                 WHERE ID_ARTIST = V_PK;
            WHEN P_TABLE = 'TRAC'
            THEN
                SELECT COUNT (1)
                  INTO V_EXISTS
                  FROM CAPA_TRACKS
                 WHERE ID_TRACK = V_PK;
            WHEN P_TABLE = 'ALB'
            THEN
                SELECT COUNT (1)
                  INTO V_EXISTS
                  FROM CAPA_ALBUMS
                 WHERE ID_ALBUM = V_PK;
        END CASE;

        IF V_EXISTS > 0
        THEN
            V_EXISTS := 0;

            SELECT SUBSTR (
                       REPLACE (
                           UTL_RAW.cast_to_varchar2 (
                               UTL_ENCODE.base64_encode (
                                   STANDARD_HASH (
                                       TRIM (TO_CHAR (SYSDATE, 'SSMIHH')),
                                       'SHA1'))),
                           '/'),
                       0,
                       22)
              INTO V_PK
              FROM DUAL;
        END IF;

        CASE
            WHEN P_TABLE = 'ART'
            THEN
                SELECT COUNT (1)
                  INTO V_EXISTS
                  FROM CAPA_ARTISTS
                 WHERE ID_ARTIST = V_PK;
            WHEN P_TABLE = 'TRAC'
            THEN
                SELECT COUNT (1)
                  INTO V_EXISTS
                  FROM CAPA_TRACKS
                 WHERE ID_TRACK = V_PK;
            WHEN P_TABLE = 'ALB'
            THEN
                SELECT COUNT (1)
                  INTO V_EXISTS
                  FROM CAPA_ALBUMS
                 WHERE ID_ALBUM = V_PK;
        END CASE;

        IF V_EXISTS > 0
        THEN
            RAISE V_PK_ALREADY_EXISTS;
        END IF;

        RETURN V_PK;
    EXCEPTION
        WHEN V_PK_ALREADY_EXISTS
        THEN
            RETURN 'NO_OK';
    END;

    PROCEDURE PRC_INS_UPDT_DEL_ARTIST (
        P_NAME        IN     VARCHAR2,
        P_VERIFIED    IN     VARCHAR2,
        P_BIOGRAPHY   IN     VARCHAR2 DEFAULT NULL,
        P_IMG_URL     IN     VARCHAR2,
        P_LISTENERS   IN     NUMBER,
        P_URL_INFO    IN     VARCHAR2,
        P_FOLLOWERS   IN     NUMBER,
        P_OPER        IN     VARCHAR2,
        P_ID          IN     VARCHAR2 DEFAULT NULL,
        P_ERROR          OUT VARCHAR2,
        P_ERROR_ORA      OUT VARCHAR2)
    IS
        V_VERIFIED     NUMBER;
        V_BIOGRAPHY    VARCHAR2 (4000);
        V_ID           VARCHAR2 (50);
        V_ERROR        VARCHAR2 (50);
        V_ID_NULL      EXCEPTION;
        V_PK_ERROR     EXCEPTION;
        V_WRONG_OPER   EXCEPTION;
    BEGIN
        CASE
            WHEN P_VERIFIED = 'S'
            THEN
                V_VERIFIED := 1;
            WHEN P_VERIFIED = 'N'
            THEN
                V_VERIFIED := 0;
        END CASE;

        IF (P_BIOGRAPHY IS NULL)
        THEN
            V_BIOGRAPHY := NULL;
        ELSE
            V_BIOGRAPHY := P_BIOGRAPHY;
        END IF;

        CASE
            WHEN P_OPER = 'INS'
            THEN
                V_ERROR := 'Error inserting artist';
                V_ID := FUN_GENERATE_PK (P_NAME, 'ART');

                IF V_ID = 'NO_OK'
                THEN
                    RAISE V_PK_ERROR;
                END IF;

                INSERT INTO CAPA_ARTISTS (ID_ARTIST,
                                          NAME_ARTIST,
                                          VERIFIED,
                                          BIOGRAPHY,
                                          AVATARIMAGE,
                                          MONTHLYLISTENERS,
                                          SHARINGINFO,
                                          FOLLOWERS)
                     VALUES (V_ID,
                             P_NAME,
                             V_VERIFIED,
                             V_BIOGRAPHY,
                             P_IMG_URL,
                             P_LISTENERS,
                             P_URL_INFO,
                             P_FOLLOWERS);
            WHEN P_OPER = 'UPDT'
            THEN
                V_ERROR := 'Error updating artist';

                IF P_ID IS NULL
                THEN
                    RAISE V_ID_NULL;
                END IF;

                UPDATE CAPA_ARTISTS
                   SET NAME_ARTIST = P_NAME,
                       VERIFIED = V_VERIFIED,
                       BIOGRAPHY = V_BIOGRAPHY,
                       AVATARIMAGE = P_IMG_URL,
                       MONTHLYLISTENERS = P_LISTENERS,
                       SHARINGINFO = P_URL_INFO,
                       FOLLOWERS = P_FOLLOWERS
                 WHERE ID_ARTIST = P_ID;
            WHEN P_OPER = 'DEL'
            THEN
                V_ERROR := 'Error deleting artist';

                DELETE FROM CAPA_ARTISTS
                      WHERE ID_ARTIST = P_ID;
            ELSE
                RAISE V_WRONG_OPER;
        END CASE;
    EXCEPTION
        WHEN V_ID_NULL
        THEN
            V_ERROR := 'ID ARTIST CAN NOT BE NULL';
            P_ERROR := V_ERROR;
            P_ERROR_ORA := SQLERRM;
        WHEN V_PK_ERROR
        THEN
            V_ERROR := 'CANNOT CREATE UNIQUE PK';
            P_ERROR := V_ERROR;
            P_ERROR_ORA := SQLERRM;
        WHEN V_WRONG_OPER
        THEN
            V_ERROR := 'Wrong operation';
            P_ERROR := V_ERROR;
            P_ERROR_ORA := SQLERRM;
        WHEN OTHERS
        THEN
            P_ERROR := V_ERROR;
            P_ERROR_ORA := SQLERRM;
    END;

    PROCEDURE PRC_INS_UPDT_DEL_ALBUM (
        P_ID_ARTIST      IN     VARCHAR2,
        P_ID_ALBUM       IN     VARCHAR2 DEFAULT NULL,
        P_NAME           IN     VARCHAR2,
        P_TYPE           IN     VARCHAR2,
        P_RELEASE_DATE   IN     DATE,
        P_IMG_URL        IN     VARCHAR2,
        P_LABEL          IN     VARCHAR2,
        P_LATEST         IN     VARCHAR2,
        P_OPER           IN     VARCHAR2,
        P_ERROR             OUT VARCHAR2,
        P_ERROR_ORA         OUT VARCHAR2)
    IS
        V_TYPE         VARCHAR2 (20);
        V_LATEST       VARCHAR2 (20);
        V_ID_ALBUM     VARCHAR2 (50);
        V_ERROR        VARCHAR2 (50);
        V_ID_NULL      EXCEPTION;
        V_PK_ERROR     EXCEPTION;
        V_WRONG_OPER   EXCEPTION;
    BEGIN
        CASE
            WHEN P_TYPE = 'A'
            THEN
                V_TYPE := 'ALBUM';
            WHEN P_TYPE = 'S'
            THEN
                V_TYPE := 'SINGLE';
            WHEN P_TYPE = 'E'
            THEN
                V_TYPE := 'EP';
        END CASE;

        IF (P_LATEST = 'S')
        THEN
            V_LATEST := 'S';
        ELSIF (P_LATEST = 'N')
        THEN
            V_LATEST := 'R';
        END IF;

        CASE
            WHEN P_OPER = 'INS'
            THEN
                V_ERROR := 'Error inserting album';
                V_ID_ALBUM := FUN_GENERATE_PK (P_NAME, 'ALB');

                IF V_ID_ALBUM = 'NO_OK'
                THEN
                    RAISE V_PK_ERROR;
                END IF;

                INSERT INTO CAPA_ALBUMS (ID_ALBUM,
                                         ID_ARTIST,
                                         NAME_ALBUM,
                                         TYPE_ALBUM,
                                         RELEASE_DATE,
                                         COVERART,
                                         LABEL_ALBUM,
                                         LATETEST)
                     VALUES (V_ID_ALBUM,
                             P_ID_ARTIST,
                             P_NAME,
                             V_TYPE,
                             P_RELEASE_DATE,
                             P_IMG_URL,
                             P_LABEL,
                             V_LATEST);
            WHEN P_OPER = 'UPDT'
            THEN
                V_ERROR := 'Error updating album';

                IF P_ID_ALBUM IS NULL
                THEN
                    RAISE V_ID_NULL;
                END IF;

                UPDATE CAPA_ALBUMS
                   SET NAME_ALBUM = P_NAME,
                       TYPE_ALBUM = V_TYPE,
                       RELEASE_DATE = P_RELEASE_DATE,
                       COVERART = P_IMG_URL,
                       LABEL_ALBUM = P_LABEL,
                       LATETEST = V_LATEST
                 WHERE ID_ALBUM = P_ID_ALBUM;
            WHEN P_OPER = 'DEL'
            THEN
                V_ERROR := 'Error deleting album';

                IF P_ID_ALBUM IS NULL
                THEN
                    RAISE V_ID_NULL;
                END IF;

                DELETE FROM CAPA_ALBUMS
                      WHERE ID_ALBUM = P_ID_ALBUM;
            ELSE
                RAISE V_WRONG_OPER;
        END CASE;
    EXCEPTION
        WHEN V_ID_NULL
        THEN
            V_ERROR := 'ID ALBUM CAN NOT BE NULL';
            P_ERROR := V_ERROR;
            P_ERROR_ORA := SQLERRM;
        WHEN V_PK_ERROR
        THEN
            V_ERROR := 'CANNOT CREATE UNIQUE PK';
            P_ERROR := V_ERROR;
            P_ERROR_ORA := SQLERRM;
        WHEN V_WRONG_OPER
        THEN
            V_ERROR := 'Wrong operation';
            P_ERROR := V_ERROR;
            P_ERROR_ORA := SQLERRM;
        WHEN OTHERS
        THEN
            P_ERROR := V_ERROR;
            P_ERROR_ORA := SQLERRM;
    END;

    PROCEDURE PRC_INS_UPDT_DEL_TRACKS (
        P_ID_ALBUM      IN     VARCHAR2,
        P_ID_TRACK      IN     VARCHAR2 DEFAULT NULL,
        P_NAME          IN     VARCHAR2,
        P_IS_PLAYABLE   IN     VARCHAR2,
        P_TYPE          IN     VARCHAR2,
        P_URL           IN     VARCHAR2,
        P_DURATION      IN     NUMBER,
        P_OPER          IN     VARCHAR2,
        P_ERROR            OUT VARCHAR2,
        P_ERROR_ORA        OUT VARCHAR2)
    IS
        V_IS_PLAYABLE   NUMBER;
        V_TYPE          VARCHAR2 (20);
        V_ID_TRACK      VARCHAR2 (50);
        V_NUMBER        NUMBER;
        V_ERROR         VARCHAR2 (50);
        V_ID_NULL       EXCEPTION;
        V_PK_ERROR      EXCEPTION;
        V_WRONG_OPER    EXCEPTION;
    BEGIN
        CASE
            WHEN P_IS_PLAYABLE = 'S'
            THEN
                V_IS_PLAYABLE := 1;
            WHEN P_IS_PLAYABLE = 'N'
            THEN
                V_IS_PLAYABLE := 0;
        END CASE;

        CASE
            WHEN P_TYPE = 'T'
            THEN
                V_TYPE := 'TRACK';
            WHEN P_TYPE = 'S'
            THEN
                V_TYPE := 'SINGLE';
        END CASE;

        CASE
            WHEN P_OPER = 'INS'
            THEN
                V_ERROR := 'Error inserting track';
                V_ID_TRACK := FUN_GENERATE_PK (P_NAME, 'TRAC');

                IF V_ID_TRACK = 'NO_OK'
                THEN
                    RAISE V_PK_ERROR;
                END IF;

                V_NUMBER := 1;

                INSERT INTO CAPA_TRACKS (ID_TRACK,
                                         ID_ALBUM,
                                         TRACK_NAME,
                                         TRACK_NUMBER,
                                         IS_PLAYABLE,
                                         TYPE_TRACK,
                                         URI,
                                         DURATION_MS)
                     VALUES (V_ID_TRACK,
                             P_ID_ALBUM,
                             P_NAME,
                             V_NUMBER,
                             V_IS_PLAYABLE,
                             V_TYPE,
                             P_URL,
                             P_DURATION);
            WHEN P_OPER = 'UPDT'
            THEN
                V_ERROR := 'Error updating track';

                IF P_ID_TRACK IS NULL
                THEN
                    RAISE V_ID_NULL;
                END IF;

                UPDATE CAPA_TRACKS
                   SET TRACK_NAME = P_NAME,
                       IS_PLAYABLE = V_IS_PLAYABLE,
                       TYPE_TRACK = V_TYPE,
                       URI = P_URL,
                       DURATION_MS = P_DURATION
                 WHERE ID_ALBUM = P_ID_ALBUM AND TRACK_NAME = P_NAME;
            WHEN P_OPER = 'DEL'
            THEN
                V_ERROR := 'Error deleting track';

                IF P_ID_TRACK IS NULL
                THEN
                    RAISE V_ID_NULL;
                END IF;

                DELETE FROM CAPA_TRACKS
                      WHERE ID_ALBUM = P_ID_ALBUM AND TRACK_NAME = P_NAME;
        END CASE;
    EXCEPTION
        WHEN V_ID_NULL
        THEN
            V_ERROR := 'ID TRACK CAN NOT BE NULL';
            P_ERROR := V_ERROR;
            P_ERROR_ORA := SQLERRM;
        WHEN V_PK_ERROR
        THEN
            V_ERROR := 'CANNOT CREATE UNIQUE PK';
            P_ERROR := V_ERROR;
            P_ERROR_ORA := SQLERRM;
        WHEN V_WRONG_OPER
        THEN
            V_ERROR := 'Wrong operation';
            P_ERROR := V_ERROR;
            P_ERROR_ORA := SQLERRM;
        WHEN OTHERS
        THEN
            P_ERROR := V_ERROR;
            P_ERROR_ORA := SQLERRM;
    END;
END;
/

-- EXECUTE

EXECUTE PAC_FN_CAPA.PRC_INS_UPDT_DEL_ARTIST (:P_NAME, :P_VERIFIED, :P_BIOGRAPHY, :P_IMG_URL, :P_LISTENERS, :P_URL_INFO, :P_FOLLOWERS, :P_OPER, :P_ID, :P_ERROR, :P_ERROR_ORA);

EXECUTE PAC_FN_CAPA.PRC_INS_UPDT_DEL_ALBUM (:P_ID_ARTIST, :P_NAME, :P_TYPE, :P_RELEASE_DATE, :P_IMG_URL, :P_LABEL, :P_LATEST, :P_OPER, :P_ERROR, :P_ERROR_ORA);

EXECUTE PAC_FN_CAPA.PRC_INS_UPDT_DEL_TRACKS (:P_ID_ALBUM, :P_NAME, :P_IS_PLAYABLE, :P_TYPE, :P_URL, :P_DURATION, :P_OPER, :P_ERROR, :P_ERROR_ORA);