import {FC, Fragment, useEffect, useState} from 'react'
import axios from 'axios'
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import {useNavigate} from 'react-router-dom'

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

export const DtSidangTipiring: FC<any> = ({
  data,
  kota,
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

  const [totalKegiatan, setTotalKegiatan] = useState([])
  useEffect(() => {
    const fetchDTSidangTipiring = async () => {
      const {data} = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=1&%24select=id%2C%20kegiatan__kota_id%2C%20kejadian__jenis_kejadian_id`
      )
      const res = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=${data.total_items}&%24select=id%2C%20kegiatan__kota_id%2C%20kegiatan__jenis_kegiatan_id`
      )
      setTotalKegiatan(res.data.data)
    }
    fetchDTSidangTipiring()
  }, [])
  // console.log(totalKegiatan)

  const GetPerJenis = ({row, jenis}: any) => {
    let countJumlah = 0
    if (row && !jenis) {
      countJumlah = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
    }
    if (row && jenis) {
      countJumlah = totalKegiatan.filter(
        (item: any) => item.kegaiatan__kota_id === row && item.kegiatan__jenis_kegiatan_id === jenis
      ).length
    }
    return <>{countJumlah}</>
  }

  var num = 1
  const columns = [
    {
      name: 'No',
      width: '80px',
      sortField: 'id',
      wrap: true,
      selector: (row: any) => row.no,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.no}</div>
      },
    },
    {
      name: 'Pelaksana Kegiatan',
      wrap: true,
      center: false,
      width: '300px',
      selector: (row: any) => row.pelaksana,
    },
    {
      name: 'Jumlah Penertiban',
      center: true,
      width: '300px',
      sortField: 'jumlah_penertiban',
      selector: (row: any) => row.jumlah_penertiban,
    },
    {
      name: 'Jumlah Pelanggar',
      center: true,
      width: '300px',
      selector: (row: any) => row.no,
      cell: (record: any) => <GetPerJenis row={record.no} />,
    },
    {
      name: 'Jumlah Pelanggar Tidak Hadir',
      center: true,
      width: '300px',
      sortField: 'jumlah_pelanggar_tidak_hadir',
      selector: (row: any) => row.jumlah_pelanggar_tidak_hadir,
    },
    {
      name: 'Verstek',
      center: true,
      width: '300px',
      sortField: 'verstek',
      selector: (row: any) => row.verstek,
    },
    {
      name: 'Denda',
      center: true,
      width: '300px',
      sortField: 'denda',
      selector: (row: any) => row.denda,
    },
  ]

  return (
    <div>
      <DataTable
        columns={columns}
        data={kota}
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

export const DtSidangTipiringPerda: FC<any> = ({
  data,
  kota,
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
  
  const [totalKegiatan, setTotalKegiatan] = useState([])
  useEffect(() => {
    const fetchDTSidangTipiring = async () => {
      const {data} = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=1&%24select=id%2C%20kegiatan__kota_id%2C%20kejadian__jenis_kejadian_id`
      )
      const res = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=${data.total_items}&%24select=id%2C%20kegiatan__kota_id%2C%20kegiatan__jenis_kegiatan_id`
      )
      setTotalKegiatan(res.data.data)
    }
    fetchDTSidangTipiring()
  }, [])
  // console.log(totalKegiatan)

  const GetPerJenis = ({row, jenis}: any) => {
    let countJumlah = 0
    if (row && !jenis) {
      countJumlah = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
    }
    if (row && jenis) {
      countJumlah = totalKegiatan.filter(
        (item: any) => item.kegaiatan__kota_id === row && item.kegiatan__jenis_kegiatan_id === jenis
      ).length
    }
    return <>{countJumlah}</>
  }

  var num = 1
  const columns = [
    {
      name: 'No',
      width: '80px',
      sortField: 'id',
      wrap: true,
      selector: (row: any) => row.serial,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.serial}</div>
      },
    },
    {
      name: 'Pelaksana Kegiatan',
      wrap: true,
      center: false,
      width: '300px',
      selector: (row: any) => row.pelaksana,
    },
    {
      name: 'Perda/Perkada Yang Dilanggar',
      center: true,
      width: '300px',
      sortField: 'perda_yang_dilanggar',
      selector: (row: any) => row.perda_yang_dilanggar,
    },
    {
      name: 'Jenis Tertib',
      center: true,
      width: '300px',
      sortField: 'jenis_tertib',
      selector: (row: any) => row.jenis_tertib,
    },
    {
      name: 'Jenis Pelanggaran',
      center: true,
      width: '300px',
      sortField: 'jenis_pelanggaran',
      selector: (row: any) => row.jenis_pelanggaran,
    },
    {
      name: 'Jenis Pasal',
      center: true,
      width: '300px',
      sortField: 'jenis_pasal',
      selector: (row: any) => row.jenis_pasal,
    },
    {
      name: 'Jenis Penertiban',
      center: true,
      width: '300px',
      sortField: 'jenis_penertiban',
      selector: (row: any) => row.jenis_penertiban,
    },
    {
      name: 'Jumlah Pelanggar',
      center: true,
      width: '300px',
      sortField: 'jumlah_pelanggar',
      selector: (row: any) => row.jumlah_pelanggar,
    },
    {
      name: 'Jumlah Pelanggar Tidak Hadir',
      center: true,
      width: '300px',
      sortField: 'jumlah_pelanggar_tidak_hadir',
      selector: (row: any) => row.jumlah_pelanggar_tidak_hadir,
    },
    {
      name: 'Verstek',
      center: true,
      width: '300px',
      sortField: 'verstek',
      selector: (row: any) => row.verstek,
    },
    {
      name: 'Hari dan Tangal Sidang',
      center: true,
      width: '300px',
      sortField: 'hari_tanggal_sidang',
      selector: (row: any) => row.hari_tanggal_sidang,
    },
  ]

  return (
    <div>
      <DataTable
        columns={columns}
        data={kota}
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
