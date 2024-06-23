--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: history_peminjaman; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.history_peminjaman (
    id_history integer NOT NULL,
    nim character varying(20) NOT NULL,
    id_buku integer NOT NULL,
    tanggal_pinjam date NOT NULL,
    tanggal_kembali date,
    lama_pinjam integer NOT NULL
);


ALTER TABLE public.history_peminjaman OWNER TO postgres;

--
-- Name: history_peminjaman_id_history_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.history_peminjaman_id_history_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.history_peminjaman_id_history_seq OWNER TO postgres;

--
-- Name: history_peminjaman_id_history_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.history_peminjaman_id_history_seq OWNED BY public.history_peminjaman.id_history;


--
-- Name: master_buku; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_buku (
    id_buku integer NOT NULL,
    nama_buku character varying(255) NOT NULL,
    penulis character varying(255),
    penerbit character varying(255),
    tahun_terbit integer,
    isbn character varying(255)
);


ALTER TABLE public.master_buku OWNER TO postgres;

--
-- Name: master_buku_id_buku_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.master_buku_id_buku_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.master_buku_id_buku_seq OWNER TO postgres;

--
-- Name: master_buku_id_buku_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.master_buku_id_buku_seq OWNED BY public.master_buku.id_buku;


--
-- Name: master_mahasiswa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_mahasiswa (
    nim character varying(20) NOT NULL,
    nama_mahasiswa character varying(255) NOT NULL,
    program_studi character varying(100),
    tanggal_lahir date,
    alamat text,
    status_aktif boolean DEFAULT true NOT NULL
);


ALTER TABLE public.master_mahasiswa OWNER TO postgres;

--
-- Name: rak_inventory_stok_buku; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rak_inventory_stok_buku (
    id_stok integer NOT NULL,
    id_buku integer NOT NULL,
    lokasi_rak character varying(255) NOT NULL,
    jumlah_stok integer NOT NULL
);


ALTER TABLE public.rak_inventory_stok_buku OWNER TO postgres;

--
-- Name: rak_inventory_stok_buku_id_stok_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rak_inventory_stok_buku_id_stok_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rak_inventory_stok_buku_id_stok_seq OWNER TO postgres;

--
-- Name: rak_inventory_stok_buku_id_stok_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rak_inventory_stok_buku_id_stok_seq OWNED BY public.rak_inventory_stok_buku.id_stok;


--
-- Name: transaksi_peminjaman; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaksi_peminjaman (
    id_transaksi integer NOT NULL,
    nim character varying(20) NOT NULL,
    tanggal_pinjam date NOT NULL,
    tanggal_kembali date,
    lama_pinjam integer NOT NULL
);


ALTER TABLE public.transaksi_peminjaman OWNER TO postgres;

--
-- Name: transaksi_peminjaman_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaksi_peminjaman_detail (
    id_detail integer NOT NULL,
    id_transaksi integer NOT NULL,
    id_buku integer NOT NULL
);


ALTER TABLE public.transaksi_peminjaman_detail OWNER TO postgres;

--
-- Name: transaksi_peminjaman_detail_id_detail_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaksi_peminjaman_detail_id_detail_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaksi_peminjaman_detail_id_detail_seq OWNER TO postgres;

--
-- Name: transaksi_peminjaman_detail_id_detail_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaksi_peminjaman_detail_id_detail_seq OWNED BY public.transaksi_peminjaman_detail.id_detail;


--
-- Name: transaksi_peminjaman_id_transaksi_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaksi_peminjaman_id_transaksi_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaksi_peminjaman_id_transaksi_seq OWNER TO postgres;

--
-- Name: transaksi_peminjaman_id_transaksi_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaksi_peminjaman_id_transaksi_seq OWNED BY public.transaksi_peminjaman.id_transaksi;


--
-- Name: history_peminjaman id_history; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_peminjaman ALTER COLUMN id_history SET DEFAULT nextval('public.history_peminjaman_id_history_seq'::regclass);


--
-- Name: master_buku id_buku; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_buku ALTER COLUMN id_buku SET DEFAULT nextval('public.master_buku_id_buku_seq'::regclass);


--
-- Name: rak_inventory_stok_buku id_stok; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rak_inventory_stok_buku ALTER COLUMN id_stok SET DEFAULT nextval('public.rak_inventory_stok_buku_id_stok_seq'::regclass);


--
-- Name: transaksi_peminjaman id_transaksi; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_peminjaman ALTER COLUMN id_transaksi SET DEFAULT nextval('public.transaksi_peminjaman_id_transaksi_seq'::regclass);


--
-- Name: transaksi_peminjaman_detail id_detail; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_peminjaman_detail ALTER COLUMN id_detail SET DEFAULT nextval('public.transaksi_peminjaman_detail_id_detail_seq'::regclass);


--
-- Data for Name: history_peminjaman; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.history_peminjaman (id_history, nim, id_buku, tanggal_pinjam, tanggal_kembali, lama_pinjam) FROM stdin;
20	123-345-5678	14	2024-06-23	2024-06-28	5
21	123-345-5678	4	2024-06-23	2024-06-28	5
22	123-345-5678	6	2024-06-16	2024-06-25	9
\.


--
-- Data for Name: master_buku; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.master_buku (id_buku, nama_buku, penulis, penerbit, tahun_terbit, isbn) FROM stdin;
4	Daylight	Michael Brown	Penguin Random House	1926	319-88-0171-0
5	Element of Crime, The (Forbrydelsens Element)	Michael Brown	Hachette Book Group	1919	133-0-4862836-3
6	Letter to Elia, A	David Wilson	HarperCollins	1913	248-42-891684-4
7	Scribbler, The	Emily Johnson	Macmillan Publishers	1915	832-933-01584-1
8	Hello, Dolly!	Sarah Davis	Penguin Random House	2008	383-2326-00561-3
9	Perfect Fake, A	Michael Brown	Penguin Random House	1905	012-85676-514654-6
10	Kairat	Sarah Davis	Simon & Schuster	2018	677-909-568248-1
11	Roaring Twenties, The	David Wilson	Macmillan Publishers	1945	764-01-604-1
12	Future Weather	John Smith	Macmillan Publishers	1948	656-51703-98701-7
13	Invaders from Mars	Sarah Davis	Penguin Random House	1987	310-18-5677524-4
14	Node.js Mastery	Rama Dhan	Cikarang House	2020	123-4567-899
\.


--
-- Data for Name: master_mahasiswa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.master_mahasiswa (nim, nama_mahasiswa, program_studi, tanggal_lahir, alamat, status_aktif) FROM stdin;
988-037-4133	Isaac	Nursing	1979-03-08	Suite 36	t
028-483-7963	Grace	Computer Science	1988-12-04	PO Box 75830	f
394-616-5937	Grace	Psychology	2000-06-23	Apt 847	t
521-103-3606	Grace	Computer Science	1957-04-03	Room 263	t
400-105-9231	Bob	Nursing	1999-02-20	Suite 62	t
857-323-3346	Hannah	Nursing	1986-01-21	Room 1069	t
644-475-6873	Frank	Psychology	1985-10-19	Suite 30	f
819-809-7499	Hannah	Business Administration	1963-07-10	Suite 49	t
580-347-2920	Isaac	Engineering	1962-09-09	Apt 1193	t
265-235-4075	David	Computer Science	1979-09-04	Suite 68	f
123-345-5678	Ramadhan	Computer Science	1999-12-12	Cikarang	t
\.


--
-- Data for Name: rak_inventory_stok_buku; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rak_inventory_stok_buku (id_stok, id_buku, lokasi_rak, jumlah_stok) FROM stdin;
6	5	rak no. 2	7
8	7	rak no. 3	9
9	8	rak no. 2	2
5	14	rak no. 1	9
4	4	rak no. 1	4
7	6	rak no. 3	1
\.


--
-- Data for Name: transaksi_peminjaman; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaksi_peminjaman (id_transaksi, nim, tanggal_pinjam, tanggal_kembali, lama_pinjam) FROM stdin;
39	123-345-5678	2024-06-23	2024-06-28	5
40	123-345-5678	2024-06-16	2024-06-25	9
\.


--
-- Data for Name: transaksi_peminjaman_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaksi_peminjaman_detail (id_detail, id_transaksi, id_buku) FROM stdin;
21	39	14
22	39	4
23	40	6
\.


--
-- Name: history_peminjaman_id_history_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.history_peminjaman_id_history_seq', 22, true);


--
-- Name: master_buku_id_buku_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.master_buku_id_buku_seq', 14, true);


--
-- Name: rak_inventory_stok_buku_id_stok_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rak_inventory_stok_buku_id_stok_seq', 9, true);


--
-- Name: transaksi_peminjaman_detail_id_detail_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaksi_peminjaman_detail_id_detail_seq', 23, true);


--
-- Name: transaksi_peminjaman_id_transaksi_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaksi_peminjaman_id_transaksi_seq', 40, true);


--
-- Name: history_peminjaman history_peminjaman_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_peminjaman
    ADD CONSTRAINT history_peminjaman_pkey PRIMARY KEY (id_history);


--
-- Name: master_buku master_buku_isbn_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_buku
    ADD CONSTRAINT master_buku_isbn_key UNIQUE (isbn);


--
-- Name: master_buku master_buku_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_buku
    ADD CONSTRAINT master_buku_pkey PRIMARY KEY (id_buku);


--
-- Name: master_mahasiswa master_mahasiswa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_mahasiswa
    ADD CONSTRAINT master_mahasiswa_pkey PRIMARY KEY (nim);


--
-- Name: rak_inventory_stok_buku rak_inventory_stok_buku_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rak_inventory_stok_buku
    ADD CONSTRAINT rak_inventory_stok_buku_pkey PRIMARY KEY (id_stok);


--
-- Name: transaksi_peminjaman_detail transaksi_peminjaman_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_peminjaman_detail
    ADD CONSTRAINT transaksi_peminjaman_detail_pkey PRIMARY KEY (id_detail);


--
-- Name: transaksi_peminjaman transaksi_peminjaman_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_peminjaman
    ADD CONSTRAINT transaksi_peminjaman_pkey PRIMARY KEY (id_transaksi);


--
-- Name: history_peminjaman fk_history_peminjaman_buku; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_peminjaman
    ADD CONSTRAINT fk_history_peminjaman_buku FOREIGN KEY (id_buku) REFERENCES public.master_buku(id_buku);


--
-- Name: history_peminjaman fk_history_peminjaman_mahasiswa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_peminjaman
    ADD CONSTRAINT fk_history_peminjaman_mahasiswa FOREIGN KEY (nim) REFERENCES public.master_mahasiswa(nim);


--
-- Name: rak_inventory_stok_buku fk_rak_inventory_stok_buku_buku; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rak_inventory_stok_buku
    ADD CONSTRAINT fk_rak_inventory_stok_buku_buku FOREIGN KEY (id_buku) REFERENCES public.master_buku(id_buku);


--
-- Name: transaksi_peminjaman_detail fk_transaksi_peminjaman_detail_buku; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_peminjaman_detail
    ADD CONSTRAINT fk_transaksi_peminjaman_detail_buku FOREIGN KEY (id_buku) REFERENCES public.master_buku(id_buku);


--
-- Name: transaksi_peminjaman_detail fk_transaksi_peminjaman_detail_transaksi; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_peminjaman_detail
    ADD CONSTRAINT fk_transaksi_peminjaman_detail_transaksi FOREIGN KEY (id_transaksi) REFERENCES public.transaksi_peminjaman(id_transaksi);


--
-- Name: transaksi_peminjaman fk_transaksi_peminjaman_mahasiswa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaksi_peminjaman
    ADD CONSTRAINT fk_transaksi_peminjaman_mahasiswa FOREIGN KEY (nim) REFERENCES public.master_mahasiswa(nim);


--
-- PostgreSQL database dump complete
--

