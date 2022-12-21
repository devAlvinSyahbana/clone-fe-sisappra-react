import axios from 'axios'
import {Fragment, useEffect, useState} from 'react'
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../redux/store'
import PelaporanKegiatanState from '../../../redux/slices/pelaporan-kegiatan.slice'

export default function DtKabid(props: any) {
  const [data, setData] = useState([])

  const dataKegiatan = () => {
    axios.get(`http://localhost:3002/kegiatan-umum/`).then((res) => {
      const data = res.data.data.map((d: any) => ({
        no: d.id,
        pelaksana: d.created_by,
        tanggal_kegiatan: d.kegiatan__tanggal,
        waktu_mulai: d.kegiatan__jam_start,
        waktu_selesai: d.kegiatan__jam_end,
        jenis_kegiatan: d.kegiatan__jenis_kegiatan_id,
        uraian_kegiatan: d.kegiatan__uraian_kegiatan,
        // wilayah: d.kegiatan__wilayah,
        lokasi: d.kegiatan__lokasi,
      }))
      // .filter((v: any) => !excludeJenisKegiatan.includes(v.label))
      setData(data)
    })
  }

  useEffect(() => {
    dataKegiatan()
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
      name: 'Tanggal Kegiatan',
      width: '140px',
      selector: (row: any) => row.tanggal_kegiatan,
    },
    {
      name: 'Waktu Mulai',
      width: '140px',
      selector: (row: any) => row.waktu_mulai,
    },
    {
      name: 'Waktu Selesai',
      width: '140px',
      selector: (row: any) => row.waktu_selesai,
    },
    {
      name: 'Jenis Kegiatan',
      width: '140px',
      selector: (row: any) => row.jenis_kegiatan,
    },
    {
      name: 'Uraian Kegiatan',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Wilayah',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.wilayah,
    },
    {
      name: 'Lokasi',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.lokasi,
    },
  ]

  // const data = [
  //   {
  //     id: 1,
  //     no: '1',
  //     pelaksana: 'SEKSI KETENTERAMAN DAN KETERTIBAN UMUM DAN OPERASI',
  //     tanggal_kegiatan: '01/11/2022',
  //     waktu_kegiatan: '08:00 - 12:00',
  //     uraian_kegiatan: 'PATROLI',
  //     wilayah: 'Kota Administrasi Jakarta Pusat',
  //     lokasi: 'RW.3, Petojo Sel.Kecamatan Gambir, Kota Jakarta Pusat',
  //   },
  // ]

  return (
    <div>
      <DataTable columns={columns2} data={data} pagination />
    </div>
  )
}

export function DtAdmin(props: any) {
  const dispatch = useDispatch()
  const jenisKegiatanList = useSelector((s: RootState) => s.pelaporanKegiatan.list_jenis_kegiatan)
  const [data, setData] = useState([])

  console.log(jenisKegiatanList)

  const dataKegiatan = () => {
    axios.get(`http://localhost:3002/kegiatan-umum/`).then((res) => {
      const data = res.data.data.map((d: any) => ({
        no: d.id,
        pelaksana: d.created_by,
        tanggal_kegiatan: d.kegiatan__tanggal,
        waktu_mulai: d.kegiatan__jam_start,
        waktu_selesai: d.kegiatan__jam_end,
        jenis_kegiatan: d.kegiatan__jenis_kegiatan_id,
        uraian_kegiatan: d.kegiatan__uraian_kegiatan,
        // wilayah: d.kegiatan__wilayah,
        lokasi: d.kegiatan__lokasi,
      }))
      // .filter((v: any) => !excludeJenisKegiatan.includes(v.label))
      setData(data)
    })
  }

  useEffect(() => {
    dataKegiatan()
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
      name: 'Tanggal Kegiatan',
      width: '140px',
      selector: (row: any) => row.tanggal_kegiatan,
    },
    {
      name: 'Waktu Mulai',
      width: '140px',
      selector: (row: any) => row.waktu_mulai,
    },
    {
      name: 'Waktu Selesai',
      width: '140px',
      selector: (row: any) => row.waktu_selesai,
    },
    {
      name: 'Jenis Kegiatan',
      width: '140px',
      selector: (row: any) => row.jenis_kegiatan,
    },
    {
      name: 'Uraian Kegiatan',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Wilayah',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.wilayah,
    },
    {
      name: 'Lokasi',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.lokasi,
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
  //     pelaksana: 'SEKSI KETENTERAMAN DAN KETERTIBAN UMUM DAN OPERASI',
  //     tanggal_kegiatan: '01/11/2022',
  //     waktu_kegiatan: '08:00 - 12:00',
  //     jenis_kegiatan: 'PATROLI',
  //     uraian_kegiatan:
  //       'Melaksanakan Patroli wilayah, penjagaan dan menghimbau pedagang kaki lima agar tidak berjualan',
  //     wilayah: 'Kota Administrasi Jakarta Pusat',
  //     lokasi: 'RW.3, Petojo Sel.Kecamatan Gambir, Kota Jakarta Pusat',
  //   },
  // ]

  return (
    <div>
      <DataTable columns={columns2} data={data} pagination />
    </div>
  )
}

export function DtPimpinan(props: any) {
  const columns3 = [
    {
      name: 'No',
      width: '60px',
      selector: (row: any) => row.no,
    },
    {
      name: 'Pelaksana Bidang/Wilayah',
      wrap: true,
      selector: (row: any) => row.pelaksana,
    },
    {
      name: 'Peringatan',
      selector: (row: any) => row.tanggal_kegiatan,
    },
    {
      name: 'Penghalauan',
      selector: (row: any) => row.waktu_kegiatan,
    },
    {
      name: 'Teguran Tertulis',
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Penyegelan',
      selector: (row: any) => row.wilayah,
    },
    {
      name: 'Pembongkaran',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Ditertibkan',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Pemusnahan',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Penghentian Kegiatan Sementara 1x24jam',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Penghentian Kegiatan Sementara 3x24jam',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Penghentian Kegiatan Sementara 7x24jam',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Pencabutan Izin',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Pembekuan Sementara Izin',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Pembubaran',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Pengusiran',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Razia',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Penjemputan',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Penangkapan',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Penyitaan',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Pembersihan',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Pencopotan/Pelepasan/Pencabutan',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Penyidikan',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Kerja Sosial',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Denda Administratif',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Terbit Izin',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Dikembalikan',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Belum Ditertibkan',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Lain-lain',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Tidak Ditemukan Pelanggaran',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Pengadilan (Yustitusi)',
      selector: (row: any) => row.lokasi,
    },
    {
      name: 'Non Pengadilan (PPKM)',
      selector: (row: any) => row.lokasi,
    },
  ]

  const data = [
    {
      id: 1,
      no: '1',
      pelaksana: 'Kota Administrasi Jakarta Pusat',
      tanggal_kegiatan: '1',
      waktu_kegiatan: '1',
      uraian_kegiatan: '1',
      wilayah: '1',
      lokasi: '1',
    },
    {
      id: 2,
      no: '2',
      pelaksana: 'Kota Administrasi Jakarta Utara',
      tanggal_kegiatan: '1',
      waktu_kegiatan: '1',
      uraian_kegiatan: '1',
      wilayah: '1',
      lokasi: '1',
    },
    {
      id: 3,
      no: '3',
      pelaksana: 'Kota Administrasi Jakarta Barat',
      tanggal_kegiatan: '1',
      waktu_kegiatan: '1',
      uraian_kegiatan: '1',
      wilayah: '1',
      lokasi: '1',
    },
    {
      id: 4,
      no: '4',
      pelaksana: 'Kota Administrasi Jakarta Selatan',
      tanggal_kegiatan: '1',
      waktu_kegiatan: '1',
      uraian_kegiatan: '1',
      wilayah: '1',
      lokasi: '1',
    },
    {
      id: 5,
      no: '5',
      pelaksana: 'Kota Administrasi Jakarta Timur',
      tanggal_kegiatan: '1',
      waktu_kegiatan: '1',
      uraian_kegiatan: '1',
      wilayah: '1',
      lokasi: '1',
    },
    {
      id: 6,
      no: '6',
      pelaksana: 'Kabupaten Administrasi Kepulauan Seribu',
      tanggal_kegiatan: '1',
      waktu_kegiatan: '1',
      uraian_kegiatan: '1',
      wilayah: '1',
      lokasi: '1',
    },
  ]

  return (
    <div>
      <DataTable columns={columns3} data={data} pagination />
    </div>
  )
}
