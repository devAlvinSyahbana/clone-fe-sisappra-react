import axios from 'axios'
import {FC, Fragment, useEffect, useState} from 'react'
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'
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

const GetJenisKejadian = ({row}: {row: number}) => {
  const [valData, setValData] = useState('')
  useEffect(() => {
    async function fetchDT(id: number) {
      const {data} = await axios.get(
        `http://127.0.0.1:3001/jenis-kejadian/?%24filter=id%20eq%20${id}`
      )
      const result: string = data.data[0].nama
      setValData(result)
      // console.log(data)
    }
    fetchDT(row)
  }, [valData, row])

  return <>{valData}</>
}

export const DtKabid: FC<any> = ({
  data,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  hakAkses,
  wilayahBidang,
}) => {
  const GetHakAkses = ({row}: {row: number}) => {
    const handleHakAkses = hakAkses.find((i: any) => i.id === row)

    return <>{handleHakAkses?.nama_hak_akses}</>
  }
  const GetBidang = ({row}: {row: number}) => {
    const handleHakAkses = hakAkses.find((i: any) => i.id === row)
    const handleBidang = wilayahBidang.find((i: any) => i.id === handleHakAkses?.wilayah_bidang)

    // console.log(handleHakAkses?.wilayah_bidang, handleBidang?.nama)
    return <>{handleBidang?.nama}</>
  }

  const columns1 = [
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
      cell: (record: any) => <GetHakAkses row={parseInt(record.pelaksana)} />,
    },
    {
      name: 'Tanggal Kejadian',
      width: '140px',
      selector: (row: any) => row.tanggal_kejadian,
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
      name: 'Jenis Kejadian',
      width: '140px',
      selector: (row: any) => row.jenis_kejadian,
      cell: (record: any) => <GetJenisKejadian row={parseInt(record.jenis_kejadian)} />,
    },
    {
      name: 'Uraian Kejadian',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.uraian_kejadian,
    },
    {
      name: 'Wilayah',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.pelaksana,
      cell: (record: any) => <GetBidang row={parseInt(record.pelaksana)} />,
    },
    {
      name: 'Lokasi',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.lokasi,
    },
  ]

  return (
    <div>
      <DataTable columns={columns1} data={data} pagination />
    </div>
  )
}

export const DtAdmin: FC<any> = ({
  data,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  hakAkses,
  wilayahBidang,
}) => {
  const navigate = useNavigate()

  const GetHakAkses = ({row}: {row: number}) => {
    const handleHakAkses = hakAkses.find((i: any) => i.id === row)

    return <>{handleHakAkses?.nama_hak_akses}</>
  }
  const GetBidang = ({row}: {row: number}) => {
    const handleHakAkses = hakAkses.find((i: any) => i.id === row)
    const handleBidang = wilayahBidang.find((i: any) => i.id === handleHakAkses?.wilayah_bidang)

    // console.log(handleHakAkses?.wilayah_bidang, handleBidang?.nama)
    return <>{handleBidang?.nama}</>
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
      cell: (record: any) => <GetHakAkses row={parseInt(record.pelaksana)} />,
    },
    {
      name: 'Tanggal Kejadian',
      width: '140px',
      selector: (row: any) => row.tanggal_kejadian,
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
      name: 'Jenis Kejadian',
      width: '140px',
      selector: (row: any) => row.jenis_kejadian,
      cell: (record: any) => <GetJenisKejadian row={parseInt(record.jenis_kejadian)} />,
    },
    {
      name: 'Uraian Kejadian',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.uraian_kejadian,
    },
    {
      name: 'Wilayah',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.pelaksana,
      cell: (record: any) => <GetBidang row={parseInt(record.pelaksana)} />,
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
                    <Dropdown.Item
                      onClick={() => navigate('/pelaporan/DetailLaporanKejadian/' + record.id)}
                    >
                      Detail
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => navigate('/pelaporan/ubah-laporan-kejadian/' + record.id)}
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
      name: 'No',
      width: '60px',
      selector: (row: any) => row.no,
    },
    {
      name: 'Bidang/Wilayah',
      wrap: true,
      selector: (row: any) => row.bidang_wilayah,
    },
    {
      name: 'Jumlah Kejadian',
      selector: (row: any) => row.tanggal_kegiatan,
    },
    {
      name: 'Banjir',
      selector: (row: any) => row.waktu_kegiatan,
    },
    {
      name: 'Hewan Buas dan Berbisa',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Kebakaran',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Kecelakaan',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Pendampingan Kekerasan Pada Perempuan',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Kerusakan Konstruksi',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Kriminalitas',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Pembunuhan',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Penemuan Mayat',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Penyelamatan Orang',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Pohon Tumbang',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Tawuran',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Terorisme',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
    {
      name: 'Unjuk Rasa',
      wrap: true,
      selector: (row: any) => row.uraian_kegiatan,
    },
  ]

  const data = [
    {
      id: 1,
      no: '1',
      bidang_wilayah: 'Kota Administrasi Jakarta Pusat',
      tanggal_kegiatan: '12',
      waktu_kegiatan: '1',
      uraian_kegiatan: '1',
    },
    {
      id: 2,
      no: '2',
      bidang_wilayah: 'Kota Administrasi Jakarta Utara',
      tanggal_kegiatan: '12',
      waktu_kegiatan: '1',
      uraian_kegiatan: '1',
    },
    {
      id: 3,
      no: '3',
      bidang_wilayah: 'Kota Administrasi Jakarta Barat',
      tanggal_kegiatan: '12',
      waktu_kegiatan: '1',
      uraian_kegiatan: '1',
    },
    {
      id: 4,
      no: '4',
      bidang_wilayah: 'Kota Administrasi Jakarta Selatan',
      tanggal_kegiatan: '12',
      waktu_kegiatan: '1',
      uraian_kegiatan: '1',
    },
    {
      id: 5,
      no: '5',
      bidang_wilayah: 'Kota Administrasi Jakarta Timur',
      tanggal_kegiatan: '12',
      waktu_kegiatan: '1',
      uraian_kegiatan: '1',
    },
    {
      id: 6,
      no: '6',
      bidang_wilayah: 'Kabupaten Administrasi Kepulauan Seribu',
      tanggal_kegiatan: '12',
      waktu_kegiatan: '1',
      uraian_kegiatan: '1',
    },
  ]

  return (
    <div>
      <DataTable columns={columns3} data={data} pagination />
    </div>
  )
}
