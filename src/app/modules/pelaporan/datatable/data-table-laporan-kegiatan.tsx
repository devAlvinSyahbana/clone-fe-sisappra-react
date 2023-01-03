import axios from 'axios'
import {FC, Fragment, useEffect, useState} from 'react'
import {ButtonGroup, Dropdown, DropdownButton, Table} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../redux/store'
import PelaporanKegiatanState from '../../../redux/slices/pelaporan-kegiatan.slice'
import {useNavigate} from 'react-router-dom'

const LoadingAnimation = (props: any) => {
  return (
    <>
      <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
        {/* <span className="svg-icon svg-icon-2hx svg-icon-primary me-3">...</span> */}
        <span className='spinner-border spinner-border-xl align-middle me-3'></span>
        <div className='d-flex flex-column'>
          <h5 className='mb-1'>Sedang mengambil data...</h5>
        </div>
      </div>
    </>
  )
}

export const DtKabid: FC<any> = ({
  data,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
}) => {
  const navigate = useNavigate()
  const GetJenisKegiatan = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(
          `http://127.0.0.1:3001/jenis-kegiatan/?%24filter=id%20eq%20${id}`
        )
        const result: string = data.data[0].nama
        setValData(result)
        // console.log(data)
      }
      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

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
      cell: (record: any) => <GetJenisKegiatan row={parseInt(record.jenis_kegiatan)} />,
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

export const DtAdmin: FC<any> = ({
  data,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
}) => {
  const navigate = useNavigate()
  const GetJenisKegiatan = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(
          `http://127.0.0.1:3001/jenis-kegiatan/?%24filter=id%20eq%20${id}`
        )
        const result: string = data.data[0].nama
        setValData(result)
        // console.log(data)
      }
      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

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
      cell: (record: any) => <GetJenisKegiatan row={parseInt(record.jenis_kegiatan)} />,
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
                    {/* <Dropdown.Item
                      onClick={() => navigate('/pelaporan/DetailLaporanKegiatan/' + record.id)}
                    >
                      Detail
                    </Dropdown.Item> */}
                    <Dropdown.Item
                      onClick={() => navigate('/pelaporan/UbahLaporanKegiatan/' + record.id)}
                    >
                      Ubah
                    </Dropdown.Item>
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

  return (
    <div>
      <DataTable
        columns={columns2}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        progressComponent={<LoadingAnimation />}
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </div>
  )
}

export function DtPimpinan(props: any) {
  const columns3 = [
    {
      name: '',
      width: '60px',
      selector: (row: any) => row.no,
    },
    {
      name: '',
      wrap: true,
      width: '200px',
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

  return <DataTable columns={columns3} data={data} pagination />
}
