import axios from 'axios'
import {FC, Fragment, useEffect, useState} from 'react'
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../redux/store'
import PelaporanKegiatanState from '../../../redux/slices/pelaporan-kegiatan.slice'
import {KTSVG} from '../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {unparse} from 'papaparse'

export const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MASTERDATA_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL
export const PELAPORAN_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL

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

const unduhCSV = (data: any[]) => {
  const csvData = unparse(data)
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'LAPORAN KEGIATAN.csv')
  document.body.appendChild(link)
  link.click()
  link.remove()
}

// export const jenisKegiatanList = async () => {}

export const DtKabid: FC<any> = ({
  data,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  jenisKegiatanList,
  hakAkses,
  wilayahBidang,
  theme,
}) => {
  const navigate = useNavigate()
  const GetJenisKegiatan = ({row}: {row: number}) => {
    const jenisKegiatanLabel = jenisKegiatanList.find((i: any) => i.value === row)

    return <>{jenisKegiatanLabel?.text}</>
  }
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
      width: '80px',
      selector: (row: any) => row.serial,
      sortable: true,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.serial}</div>
      },
    },
    {
      name: 'Pelaksana',
      wrap: true,
      width: '200px',
      selector: (row: any) => row.pelaksana,
      cell: (record: any) => <GetHakAkses row={parseInt(record.pelaksana)} />,
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
      <button
        type='button'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
        style={{float: 'right', marginRight: '50px'}}
        className='btn btn-light-primary'
        onClick={() => unduhCSV(data)}>
          <>
          <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
            Unduh CSV
          </>
      </button>
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
        theme={theme}
      />
    </div>
  )
}

export const DtAdmin: FC<any> = ({
  data,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  jenisKegiatanList,
  hakAkses,
  wilayahBidang,
  konfirDel,
  theme,
}) => {
  const navigate = useNavigate()
  const GetJenisKegiatan = ({row}: {row: number}) => {
    // const [valData, setValData] = useState('')
    const jenisKegiatanLabel = jenisKegiatanList.find((i: any) => i.value === row)
    // useEffect(() => {
    //   async function fetchDT(id: number) {
    //     const {data} = await axios.get(
    //       `${MASTERDATA_URL}/jenis-kegiatan/?%24filter=id%20eq%20${id}`
    //     )
    //     const result: string = data.data[0].nama
    //     setValData(result)
    //     // console.log(data)
    //   }
    //   fetchDT(row)
    // }, [valData, row])

    return <>{jenisKegiatanLabel?.text}</>
  }

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
      width: '80px',
      selector: (row: any) => row.serial,
      sortable: true,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.serial}</div>
      },
    },
    {
      name: 'Pelaksana',
      wrap: true,
      width: '200px',
      selector: (row: any) => row.pelaksana,
      cell: (record: any) => <GetHakAkses row={parseInt(record.pelaksana)} />,
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
                <DropdownType
                  as={ButtonGroup}
                  key={idx}
                  id={`dropdown-button-drop-${idx}`}
                  size='sm'
                  variant='light'
                  title='Aksi'
                >
                  <Dropdown.Item
                    onClick={() => navigate('/pelaporan/DetailLaporanKegiatan/' + record.id)}
                  >
                    Detail
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate('/pelaporan/UbahLaporanKegiatan/' + record.id)}
                  >
                    Ubah
                  </Dropdown.Item>
                  <Dropdown.Item href='#' onClick={() => konfirDel(record.id)}>
                    Hapus
                  </Dropdown.Item>
                </DropdownType>
              ))}
            </div>
          </Fragment>
        )
      },
    },
  ]

  return (
    <div>
      <button
        type='button'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
        style={{float: 'right', marginRight: '50px'}}
        className='btn btn-light-primary'
        onClick={() => unduhCSV(data)}>
          <>
          <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
            Unduh CSV
          </>
      </button>
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
        theme={theme}
      />
    </div>
  )
}

export const DtPimpinan: FC<any> = ({
  data,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  jenisKegiatanList,
  hakAkses,
  wilayahBidang,
  theme,
}) => {
  // const [kota, setKota] = useState([])

  // const kotaList = async () => {
  //   const responseKota = await axios.get(`http://127.0.0.1:3000/master/bidang-wilayah/find`)
  //   const dataKota = responseKota.data.data.map((d: any) => ({
  //     id: d.id,
  //     no: d.id,
  //     pelaksana: d.nama,
  //   }))

  //   setKota(dataKota)
  //   // console.log(response.data.data)
  // }

  // useEffect(() => {
  //   kotaList()
  // }, [])

  const GetPerJenis = ({row, jenis}: any) => {
    const [valData, setValData] = useState(0)
    useEffect(() => {
      async function fetchDT(id: number, jk: number) {
        const {data} = await axios.get(
          `${PELAPORAN_URL}/kegiatan-umum/?%24filter=created_by%20eq%20%27${id}%27%20and%20tindak_lanjut__administrasi__penyelesaian_id%20eq%20${jk}`
        )
        const result = data.total_items
        console.log(result)
        setValData(result)
      }

      fetchDT(row, jenis)
    }, [])

    return <>{valData}</>
  }

  const GetPerJenisPenindakan = ({row, jenis}: any) => {
    const [valData, setValData] = useState(0)
    useEffect(() => {
      async function fetchDT(id: number, jk: number) {
        const {data} = await axios.get(
          `${PELAPORAN_URL}/kegiatan-umum/?%24filter=created_by%20eq%20%27${id}%27%20and%20tindak_lanjut__jenis_penindakan_id%20eq%20${jk}`
        )
        const result = data.total_items
        console.log(result)
        setValData(result)
      }

      fetchDT(row, jenis)
    }, [])

    return <>{valData}</>
  }

  // useEffect(){

  // }

  const GetJumlah = ({row}: any) => {
    const [valData, setValData] = useState(0)
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(
          `${PELAPORAN_URL}/kegiatan-umum/?%24filter=created_by%20eq%20%27${id}%27`
        )
        const result = data.total_items
        // console.log(result)
        setValData(result)
      }

      fetchDT(row)
    }, [])

    return (
      <>
        {valData}
        {/* <a onClick={() => jumlah(row)}>{valData}</a> */}
      </>
    )
  }

  const columns3 = [
    {
      name: 'No',
      width: '80px',
      selector: (row: any) => row.serial,
      sortable: true,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.serial}</div>
      },
    },
    {
      name: 'Bidang/Wilayah',
      wrap: true,
      width: '200px',
      sortable: true,
      selector: (row: any) => row.pelaksana,
      // cell: (record: any) => <GetJumlah row={record.no} />,
    },
    {
      name: 'Peringatan',
      selector: (row: any) => row.tanggal_kegiatan,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={27} />,
    },
    {
      name: 'Penghalauan',
      selector: (row: any) => row.waktu_kegiatan,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={17} />,
    },
    {
      name: 'Teguran Tertulis',
      selector: (row: any) => row.uraian_kegiatan,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={31} />,
    },
    {
      name: 'Penyegelan',
      selector: (row: any) => row.wilayah,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={24} />,
    },
    {
      name: 'Pembongkaran',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={10} />,
    },
    {
      name: 'Ditertibkan',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={5} />,
    },
    {
      name: 'Pemusnahan',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={13} />,
    },
    {
      name: 'Penghentian Kegiatan Sementara 1x24jam',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={19} />,
    },
    {
      name: 'Penghentian Kegiatan Sementara 3x24jam',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={20} />,
    },
    {
      name: 'Penghentian Kegiatan Sementara 7x24jam',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={21} />,
    },
    {
      name: 'Pencabutan Izin',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={15} />,
    },
    {
      name: 'Pembekuan Sementara Izin',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={8} />,
    },
    {
      name: 'Pembubaran',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={11} />,
    },
    {
      name: 'Pengusiran',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={22} />,
    },
    {
      name: 'Razia',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={29} />,
    },
    {
      name: 'Penjemputan',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={23} />,
    },
    {
      name: 'Penangkapan',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={14} />,
    },
    {
      name: 'Penyitaan',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={26} />,
    },
    {
      name: 'Pembersihan',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={9} />,
    },
    {
      name: 'Pencopotan/Pelepasan/Pencabutan',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={16} />,
    },
    {
      name: 'Penyidikan',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={25} />,
    },
    {
      name: 'Kerja Sosial',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={6} />,
    },
    {
      name: 'Denda Administratif',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={3} />,
    },
    {
      name: 'Terbit Izin',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={33} />,
    },
    {
      name: 'Dikembalikan',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={4} />,
    },
    {
      name: 'Belum Ditertibkan',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={36} />,
    },
    {
      name: 'Lain-lain',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={39} />,
    },
    {
      name: 'Tidak Ditemukan Pelanggaran',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={42} />,
    },
    {
      name: 'Pengadilan (Yustitusi)',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenisPenindakan row={record.no} jenis={1} />,
    },
    {
      name: 'Non Pengadilan (PPKM)',
      selector: (row: any) => row.lokasi,
      cell: (record: any) => <GetPerJenisPenindakan row={record.no} jenis={2} />,
    },
  ]

  // const data = [
  //   {
  //     id: 1,
  //     no: '1',
  //     pelaksana: 'Kota Administrasi Jakarta Pusat',
  //     tanggal_kegiatan: '1',
  //     waktu_kegiatan: '1',
  //     uraian_kegiatan: '1',
  //     wilayah: '1',
  //     lokasi: '1',
  //   },
  //   {
  //     id: 2,
  //     no: '2',
  //     pelaksana: 'Kota Administrasi Jakarta Utara',
  //     tanggal_kegiatan: '1',
  //     waktu_kegiatan: '1',
  //     uraian_kegiatan: '1',
  //     wilayah: '1',
  //     lokasi: '1',
  //   },
  //   {
  //     id: 3,
  //     no: '3',
  //     pelaksana: 'Kota Administrasi Jakarta Barat',
  //     tanggal_kegiatan: '1',
  //     waktu_kegiatan: '1',
  //     uraian_kegiatan: '1',
  //     wilayah: '1',
  //     lokasi: '1',
  //   },
  //   {
  //     id: 4,
  //     no: '4',
  //     pelaksana: 'Kota Administrasi Jakarta Selatan',
  //     tanggal_kegiatan: '1',
  //     waktu_kegiatan: '1',
  //     uraian_kegiatan: '1',
  //     wilayah: '1',
  //     lokasi: '1',
  //   },
  //   {
  //     id: 5,
  //     no: '5',
  //     pelaksana: 'Kota Administrasi Jakarta Timur',
  //     tanggal_kegiatan: '1',
  //     waktu_kegiatan: '1',
  //     uraian_kegiatan: '1',
  //     wilayah: '1',
  //     lokasi: '1',
  //   },
  //   {
  //     id: 6,
  //     no: '6',
  //     pelaksana: 'Kabupaten Administrasi Kepulauan Seribu',
  //     tanggal_kegiatan: '1',
  //     waktu_kegiatan: '1',
  //     uraian_kegiatan: '1',
  //     wilayah: '1',
  //     lokasi: '1',
  //   },
  // ]

  return(
    <div>
      <button
        type='button'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
        style={{float: 'right', marginRight: '50px'}}
        className='btn btn-light-primary'
        onClick={() => unduhCSV(data)}>
        <>
          <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
          Unduh CSV
        </>
      </button> 
      <DataTable columns={columns3} data={data} pagination />
  </div>
  )
}
