import axios from 'axios'
import { FC, Fragment, useEffect, useState } from 'react'
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

export const DtSidangTipiring: FC<any> = ({
  kota,
  aksi,
  totalKegiatan,
  setTotalKegiatan,
  loading,
  theme,
}) => {

  useEffect(() => {
    const fetchDTSidangTipiring = async () => {
      const { data } = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=kegiatan__jenis_kegiatan_id%20eq%20%2711%27&%24top=1&%24select=id`
      )
      const res = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=${data.total_items}&%24filter=kegiatan__jenis_kegiatan_id%20eq%20%2711%27&%24select=id%2Ckegiatan__kota_id%2C%20tindak_lanjut__administrasi__perda_perkada%2C%20tindak_lanjut__administrasi__jenis_penertiban%2C%20tindak_lanjut__administrasi__jenis_pasal_id%2C%20tindak_lanjut__administrasi__jenis_pelanggaran%2C%20tindak_lanjut__sidang__jumlah_pelanggar_hadir%2C%20tindak_lanjut__sidang__jumlah_pelanggar_tidak_hadir%2C%20tindak_lanjut__sidang__jumlah_pelanggar_verstek%2Ctindak_lanjut__denda__pengadilan%2C%20tindak_lanjut__denda__non_pengadilan%2C%20tindak_lanjut__administrasi__jenis_penertiban%2C%20kegiatan__tanggal%2C%20kegiatan__jam_start%2C%20kegiatan__jam_end%2C%20kegiatan__uraian_kegiatan`
      )
      setTotalKegiatan(res.data.data)
    }
    fetchDTSidangTipiring()
  }, [])

  const GetPerJenis = ({ row, jenis }: any) => {
    let countJumlah = 0
    if (row && !jenis) {
      countJumlah = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
    }
    if (row && jenis) {
      const jumlah = totalKegiatan.filter(
        (item: any) =>
          item.kegiatan__kota_id === row && item[jenis]
      )
      countJumlah = jumlah.reduce((acc: any, item: any) => acc + item[jenis], 0)
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
      cell: (row: any) => {
        return (
          <>
            <a
              className='table table-hover mb-0'
              onClick={() => aksi(row.no)}>{row.pelaksana}</a>
          </>
        )
      },
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
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__sidang__jumlah_pelanggar_tidak_hadir'} />
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
      width: '200px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__denda__pengadilan'} />
      ),
    },
    {
      name: 'Denda Non Pengadilan',
      center: true,
      width: '200px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__denda__non_pengadilan'} />
      ),
    },
  ]

  return (
    <div>
      <DataTable
        pagination
        data={kota}
        columns={columns}
        progressPending={loading}
        progressComponent={<LoadingAnimation />}
        theme={theme}
      />
    </div>
  )
}

export const DtSidangTipiringPasal: FC<any> = ({
  aksi,
  perdaPerkada,
  totalKegiatan,
  setTotalKegiatan,
  loading,
  theme,
}) => {

  useEffect(() => {
    const fetchDTTipiringPerda = async () => {
      const { data } = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=kegiatan__jenis_kegiatan_id%20eq%20%2711%27&%24top=1&%24select=id`
      )
      const res = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=kegiatan__jenis_kegiatan_id%20eq%20%2711%27&%24top=${data.total_items}&%24select=id%2C%20kegiatan__kota_id%2C%20tindak_lanjut__administrasi__perda_perkada%2C%20tindak_lanjut__administrasi__jenis_penertiban%2C%20tindak_lanjut__administrasi__jenis_pasal_id%2C%20tindak_lanjut__administrasi__jenis_pelanggaran%2C%20tindak_lanjut__sidang__jumlah_pelanggar_hadir%2C%20tindak_lanjut__sidang__jumlah_pelanggar_tidak_hadir%2C%20tindak_lanjut__sidang__jumlah_pelanggar_verstek%2C%20tindak_lanjut__denda__pengadilan%2C%20tindak_lanjut__denda__non_pengadilan%2C%20tindak_lanjut__administrasi__jenis_penertiban%2C%20kegiatan__tanggal%2C%20kegiatan__jam_start%2C%20kegiatan__jam_end%2C%20kegiatan__uraian_kegiatan`
      )
      setTotalKegiatan(res.data.data)
    }
    fetchDTTipiringPerda()
  }, [])

  const GetPerJenis = ({ row, jenis }: any) => {
    let countJumlah = 0
    if (row && !jenis) {
      countJumlah = totalKegiatan.filter((item: any) => item.tindak_lanjut__administrasi__jenis_pasal_id === row).length
    }
    if (row && jenis) {
      const jumlah = totalKegiatan.filter(
        (item: any) =>
          item.tindak_lanjut__administrasi__jenis_pasal_id === row && item[jenis]
      )
      countJumlah = jumlah.reduce((acc: any, item: any) => acc + item[jenis], 0)
    }
    return <>{countJumlah}</>
  }

  const GetPerPenertiban = ({ row, jenis }: any) => {
    let countJumlah = 0
    if (row && !jenis) {
      countJumlah = totalKegiatan.filter((item: any) => item.tindak_lanjut__administrasi__jenis_penertiban === row).length
    }
    if (row && jenis) {
      let jumlahJenis = 0
      for (let i = 0; i < jenis.length; i++) {
        jumlahJenis = totalKegiatan.filter(
          (item: any) => item.tindak_lanjut__administrasi__jenis_penertiban === row && item.tindak_lanjut__administrasi__jenis_pasal_id === jenis[i]
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
      name: 'Jenis Pasal',
      wrap: true,
      width: '200px',
      selector: (row: any) => row.pasal,
      cell: (row: any) => {
        return (
          <>
            <a
              className='table table-hover mb-0'
              onClick={() => aksi(row.no)}>{row.pasal}</a>
          </>
        )
      },
    },
    {
      name: 'Jenis Perda & Perkada',
      wrap: true,
      center: true,
      width: '200px',
      selector: (row: any) => row.perda,
      cell: (row: any) => {
        return (
          <>
            <a
              className='table table-hover mb-0'
              onClick={() => aksi(row.no)}>{row.perda}</a>
          </>
        )
      },
    },
    {
      name: 'Jenis Penertiban',
      wrap: true,
      width: '200px',
      selector: (row: any) => row.penertiban,
      cell: (row: any) => {
        return (
          <>
            <a
              className='table table-hover mb-0'
              onClick={() => aksi(row.no)}>{row.penertiban}</a>
          </>
        )
      },
    },
    {
      name: 'Jenis Pelanggaran',
      wrap: true,
      center: true,
      width: '300px',
      selector: (row: any) => row.pelanggaran,
      cell: (row: any) => {
        return (
          <>
            <a
              className='table table-hover mb-0'
              onClick={() => aksi(row.no)}>{row.pelanggaran}</a>
          </>
        )
      },
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
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__sidang__jumlah_pelanggar_tidak_hadir'} />
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
      width: '200px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__denda__pengadilan'} />
      ),
    },
    {
      name: 'Denda Non Pengadilan',
      center: true,
      width: '200px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerJenis row={record.no} jenis={'tindak_lanjut__denda__non_pengadilan'} />
      ),
    },
  ]

  return (
    <div>
      <DataTable
        pagination
        columns={columns}
        data={perdaPerkada}
        progressPending={loading}
        progressComponent={<LoadingAnimation />}
        theme={theme}
      />
    </div>
  )
}


export const DtDetail: FC<any> = ({
  data,
  loading,
  theme,
}) => {

  const GetKota = ({ row }: { row: number }) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const { data } = await axios.get(`${MASTERDATA_URL}/kota/?%24filter=id%20eq%20${id}`)
        const result: string = data.data[0].nama
        setValData(result)
      }
      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

  const GetPasal = ({ row }: { row: number }) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const { data } = await axios.get(`${MASTERDATA_URL}/jenis-perda-perkada/?%24filter=id%20eq%20${id}`)
        const result: string = data.data[0].pasal
        setValData(result)
      }
      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

  const columns = [
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
      name: 'Pelaksana Kegiatan',
      wrap: true,
      center: true,
      width: '300px',
      selector: (row: any) => row.kegiatan__kota_id,
      cell: (record: any) => <GetKota row={parseInt(record.kegiatan__kota_id)} />,
    },
    {
      name: 'Jenis Pasal',
      wrap: true,
      center: true,
      width: '200px',
      selector: (row: any) => row.tindak_lanjut__administrasi__jenis_pasal_id,
      cell: (record: any) => <GetPasal row={parseInt(record.tindak_lanjut__administrasi__jenis_pasal_id)} />,
    },
    {
      name: 'Jenis Penertiban',
      wrap: true,
      center: true,
      width: '200px',
      selector: (row: any) => row.tindak_lanjut__administrasi__jenis_penertiban,
    },
    {
      name: 'Jenis Pelanggaran',
      wrap: true,
      center: true,
      width: '400px',
      selector: (row: any) => row.tindak_lanjut__administrasi__jenis_pelanggaran,
    },
    {
      name: 'Pelanggar Hadir',
      wrap: true,
      center: true,
      width: '140px',
      selector: (row: any) => row.tindak_lanjut__sidang__jumlah_pelanggar_hadir,
    },
    {
      name: 'Pelanggar Tidak Hadir',
      wrap: true,
      center: true,
      width: '160px',
      selector: (row: any) => row.tindak_lanjut__sidang__jumlah_pelanggar_tidak_hadir,
    },
    {
      name: 'Pelanggar Verstek',
      wrap: true,
      center: true,
      width: '140px',
      selector: (row: any) => row.tindak_lanjut__sidang__jumlah_pelanggar_verstek,
    },
    {
      name: 'Denda Pengadilan',
      center: true,
      width: '200px',
      selector: (row: any) => row.tindak_lanjut__denda__pengadilan,
    },
    {
      name: 'Denda Non Pengadilan',
      center: true,
      width: '200px',
      selector: (row: any) => row.tindak_lanjut__denda__non_pengadilan,
    },
    {
      name: 'Tanggal Kegiatan',
      center: true,
      width: '140px',
      selector: (row: any) => row.kegiatan__tanggal,
    },
    {
      name: 'Waktu Mulai',
      center: true,
      width: '140px',
      selector: (row: any) => row.kegiatan__jam_start,
    },
    {
      name: 'Waktu Selesai',
      center: true,
      width: '140px',
      selector: (row: any) => row.kegiatan__jam_end,
    },
    {
      name: 'Uraian Kegiatan',
      width: '300px',
      wrap: true,
      selector: (row: any) => row.kegiatan__uraian_kegiatan,
    },
    {
      name: 'Wilayah',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.kegiatan__wilayah,
    },
  ]

  return (
    <div>
      <DataTable
        pagination
        data={data}
        columns={columns}
        progressComponent={<LoadingAnimation />}
        progressPending={loading}
        theme={theme}
      />
    </div>
  )
}
