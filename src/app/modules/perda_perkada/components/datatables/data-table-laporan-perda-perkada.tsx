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
  totalKegiatan,
  setTotalKegiatan,
  penertiban,
  loading,
  theme,
  aksi,
}) => {

  useEffect(() => {
    const fetchDTPerdaPerkada = async () => {
      const { data } = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=1&%24select=id`
      )
      const res = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=${data.total_items}&%24select=id%2C%20tindak_lanjut__administrasi__penyelesaian_id%2C%20kegiatan__kota_id%2C%20tindak_lanjut__administrasi__jenis_penertiban%2C%20tindak_lanjut__denda__pengadilan%2C%20tindak_lanjut__denda__non_pengadilan%2C%20kegiatan__tanggal%2C%20kegiatan__jam_start%2C%20kegiatan__jam_end%2C%20kegiatan__uraian_kegiatan`
      )
      setTotalKegiatan(res.data.data)
    }
    fetchDTPerdaPerkada()
  }, [])

  const GetPerJenis = ({ row, jenis }: any) => {
    let countJumlah = 0
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

  const GetPerDenda = ({ row, jenis }: any) => {
    let totalDenda = 0
    if (row && !jenis) {
      totalDenda = totalKegiatan.filter((item: any) => item.tindak_lanjut__administrasi__jenis_penertiban === row).length
    }
    if (row && jenis) {
      const jumlah = totalKegiatan.filter(
        (item: any) => item.tindak_lanjut__administrasi__jenis_penertiban === row && item[jenis]
      )
      totalDenda = jumlah.reduce((acc: any, item: any) => acc + item[jenis], 0)
    }
    return <>{totalDenda}</>
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
      cell: (row: any) => {
        return (
          <>
            <a
              className='table table-hover mb-0'
              onClick={() => aksi(row.jenis_penertiban)}>{row.jenis_penertiban}</a>
          </>
        )
      },
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
      selector: (row: any) => row.jenis_penertiban,
      cell: (record: any) => (
        <GetPerDenda row={record.jenis_penertiban} jenis={'tindak_lanjut__denda__pengadilan'} />
      ),
    },
    {
      name: 'Denda Non Pengadilan',
      center: true,
      width: '200px',
      selector: (row: any) => row.jenis_penertiban,
      cell: (record: any) => (
        <GetPerDenda row={record.jenis_penertiban} jenis={'tindak_lanjut__denda__non_pengadilan'} />
      ),
    },
  ]

  return (
    <div>
      <DataTable
        pagination
        theme={theme}
        columns={columns}
        data={penertiban}
        progressPending={loading}
        progressComponent={<LoadingAnimation />}
      />
    </div>
  )
}

export const DtPerdaPerkadaPelaksana: FC<any> = ({
  kota,
  aksi,
  totalKegiatan,
  setTotalKegiatan,
  loading,
  theme,
}) => {

  useEffect(() => {
    const fetchDTPerdaPerkadaPelaksana = async () => {
      const { data } = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=1&%24select=id`
      )
      const res = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24top=${data.total_items}&%24select=id%2C%20kegiatan__kota_id%2C%20tindak_lanjut__administrasi__penyelesaian_id%2C%20tindak_lanjut__administrasi__jenis_penertiban%2C%20tindak_lanjut__denda__pengadilan%2C%20tindak_lanjut__denda__non_pengadilan%2C%20kegiatan__tanggal%2C%20kegiatan__jam_start%2C%20kegiatan__jam_end%2C%20kegiatan__uraian_kegiatan`
      )
      setTotalKegiatan(res.data.data)
    }
    fetchDTPerdaPerkadaPelaksana()
  }, [])

  const GetPerJenis = ({ row, jenis }: any) => {
    let countJumlah = 0
    if (row && !jenis) {
      countJumlah = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
    }
    if (row && jenis) {
      let jumlahJenis = 0
      for (let i = 0; i < jenis.length; i++) {
        jumlahJenis = totalKegiatan.filter(
          (item: any) => item.kegiatan__kota_id === row && item.tindak_lanjut__administrasi__penyelesaian_id === jenis[i]
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

  const GetPerDenda = ({ row, jenis }: any) => {
    let totalDenda = 0
    if (row && !jenis) {
      totalDenda = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
    }
    if (row && jenis) {
      const jumlah = totalKegiatan.filter(
        (item: any) => item.kegiatan__kota_id === row && item[jenis]
      )
      totalDenda = jumlah.reduce((acc: any, item: any) => acc + item[jenis], 0)
    }
    return <>{totalDenda}</>
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
      cell: (row: any) => {
        return (
          <>
            <a
              className='table table-hover mb-0'
              onClick={() => aksi(row.no)}>{row.pelaksana_kegiatan}</a>
          </>
        )
      },
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
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerDenda row={record.no} jenis={'tindak_lanjut__denda__pengadilan'} />
      ),
    },
    {
      name: 'Denda Non Pengadilan',
      center: true,
      width: '200px',
      selector: (row: any) => row.no,
      cell: (record: any) => (
        <GetPerDenda row={record.no} jenis={'tindak_lanjut__denda__non_pengadilan'} />
      ),
    },
  ]

  return (
    <div>
      <DataTable
        pagination
        data={kota}
        theme={theme}
        columns={columns}
        progressPending={loading}
        progressComponent={<LoadingAnimation />}
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
      name: 'Jenis Penertiban',
      wrap: true,
      center: true,
      width: '300px',
      selector: (row: any) => row.tindak_lanjut__administrasi__jenis_penertiban,
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
