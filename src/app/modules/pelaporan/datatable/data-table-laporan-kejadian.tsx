import axios from 'axios'
import {FC, Fragment, useEffect, useMemo, useState} from 'react'
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../redux/store'
import PelaporanKegiatanState from '../../../redux/slices/pelaporan-kegiatan.slice'
import {useNavigate} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'

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

const Export = ({onExport}: {onExport: () => void}) => (
  <button
    type='button'
    className='btn btn-light-primary'
    data-kt-menu-trigger='click'
    data-kt-menu-placement='bottom-end'
    onClick={() => onExport()}
  >
    <>
      <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
      Unduh CSV
    </>
    {/* )} */}
  </button>
)

const GetJenisKejadian = ({row}: {row: number}) => {
  const [valData, setValData] = useState('')
  useEffect(() => {
    async function fetchDT(id: number) {
      const {data} = await axios.get(`${MASTERDATA_URL}/jenis-kejadian/?%24filter=id%20eq%20${id}`)
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
  theme,
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
      <DataTable
        columns={columns1}
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
  hakAkses,
  wilayahBidang,
  konfirDel,
  theme,
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
  // console.log(GetHakAkses, GetBidang)

  const convertArrayOfObjectsToCSV = (array: any) => {
    let result: any

    const columnDelimiter = '|'
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach((item: any) => {
      let ctr = 0
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]
        // eslint-disable-next-line no-plusplus
        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  const downloadCSV = (array: any) => {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv == null) return

    const filename = 'Laporan Kejadian.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(data)} />, [])

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
        actions={actionsMemo}
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

export const DtPimpinan: FC<any> = ({aksi, jumlah, theme, kota, pelaporanUrl}) => {
  // const [kota, setKota] = useState([])

  // const kotaList = async () => {
  //   const responseKota = await axios.get(`${MASTERDATA_URL}/kota/`)
  //   // const handleHakAkses = responsesKota.data.data.find((i: any) => i.id === row)
  //   console.log(responseKota)
  //   const dataKota = responseKota.data.data.map((d: any) => ({
  //     id: d.id,
  //     no: d.id,
  //     bidang_wilayah: d.nama,
  //   }))

  //   setKota(dataKota)
  //   // console.log(response.data.data)
  // }

  // useEffect(() => {
  //   kotaList()
  //   console.log(kotaList)
  // }, [])

  // const GetKota = ({row}: {row: number}) => {
  //   const handleKota = valKota.data.data.find((i: any) => i.id === row)

  //   return <>{handleKota?.nama}</>
  // }

  const GetJumlah = ({row}: any) => {
    const [valData, setValData] = useState(0)
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(
          `${PELAPORAN_URL}/kejadian-umum/?%24filter=kejadian__kota_id%20eq%20${id}`
        )
        const result = data.total_items
        // console.log(result)
        setValData(result)
      }

      fetchDT(row)
    }, [])

    return (
      <>
        <a onClick={() => jumlah(row)}>{valData}</a>
      </>
    )
  }

  // console.log(totalRows)

  const [totalKejadian, setTotalKejadian] = useState([])
  useEffect(() => {
    const fetchDTPimpinan = async () => {
      const {data} = await axios.get(
        `${pelaporanUrl}/kejadian-umum/?%24top=1&%24select=id%2C%20kejadian__kota_id%2C%20kejadian__jenis_kejadian_id`
      )
      const res = await axios.get(
        `${pelaporanUrl}/kejadian-umum/?%24top=${data.total_items}&%24select=id%2C%20kejadian__kota_id%2C%20kejadian__jenis_kejadian_id`
      )
      setTotalKejadian(res.data.data)
    }
    fetchDTPimpinan()
  }, [])
  // console.log(totalKejadian)

  const GetPerJenis = ({row, jenis}: any) => {
    let countJumlah = 0
    if (row && !jenis) {
      countJumlah = totalKejadian.filter((item: any) => item.kejadian__kota_id === row).length
    }
    if (row && jenis) {
      countJumlah = totalKejadian.filter(
        (item: any) => item.kejadian__kota_id === row && item.kejadian__jenis_kejadian_id === jenis
      ).length
    }
    return (
      <>
        <a onClick={() => aksi(jenis, row)}>{countJumlah}</a>
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
      name: 'Kota',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.bidang_wilayah,
      // cell: (record: any) => <GetKota row={record.id} />,
    },
    {
      name: 'Jumlah Kejadian',
      selector: (row: any) => row.no,
      cell: (record: any) => <GetPerJenis row={record.no} />,
    },
    {
      name: 'Banjir',
      selector: (row: any) => row.banjir,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={1} />,
    },
    {
      name: 'Hewan Buas dan Berbisa',
      wrap: true,
      selector: (row: any) => row.hewan,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={2} />,
    },
    {
      name: 'Kebakaran',
      wrap: true,
      selector: (row: any) => row.kebakaran,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={3} />,
    },
    {
      name: 'Kecelakaan',
      wrap: true,
      selector: (row: any) => row.kecelakaan,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={4} />,
    },
    {
      name: 'Pendampingan Kekerasan Pada Perempuan',
      wrap: true,
      selector: (row: any) => row.pendampingan_perempuan,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={5} />,
    },
    {
      name: 'Kerusakan Konstruksi',
      wrap: true,
      selector: (row: any) => row.kerusakan_konstruksi,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={6} />,
    },
    {
      name: 'Kriminalitas',
      wrap: true,
      selector: (row: any) => row.kriminalitas,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={7} />,
    },
    {
      name: 'Pembunuhan',
      wrap: true,
      selector: (row: any) => row.pembunuhan,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={8} />,
    },
    {
      name: 'Penemuan Mayat',
      wrap: true,
      selector: (row: any) => row.penemuan,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={9} />,
    },
    {
      name: 'Penyelamatan Orang',
      wrap: true,
      selector: (row: any) => row.penyelamatan,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={10} />,
    },
    {
      name: 'Pohon Tumbang',
      wrap: true,
      selector: (row: any) => row.pohon,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={11} />,
    },
    {
      name: 'Tawuran',
      wrap: true,
      selector: (row: any) => row.tawuran,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={12} />,
    },
    {
      name: 'Terorisme',
      wrap: true,
      selector: (row: any) => row.terorisme,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={13} />,
    },
    {
      name: 'Unjuk Rasa',
      wrap: true,
      selector: (row: any) => row.unjuk_rasa,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={14} />,
    },
  ]

  return (
    <div>
      <DataTable columns={columns3} data={kota} pagination theme={theme} />
    </div>
  )
}