import axios from 'axios'
import { FC, useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { string } from 'yup'

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

export const DtPerdaPerkada: FC<any> = ({
  data,
  aksi,
  totalRows,
  penertiban,
  handlePageChange,
  handlePerRowsChange,
  wilayahBidang,
  konfirDel,
  hakAkses,
  loading,
  theme,
}) => {

  const [totalKegiatan, setTotalKegiatan] = useState([])
  useEffect(() => {
    const fetchDTPimpinan = async () => {
      const { data } = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=1&%24select=id%2C%20tindak_lanjut__administrasi__penyelesaian_id%2C%20tindak_lanjut__administrasi__jenis_penertiban`
      )
      const res = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=${data.total_items}&%24select=id%2C%20tindak_lanjut__administrasi__penyelesaian_id%2C%20tindak_lanjut__administrasi__jenis_penertiban`
      )
      setTotalKegiatan(res.data.data)
    }
    fetchDTPimpinan()
  }, [])

  const GetPerJenis = ({ row, jenis }: any) => {
    let countJumlah = 0
    if (row === string && !jenis) {
      countJumlah = totalKegiatan.filter((item: any) => item.tindak_lanjut__administrasi__jenis_penertiban === row).length
    }
    if (row && jenis) {
      countJumlah = totalKegiatan.filter(
        (item: any) => item.tindak_lanjut__administrasi__jenis_penertiban === row && item.tindak_lanjut__administrasi__penyelesaian_id === jenis
      ).length
    }
    console.log('tes', GetPerJenis)
    return (
      <>
        {countJumlah}
      </>
    )
  }

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
      name: 'Jenis Penertiban',
      wrap: true,
      width: '300px',
      selector: (row: any) => row.jenis_penertiban,
    },
    {
      name: 'Jumlah Pelanggaran',
      center: true,
      width: '200px',
      selector: (row: any) => row.no,
      cell: (record: any) => <GetPerJenis row={record.no} />,
    },
    {
      name: 'Peringatan',
      center: true,
      width: '150px',
      selector: (row: any) => row.no,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={7} />,
    },
    {
      name: 'Penutupan/Penyegelan',
      center: true,
      width: '200px',
      sortField: 'penutupan_penyegelan',
      selector: (row: any) => row.penutupan_penyegelan,
    },
    {
      name: 'Pencabutan Izin',
      center: true,
      width: '150px',
      sortField: 'pencabutan_izin',
      selector: (row: any) => row.pencabutan_izin,
    },
    {
      name: 'Yang Lain',
      center: true,
      width: '150px',
      sortField: 'yang_lain',
      selector: (row: any) => row.yang_lain,
    },
    {
      name: 'Denda Pengadilan',
      center: true,
      width: '200px',
      sortField: 'denda_pengadilan',
      selector: (row: any) => row.denda_pengadilan,
    },
    {
      name: 'Denda Non Pengadilan',
      center: true,
      width: '200px',
      sortField: 'denda_non_pengadilan',
      selector: (row: any) => row.denda_non_pengadilan,
    },
  ]

  return (
    <div>
      <DataTable
        columns={columns}
        data={penertiban}
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

export const DtPerdaPerkadaPelaksana: FC<any> = ({
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
      width: '300px',
      center: true,
      selector: (row: any) => row.pelaksana,
      // cell: (record: any) => <GetHakAkses row={parseInt(record.pelaksana)} />,
    },
    {
      name: 'Jumlah Pelanggaran',
      center: true,
      width: '200px',
      sortField: 'jumlah_pelanggaran',
      selector: (row: any) => row.jumlah_pelanggaran,
    },
    {
      name: 'Peringatan',
      center: true,
      width: '150px',
      sortField: 'peringatan',
      selector: (row: any) => row.peringatan,
    },
    {
      name: 'Penutupan/Penyegelan',
      center: true,
      width: '200px',
      sortField: 'penutupan_penyegelan',
      selector: (row: any) => row.penutupan_penyegelan,
    },
    {
      name: 'Pencabutan Izin',
      center: true,
      width: '150px',
      sortField: 'pencabutan_izin',
      selector: (row: any) => row.pencabutan_izin,
    },
    {
      name: 'Yang Lain',
      center: true,
      width: '150px',
      sortField: 'yang_lain',
      selector: (row: any) => row.yang_lain,
    },
    {
      name: 'Yustisi',
      center: true,
      width: '200px',
      sortField: 'denda_pengadilan',
      selector: (row: any) => row.denda_pengadilan,
    },
    {
      name: 'Non Pengadilan',
      center: true,
      width: '200px',
      sortField: 'denda_non_pengadilan',
      selector: (row: any) => row.denda_non_pengadilan,
    },
  ]

  return (
    <div>
      <DataTable
        columns={columns}
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
