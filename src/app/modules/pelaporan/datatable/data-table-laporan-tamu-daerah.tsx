import axios from 'axios'
import {Fragment, useEffect, useState} from 'react'
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux'
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

  const dataTamuDaerah = () => {
    axios.get(`http://localhost:3002/tamu-daerah/`).then((res) => {
      const data = res.data.data.map((d: any) => ({
        no: d.id,
        tanggal_kunjungan: d.tanggal_kunjungan,
        waktu_mulai_kunjungan: d.waktu_mulai_kunjungan,
        waktu_selesai_kunjungan: d.waktu_selesai_kunjungan,
        asal_instansi: d.asal_instansi,
        jumlah: d.jml_pengunjung,
        maksud_dan_tujuan: d.maksud_dan_tujuan,
        pejabat_penerima_kunjungan: d.pejabat_penerima_kunjungan,
        tempat_kunjungan: d.tempat_kunjungan,
      }))
      // .filter((v: any) => !excludeJenisKegiatan.includes(v.label))
      setData(data)
    })
  }

  useEffect(() => {
    dataTamuDaerah()
  }, [])

  const columns2 = [
    {
      name: 'No',
      width: '60px',
      selector: (row: any) => row.no,
    },
    {
      name: 'Tanggal Kunjungan',
      width: '140px',
      selector: (row: any) => row.tanggal_kunjungan,
    },
    {
      name: 'Waktu Mulai',
      width: '140px',
      selector: (row: any) => row.waktu_mulai_kunjungan,
    },
    {
      name: 'Waktu Selesai',
      width: '140px',
      selector: (row: any) => row.waktu_selesai_kunjungan,
    },
    {
      name: 'Asal Instansi',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.asal_instansi,
    },
    {
      name: 'Jumlah',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.jumlah,
    },
    {
      name: 'Maksud Tujuan',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.maksud_dan_tujuan,
    },
    {
      name: 'Pejabat Penerima Kunjungan',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.pejabat_penerima_kunjungan,
    },
    {
      name: 'Tempat Kunjungan',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.tempat_kunjungan,
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
                    <Dropdown.Item href='#'>Ubah</Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      // onClick={() => konfirDel(record.id, record.status_pegawai)}
                    >
                      Hapus
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
  //     tanggal_kunjungan: '01/11/2022',
  //     waktu_mulai: '08:00:00',
  //     waktu_selesai: '12:00:00',
  //     asal_instansi: 'Dinas Perhubungan',
  //     jumlah: '10',
  //     maksud_tujuan: 'Rapat',
  //     pejabat_penerima_kunjungan: 'Irwanto',
  //     tempat_kunjungan: 'Lantai 21',
  //   },
  // ]

  return (
    <div>
      <DataTable columns={columns2} data={data} pagination />
    </div>
  )
}

export function DtPimpinan(props: any) {
  const columns = [
    {
      name: 'No',
      selector: (row: {no: any}) => row.no,
    },
    {
      name: 'NRK',
      selector: (row: {nrk: any}) => row.nrk,
    },
    {
      name: 'Nama',
      selector: (row: {nama: any}) => row.nama,
    },
    {
      name: 'Tanggal Pengecekan',
      selector: (row: {tanggalpengecekan: any}) => row.tanggalpengecekan,
    },
    {
      name: 'Share Location',
      selector: (row: {shareloc: any}) => row.shareloc,
    },
    {
      name: 'Alamat',
      selector: (row: {alamat: any}) => row.alamat,
    },
    {
      name: 'Lokasi Tiang',
      selector: (row: {lokasitiang: any}) => row.lokasitiang,
    },
    {
      name: 'Kawasan Kendali',
      selector: (row: {kawasankendali: any}) => row.kawasankendali,
    },
    {
      name: 'Status',
      selector: (row: {status: any}) => row.status,
    },
    {
      name: 'Ukuran',
      selector: (row: {ukuran: any}) => row.ukuran,
    },
    {
      name: 'Pemilik Reklame',
      selector: (row: {pemilikreklame: any}) => row.pemilikreklame,
    },
    {
      name: 'Konstruksi Reklame',
      selector: (row: {konstruksireklame: any}) => row.konstruksireklame,
    },
    {
      name: 'Konten Iklan',
      selector: (row: {konteniklan: any}) => row.konteniklan,
    },
    {
      name: 'Dokumentasi',
      selector: (row: {docs: any}) => row.docs,
    },
    {
      name: 'Aksi',
      sortable: false,
      text: 'Action',
      className: 'action',
      align: 'left',
      cell: (record: any) => {
        return (
          <Fragment>
            <div className='mb-2'>
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
                    <Dropdown.Item href='/#/action-2'>Detail</Dropdown.Item>
                    <Dropdown.Item href='/#/action-2'>Ubah</Dropdown.Item>
                    <Dropdown.Item href='/#/action-2'>Hapus</Dropdown.Item>
                  </DropdownType>
                </>
              ))}
            </div>
          </Fragment>
        )
      },
    },
  ]

  const data = [
    {
      id: 1,
      no: '1',
      nrk: '166665',
      nama: 'Irwan Novyanto',
      tanggalpengecekan: '08-01-2021',
      shareloc: 'Lat: -6.1821440999999995, Long: 106.8284776',
      alamat:
        'Jalan Kebon Sirih 22, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
      lokasitiang: 'testibg',
      kawasankendali: 'Kendali Ketat',
      status: 'Aktif',
      ukuran: '6x10',
      pemilikreklame: 'a',
      konstruksireklame: 'a',
      konteniklan: 'a',
      docs: '',
    },
    {
      id: 2,
      no: '2',
      nrk: '166721',
      nama: 'Udi Hartono',
      tanggalpengecekan: '28-05-2021',
      shareloc: 'Lat: -6.1833066, Long: 106.8282431',
      alamat:
        'Jalan Kebon Sirih 77A, Kebon Sirih, Kecamatan Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
      lokasitiang: 'Balkot',
      kawasankendali: 'Ketat',
      status: 'Tidak',
      ukuran: '10x10',
      pemilikreklame: 'PT.a',
      konstruksireklame: 'PT.b',
      konteniklan: 'Sampo',
      docs: '',
    },
    {
      id: 3,
      no: '3',
      nrk: '166665',
      nama: 'Irwan Novyanto',
      tanggalpengecekan: '24-09-2021',
      shareloc: 'Lat: -6.346061, Long: 106.89405099999999',
      alamat:
        'Jalan Hankam Munjul 73, Munjul, Kecamatan Cipayung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta',
      lokasitiang: 'Menempel Gedung',
      kawasankendali: 'Sedang',
      status: 'Aktif',
      ukuran: '2x5',
      pemilikreklame: 'aaa',
      konstruksireklame: 'ads',
      konteniklan: 'Rokok',
      docs: '',
    },
    {
      id: 4,
      no: '4',
      nrk: '166665',
      nama: 'Irwan Novyanto',
      tanggalpengecekan: '24-01-2022',
      shareloc: 'Lat: -6.1820642, Long: 106.8284563',
      alamat:
        'Jalan Kebon Sirih No.22, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
      lokasitiang: 'Berdiri Sendiri',
      kawasankendali: 'Kendali Ketat',
      status: 'Aktif',
      ukuran: '4x6',
      pemilikreklame: 'aa',
      konstruksireklame: 'abc',
      konteniklan: 'Elektronik',
      docs: '',
    },
    {
      id: 5,
      no: '5',
      nrk: '166665',
      nama: 'Irwan Novyanto',
      tanggalpengecekan: '15-03-2022',
      shareloc: 'Lat: -6.1820642, Long: 106.8284563',
      alamat:
        'Jalan Kebon Sirih No.22, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
      lokasitiang: 'Berdiri Sendiri',
      kawasankendali: 'Ketat',
      status: 'Aktif',
      ukuran: '4x6',
      pemilikreklame: 'asik',
      konstruksireklame: 'PT.xxx',
      konteniklan: 'Sampo',
      docs: '',
    },
  ]

  return (
    <div>
      <DataTable columns={columns} data={data} pagination />
    </div>
  )
}
