PGDMP  %                 	    |            agenda    17.0    17.0 @    +           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            ,           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            -           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            .           1262    16388    agenda    DATABASE     y   CREATE DATABASE agenda WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE agenda;
                     postgres    false            �            1259    16549    cita    TABLE     �   CREATE TABLE public.cita (
    id_cita bigint NOT NULL,
    id_paciente bigint NOT NULL,
    id_personal bigint NOT NULL,
    indicaciones character varying(300) NOT NULL,
    fecha timestamp without time zone NOT NULL,
    cotizacion bigint NOT NULL
);
    DROP TABLE public.cita;
       public         heap r       postgres    false            �            1259    16577    cita_temp_id_cita_seq    SEQUENCE     ~   CREATE SEQUENCE public.cita_temp_id_cita_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.cita_temp_id_cita_seq;
       public               postgres    false    222            /           0    0    cita_temp_id_cita_seq    SEQUENCE OWNED BY     J   ALTER SEQUENCE public.cita_temp_id_cita_seq OWNED BY public.cita.id_cita;
          public               postgres    false    228            �            1259    16582    cita_temp_id_paciente_seq    SEQUENCE     �   CREATE SEQUENCE public.cita_temp_id_paciente_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.cita_temp_id_paciente_seq;
       public               postgres    false    222            0           0    0    cita_temp_id_paciente_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.cita_temp_id_paciente_seq OWNED BY public.cita.id_paciente;
          public               postgres    false    229            �            1259    16587    cita_temp_id_personal_seq    SEQUENCE     �   CREATE SEQUENCE public.cita_temp_id_personal_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.cita_temp_id_personal_seq;
       public               postgres    false    222            1           0    0    cita_temp_id_personal_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.cita_temp_id_personal_seq OWNED BY public.cita.id_personal;
          public               postgres    false    230            �            1259    16552    paciente    TABLE       CREATE TABLE public.paciente (
    id_paciente bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    edad bigint NOT NULL,
    telefono bigint NOT NULL,
    estado character varying(50) NOT NULL,
    alcaldia character varying(50) NOT NULL,
    usuario_id bigint NOT NULL
);
    DROP TABLE public.paciente;
       public         heap r       postgres    false            �            1259    16558    paciente_temp_id_paciente_seq    SEQUENCE     �   CREATE SEQUENCE public.paciente_temp_id_paciente_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.paciente_temp_id_paciente_seq;
       public               postgres    false    223            2           0    0    paciente_temp_id_paciente_seq    SEQUENCE OWNED BY     Z   ALTER SEQUENCE public.paciente_temp_id_paciente_seq OWNED BY public.paciente.id_paciente;
          public               postgres    false    225            �            1259    16594    paciente_temp_usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.paciente_temp_usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.paciente_temp_usuario_id_seq;
       public               postgres    false    223            3           0    0    paciente_temp_usuario_id_seq    SEQUENCE OWNED BY     X   ALTER SEQUENCE public.paciente_temp_usuario_id_seq OWNED BY public.paciente.usuario_id;
          public               postgres    false    231            �            1259    16555    personal_consultorio    TABLE     I  CREATE TABLE public.personal_consultorio (
    id_personal bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    estado character varying(50) NOT NULL,
    alcaldia character varying(50) NOT NULL,
    especialidad character varying(100) NOT NULL,
    horas_laboradas bigint NOT NULL,
    usuario_id bigint NOT NULL
);
 (   DROP TABLE public.personal_consultorio;
       public         heap r       postgres    false            �            1259    16565 )   personal_consultorio_temp_id_personal_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_consultorio_temp_id_personal_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 @   DROP SEQUENCE public.personal_consultorio_temp_id_personal_seq;
       public               postgres    false    224            4           0    0 )   personal_consultorio_temp_id_personal_seq    SEQUENCE OWNED BY     r   ALTER SEQUENCE public.personal_consultorio_temp_id_personal_seq OWNED BY public.personal_consultorio.id_personal;
          public               postgres    false    226            �            1259    16570 )   personal_consultorio_temp_usuario_id_seq1    SEQUENCE     �   CREATE SEQUENCE public.personal_consultorio_temp_usuario_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 @   DROP SEQUENCE public.personal_consultorio_temp_usuario_id_seq1;
       public               postgres    false    224            5           0    0 )   personal_consultorio_temp_usuario_id_seq1    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.personal_consultorio_temp_usuario_id_seq1 OWNED BY public.personal_consultorio.usuario_id;
          public               postgres    false    227            �            1259    16488    rol_usuario    TABLE     g   CREATE TABLE public.rol_usuario (
    id bigint NOT NULL,
    nombre character varying(50) NOT NULL
);
    DROP TABLE public.rol_usuario;
       public         heap r       postgres    false            �            1259    16487    rol_usuario_id_seq    SEQUENCE     {   CREATE SEQUENCE public.rol_usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.rol_usuario_id_seq;
       public               postgres    false    218            6           0    0    rol_usuario_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.rol_usuario_id_seq OWNED BY public.rol_usuario.id;
          public               postgres    false    217            �            1259    16496    usuario    TABLE     �   CREATE TABLE public.usuario (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    rol_id bigint NOT NULL
);
    DROP TABLE public.usuario;
       public         heap r       postgres    false            �            1259    16494    usuario_id_seq    SEQUENCE     w   CREATE SEQUENCE public.usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public               postgres    false    221            7           0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public               postgres    false    219            �            1259    16495    usuario_rol_id_seq    SEQUENCE     {   CREATE SEQUENCE public.usuario_rol_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.usuario_rol_id_seq;
       public               postgres    false    221            8           0    0    usuario_rol_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.usuario_rol_id_seq OWNED BY public.usuario.rol_id;
          public               postgres    false    220            s           2604    16578    cita id_cita    DEFAULT     q   ALTER TABLE ONLY public.cita ALTER COLUMN id_cita SET DEFAULT nextval('public.cita_temp_id_cita_seq'::regclass);
 ;   ALTER TABLE public.cita ALTER COLUMN id_cita DROP DEFAULT;
       public               postgres    false    228    222            t           2604    16583    cita id_paciente    DEFAULT     y   ALTER TABLE ONLY public.cita ALTER COLUMN id_paciente SET DEFAULT nextval('public.cita_temp_id_paciente_seq'::regclass);
 ?   ALTER TABLE public.cita ALTER COLUMN id_paciente DROP DEFAULT;
       public               postgres    false    229    222            u           2604    16588    cita id_personal    DEFAULT     y   ALTER TABLE ONLY public.cita ALTER COLUMN id_personal SET DEFAULT nextval('public.cita_temp_id_personal_seq'::regclass);
 ?   ALTER TABLE public.cita ALTER COLUMN id_personal DROP DEFAULT;
       public               postgres    false    230    222            v           2604    16559    paciente id_paciente    DEFAULT     �   ALTER TABLE ONLY public.paciente ALTER COLUMN id_paciente SET DEFAULT nextval('public.paciente_temp_id_paciente_seq'::regclass);
 C   ALTER TABLE public.paciente ALTER COLUMN id_paciente DROP DEFAULT;
       public               postgres    false    225    223            w           2604    16595    paciente usuario_id    DEFAULT        ALTER TABLE ONLY public.paciente ALTER COLUMN usuario_id SET DEFAULT nextval('public.paciente_temp_usuario_id_seq'::regclass);
 B   ALTER TABLE public.paciente ALTER COLUMN usuario_id DROP DEFAULT;
       public               postgres    false    231    223            x           2604    16566     personal_consultorio id_personal    DEFAULT     �   ALTER TABLE ONLY public.personal_consultorio ALTER COLUMN id_personal SET DEFAULT nextval('public.personal_consultorio_temp_id_personal_seq'::regclass);
 O   ALTER TABLE public.personal_consultorio ALTER COLUMN id_personal DROP DEFAULT;
       public               postgres    false    226    224            y           2604    16571    personal_consultorio usuario_id    DEFAULT     �   ALTER TABLE ONLY public.personal_consultorio ALTER COLUMN usuario_id SET DEFAULT nextval('public.personal_consultorio_temp_usuario_id_seq1'::regclass);
 N   ALTER TABLE public.personal_consultorio ALTER COLUMN usuario_id DROP DEFAULT;
       public               postgres    false    227    224            p           2604    16491    rol_usuario id    DEFAULT     p   ALTER TABLE ONLY public.rol_usuario ALTER COLUMN id SET DEFAULT nextval('public.rol_usuario_id_seq'::regclass);
 =   ALTER TABLE public.rol_usuario ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217    218            q           2604    16499 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    221    221            r           2604    16500    usuario rol_id    DEFAULT     p   ALTER TABLE ONLY public.usuario ALTER COLUMN rol_id SET DEFAULT nextval('public.usuario_rol_id_seq'::regclass);
 =   ALTER TABLE public.usuario ALTER COLUMN rol_id DROP DEFAULT;
       public               postgres    false    221    220    221                      0    16549    cita 
   TABLE DATA           b   COPY public.cita (id_cita, id_paciente, id_personal, indicaciones, fecha, cotizacion) FROM stdin;
    public               postgres    false    222   	L                  0    16552    paciente 
   TABLE DATA           e   COPY public.paciente (id_paciente, nombre, edad, telefono, estado, alcaldia, usuario_id) FROM stdin;
    public               postgres    false    223   nL       !          0    16555    personal_consultorio 
   TABLE DATA           �   COPY public.personal_consultorio (id_personal, nombre, estado, alcaldia, especialidad, horas_laboradas, usuario_id) FROM stdin;
    public               postgres    false    224   �L                 0    16488    rol_usuario 
   TABLE DATA           1   COPY public.rol_usuario (id, nombre) FROM stdin;
    public               postgres    false    218   OM                 0    16496    usuario 
   TABLE DATA           F   COPY public.usuario (id, nombre, email, password, rol_id) FROM stdin;
    public               postgres    false    221   �M       9           0    0    cita_temp_id_cita_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.cita_temp_id_cita_seq', 2, true);
          public               postgres    false    228            :           0    0    cita_temp_id_paciente_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.cita_temp_id_paciente_seq', 1, false);
          public               postgres    false    229            ;           0    0    cita_temp_id_personal_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.cita_temp_id_personal_seq', 1, false);
          public               postgres    false    230            <           0    0    paciente_temp_id_paciente_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.paciente_temp_id_paciente_seq', 2, true);
          public               postgres    false    225            =           0    0    paciente_temp_usuario_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.paciente_temp_usuario_id_seq', 1, false);
          public               postgres    false    231            >           0    0 )   personal_consultorio_temp_id_personal_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.personal_consultorio_temp_id_personal_seq', 2, true);
          public               postgres    false    226            ?           0    0 )   personal_consultorio_temp_usuario_id_seq1    SEQUENCE SET     X   SELECT pg_catalog.setval('public.personal_consultorio_temp_usuario_id_seq1', 1, false);
          public               postgres    false    227            @           0    0    rol_usuario_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.rol_usuario_id_seq', 3, true);
          public               postgres    false    217            A           0    0    usuario_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.usuario_id_seq', 4, true);
          public               postgres    false    219            B           0    0    usuario_rol_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.usuario_rol_id_seq', 1, false);
          public               postgres    false    220                       2606    16593    cita cita_temp_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_temp_pkey PRIMARY KEY (id_cita);
 =   ALTER TABLE ONLY public.cita DROP CONSTRAINT cita_temp_pkey;
       public                 postgres    false    222            �           2606    16564    paciente paciente_temp_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_temp_pkey PRIMARY KEY (id_paciente);
 E   ALTER TABLE ONLY public.paciente DROP CONSTRAINT paciente_temp_pkey;
       public                 postgres    false    223            �           2606    16576 3   personal_consultorio personal_consultorio_temp_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.personal_consultorio
    ADD CONSTRAINT personal_consultorio_temp_pkey PRIMARY KEY (id_personal);
 ]   ALTER TABLE ONLY public.personal_consultorio DROP CONSTRAINT personal_consultorio_temp_pkey;
       public                 postgres    false    224            {           2606    16493    rol_usuario rol_usuario_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.rol_usuario
    ADD CONSTRAINT rol_usuario_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.rol_usuario DROP CONSTRAINT rol_usuario_pkey;
       public                 postgres    false    218            }           2606    16504    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public                 postgres    false    221            �           2606    16611    cita id_paciente    FK CONSTRAINT     �   ALTER TABLE ONLY public.cita
    ADD CONSTRAINT id_paciente FOREIGN KEY (id_paciente) REFERENCES public.paciente(id_paciente) NOT VALID;
 :   ALTER TABLE ONLY public.cita DROP CONSTRAINT id_paciente;
       public               postgres    false    222    4737    223            �           2606    16616    cita id_personal    FK CONSTRAINT     �   ALTER TABLE ONLY public.cita
    ADD CONSTRAINT id_personal FOREIGN KEY (id_personal) REFERENCES public.personal_consultorio(id_personal) NOT VALID;
 :   ALTER TABLE ONLY public.cita DROP CONSTRAINT id_personal;
       public               postgres    false    222    4739    224            �           2606    16506    usuario rol_id    FK CONSTRAINT     x   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT rol_id FOREIGN KEY (rol_id) REFERENCES public.usuario(id) NOT VALID;
 8   ALTER TABLE ONLY public.usuario DROP CONSTRAINT rol_id;
       public               postgres    false    221    4733    221            �           2606    16601    paciente usuario_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) NOT VALID;
 =   ALTER TABLE ONLY public.paciente DROP CONSTRAINT usuario_id;
       public               postgres    false    4733    221    223            �           2606    16606    personal_consultorio usuario_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.personal_consultorio
    ADD CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) NOT VALID;
 I   ALTER TABLE ONLY public.personal_consultorio DROP CONSTRAINT usuario_id;
       public               postgres    false    224    4733    221               U   x�3�4B�����|��ԼԢ�N##]C]#C+0�450�2�A����Ҝ�D��Ԕ��K�2�Z�Z��Zb���� :��          [   x�3��*M�S8��(���؀������؄ӵ�$1%_���1'91'���D ۈˈ�'��(Q�=�((�ib
�ajfn�a����#F��� BB�      !   f   x�3�t)J�S�M,�LT��/H��t-.IL�W0�t�IN�I9�6�vN,J����Or9M8����:���9��
�E�FH:�8RS2K�@��M��b���� %�         3   x�3�LL����,.)JL�/�2�,HL�L�+I�2�,H-*��K������ @��         �   x�u�=
B1���S��$@�Jl�l�d�H�ؼ���}AED���clB�E�:Јk�Qn����ـA�;k�2���3l���JXG���j7S��"}Y���-���
��Ձ$����w��@��U�5"> ��E�     