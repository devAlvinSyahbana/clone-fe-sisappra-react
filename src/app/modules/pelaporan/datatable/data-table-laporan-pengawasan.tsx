import axios from 'axios'
import {Fragment, useEffect, useState} from 'react'
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {RootState} from '../../../redux/store'

export default function DtKabid(props: any) {
  const columns1 = [
    {
      name: 'No',
      width: '60px',
      selector: (row: any) => row.no,
    },
    {
      name: 'Pelaksana',
      selector: (row: any) => row.pelaksana,
    },
    {
      name: 'Tanggal Kegiatan',
      selector: (row: any) => row.tanggal_kegiatan,
    },
    {
      name: 'Waktu Kegiatan',
      selector: (row: any) => row.waktu_kegiatan,
    },
    {
      name: 'Uraian Kegiatan',
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Wilayah',
      selector: (row: any) => row.wilayah,
    },
    {
      name: 'Lokasi',
      selector: (row: any) => row.lokasi,
    },
  ]

  const data = [
    {
      id: 1,
      no: '1',
      pelaksana: 'SEKSI KETENTERAMAN DAN KETERTIBAN UMUM DAN OPERASI',
      tanggal_kegiatan: '01/11/2022',
      waktu_kegiatan: '08:00 - 12:00',
      uraian_kegiatan: 'PATROLI',
      wilayah: 'Kota Administrasi Jakarta Pusat',
      lokasi: 'RW.3, Petojo Sel.Kecamatan Gambir, Kota Jakarta Pusat',
    },
  ]

  return (
    <div>
      <DataTable columns={columns1} data={data} pagination />
    </div>
  )
}

export function DtAdmin(props: any) {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  const dataPengawasReklame = () => {
    axios.get(`http://localhost:3002/reklame/`).then((res) => {
      const data = res.data.data.map((d: any) => ({
        id: d.id,
        no: d.id,
        pelaksana: d.id,
        tanggal: d.tanggal_kunjungan,
        waktu_mulai: d.waktu_mulai_kunjungan,
        waktu_selesai: d.waktu_selesai_kunjungan,
        wilayah: d.asal_instansi,
        status: d.jml_pengunjung,
        pemilik_reklame: d.maksud_dan_tujuan,
      }))
      setData(data)
    })
  }

  useEffect(() => {
    dataPengawasReklame()
  }, [])

  const columns2 = [
    {
      name: 'No',
      width: '60px',
      selector: (row: any) => row.no,
    },
    {
      name: 'Pelaksana',
      wrap: true,
      width: '200px',
      selector: (row: any) => row.pelaksana,
    },
    {
      name: 'Tanggal',
      width: '140px',
      selector: (row: any) => row.tanggal_kegiatan,
    },
    {
      name: 'Waktu',
      width: '140px',
      selector: (row: any) => row.waktu_kegiatan,
    },
    {
      name: 'Wilayah',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.wilayah,
    },
    {
      name: 'Alamat',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.alamat,
    },
    {
      name: 'Status',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.status,
    },
    {
      name: 'Pemilik Reklame Konten Iklan',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.pemilik_reklame,
    },
    {
      name: 'Aksi',
      sortable: false,
      className: 'action',
      center: true,
      allowOverflow: true,
      fixed: true,
      cell: (record: any) => {
        return (
          <Fragment>
            <div className='d-flex mb-2 mt-2 flex-end'>
              {[DropdownButton].map((DropdownType, idx) => (
                <>
                  <DropdownType
                    as={ButtonGroup}
                    key={idx}
                    id={`dropdown-button-drop-${idx}`}
                    size='sm'
                    variant='light'
                    title='Aksi'
                  >
                    <Dropdown.Item href='#'>Detail</Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      // onClick={() => konfirDel(record.id, record.status_pegawai)}
                    >
                      Ubah
                    </Dropdown.Item>
                  </DropdownType>
                </>
              ))}
            </div>
          </Fragment>
        )
      },
    },
  ]

  // const data = [
  //   {
  //     id: 1,
  //     no: '1',
  //     pelaksana: 'SEKSI KETENTERAMAN DAN KETERTIBAN UMUM DAN OPERASI',
  //     tanggal_kegiatan: '01/11/2022',
  //     waktu_kegiatan: '08:00 - 12:00',
  //     wilayah: 'Kota Administrasi Jakarta Pusat',
  //     lokasi: 'RW.3, Petojo Sel.Kecamatan Gambir, Kota Jakarta Pusat',
  //     status: 'Aktif',
  //     pemilik_reklame: 'PT. Nestle Makanan Bayi',
  //   },
  // ]

  return (
    <div>
      <DataTable columns={columns2} data={data} pagination />
    </div>
  )
}

export function DtPimpinan(props: any) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  const dataPengawasReklame = () => {
    axios.get(`http://localhost:3002/reklame/`).then((res) => {
      const data = res.data.data.map((d: any) => ({
        no: d.id,
        pelaksana: d.id,
        status_reklame: d.status_reklame,
        pemilik_reklame: d.pemilik_reklame,
        alamat: d.alamat,
        tgl_pengecekan: d.tgl_pengecekan,
        lokasi_tiang: d.lokasi_tiang,
        share_location: d.share_location,
        ukuran: d.ukuran,
        konstruksi_reklame: d.konstruksi_reklame,
        konten_iklan: d.konten_iklan,
      }))
      setData(data)
    })
  }

  useEffect(() => {
    dataPengawasReklame()
  }, [])

  const columns = [
    {
      name: 'No',
      width: '60px',
      selector: (row: any) => row.no,
    },
    {
      name: 'Pelaksana',
      width: '140px',
      selector: (row: any) => row.id,
    },
    {
      name: 'Tanggal',
      width: '140px',
      selector: (row: any) => row.tgl_pengecekan,
    },
    {
      name: 'Share Location',
      width: '140px',
      selector: (row: any) => row.share_location,
    },
    {
      name: 'Alamat',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.alamat,
    },
    {
      name: 'Status',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.status_reklame,
    },
    {
      name: 'Ukuran',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.ukuran,
    },
    {
      name: 'Pemilik Reklame',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.pemilik_reklame,
    },
    {
      name: 'Konstruksi Reklame',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.konstruksi_reklame,
    },
    {
      name: 'Konten Iklan',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.konten_iklan,
    },
    {
      name: 'Aksi',
      sortable: false,
      className: 'action',
      center: true,
      allowOverflow: true,
      fixed: true,
      cell: (record: any) => {
        return (
          <Fragment>
            <div className='d-flex mb-2 mt-2 flex-end'>
              {[DropdownButton].map((DropdownType, idx) => (
                <>
                  <DropdownType
                    as={ButtonGroup}
                    key={idx}
                    id={`dropdown-button-drop-${idx}`}
                    size='sm'
                    variant='light'
                    title='Aksi'
                  >
                    <Dropdown.Item href='#'>Detail</Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => navigate('/pelaporan/ubah-laporan-pengawasan/' + record.id)}
                      // onClick={() => konfirDel(record.id, record.status_pegawai)}
                    >
                      Ubah
                    </Dropdown.Item>
                  </DropdownType>
                </>
              ))}
            </div>
          </Fragment>
        )
      },
    },
  ]

  return (
    <div>
      <DataTable columns={columns} data={data} pagination />
    </div>
  )
}
// export function DtPimpinan(props: any) {
//   const columns = [
//     {
//       name: 'No',
//       width: '60px',
//       selector: (row: {no: any}) => row.no,
//     },
//     {
//       name: 'Pelaksana',
//       selector: (row: any) => row.pelaksana,
//     },
//     {
//       name: 'Tanggal Pengecekan',
//       selector: (row: any) => row.tanggalpengecekan,
//     },
//     {
//       name: 'Share Location',
//       selector: (row: any) => row.shareloc,
//     },
//     {
//       name: 'Alamat',
//       selector: (row: any) => row.alamat,
//     },
//     {
//       name: 'Lokasi Tiang',
//       selector: (row: any) => row.lokasitiang,
//     },
//     {
//       name: 'Kawasan Kendali',
//       selector: (row: any) => row.kawasankendali,
//     },
//     {
//       name: 'Status',
//       selector: (row: any) => row.status,
//     },
//     {
//       name: 'Ukuran',
//       selector: (row: any) => row.ukuran,
//     },
//     {
//       name: 'Pemilik Reklame',
//       selector: (row: any) => row.pemilikreklame,
//     },
//     {
//       name: 'Konstruksi Reklame',
//       selector: (row: any) => row.konstruksireklame,
//     },
//     {
//       name: 'Konten Iklan',
//       selector: (row: any) => row.konteniklan,
//     },
//     // {
//     //   name: 'Dokumentasi',
//     //   selector: (row: {docs: any}) => row.docs,
//     // },
//     {
//       name: 'Aksi',
//       sortable: false,
//       text: 'Action',
//       className: 'action',
//       align: 'left',
//       cell: (record: any) => {
//         return (
//           <Fragment>
//             <div className='mb-2'>
//               <button>Detail</button>
//             </div>
//           </Fragment>
//         )
//       },
//     },
//   ]

//   const data = [
//     // {
//     //   id: 1,
//     //   no: '1',
//     //   // nrk: '166665',
//     //   // nama: 'Irwan Novyanto',
//     //   pelaksana: 'SEKSI KETENTERAMAN DAN KETERTIBAN UMUM DAN OPERASI',
//     //   tanggalpengecekan: '08-01-2021',
//     //   shareloc: 'Lat: -6.1821440999999995, Long: 106.8284776',
//     //   alamat:
//     //     'Jalan Kebon Sirih 22, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
//     //   lokasitiang: 'testibg',
//     //   kawasankendali: 'Kendali Ketat',
//     //   status: 'Aktif',
//     //   ukuran: '6x10',
//     //   pemilikreklame: 'a',
//     //   konstruksireklame: 'a',
//     //   konteniklan: 'a',
//     //   docs: '',
//     // },
//     {
//       id: 2,
//       no: '2',
//       // nrk: '166721',
//       // nama: 'Udi Hartono',
//       pelaksana: 'SEKSI PERLINDUNGAN MASYARAKAT',
//       tanggalpengecekan: '28-05-2021',
//       shareloc: 'Lat: -6.1833066, Long: 106.8282431',
//       alamat:
//         'Jalan Kebon Sirih 77A, Kebon Sirih, Kecamatan Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
//       lokasitiang: 'Balkot',
//       kawasankendali: 'Ketat',
//       status: 'Tidak',
//       ukuran: '10x10',
//       pemilikreklame: 'PT.a',
//       konstruksireklame: 'PT.b',
//       konteniklan: 'Sampo',
//       docs: '',
//     },
//     {
//       id: 3,
//       no: '3',
//       // nrk: '166665',
//       // nama: 'Irwan Novyanto',
//       pelaksana: 'SEKSI PPNS DAN PENINDAKAN',
//       tanggalpengecekan: '24-09-2021',
//       shareloc: 'Lat: -6.346061, Long: 106.89405099999999',
//       alamat:
//         'Jalan Hankam Munjul 73, Munjul, Kecamatan Cipayung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta',
//       lokasitiang: 'Menempel Gedung',
//       kawasankendali: 'Sedang',
//       status: 'Aktif',
//       ukuran: '2x5',
//       pemilikreklame: 'aaa',
//       konstruksireklame: 'ads',
//       konteniklan: 'Rokok',
//       docs: '',
//     },
//     {
//       id: 4,
//       no: '4',
//       // nrk: '166665',
//       // nama: 'Irwan Novyanto',
//       pelaksana: 'PENGELOLA KEAMANAN DAN KETERTIBAN SATPOL PP KECAMATAN SENEN',
//       tanggalpengecekan: '24-01-2022',
//       shareloc: 'Lat: -6.1820642, Long: 106.8284563',
//       alamat:
//         'Jalan Kebon Sirih No.22, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
//       lokasitiang: 'Berdiri Sendiri',
//       kawasankendali: 'Kendali Ketat',
//       status: 'Aktif',
//       ukuran: '4x6',
//       pemilikreklame: 'aa',
//       konstruksireklame: 'abc',
//       konteniklan: 'Elektronik',
//       docs: '',
//     },
//     {
//       id: 5,
//       no: '5',
//       // nrk: '166665',
//       // nama: 'Irwan Novyanto',
//       pelaksana: 'PETUGAS KEAMANAN SATPOL PP KECAMATAN TANAH ABANG',
//       tanggalpengecekan: '15-03-2022',
//       shareloc: 'Lat: -6.1820642, Long: 106.8284563',
//       alamat:
//         'Jalan Kebon Sirih No.22, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
//       lokasitiang: 'Berdiri Sendiri',
//       kawasankendali: 'Ketat',
//       status: 'Aktif',
//       ukuran: '4x6',
//       pemilikreklame: 'asik',
//       konstruksireklame: 'PT.xxx',
//       konteniklan: 'Sampo',
//       docs: '',
//     },
//   ]

//   return (
//     <div>
//       <DataTable columns={columns} data={data} pagination />
//     </div>
//   )
// }
