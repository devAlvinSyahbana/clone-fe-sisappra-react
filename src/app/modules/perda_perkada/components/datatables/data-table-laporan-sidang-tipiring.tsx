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
  kota,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  theme,
}) => {
  const [totalKegiatan, setTotalKegiatan] = useState([])
  useEffect(() => {
    const fetchDTSidangTipiring = async () => {
      const {data} = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=kegiatan__jenis_kegiatan_id%20eq%20%2711%27&%24top=1&%24select=id`
      )
      const res = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=${data.total_items}&%24filter=kegiatan__jenis_kegiatan_id%20eq%20%2711%27&%24select=id%2Ckegiatan__kota_id%2C%20tindak_lanjut__sidang__jumlah_pelanggar_hadir%2C%20tindak_lanjut__sidang__jumlah_pelanggar_tidak_hadir%2C%20tindak_lanjut__sidang__jumlah_pelanggar_verstek%2Ctindak_lanjut__denda__pengadilan%2C%20tindak_lanjut__denda__non_pengadilan`
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
      const jumlah = totalKegiatan.filter(
        (item: any) => item.kegiatan__kota_id === row && item[jenis]
      )
      countJumlah = jumlah.reduce((acc, item) => acc + item[jenis], 0)
      // console.log(row, jenis, jumlah)
    }
    return <>{countJumlah}</>
  }

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
      name: 'Jumlah Pelanggar Hadir',
      center: true,
      width: '200px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__sidang__jumlah_pelanggar_hadir'} />
      ),
    },
    {
      name: 'Jumlah Pelanggar Tidak Hadir',
      center: true,
      width: '210px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis
          row={record.no}
          jenis={'tindak_lanjut__sidang__jumlah_pelanggar_tidak_hadir'}
        />
      ),
    },
    {
      name: 'Verstek',
      center: true,
      width: '100px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__sidang__jumlah_pelanggar_verstek'} />
      ),
    },
    {
      name: 'Denda Pengadilan',
      center: true,
      width: '300px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__denda__pengadilan'} />
      ),
    },
    {
      name: 'Denda Non Pengadilan',
      center: true,
      width: '300px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__denda__non_pengadilan'} />
      ),
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
  perdaPerkada,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  theme,
}) => {
  const [totalPerda, setTotalPerda] = useState([])
  useEffect(() => {
    const fetchDTTipiringPerda = async () => {
      const {data} = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=kegiatan__jenis_kegiatan_id%20eq%20%2711%27&%24top=1&%24select=id`
      )
      const res = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=kegiatan__jenis_kegiatan_id%20eq%20%2711%27&%24top=${data.total_items}&%24select=id%2C%20tindak_lanjut__administrasi__perda_perkada%2C%20tindak_lanjut__administrasi__jenis_penertiban%2C%20tindak_lanjut__administrasi__jenis_pasal_id%2C%20tindak_lanjut__sidang__jumlah_pelanggar_hadir%2C%20tindak_lanjut__sidang__jumlah_pelanggar_tidak_hadir%2C%20tindak_lanjut__sidang__jumlah_pelanggar_verstek%2C%20tindak_lanjut__denda__pengadilan%2C%20tindak_lanjut__denda__non_pengadilan`
      )
      setTotalPerda(res.data.data)
    }
    fetchDTTipiringPerda()
  }, [])
  console.log('Total', totalPerda)

  const GetPerJenis = ({row, jenis}: any) => {
    let countJumlah = 0
    if (row && !jenis) {
      countJumlah = totalPerda.filter(
        (item: any) => item.tindak_lanjut__administrasi__jenis_pasal_id === row
      ).length
    }
    if (row && jenis) {
      const jumlah = totalPerda.filter(
        (item: any) => item.tindak_lanjut__administrasi__jenis_pasal_id === row && item[jenis]
      )
      countJumlah = jumlah.reduce((acc, item) => acc + item[jenis], 0)
    }
    return <>{countJumlah}</>
  }

  const GetPerPenertiban = ({row, jenis}: any) => {
    let countJumlah = 0
    if (row && !jenis) {
      countJumlah = totalPerda.filter(
        (item: any) => item.tindak_lanjut__administrasi__jenis_penertiban === row
      ).length
    }
    if (row && jenis) {
      let jumlahJenis = 0
      for (let i = 0; i < jenis.length; i++) {
        jumlahJenis = totalPerda.filter(
          (item: any) =>
            item.tindak_lanjut__administrasi__jenis_penertiban === row &&
            item.tindak_lanjut__administrasi__jenis_pasal_id === jenis[i]
        ).length
        countJumlah += jumlahJenis
      }
    }
    return <>{countJumlah}</>
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
      name: 'Jenis Pasal',
      wrap: true,
      center: true,
      width: '200px',
      selector: (row: any) => row.pasal,
    },
    {
      name: 'Jenis Perda & Perkada',
      wrap: true,
      center: true,
      width: '250px',
      selector: (row: any) => row.perda,
    },
    {
      name: 'Jenis Penertiban',
      wrap: true,
      center: true,
      width: '200px',
      selector: (row: any) => row.penertiban,
    },
    {
      name: 'Jenis Pelanggaran',
      wrap: true,
      center: true,
      width: '300px',
      selector: (row: any) => row.pelanggaran,
    },
    {
      name: 'Jumlah Penertiban',
      center: true,
      width: '200px',
      selector: (row: any) => row.penertiban,
      cell: (record: any) => <GetPerPenertiban row={record.penertiban} />,
    },
    {
      name: 'Jumlah Pelanggar Hadir',
      center: true,
      width: '180px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__sidang__jumlah_pelanggar_hadir'} />
      ),
    },
    {
      name: 'Jumlah Pelanggar Tidak Hadir',
      center: true,
      width: '220px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis
          row={record.no}
          jenis={'tindak_lanjut__sidang__jumlah_pelanggar_tidak_hadir'}
        />
      ),
    },
    {
      name: 'Jumlah Pelanggar Verstek',
      center: true,
      width: '200px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__sidang__jumlah_pelanggar_verstek'} />
      ),
    },
    {
      name: 'Denda Pengadilan',
      center: true,
      width: '300px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__denda__pengadilan'} />
      ),
    },
    {
      name: 'Denda Non Pengadilan',
      center: true,
      width: '300px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__denda__non_pengadilan'} />
      ),
    },
  ]

  return (
    <div>
      <DataTable
        columns={columns}
        data={perdaPerkada}
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
