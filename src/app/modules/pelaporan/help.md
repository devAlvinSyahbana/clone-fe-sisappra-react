# Dev Pelaporan

## Setup Dev Environment

**RUN `api-sisappra-fastify`**

Clone api-sisappra-fastify `git@gitlab.com:tsg-dev1/api-sisappra-fastify.git`
Open the repo folder then run in terminal/cmd `yarn` or `npm install`.

Create `.env` file then with content
```dotenv
PORT=3000
FASTIFY_ADDRESS=127.0.0.1
DB_URI=postgres://postgres:P@ssw0rd123!@167.71.208.184:5432/dbsisappra
```
Run `yarn dev` or `npm run dev`


**RUN masterdata-rest & pelporan-rest**

Clone `git@gitlab.com:tsg-dev1/sisappra-backend.git`
Open the repo folder then run in terminal/cmd `yarn` or `npm install`.

Then run `yarn dev:masterdata` or `npm run dev:masterdata`. Open other terminal then run `yarn dev:pelaporan` or `npm run dev:pelaporan`


**RUN Frontend**

Open in the terminal/cmd `fe-sisappra-react` folder.
Run with `yarn start` or `npm start`

- Open Menu `Pelaporan` => `Laporan Kegiatan`
- Access Tambah Laporan kegiatan from url `http://localhost:3011/pelaporan/TambahLaporanKegiatan`
- Working Directory for Pelaporan : `src/app/modules/pelaporan`
- Tambah Pelaporan Kegiatan component: `src/app/modules/pelaporan/pages/add-kegiatan-umum.page.tsx`
- List Laporan Kegiatan: `src/app/modules/pelaporan/pages/list-kegiatan.page.tsx`
