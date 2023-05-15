import {FC, Fragment, useEffect, useState} from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import {useTable, Column} from 'react-table'

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

export const DtMinol: FC<any> = ({
  kota,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  theme,
}) => {

  const [totalKegiatan, setTotalKegiatan] = useState<any>([])
  useEffect(() => {
    const fetchDTMinol = async () => {
      const {data} = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=kegiatan__jenis_kegiatan_id%20eq%20%2716%27&%24top=1&%24select=tindak_lanjut__jumlah_minol_merk%2C%20id`
      )
      const res = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=kegiatan__jenis_kegiatan_id%20eq%20%2716%27&%24top=${data.total_items}&%24select=kegiatan__kota_id%2C%20tindak_lanjut__jumlah_minol_merk%2C%20id`
      )
      setTotalKegiatan(res.data.data)
    }
    fetchDTMinol()
  }, [])
  console.log(totalKegiatan)

  const GetPerJenis = ({row, jenis}: any) => {
    let countJumlah = 0
    const merkTertentu = [
      'wine',
      'bir',
      'sake',
      'gin',
      'tequila',
      'brandy',
      'whisky',
      'vodka',
      'rum',
      'soju',
      'anggur',
      'absinthe',
    ]
    const jumlah = totalKegiatan.filter(
      (item: any) =>
        item.kegiatan__kota_id === row && item.tindak_lanjut__jumlah_minol_merk?.length > 0
    )
    const jumlah_item: any = {}

    jumlah?.forEach((item: any) => {
      item.tindak_lanjut__jumlah_minol_merk?.forEach((minol: any) => {
        const merk = minol.merk.toLowerCase()
        const jumlah = minol.jumlah
        if (jumlah_item[merk]) {
          jumlah_item[merk] += jumlah
        } else {
          jumlah_item[merk] = jumlah
        }
      })
    })
    // if pertama 
    if (row && !jenis) {
      for (const merk in jumlah_item) {
        if (jumlah_item.hasOwnProperty(merk)) {
          countJumlah += jumlah_item[merk]
        }
      }
    }
    // If kedua
    if (row && jumlah_item[jenis?.toLowerCase()]) {
      countJumlah = jumlah_item[jenis?.toLowerCase()]
    }
    // if ketiga
    if (row && jenis === 'Lainnya') {
      for (const merk in jumlah_item) {
        if (jumlah_item.hasOwnProperty(merk) && !merkTertentu.includes(merk)) {
          countJumlah += jumlah_item[merk]
        }
      }
    }
    //  for loop
    console.log(jumlah_item)
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
      name: 'Pelaksana Kegiatan',
      wrap: true,
      width: '300px',
      selector: (row: any) => row.pelaksana,
    },
    {
      name: 'Jumlah Minol',
      center: true,
      width: '150px',
      sortField: 'jumlah_minol',
      selector: (row: any) => row.jumlah_minol,
      cell: (record: any) => <GetPerJenis row={record.no} />,
    },
    {
      name: 'Wine',
      center: true,
      width: '100px',
      sortField: 'wine',
      selector: (row: any) => row.wine,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={'Wine'} />,
    },
    {
      name: 'Bir',
      center: true,
      width: '100px',
      sortField: 'bir',
      selector: (row: any) => row.bir,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={'Bir'} />,
    },
    {
      name: 'Sake',
      center: true,
      width: '100px',
      sortField: 'sake',
      selector: (row: any) => row.sake,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={'Sake'} />,
    },
    {
      name: 'Gin',
      center: true,
      width: '100px',
      sortField: 'gin',
      selector: (row: any) => row.gin,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={'Gin'} />,
    },
    {
      name: 'Tequila',
      center: true,
      width: '100px',
      sortField: 'tequila',
      selector: (row: any) => row.tequila,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={'Tequila'} />,
    },
    {
      name: 'Brandy',
      center: true,
      width: '100px',
      sortField: 'brandy',
      selector: (row: any) => row.brandy,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={'Brandy'} />,
    },
    {
      name: 'Wiski',
      center: true,
      width: '100px',
      sortField: 'wiski',
      selector: (row: any) => row.wiski,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={'Wiski'} />,
    },
    {
      name: 'Vodka',
      center: true,
      width: '100px',
      sortField: 'vodka',
      selector: (row: any) => row.vodka,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={'Vodka'} />,
    },
    {
      name: 'Rum',
      center: true,
      width: '100px',
      sortField: 'rum',
      selector: (row: any) => row.rum,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={'Rum'} />,
    },
    {
      name: 'Soju',
      center: true,
      width: '100px',
      sortField: 'soju',
      selector: (row: any) => row.soju,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={'Soju'} />,
    },
    {
      name: 'Anggur',
      center: true,
      width: '100px',
      sortField: 'anggur',
      selector: (row: any) => row.anggur,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={'Anggur'} />,
    },
    {
      name: 'Absinth',
      center: true,
      width: '100px',
      sortField: 'absinth',
      selector: (row: any) => row.absinth,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={'Absinth'} />,
    },
    {
      name: 'Lainnya',
      center: true,
      width: '100px',
      sortField: 'lainnya',
      selector: (row: any) => row.lainnya,
      cell: (record: any) => <GetPerJenis row={record.no} jenis={'Lainnya'} />,
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

export const DtMinolPelanggaran: FC<any> = ({
  pelanggaran,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  theme,
}) => {
  const [totalKegiatan, setTotalKegiatan] = useState<any>([])
  useEffect(() => {
    const fetchDTMinol = async () => {
      const {data} = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=kegiatan__jenis_kegiatan_id%20eq%20%2716%27&%24top=1&%24select=tindak_lanjut__administrasi__jenis_pelanggaran%2C%20tindak_lanjut__jumlah_minol_merk%2C%20id`
      )
      const res = await axios.get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=kegiatan__jenis_kegiatan_id%20eq%20%2716%27&%24top=${data.total_items}&%24select=tindak_lanjut__administrasi__jenis_pelanggaran%2C%20tindak_lanjut__jumlah_minol_merk%2C%20id`
      )
      setTotalKegiatan(res.data.data)
    }
    fetchDTMinol()
  }, [])
  console.log(totalKegiatan)

  const GetPerJenis = ({row, jenis}: any) => {
    let countJumlah = 0
    const merkTertentu = [
      'wine',
      'bir',
      'sake',
      'gin',
      'tequila',
      'brandy',
      'whisky',
      'vodka',
      'rum',
      'soju',
      'anggur',
      'absinthe',
    ]
    const jumlah = totalKegiatan.filter(
      (item: any) =>
        item.tindak_lanjut__administrasi__jenis_pelanggaran === row && item.tindak_lanjut__jumlah_minol_merk?.length > 0
    )
    const jumlah_item: any = {}

    jumlah?.forEach((item: any) => {
      item.tindak_lanjut__jumlah_minol_merk?.forEach((minol: any) => {
        const merk = minol.merk.toLowerCase()
        const jumlah = minol.jumlah
        if (jumlah_item[merk]) {
          jumlah_item[merk] += jumlah
        } else {
          jumlah_item[merk] = jumlah
        }
      })
    })
    // if pertama
    if (row && !jenis) {
      for (const merk in jumlah_item) {
        if (jumlah_item.hasOwnProperty(merk)) {
          countJumlah += jumlah_item[merk]
        }
      }
    }
    // If kedua
    if (row && jumlah_item[jenis?.toLowerCase()]) {
      countJumlah = jumlah_item[jenis?.toLowerCase()]
    }
    // if ketiga
    if (row && jenis === 'Lainnya') {
      for (const merk in jumlah_item) {
        if (jumlah_item.hasOwnProperty(merk) && !merkTertentu.includes(merk)) {
          countJumlah += jumlah_item[merk]
        }
      }
    }
    //  for loop
    console.log(jumlah_item)
    return <>{countJumlah}</>
  }

  const columns = [
    {
      name: 'No',
      width: '80px',
      wrap: true,
      selector: (row: any) => row.serial,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.serial}</div>
      },
    },
    {
      name: 'Jenis Pelanggaran',
      wrap: true,
      width: '300px',
      selector: (row: any) => row.pelanggaran,
    },
    {
      name: 'Jumlah Minol',
      center: true,
      width: '150px',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} />,
    },
    {
      name: 'Wine',
      center: true,
      width: '100px',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} jenis={'Wine'} />,
    },
    {
      name: 'Bir',
      center: true,
      width: '100px',
      sortField: 'bir',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} jenis={'Bir'} />,
    },
    {
      name: 'Sake',
      center: true,
      width: '100px',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} jenis={'Sake'} />,
    },
    {
      name: 'Gin',
      center: true,
      width: '100px',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} jenis={'Gin'} />,
    },
    {
      name: 'Tequila',
      center: true,
      width: '100px',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} jenis={'Tequila'} />,
    },
    {
      name: 'Brandy',
      center: true,
      width: '100px',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} jenis={'Brandy'} />,
    },
    {
      name: 'Wiski',
      center: true,
      width: '100px',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} jenis={'Wiski'} />,
    },
    {
      name: 'Vodka',
      center: true,
      width: '100px',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} jenis={'Vodka'} />,
    },
    {
      name: 'Rum',
      center: true,
      width: '100px',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} jenis={'Rum'} />,
    },
    {
      name: 'Soju',
      center: true,
      width: '100px',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} jenis={'Soju'} />,
    },
    {
      name: 'Anggur',
      center: true,
      width: '100px',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} jenis={'Anggur'} />,
    },
    {
      name: 'Absinth',
      center: true,
      width: '100px',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} jenis={'Absinth'} />,
    },
    {
      name: 'Lainnya',
      center: true,
      width: '100px',
      selector: (row: any) => row.pelanggaran,
      cell: (record: any) => <GetPerJenis row={record.pelanggaran} jenis={'Lainnya'} />,
    },
  ]

  return (
    <div>
      <DataTable
        columns={columns}
        data={pelanggaran}
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
