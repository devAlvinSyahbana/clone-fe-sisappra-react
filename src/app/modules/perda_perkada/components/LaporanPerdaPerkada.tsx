import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {ThemeModeComponent} from '../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { LaporanPerdaPerkadaHeader } from './LaporanPerdaPerkadaHeader'
import AsyncSelect from 'react-select/async'
import {KTSVG} from '../../../../_metronic/helpers'
import FileDownload from 'js-file-download'
import Swal from 'sweetalert2'
import { string } from 'yup'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'

const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'

const reactSelectLightThem = {
  input: (base: object) => ({
    ...base,
    color: '#5e6278',
  }),
  menu: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
  container: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
  indicatorsContainer: (base: object) => ({
    ...base,
    color: '#cccccc',
  }),
  indicatorSeparator: (base: object) => ({
    ...base,
    backgroundColor: '#cccccc',
  }),
  control: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
    boxShadow: '0 0 0 1px #f5f8fa',
  }),
  singleValue: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
  }),
  option: (base: object) => ({
    ...base,
    height: '100%',
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
}

const reactSelectDarkThem = {
  input: (base: object) => ({
    ...base,
    color: '#92929f',
  }),
  menu: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
  container: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
  indicatorsContainer: (base: object) => ({
    ...base,
    color: '#92929f',
  }),
  indicatorSeparator: (base: object) => ({
    ...base,
    backgroundColor: '#92929f',
  }),
  control: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
    boxShadow: '0 0 0 1px #1b1b29',
  }),
  singleValue: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
  }),
  option: (base: object) => ({
    ...base,
    height: '100%',
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
}

export const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MASTERDATA_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL
export const PELAPORAN_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL
export const MASTER_URL = `${API_URL}/master`

export function LaporanPerdaPerkada() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)

  const [aksi, setAksi] = useState(0)
  
  const [inputValKota, setDataKota] = useState([])
  const [inputValKec, setDataKec] = useState([])
  const [inputValKel, setDataKel] = useState([])
  const [inputValJkeg, setDataJkeg] = useState([])
  const [inputValJpen, setDataJpen] = useState([])
  const [inputValJper, setDataJper] = useState([])

  const [jenisKegiatanList, setJenisKegiatanList] = useState([])
  const [valJenisKegiatan, setValJenisKegiatan] = useState({value: '', label: ''})
  const [jenisPenertibanList, setJenisPenertibanList] = useState([])
  const [valJenisPenertiban, setValJenisPenertiban] = useState({value: '', label: ''})
  const [jenisPerdaPerkadaList, setJenisPerdaPerkadaList] = useState([])
  const [valJenisPerdaPerkada, setValJenisPerdaPerkada] = useState({value: '', label: ''})

  const [hakAkses, setHakAkses] = useState([])
  const [wilayahBidang, setWilayahBidang] = useState([])
  const [tanggalAwal, setTanggalAwal] = useState({val: ''})
  const [tanggalAkhir, setTanggalAkhir] = useState({val: ''})
  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [qParamFind, setUriFind] = useState({strparam: ''})

  const filterList = async () => {
    const resKota = await axios.get(`${MASTER_URL}/kota/find`)
    const resKecamatan = await axios.get(`${MASTER_URL}/kecamatan/find`)
    const resKelurahan = await axios.get(`${MASTER_URL}/kelurahan/find`)
    const resJKeg = await axios.get(`${MASTERDATA_URL}/jenis-kegiatan/combobox`)
    const resJPen = await axios.get(`${MASTERDATA_URL}/jenis-perda-perkada`)
    const resJPer = await axios.get(`${MASTER_URL}/jenis-perda-perkada/find`)

    const dataKota = resKota.data.data.map((d: any) => ({
      label: d.kota,
      value: String(d.kode_kota),
    }))
    const dataKec = resKecamatan.data.data.map((d: any) => ({
      label: d.kecamatan,
      value: String(d.kode_kecamatan),
    }))
    const dataKel = resKelurahan.data.data.map((d: any) => ({
      label: d.kelurahan,
      value: String(d.kode_kelurahan),
    }))
    const dataJKeg = resJKeg.data.data.map((d: any) => ({
      label: d.nama,
      value: String(d.id),
    }))
    const dataJPen = resJPen.data.data.map((d: any) => ({
      label: d.jenis_penertiban,
      value: String(d.id),
    }))
    const dataJPer = resJPer.data.data.map((d: any) => ({
      label: d.judul,
      value: String(d.id),
    }))
    setDataKota(dataKota)
    setDataKec(dataKec)
    setDataKel(dataKel)
    setDataJkeg(dataJKeg)
    setDataJpen(dataJPen)
    setDataJper(dataJPer)
  }

  useEffect(() => {
    filterList()
    handleWilayahBidang()
  }, [])

  const handleChangeInputTanggalAwal = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setTanggalAwal({val: event.target.value})
  }

  const handleChangeInputTanggalAkhir = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setTanggalAkhir({val: event.target.value})
  }

  const filterJenisKegiatan = async (inputValue: string) => {
    const response = await axios.get(`${MASTERDATA_URL}/jenis-kegiatan/combobox`)
    const json = await response.data.data
    setJenisKegiatanList(json)
    return json.map((i: any) => ({label: i.text, value: i.value}))
  }
  const loadOptionsJenisKegiatan = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterJenisKegiatan(inputValue))
    }, 1000)
  }
  const handleChangeInputJenisKegiatan = (newValue: any) => {
    setValJenisKegiatan((prevstate: any) => ({...prevstate, ...newValue}))
  }

  const filterJenisPenertiban = async (inputValue: string) => {
    const response = await axios.get(`${MASTERDATA_URL}/jenis-penertiban/find`)
    const json = await response.data.data
    setJenisPenertibanList(json)
    return json.map((i: any) => ({label: i.text, value: i.value}))
  }
  const loadOptionsJenisPenertiban = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterJenisPenertiban(inputValue))
    }, 1000)
  }
  const handleChangeInputJenisPenertiban = (newValue: any) => {
    setValJenisPenertiban((prevstate: any) => ({...prevstate, ...newValue}))
  }
  const filterJenisPerdaPerkada = async (inputValue: string) => {
    const response = await axios.get(`${MASTERDATA_URL}/jenis-perda-perkada`)
    const json = await response.data.data
    setJenisPerdaPerkadaList(json)
    return json.map((i: any) => ({label: i.text, value: i.value}))
  }
  const loadOptionsJenisPerdaPerkada = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterJenisPerdaPerkada(inputValue))
    }, 1000)
  }
  const handleChangeInputJenisPerdaPerkada = (newValue: any) => {
    setValJenisPerdaPerkada((prevstate: any) => ({...prevstate, ...newValue}))
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (tanggalAwal.val && tanggalAkhir.val) {
      uriParam += `kegiatan__tanggal%20ge%20%27${tanggalAwal.val}%27%20and%20kegiatan__tanggal%20le%20%27${tanggalAkhir.val}%27`
    } else if (tanggalAwal.val !== '') {
      uriParam += `kegiatan__tanggal%20eq%20%27${tanggalAwal.val}%27`
    } else if (tanggalAkhir.val !== '') {
      uriParam += `kegiatan__tanggal%20eq%20%27${tanggalAkhir.val}%27`
    }
    if (valJenisKegiatan.value !== '' && (tanggalAwal.val || tanggalAkhir.val)) {
      uriParam += `%20and%20kegiatan__jenis_kegiatan_id%20eq%20%27${valJenisKegiatan.value}%27`
    } else if (valJenisKegiatan.value !== '') {
      uriParam += `kegiatan__jenis_kegiatan_id%20eq%20%27${valJenisKegiatan.value}%27`
    }
    if (valJenisPenertiban.value !== '' && (tanggalAwal.val || tanggalAkhir.val)) {
      uriParam += `%20and%20jenis_penertiban%20eq%20%27${valJenisPenertiban.value}%27`
    } else if (valJenisKegiatan.value !== '') {
      uriParam += `jenis_penertiban%20eq%20%27${valJenisPenertiban.value}%27`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleFilterReset = () => {
    setTanggalAwal({val: ''})
    setTanggalAkhir({val: ''})
    setValJenisKegiatan({value: '', label: ''})
    setValJenisPenertiban({value: '', label: ''})
    setValJenisPerdaPerkada({value: '', label: ''})
    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  const dataPerdaPerkada = (page: number) => {
    axios
      .get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=${qParamFind.strparam}&%24top=${perPage}&%24page=${page}`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          no: d.id,
          pelaksana: d.created_by,
          tanggal_kegiatan: d.kegiatan__tanggal,
          waktu_mulai: d.kegiatan__jam_start,
          waktu_selesai: d.kegiatan__jam_end,
          jenis_kegiatan: d.kegiatan__jenis_kegiatan_id,
          uraian_kegiatan: d.kegiatan__uraian_kegiatan,
          lokasi: d.kegiatan__lokasi,
          jenis_penertiban: d.tindak_lanjut__administrasi__jenis_penertiban
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        setData(data)
        setTotalRows(res.data.total_items)
        setLoading(false)

        return [data, setData] as const
      })
  }

  useEffect(() => {
    dataPerdaPerkada(0)
  }, [qParamFind, perPage])

  const dataPenertiban = (page: number) => {
    axios
      .get(
        `${MASTERDATA_URL}/jenis-perda-perkada/?%24filter=${qParamFind.strparam}&%24top=${perPage}&%24page=${page}`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          jenis_penertiban: d.jenis_penertiban,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        setData(data)
        setTotalRows(res.data.total_items)
        setLoading(false)

        return [data, setData] as const
      })
  }

  useEffect(() => {
    dataPenertiban(0)
  }, [qParamFind, perPage])

  const handlePageChange = (page: number) => {
    dataPerdaPerkada(page - 1)
    console.log('ini page', page)
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)
    axios
      .get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=${qParamFind.strparam}&%24top=${newPerPage}&%24page=${page}`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          no: d.id,
          pelaksana: d.created_by,
          tanggal_kegiatan: d.kegiatan__tanggal,
          waktu_mulai: d.kegiatan__jam_start,
          waktu_selesai: d.kegiatan__jam_end,
          jenis_kegiatan: d.kegiatan__jenis_kegiatan_id,
          uraian_kegiatan: d.kegiatan__uraian_kegiatan,
          wilayah: d.created_by,
          lokasi: d.kegiatan__lokasi,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        setData(data)
        setPerPage(newPerPage)
        setLoading(false)
      })
  }
  // const LoadingAnimation = (props: any) => {
  //   return (
  //     <>
  //       <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
  //         {/* <span className="svg-icon svg-icon-2hx svg-icon-primary me-3">...</span> */}
  //         <span className='spinner-border spinner-border-xl align-middle me-3'></span>
  //         <div className='d-flex flex-column'>
  //           <h5 className='mb-1'>Sedang mengambil data...</h5>
  //         </div>
  //       </div>
  //     </>
  //   )
  // }

  const handleWilayahBidang = async () => {
    const response = await axios.get(`${MASTER_URL}/bidang-wilayah/find`)
    setWilayahBidang(response.data.data)
  }

  const konfirDel = (id: number) => {
    Swal.fire({
      text: 'Anda yakin ingin menghapus data ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya!',
      cancelButtonText: 'Tidak!',
      color: '#000000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const bodyParam = {
          data: {
            deleted_by: 'string',
          },
        }
        const response = await axios.delete(`${PELAPORAN_URL}/kegiatan-umum/${id}`, bodyParam)
        if (response) {
          dataPerdaPerkada(0)
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil dihapus',
            showConfirmButton: false,
            timer: 1500,
            color: '#000000',
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Data gagal dihapus, harap mencoba lagi',
            showConfirmButton: false,
            timer: 1500,
            color: '#000000',
          })
        }
      }
    })
  }

  interface SelectOption {
    readonly value: string
    readonly label: string
    readonly color: string
    readonly isFixed?: boolean
    readonly isDisabled?: boolean
  }

  // const GetBidang = ({row}: {row: number}) => {
  //   const handleHakAkses = hakAkses.find((i: any) => i.id === row)
  //   const handleBidang = wilayahBidang.find((i: any) => i.id === handleHakAkses)

  const GetJenisPenertiban = ({row}: {row: number}) => {
    const jenisPenertibanLabel = jenisPenertibanList.find((i: any) => i.value === row)
    console.log(jenisPenertibanLabel)
    return <>{jenisPenertibanLabel}</>
  }
  const GetJenisKegiatan = ({row}: {row: number}) => {
    const jenisKegiatanLabel = jenisKegiatanList.find((i: any) => i.value === row)
    // console.log(jenisKegiatanLabel)
    return <>{jenisKegiatanLabel}</>
  }

  var num = 1
  const columns = [
    {
      name: 'No',
      width: '80px',
      sortable: true,
      sortField: 'id',
      wrap: true,
      selector: (row: any) => row.serial,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.serial}</div>
      },
    },

    {
      name: 'Pelaksana',
      sortable: true,
      sortField: 'kota',
      wrap: true,
      width: '250px',
      center: true,
      selector: (row: any) => row.pelaksana,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.pelaksana}</div>
      }
    },
    {
      name: 'Jenis Penertiban',
      sortable: true,
      // sortField: 'Jenis Penertiban',
      wrap: true,
      width: '220px',
      center: true,
      selector: (row: any) => row.jenis_penertiban,
      cell: (record: any) => <GetJenisPenertiban row={parseInt(record.jenis_penertiban)} />,
    },
    {
      name: 'Jenis Kegiatan',
      selector: (row: any) => row.jenis_kegiatan,
      sortable: true,
      // sortField: 'kelurahan',
      width: '220px',
      wrap: true,
      cell: (record: any) => <GetJenisKegiatan row={parseInt(record.jenis_kegiatan)} />,
    },
    {
      name: 'Lokasi',
      selector: (row: any) => row.lokasi,
      sortable: true,
      sortField: 'lokasi',
      wrap: true,
    },
    {
      name: 'Titik Koordinat',
      selector: (row: any) => row.titik_koordinat,
      sortable: true,
      sortField: 'titik_koordinat',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Kategori',
      selector: (row: any) => row.kategori,
      sortable: true,
      sortField: 'kategori',
      wrap: true,
    },
    {
      name: 'Keterangan',
      selector: (row: any) => row.keterangan,
      sortable: true,
      sortField: 'keterangan',
      wrap: true,
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

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  }

  useEffect(() => {
    async function fetchDT(page: number) {
      setLoading(true)
      const response = await axios.get(
        `${MASTERDATA_URL}find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
      )
      setData(response.data.data)
      setTotalRows(response.data.total_data)
      setLoading(false)
    }
    fetchDT(1)
  }, [qParamFind, perPage])

  const fetchData = async (page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${MASTERDATA_URL}find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setTotalRows(response.data.total_data)
    setLoading(false)

    return [data, setData] as const
  }

  //unduh
  const handleUnduh = async () => {
    setbtnLoadingUnduh(true)
    await axios({
      url: `${MASTERDATA_URL}unduh?status=${qParamFind.strparam}`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(response.data, 'DATA STATUS KENAIKAN PANGKAT.xlsx')
      setbtnLoadingUnduh(false)
    })
  }
  //end unduh

  const [idMasterBidangWilayah, setIdMasterBidangWilayah] = useState({id: ''})
  const [valMasterBidangWilayah, setValMasterBidangWilayah] = useState({value: null, label: ''})
  const [masterBidangWilayah, setMasterBidangWilayah] = useState([])
  const filterbidangwilayah = async (inputValue: string) => {
    const response = await axios.get(`${MASTERDATA_URL}/filter/${inputValue}`)
    const json = response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsbidangwilayah = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterbidangwilayah(inputValue))
    }, 1000)
  }
  const handleChangeInputKota = (newValue: any) => {
    setValMasterBidangWilayah((prevstate: any) => ({...prevstate, ...newValue}))
    setIdMasterBidangWilayah({id: newValue.value})
    setValMasterPelaksana({value: null, label: ''})
    setValMasterJabatan({value: null, label: ''})
    // console.log('cek', newValue.value)
    const timeout = setTimeout(async () => {
      const response = await axios.get(
        `${MASTERDATA_URL}/filter?id_tempat_pelaksanaan=${newValue.value}`
      )
      let items = response.data.data
      Array.from(items).forEach(async (item: any) => {
        item.label = item.nama
        item.value = item.id
      })
      setMasterBidangWilayah(items)
      // console.log(items)
    }, 100)

    return () => clearTimeout(timeout)
  }
  //end nama_hak_akses

  // kecamatan
  const [idMasterPelaksana, setIdMasterPelaksana] = useState({id: ''})
  const [valMasterPelaksana, setValMasterPelaksana] = useState({value: null, label: ''})
  const [masterPelaksana, setMasterPelaksana] = useState([])
  const filterKecamatan = async (inputValue: string) => {
    const response = await axios.get(
      `${MASTERDATA_URL}/filter?id_tempat_pelaksanaan=${idMasterBidangWilayah.id}${
        inputValue !== '' && `&nama=${inputValue}`
      }`
    )
    const json = response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsKecamatan = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKecamatan(inputValue))
    }, 500)
  }
  const handleChangeInputKecamatan = (newValue: any) => {
    setValMasterPelaksana((prevstate: any) => ({...prevstate, ...newValue}))
    setIdMasterPelaksana({id: newValue.value})
    setValMasterJabatan({value: null, label: ''})
    // console.log('cek', newValue.value)
    const timeout = setTimeout(async () => {
      const response = await axios.get(
        `${MASTERDATA_URL}/filter?id_master_tempat_seksi_pelaksanaan=${newValue.value}`
      )
      let items = response.data.data
      Array.from(items).forEach(async (item: any) => {
        item.label = item.jabatan
        item.value = item.id
      })
      setMasterPelaksana(items)
    }, 100)

    return () => clearTimeout(timeout)
  }
  //end kecamatan

  //jabatan
  const [valMasterJabatan, setValMasterJabatan] = useState({value: null, label: ''})
  const filterjabatan = async (inputValue: string) => {
    const response = await axios.get(
      `${MASTERDATA_URL}/filter?id_master_tempat_seksi_pelaksanaan=${parseInt(idMasterPelaksana.id)}${
        inputValue !== '' && `&nama=${inputValue}`
      }`
    )
    const json = response.data.data
    return json.map((i: any) => ({label: i.jabatan, value: i.id}))
  }
  const loadOptionsJabatan = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterjabatan(inputValue))
    }, 500)
  }
  const handleChangeInputJabatan = (newValue: any) => {
    setValMasterJabatan((prevstate: any) => ({...prevstate, ...newValue}))
  }
  //end jabatan

  return (
    <>
      <LaporanPerdaPerkadaHeader />
      <div className={`card`}>
        {/* begin::Body */}
        <div className='row g-8 mt-2 ms-5 me-5'>
          <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12'>
            <div className='form-group'>
              <label htmlFor='' className='mb-3'>
                Tahun
              </label>
              <AsyncSelect
                className='mb-5'
                value={valMasterPelaksana.value ? valMasterPelaksana : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsKecamatan}
                defaultOptions={masterBidangWilayah}
                onChange={handleChangeInputKecamatan}
                styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
              />
            </div>
          </div>
          <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12'>
            <div className='form-group'>
              <label htmlFor='' className='mb-3'>
                Jenis
              </label>
              <AsyncSelect
                className='mb-5'
                value={valMasterPelaksana.value ? valMasterPelaksana : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsKecamatan}
                defaultOptions={masterBidangWilayah}
                onChange={handleChangeInputKecamatan}
                styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
              />
            </div>
          </div>
          <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12'>
            <div className='form-group'>
              <label htmlFor='' className='mb-3'>
                Mulai Triwulan
              </label>
              <AsyncSelect
                className='mb-5'
                value={valMasterPelaksana.value ? valMasterPelaksana : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsKecamatan}
                defaultOptions={masterBidangWilayah}
                onChange={handleChangeInputKecamatan}
                styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
              />
            </div>
          </div>
          <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12'>
            <div className='form-group'>
              <label htmlFor='' className='mb-3'>
                sampai Triwulan
              </label>
              <AsyncSelect
                value={valMasterJabatan.value ? valMasterJabatan : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsJabatan}
                defaultOptions={masterPelaksana}
                onChange={handleChangeInputJabatan}
                styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
              />
            </div>
          </div>
        </div>

        <div className='row g-8 mt-2 ms-5 me-5'>
          <div className='row g-8 mt-2 ms-5 me-5'>
            <div className='col-md-6 col-lg-6 col-sm-12'>
              <Link to='#' onClick={handleFilter}>
                <button className='btn btn-light-primary me-2'>
                  <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-2' />
                  Cari
                </button>
              </Link>
              <Link to='#' onClick={handleFilterReset}>
                <button className='btn btn-light-primary'>
                  <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                  Reset
                </button>
              </Link>
            </div>

            <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
              {/* begin::Filter Button */}
              <button
                type='button'
                className='btn btn-light-primary'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
              >
                {btnLoadingUnduh ? (
                  <>
                    <span className='spinner-border spinner-border-md align-middle me-3'></span>{' '}
                    Memproses Unduh...
                  </>
                ) : (
                  <>
                    {/* <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' /> */}
                    Unduh
                  </>
                )}
              </button>
              {/* end::Filter Button */}
              {/* begin::SubMenu */}
              <div
                className='menu menu-sub menu-sub-dropdown w-100px w-md-150px'
                data-kt-menu='true'
              >
                {/* begin::Header */}
                <div className='px-7 py-5'>
                  <div className='fs-5 text-dark fw-bolder'>Pilihan Unduh</div>
                </div>
                {/* end::Header */}

                {/* begin::Separator */}
                <div className='separator border-gray-200'></div>
                {/* end::Separator */}

                {/* begin::Content */}
                <div className='px-7 py-5' data-kt-user-table-filter='form'>
                  <button
                    onClick={handleUnduh}
                    className='btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success w-100'
                  >
                    Excel
                  </button>
                </div>
                <div className='px-7 py-5' data-kt-user-table-filter='form'>
                  <button
                    onClick={() =>
                      navigate(`/kepegawaian/LaporanRekapitulasiPegawai/UnduhNaikPangkatPdf`)
                    }
                    className='btn btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger w-100'
                  >
                    PDF
                  </button>
                </div>
                {/* end::Content */}
              </div>
              {/* end::SubMenu */}
            </div>
          </div>
        </div>
        <div className='col-xl-12 mb-xl-12 mt-6'>
          <div className='card card-flush h-xl-100'>
            <div
              className='card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px'
              style={
                {
                  // backgroundImage: 'url(' + toAbsoluteUrl('/media/svg/shapes/top-blue.jpg') + ')',
                }
              }
              data-theme='light'
            ></div>

            <div className='card-body mt-n20'>
              <div className='mt-n20 position-relatve'>
                <div className='card border card-flush h-xl-100'>
                  <div className='table-responsive mt-5 ms-5 me-5 w'>
                    <DataTable
                      // progressPending={loading}
                      // progressComponent={<LoadingAnimation />}
                      columns={columns}
                      data={data}
                      
                      // konfirDel={konfirDel}
                      pagination
                      paginationServer
                      // hakAkses={hakAkses}
                      // jenisPenertibanList={jenisPenertibanList}
                      // jenisKegiatanList={jenisKegiatanList}
                      paginationTotalRows={totalRows}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={handlePageChange}
                      customStyles={customStyles}
                      theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}
