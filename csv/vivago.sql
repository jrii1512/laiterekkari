PGDMP     5                    z           vivago    14.2    14.2 =    7           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            8           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            9           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            :           1262    16394    vivago    DATABASE     d   CREATE DATABASE vivago WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Finnish_Finland.1252';
    DROP DATABASE vivago;
                vivagoadmin    false            ;           0    0    SCHEMA public    ACL     �   REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO vivagoadmin;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   vivagoadmin    false    3            �            1259    16481    calib    TABLE     �   CREATE TABLE public.calib (
    calibid integer NOT NULL,
    equipid integer,
    calduedate date,
    lastcaldate date,
    calintervalyears integer,
    calibrationcert text DEFAULT 'NA'::text,
    applied text DEFAULT 'No'::text
);
    DROP TABLE public.calib;
       public         heap    vivagoadmin    false            <           0    0    COLUMN calib.applied    COMMENT     _   COMMENT ON COLUMN public.calib.applied IS 'To indicate if calibration has already been done.';
          public          vivagoadmin    false    210            �            1259    16480    Calibration_calibID_seq    SEQUENCE     �   CREATE SEQUENCE public."Calibration_calibID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Calibration_calibID_seq";
       public          vivagoadmin    false    210            =           0    0    Calibration_calibID_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Calibration_calibID_seq" OWNED BY public.calib.calibid;
          public          vivagoadmin    false    209            �            1259    16789    equip    TABLE     /  CREATE TABLE public.equip (
    eid integer NOT NULL,
    oldid text,
    status text,
    prefix text,
    category integer,
    categorydesc text,
    number integer,
    equipmentid text,
    equipmentdesc text,
    specification text,
    notes text,
    usedby text DEFAULT '"Production"'::text
);
    DROP TABLE public.equip;
       public         heap    vivagoadmin    false            �            1259    16788    Equip_eid_seq    SEQUENCE     �   CREATE SEQUENCE public."Equip_eid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Equip_eid_seq";
       public          vivagoadmin    false    214            >           0    0    Equip_eid_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Equip_eid_seq" OWNED BY public.equip.eid;
          public          vivagoadmin    false    213            �            1259    16692    maint    TABLE     �   CREATE TABLE public.maint (
    maintid integer NOT NULL,
    maintneed text DEFAULT 'Yes'::text,
    maintinstruction text DEFAULT 'NA'::text,
    equipid integer
);
    DROP TABLE public.maint;
       public         heap    postgres    false            ?           0    0    TABLE maint    ACL     [   GRANT ALL ON TABLE public.maint TO PUBLIC;
GRANT ALL ON TABLE public.maint TO vivagoadmin;
          public          postgres    false    212            �            1259    16691    Maintenance_maintid_seq    SEQUENCE     �   CREATE SEQUENCE public."Maintenance_maintid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Maintenance_maintid_seq";
       public          postgres    false    212            @           0    0    Maintenance_maintid_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Maintenance_maintid_seq" OWNED BY public.maint.maintid;
          public          postgres    false    211            �            1259    16808    purch    TABLE        CREATE TABLE public.purch (
    purchid integer NOT NULL,
    purchaseby text,
    purchasedate date DEFAULT now(),
    supplier text,
    supplierid text,
    manufacture text,
    model text,
    serialnro text,
    location text,
    equipid integer
);
    DROP TABLE public.purch;
       public         heap    vivagoadmin    false            �            1259    16807    Purch_purchid_seq    SEQUENCE     �   CREATE SEQUENCE public."Purch_purchid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Purch_purchid_seq";
       public          vivagoadmin    false    216            A           0    0    Purch_purchid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Purch_purchid_seq" OWNED BY public.purch.purchid;
          public          vivagoadmin    false    215            �            1259    16817    valid    TABLE     �   CREATE TABLE public.valid (
    validid integer NOT NULL,
    validationneed text,
    lastvalidationdate date,
    validationreport text,
    equipid integer
);
    DROP TABLE public.valid;
       public         heap    vivagoadmin    false            �            1259    16816    Valid_validid_seq    SEQUENCE     �   CREATE SEQUENCE public."Valid_validid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Valid_validid_seq";
       public          vivagoadmin    false    218            B           0    0    Valid_validid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Valid_validid_seq" OWNED BY public.valid.validid;
          public          vivagoadmin    false    217            �            1259    16826    prod    TABLE     d   CREATE TABLE public.prod (
    productid integer NOT NULL,
    product text,
    equipid integer
);
    DROP TABLE public.prod;
       public         heap    vivagoadmin    false            �            1259    16825    prod_productid_seq    SEQUENCE     �   CREATE SEQUENCE public.prod_productid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.prod_productid_seq;
       public          vivagoadmin    false    220            C           0    0    prod_productid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.prod_productid_seq OWNED BY public.prod.productid;
          public          vivagoadmin    false    219            w           2604    16484    calib calibid    DEFAULT     v   ALTER TABLE ONLY public.calib ALTER COLUMN calibid SET DEFAULT nextval('public."Calibration_calibID_seq"'::regclass);
 <   ALTER TABLE public.calib ALTER COLUMN calibid DROP DEFAULT;
       public          vivagoadmin    false    209    210    210            }           2604    16792 	   equip eid    DEFAULT     h   ALTER TABLE ONLY public.equip ALTER COLUMN eid SET DEFAULT nextval('public."Equip_eid_seq"'::regclass);
 8   ALTER TABLE public.equip ALTER COLUMN eid DROP DEFAULT;
       public          vivagoadmin    false    213    214    214            z           2604    16695    maint maintid    DEFAULT     v   ALTER TABLE ONLY public.maint ALTER COLUMN maintid SET DEFAULT nextval('public."Maintenance_maintid_seq"'::regclass);
 <   ALTER TABLE public.maint ALTER COLUMN maintid DROP DEFAULT;
       public          postgres    false    212    211    212            �           2604    16829    prod productid    DEFAULT     p   ALTER TABLE ONLY public.prod ALTER COLUMN productid SET DEFAULT nextval('public.prod_productid_seq'::regclass);
 =   ALTER TABLE public.prod ALTER COLUMN productid DROP DEFAULT;
       public          vivagoadmin    false    219    220    220                       2604    16811    purch purchid    DEFAULT     p   ALTER TABLE ONLY public.purch ALTER COLUMN purchid SET DEFAULT nextval('public."Purch_purchid_seq"'::regclass);
 <   ALTER TABLE public.purch ALTER COLUMN purchid DROP DEFAULT;
       public          vivagoadmin    false    216    215    216            �           2604    16820    valid validid    DEFAULT     p   ALTER TABLE ONLY public.valid ALTER COLUMN validid SET DEFAULT nextval('public."Valid_validid_seq"'::regclass);
 <   ALTER TABLE public.valid ALTER COLUMN validid DROP DEFAULT;
       public          vivagoadmin    false    218    217    218            *          0    16481    calib 
   TABLE DATA           v   COPY public.calib (calibid, equipid, calduedate, lastcaldate, calintervalyears, calibrationcert, applied) FROM stdin;
    public          vivagoadmin    false    210   F       .          0    16789    equip 
   TABLE DATA           �   COPY public.equip (eid, oldid, status, prefix, category, categorydesc, number, equipmentid, equipmentdesc, specification, notes, usedby) FROM stdin;
    public          vivagoadmin    false    214   �F       ,          0    16692    maint 
   TABLE DATA           N   COPY public.maint (maintid, maintneed, maintinstruction, equipid) FROM stdin;
    public          postgres    false    212   @G       4          0    16826    prod 
   TABLE DATA           ;   COPY public.prod (productid, product, equipid) FROM stdin;
    public          vivagoadmin    false    220   �G       0          0    16808    purch 
   TABLE DATA           �   COPY public.purch (purchid, purchaseby, purchasedate, supplier, supplierid, manufacture, model, serialnro, location, equipid) FROM stdin;
    public          vivagoadmin    false    216   H       2          0    16817    valid 
   TABLE DATA           g   COPY public.valid (validid, validationneed, lastvalidationdate, validationreport, equipid) FROM stdin;
    public          vivagoadmin    false    218   �H       D           0    0    Calibration_calibID_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Calibration_calibID_seq"', 36, true);
          public          vivagoadmin    false    209            E           0    0    Equip_eid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Equip_eid_seq"', 78, true);
          public          vivagoadmin    false    213            F           0    0    Maintenance_maintid_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Maintenance_maintid_seq"', 34, true);
          public          postgres    false    211            G           0    0    Purch_purchid_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Purch_purchid_seq"', 59, true);
          public          vivagoadmin    false    215            H           0    0    Valid_validid_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Valid_validid_seq"', 29, true);
          public          vivagoadmin    false    217            I           0    0    prod_productid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.prod_productid_seq', 56, true);
          public          vivagoadmin    false    219            �           2606    16488    calib Calibration_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.calib
    ADD CONSTRAINT "Calibration_pkey" PRIMARY KEY (calibid);
 B   ALTER TABLE ONLY public.calib DROP CONSTRAINT "Calibration_pkey";
       public            vivagoadmin    false    210            �           2606    16796    equip Equip_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.equip
    ADD CONSTRAINT "Equip_pkey" PRIMARY KEY (eid);
 <   ALTER TABLE ONLY public.equip DROP CONSTRAINT "Equip_pkey";
       public            vivagoadmin    false    214            �           2606    16699    maint Maintenance_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.maint
    ADD CONSTRAINT "Maintenance_pkey" PRIMARY KEY (maintid);
 B   ALTER TABLE ONLY public.maint DROP CONSTRAINT "Maintenance_pkey";
       public            postgres    false    212            �           2606    16815    purch Purch_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.purch
    ADD CONSTRAINT "Purch_pkey" PRIMARY KEY (purchid);
 <   ALTER TABLE ONLY public.purch DROP CONSTRAINT "Purch_pkey";
       public            vivagoadmin    false    216            �           2606    16824    valid Valid_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.valid
    ADD CONSTRAINT "Valid_pkey" PRIMARY KEY (validid);
 <   ALTER TABLE ONLY public.valid DROP CONSTRAINT "Valid_pkey";
       public            vivagoadmin    false    218            �           2606    16756    calib equipid-calib-unique 
   CONSTRAINT     Z   ALTER TABLE ONLY public.calib
    ADD CONSTRAINT "equipid-calib-unique" UNIQUE (equipid);
 F   ALTER TABLE ONLY public.calib DROP CONSTRAINT "equipid-calib-unique";
       public            vivagoadmin    false    210            �           2606    16862    prod equipid-prod-unique 
   CONSTRAINT     X   ALTER TABLE ONLY public.prod
    ADD CONSTRAINT "equipid-prod-unique" UNIQUE (equipid);
 D   ALTER TABLE ONLY public.prod DROP CONSTRAINT "equipid-prod-unique";
       public            vivagoadmin    false    220            �           2606    16864    purch equipid-purch-unique 
   CONSTRAINT     Z   ALTER TABLE ONLY public.purch
    ADD CONSTRAINT "equipid-purch-unique" UNIQUE (equipid);
 F   ALTER TABLE ONLY public.purch DROP CONSTRAINT "equipid-purch-unique";
       public            vivagoadmin    false    216            �           2606    16775    maint equipid-uni-maintenance 
   CONSTRAINT     ]   ALTER TABLE ONLY public.maint
    ADD CONSTRAINT "equipid-uni-maintenance" UNIQUE (equipid);
 I   ALTER TABLE ONLY public.maint DROP CONSTRAINT "equipid-uni-maintenance";
       public            postgres    false    212            �           2606    16866    valid equipid-valid-unique 
   CONSTRAINT     Z   ALTER TABLE ONLY public.valid
    ADD CONSTRAINT "equipid-valid-unique" UNIQUE (equipid);
 F   ALTER TABLE ONLY public.valid DROP CONSTRAINT "equipid-valid-unique";
       public            vivagoadmin    false    218            �           2606    16833    prod prod_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.prod
    ADD CONSTRAINT prod_pkey PRIMARY KEY (productid);
 8   ALTER TABLE ONLY public.prod DROP CONSTRAINT prod_pkey;
       public            vivagoadmin    false    220            �           2606    16834    prod fk-equipid-eid    FK CONSTRAINT     �   ALTER TABLE ONLY public.prod
    ADD CONSTRAINT "fk-equipid-eid" FOREIGN KEY (equipid) REFERENCES public.equip(eid) ON UPDATE CASCADE ON DELETE CASCADE;
 ?   ALTER TABLE ONLY public.prod DROP CONSTRAINT "fk-equipid-eid";
       public          vivagoadmin    false    220    214    3212            �           2606    16850    purch fk-purch-equipid-eid    FK CONSTRAINT     �   ALTER TABLE ONLY public.purch
    ADD CONSTRAINT "fk-purch-equipid-eid" FOREIGN KEY (equipid) REFERENCES public.equip(eid) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 F   ALTER TABLE ONLY public.purch DROP CONSTRAINT "fk-purch-equipid-eid";
       public          vivagoadmin    false    216    3212    214            �           2606    16855    valid fk-valid-equipid-eid    FK CONSTRAINT     �   ALTER TABLE ONLY public.valid
    ADD CONSTRAINT "fk-valid-equipid-eid" FOREIGN KEY (equipid) REFERENCES public.equip(eid) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 F   ALTER TABLE ONLY public.valid DROP CONSTRAINT "fk-valid-equipid-eid";
       public          vivagoadmin    false    218    3212    214            �           2606    16840    calib fk_cal_equipid_eid    FK CONSTRAINT     �   ALTER TABLE ONLY public.calib
    ADD CONSTRAINT fk_cal_equipid_eid FOREIGN KEY (equipid) REFERENCES public.equip(eid) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 B   ALTER TABLE ONLY public.calib DROP CONSTRAINT fk_cal_equipid_eid;
       public          vivagoadmin    false    210    3212    214            �           2606    16845    maint fk_maint_equipid_eid    FK CONSTRAINT     �   ALTER TABLE ONLY public.maint
    ADD CONSTRAINT fk_maint_equipid_eid FOREIGN KEY (equipid) REFERENCES public.equip(eid) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 D   ALTER TABLE ONLY public.maint DROP CONSTRAINT fk_maint_equipid_eid;
       public          postgres    false    212    3212    214                       826    16522    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     \   ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO PUBLIC;
          public          postgres    false                       826    16521    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     P   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO vivagoadmin;
                   postgres    false            *   y   x�3��47�4200�50"d�!'gej1����H��΄*1�47�a��k�BqjQIfZfvbbIIf"D�	���zL9��q�1�:Ō�܂�cNsS��B�!��8�MHГ������ �MU      .   �   x���A
�0�ur�^ B��xWB7���A��BfR���L��Hw!���o5��'Ǻc�1c;�[xx�!M�"��PP(��"�9�n��) ��5�rv�3��\�\!�acoO}��Tj}����=>#��&��6�j�̞\n-(��,�U0�z����8�/̺�      ,   \   x�32�L-��47�2� 3��8͍��,��Ȝ��K
2K�9͍�����̸���b��)i �in�el�&d�el5�d�)��6q�=... P�,      4   V   x�=�A
� ��&�|Z�S�������E���M��{�`�^�S�zjI�5�6�k�A��,!���dފJ h���v ^�2      0   �   x���1�0Eg��@Q��mY�Z��]�(C�tI��G����7�=�&8�M�	�V�VH�F��g�nK�YM$)�0��`��Ȫ�	��-�CE@Ⱥ�/�+��w�C
Zvw��h�O�I��葏*��U�Ǆ�x�������h\�x�Ԍ�      2   l   x�32�L-�4200�50"NNsC.#c�h��g�ed���,1'3%?3�$S�(� ���$��ܘ�Ȝ(�f\F�
�S�@��ܜ�������m�\F��	W� ]4�     