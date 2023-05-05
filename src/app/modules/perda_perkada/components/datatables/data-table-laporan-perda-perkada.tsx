import axios from 'axios'
import { FC, useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'

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
  totalRows,
  penertiban,
  handlePageChange,
  handlePerRowsChange,
  wilayahBidang,
  hakAkses,
  loading,
  theme,
}) => {

  const [totalKegiatan, setTotalKegiatan] = useState([])
  const [totalDendaPengadilan, setTotalDendaPengadilan] = useState([])
  const [totalDendaNonPengadilan, setTotalDendaNonPengadilan] = useState([])
  useEffect(() => {
    const fetchDTPerdaPerkada = async () => {
      const { data } = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=1&%24select=id%2C%20tindak_lanjut__administrasi__penyelesaian_id%2C%20tindak_lanjut__administrasi__jenis_penertiban`
      )
      const res = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=${data.total_items}&%24select=id%2C%20tindak_lanjut__administrasi__penyelesaian_id%2C%20tindak_lanjut__administrasi__jenis_penertiban`
      )
      // const { denda } = await axios.get(
      //   `${PELAPORAN_URL}/kegiatan-umum/?24top=1&%24select=id%2C%20tindak_lanjut__denda__pengadilan%2C%20tindak_lanjut__administrasi__jenis__penertiban`
      // )
      // const resDenda = await axios.get(
      //   `${PELAPORAN_URL}/kegiatan-umum/?24top=${denda.total_item}&%24select=id%2C%20tindak_lanjut__denda__pengadilan%2C%20tindak_lanjut__administrasi__jenis__penertiban`
      // )
      // setTotalDendaPengadilan(resDenda.data.data)
      setTotalKegiatan(res.data.data)
    }
    fetchDTPerdaPerkada()
  }, [])

  const GetPerJenis = ({ row, jenis }: any) => {
    let countJumlah = 0
    // console.log('row', row)
    // console.log('jenis', jenis)
    console.log('total',totalKegiatan)
    if (row && !jenis) {
      countJumlah = totalKegiatan.filter((item: any) => item.tindak_lanjut__administrasi__jenis_penertiban === row).length
    }
    if (row && jenis) {
      let jumlahJenis = 0
      for (let i = 0; i < jenis.length; i++) {
        jumlahJenis = totalKegiatan.filter(
          (item: any) => item.tindak_lanjut__administrasi__jenis_penertiban === row && item.tindak_lanjut__administrasi__penyelesaian_id === jenis[i]
        ).length;
        countJumlah += jumlahJenis
      }
    }
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
      selector: (row: any) => row.jenis_penertiban,
      cell: (record: any) => <GetPerJenis row={record.jenis_penertiban} />,
    },
    {
      name: 'Peringatan',
      center: true,
      width: '150px',
      selector: (row: any) => row.jenis_penertiban,
      cell: (record: any) => <GetPerJenis row={record.jenis_penertiban} jenis={[6, 11, 12, 22, 27, 28, 30, 32, 35, 37, 40]} />,
    },
      {
        name: 'Penutupan/Penyegelan',
        center: true,
        width: '200px',
        selector: (row: any) => row.jenis_penertiban,
        cell: (record: any) => <GetPerJenis row={record.jenis_penertiban} jenis={[2, 3, 10, 13, 14, 18, 19, 20, 21, 24]} />,
      },
      {
        name: 'Pencabutan Izin',
        center: true,
        width: '150px',
        selector: (row: any) => row.jenis_penertiban,
        cell: (record: any) => <GetPerJenis row={record.jenis_penertiban} jenis={[8, 15, 16, 38]} />,
      },
      {
        name: 'Yang Lain',
        center: true,
        width: '150px',
        selector: (row: any) => row.jenis_penertiban,
        cell: (record: any) => <GetPerJenis row={record.jenis_penertiban} jenis={[1, 4, 5, 7, 9, 17, 23, 25, 26, 29, 32, 33, 34, 36, 39, 41, 42, 43]} />,
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

  // console.log('penertiban', penertiban)
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
  kota,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  theme,
}) => {

  const [totalKegiatan, setTotalKegiatan] = useState([])
  useEffect(() => {
    const fetchDTPerdaPerkadaPelaksana = async () => {
      const { data } = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=1&%24select=id%2C%20kegiatan__kota_id%2C%20kegiatan__jenis_kegiatan_id`
      )
      const res = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=${data.total_items}&%24select=id%2C%20kegiatan__kota_id%2C%20kegiatan__jenis_kegiatan_id`
      )
      setTotalKegiatan(res.data.data)
    }
    fetchDTPerdaPerkadaPelaksana()
  }, [])

  const GetPerJenis = ({ row, jenis }: any) => {
    console.log('row', row)
    console.log('jenis', jenis)
    console.log('total',totalKegiatan)
    let countJumlah = 0
    if (row && !jenis) {
      countJumlah = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
    }
    if (row && jenis) {
      let jumlahJenis = 0
      for (let i = 0; i < jenis.length; i++) {
        jumlahJenis = totalKegiatan.filter(
          (item: any) => item.kegiatan__kota_id === row && item.kegiatan__jenis_kegiatan_id === jenis[i]
        ).length;
        countJumlah += jumlahJenis
      }
    }
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
      name: 'Pelaksana Kegiatan',
      wrap: true,
      width: '300px',
      center: true,
      selector: (row: any) => row.pelaksana_kegiatan,
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
      cell: (record: any) => <GetPerJenis row={record.no} jenis={[6, 11, 12, 22, 27, 28, 30, 32, 35, 37, 40]} />,
    },
      {
        name: 'Penutupan/Penyegelan',
        center: true,
        width: '200px',
        selector: (row: any) => row.no,
        cell: (record: any) => <GetPerJenis row={record.no} jenis={[2, 3, 10, 13, 14, 18, 19, 20, 21, 24]} />,
      },
      {
        name: 'Pencabutan Izin',
        center: true,
        width: '150px',
        selector: (row: any) => row.no,
        cell: (record: any) => <GetPerJenis row={record.no} jenis={[8, 15, 16, 38]} />,
      },
      {
        name: 'Yang Lain',
        center: true,
        width: '150px',
        selector: (row: any) => row.no,
        cell: (record: any) => <GetPerJenis row={record.no} jenis={[1, 4, 5, 7, 9, 17, 23, 25, 26, 29, 32, 33, 34, 36, 39, 41, 42, 43]} />,
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
