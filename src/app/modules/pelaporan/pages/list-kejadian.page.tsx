import { FC, useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'
import { FormikValues } from 'formik'
import {
  createSchemaPelaporanKejadian,
  PelaporanKejadianState,
} from '../../../redux/slices/pelaporan-kejadian.slice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { unparse } from 'papaparse'
import axios from 'axios'
import { DtKabid, DtAdmin, DtPimpinan } from '../datatable/data-table-laporan-kejadian'
import { KTSVG } from '../../../../_metronic/helpers'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { createTheme } from 'react-data-table-component'
import { ThemeModeComponent } from '../../../../_metronic/assets/ts/layout'
import { useThemeMode } from '../../../../_metronic/partials'
import ReactToPrint from 'react-to-print'

// Dark Theme
// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme(
  'darkMetro',
  {
    text: {
      primary: '#92929f',
      secondary: '#92929f',
    },
    background: {
      default: '#1e1e2e',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#2b2c41',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  },
  'dark'
)
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
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`

export const ListKejadianPage: FC = () => {
  let componentRef: any
  const navigate = useNavigate()
  const { mode } = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const dispatch = useDispatch()
  const [currentSchema, setCurrentSchema] = useState(createSchemaPelaporanKejadian[0])
  const [qParamFind, setUriFind] = useState({ strparam: '' })
  const [jenisKejadianList, setJenisKejadianList] = useState([])
  // const kotaList = useSelector((s: RootState) => s.pelaporanKejadian.list_kota)
  const kecamatanList = useSelector((s: RootState) => s.pelaporanKejadian.list_kecamatan)
  const kelurahanList = useSelector((s: RootState) => s.pelaporanKejadian.list_kelurahan)

  const [period, setPeriod] = useState({ start: Date.now() - 10, end: Date.now() })

  const filterPelaporanKejadian = async (values: PelaporanKejadianState, actions: FormikValues) => {
    const res = await axios.get(`${PELAPORAN_URL}/kejadian-umum`)
    const data = res.data.data
    // .filter((v: any) => !excludeJenisKejadian.includes(v.label))
    setCurrentSchema(data)
    console.log(res)
  }

  const updateList = () => {
    axios.get(`${MASTERDATA_URL}/jenis-kejadian/combobox?$orderby=nama`).then((res) => {
      const data = res.data.data.map((d: any) => ({ label: d.text, value: String(d.value) }))
      // .filter((v: any) => !excludeJenisKendali.includes(v.label))
      setJenisKejadianList(data)
    })
  }

  useEffect(() => {
    updateList()
    // updateJenisUsahaList()
    // updateJenisPenindakanList()
  }, [])

  const [aksi, setAksi] = useState(0)
  const [pimpinanView, setPV] = useState(0)
  const [jenisKejadianId, setJKId] = useState(0)
  const [kotaId, setKotaId] = useState(0)
  const [hakAksesData, setHakAksesData] = useState<any>([])
  let value: any = localStorage.getItem('kt-auth-react-v')
  let authValue = JSON.parse(value)
  let idHakAkses = authValue.data.hak_akses
  // console.log('id hak akses', idHakAkses)
  // console.log('aksi', aksi)

  const findHakAksesData = async () => {
    const res = await axios.get(`${API_URL}/manajemen-pengguna/hak-akses/findone/${idHakAkses}`)
    // console.log(res.data.data)
    setHakAksesData(res.data.data)
  }

  useEffect(() => {
    findHakAksesData()
  }, [])
  useEffect(() => {
    if (hakAksesData?.nama_hak_akses?.toLowerCase().includes('admin')) {
      return setAksi(1)
      // return setAksi(2)
    } else if (hakAksesData?.nama_hak_akses?.toLowerCase().includes('kepala satpol pp dki')) {
      return setAksi(2)
    } else if (hakAksesData?.nama_hak_akses?.toLowerCase().includes('kepala')) {
      return setAksi(0)
    } else {
      return setAksi(3)
    }
  }, [hakAksesData])

  const unduhCSV = (data: any[]) => {
    const csvData = unparse(data)
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'LAPORAN KEJADIAN.csv')
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  // const vKabid = () => {
  //   setAksi(0)
  // }
  // const vAdmin = () => {
  //   setAksi(1)
  // }
  // const vPimpinan = () => {
  //   setAksi(2)
  //   setPV(0)
  // }
  const viewPimpinan = () => {
    setPV(0)
  }
  const viewPimpinanDetail = (id: number, kota: number) => {
    setKotaId(kota)
    setJKId(id)
    setPV(1)
  }

  const viewPimpinanDetailJumlah = (kota: number) => {
    setKotaId(kota)
    setPV(1)
  }

  const [tanggalAwal, setTanggalAwal] = useState({ val: '' })
  const [tanggalAkhir, setTanggalAkhir] = useState({ val: '' })

  const handleChangeInputTanggalAwal = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setTanggalAwal({ val: event.target.value })
  }

  const handleChangeInputTanggalAkhir = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setTanggalAkhir({ val: event.target.value })
  }

  interface SelectOption {
    readonly value: string
    readonly label: string
  }

  const [valJenisKejadian, setValJenisKejadian] = useState({ value: '', label: '' })
  const filterJenisKejadian = async (inputValue: string) => {
    const response = await axios.get(`${MASTERDATA_URL}/jenis-kejadian/combobox`)
    const json = await response.data.data
    return json.map((i: any) => ({ label: i.text, value: i.value }))
  }
  // console.log(valJenisKejadian)
  const loadOptionsJenisKejadian = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterJenisKejadian(inputValue))
    }, 1000)
  }
  const handleChangeInputJenisKejadian = (newValue: any) => {
    setValJenisKejadian((prevstate: any) => ({ ...prevstate, ...newValue }))
    // console.log('ini val kejadian', valJenisKejadian)
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (tanggalAwal.val && tanggalAkhir.val) {
      uriParam += `kejadian__tanggal%20ge%20%27${tanggalAwal.val}%27%20and%20kejadian__tanggal%20le%20%27${tanggalAkhir.val}%27`
      // console.log('2 on')
    } else if (tanggalAwal.val !== '') {
      // console.log('start on')
      uriParam += `kejadian__tanggal%20eq%20%27${tanggalAwal.val}%27`
    } else if (tanggalAkhir.val !== '') {
      uriParam += `kejadian__tanggal%20eq%20%27${tanggalAkhir.val}%27`
    }
    if (valJenisKejadian.value !== '' && (tanggalAwal.val || tanggalAkhir.val)) {
      uriParam += `%20and%20kejadian__jenis_kejadian_id%20eq%20%27${valJenisKejadian.value}%27`
      // console.log('2 on')
    } else if (valJenisKejadian.value !== '') {
      uriParam += `kejadian__jenis_kejadian_id%20eq%20%27${valJenisKejadian.value}%27`
    }
    setUriFind((prevState) => ({ ...prevState, strparam: uriParam }))
  }

  const handleFilterReset = () => {
    setTanggalAwal({ val: '' })
    setTanggalAkhir({ val: '' })
    setValJenisKejadian({ value: '', label: '' })
    // setInstansi({val: ''})
    setUriFind((prevState) => ({ ...prevState, strparam: '' }))
  }
  // FILTER KOTA
  const handleFilterKota = async () => {
    let uriParam = ''
    if (valKota.value !== '') {
      uriParam += `/?%24filter=id%20eq%20${valKota.value}`
    }
    setUriFindKota((prevState) => ({ ...prevState, strparamkota: uriParam }))
  }

  const handleFilterResetKota = () => {
    setValKota({ value: '', label: '' })
    // setInstansi({val: ''})
    setUriFindKota((prevState) => ({ ...prevState, strparamkota: '' }))
  }

  const handleFilterDetailJumlah = async () => {
    let uriParam = ''
    if (tanggalAwal.val && tanggalAkhir.val) {
      uriParam += `%20and%20kejadian__tanggal%20ge%20%27${tanggalAwal.val}%27%20and%20kejadian__tanggal%20le%20%27${tanggalAkhir.val}%27`
      // console.log('2 on')
    } else if (tanggalAwal.val !== '') {
      // console.log('start on')
      uriParam += `%20and%20kejadian__tanggal%20eq%20%27${tanggalAwal.val}%27`
    } else if (tanggalAkhir.val !== '') {
      uriParam += `%20and%20kejadian__tanggal%20eq%20%27${tanggalAkhir.val}%27`
    }
    if (valJenisKejadian.value !== '' && (tanggalAwal.val || tanggalAkhir.val)) {
      uriParam += `%20and%20kejadian__jenis_kejadian_id%20eq%20%27${valJenisKejadian.value}%27`
      // console.log('2 on')
    } else if (valJenisKejadian.value !== '') {
      uriParam += `%20and%20kejadian__jenis_kejadian_id%20eq%20%27${valJenisKejadian.value}%27`
    }
    setUriFind((prevState) => ({ ...prevState, strparam: uriParam }))
  }

  const handleFilterResetDetailJumlah = () => {
    setTanggalAwal({ val: '' })
    setTanggalAkhir({ val: '' })
    setValJenisKejadian({ value: '', label: '' })
    // setInstansi({val: ''})
    setUriFind((prevState) => ({ ...prevState, strparam: '' }))
  }

  const handleFilterDetail = async () => {
    let uriParam = ''
    if (tanggalAwal.val && tanggalAkhir.val) {
      uriParam += `%20and%20kejadian__tanggal%20ge%20%27${tanggalAwal.val}%27%20and%20kejadian__tanggal%20le%20%27${tanggalAkhir.val}%27`
      // console.log('2 on')
    } else if (tanggalAwal.val !== '') {
      // console.log('start on')
      uriParam += `%20and%20kejadian__tanggal%20eq%20%27${tanggalAwal.val}%27`
    } else if (tanggalAkhir.val !== '') {
      uriParam += `%20and%20kejadian__tanggal%20eq%20%27${tanggalAkhir.val}%27`
    }
    setUriFind((prevState) => ({ ...prevState, strparam: uriParam }))
  }

  const handleFilterResetDetail = () => {
    setTanggalAwal({ val: '' })
    setTanggalAkhir({ val: '' })
    // setInstansi({val: ''})
    setUriFind((prevState) => ({ ...prevState, strparam: '' }))
  }

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [dataPimpinan, setDataPimpinan] = useState([])
  const [dataPimpinanJumlah, setDataPimpinanJumlah] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [totalRows, setTotalRows] = useState(0)

  const dataKejadian = (page: number) => {
    axios
      .get(
        `${PELAPORAN_URL}/kejadian-umum/?%24filter=${qParamFind.strparam}&%24top=${perPage}&%24page=${page}&%24orderby=created_at%20asc`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          no: d.id,
          pelaksana: d.created_by,
          tanggal_kejadian: d.kejadian__tanggal,
          waktu_mulai: d.kejadian__waktu_start,
          waktu_selesai: d.kejadian__waktu_end,
          jenis_kejadian: d.kejadian__jenis_kejadian_id,
          uraian_kejadian: d.kejadian__uraian_kejadian,
          // wilayah: d.kejadian__wilayah,
          lokasi: d.kejadian__alamat,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        // .filter((v: any) => !excludeJeniskejadian.includes(v.label))
        setData(data)
        setTotalRows(res.data.total_items)
        setLoading(false)

        return [data, setData] as const
      })
  }

  const dataKejadianJumlah = (page: number) => {
    axios
      .get(
        `${PELAPORAN_URL}/kejadian-umum/?%24filter=kejadian__kota_id%20eq%20${kotaId}${qParamFind.strparam}&%24top=${perPage}&%24page=${page}&%24orderby=created_at%20asc`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          no: d.id,
          pelaksana: d.created_by,
          tanggal_kejadian: d.kejadian__tanggal,
          waktu_mulai: d.kejadian__waktu_start,
          waktu_selesai: d.kejadian__waktu_end,
          jenis_kejadian: d.kejadian__jenis_kejadian_id,
          uraian_kejadian: d.kejadian__uraian_kejadian,
          // wilayah: d.kejadian__wilayah,
          lokasi: d.kejadian__alamat,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        // .filter((v: any) => !excludeJeniskejadian.includes(v.label))
        setDataPimpinanJumlah(data)
        setTotalRows(res.data.total_items)
        setLoading(false)

        return [data, setDataPimpinanJumlah] as const
      })
  }

  const dataKejadianPimpinan = (page: number) => {
    setLoading(true)
    axios
      .get(
        `${PELAPORAN_URL}/kejadian-umum/?%24filter=kejadian__kota_id%20eq%20${kotaId}%20and%20kejadian__jenis_kejadian_id%20eq%20${jenisKejadianId}${qParamFind.strparam}&%24top=${perPage}&%24page=${page}&%24orderby=created_at%20asc`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          no: d.id,
          pelaksana: d.created_by,
          tanggal_kejadian: d.kejadian__tanggal,
          waktu_mulai: d.kejadian__waktu_start,
          waktu_selesai: d.kejadian__waktu_end,
          jenis_kejadian: d.kejadian__jenis_kejadian_id,
          uraian_kejadian: d.kejadian__uraian_kejadian,
          // wilayah: d.kejadian__wilayah,
          lokasi: d.kejadian__alamat,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        // .filter((v: any) => !excludeJeniskejadian.includes(v.label))
        setDataPimpinan(data)
        setTotalRows(res.data.total_items)
        setLoading(false)

        return [data, setDataPimpinan] as const
      })
  }

  useEffect(() => {
    dataKejadian(0)
  }, [qParamFind, perPage])

  useEffect(() => {
    if (kotaId !== 0 && jenisKejadianId !== 0) {
      dataKejadianPimpinan(0)
    } else {
      dataKejadianJumlah(0)
    }
  }, [kotaId, jenisKejadianId, perPage, pimpinanView, qParamFind])

  const handlePageChange = (page: number) => {
    // const page1 = page++
    dataKejadian(page - 1)
    // console.log('ini page', page1, '&', page)
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)
    axios
      .get(
        `${PELAPORAN_URL}/kejadian-umum/?%24filter=${qParamFind.strparam}&%24top=${newPerPage}&%24page=${page}`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          no: d.id,
          pelaksana: d.created_by,
          tanggal_kejadian: d.kejadian__tanggal,
          waktu_mulai: d.kejadian__waktu_start,
          waktu_selesai: d.kejadian__waktu_end,
          jenis_kejadian: d.kejadian__jenis_kejadian_id,
          uraian_kejadian: d.kejadian__uraian_kejadian,
          // wilayah: d.kejadian__wilayah,
          lokasi: d.kejadian__alamat,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        // .filter((v: any) => !excludeJeniskejadian.includes(v.label))
        setData(data)
        setPerPage(newPerPage)
        setLoading(false)
      })
  }

  const handlePageChangeDetail = (page: number) => {
    // const page1 = page++
    dataKejadianPimpinan(page - 1)
    // console.log('ini page', page1, '&', page)
  }

  const handlePerRowsChangeDetail = async (newPerPage: number, page: number) => {
    setLoading(true)
    axios
      .get(
        `${PELAPORAN_URL}/kejadian-umum/?%24filter=kejadian__kota_id%20eq%20${kotaId}%20and%20kejadian__jenis_kejadian_id%20eq%20${jenisKejadianId}${qParamFind.strparam}&%24top=${newPerPage}&%24page=${page}`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          no: d.id,
          pelaksana: d.created_by,
          tanggal_kejadian: d.kejadian__tanggal,
          waktu_mulai: d.kejadian__waktu_start,
          waktu_selesai: d.kejadian__waktu_end,
          jenis_kejadian: d.kejadian__jenis_kejadian_id,
          uraian_kejadian: d.kejadian__uraian_kejadian,
          // wilayah: d.kejadian__wilayah,
          lokasi: d.kejadian__alamat,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        // .filter((v: any) => !excludeJeniskejadian.includes(v.label))
        setDataPimpinan(data)
        setPerPage(newPerPage)
        setLoading(false)
      })
  }

  const [hakAkses, setHakAkses] = useState([])

  const handleHakAkses = async () => {
    const response = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/hak-akses/find`)
    setHakAkses(response.data.data)
    // console.log(response.data.data)
  }

  const [wilayahBidang, setWilayahBidang] = useState([])

  const handleWilayahBidang = async () => {
    const response = await axios.get(`${MASTER_URL}/bidang-wilayah/find`)
    setWilayahBidang(response.data.data)
    // console.log(response.data.data)
  }
  useEffect(() => {
    handleHakAkses()
    handleWilayahBidang()
  }, [])

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
        const response = await axios.delete(`${PELAPORAN_URL}/kejadian-umum/${id}`, bodyParam)
        if (response) {
          dataKejadian(0)
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

  const [kota, setKota] = useState([])
  const [qParamFindKota, setUriFindKota] = useState({ strparamkota: '' })

  const kotaList = async () => {
    const responseKota = await axios.get(`${MASTERDATA_URL}/kota${qParamFindKota.strparamkota}`)
    // const handleHakAkses = responsesKota.data.data.find((i: any) => i.id === row)
    // console.log(responseKota)
    const dataKota = responseKota.data.data.map((d: any) => ({
      id: d.id,
      no: d.id,
      bidang_wilayah: d.nama,
    }))
    Array.from(dataKota).forEach((item: any, index: any) => {
      item.serial = index + 1
    })

    setKota(dataKota)

    return [kota, setKota] as const
    // console.log(response.data.data)
  }

  useEffect(() => {
    kotaList()
    // console.log(kotaList)
  }, [qParamFindKota])

  const [valKota, setValKota] = useState({ value: '', label: '' })
  const filterKota = async (inputValue: string) => {
    const response = await axios.get(`${MASTERDATA_URL}/kota/combobox`)
    const json = await response.data.data
    return json.map((i: any) => ({ label: i.text, value: i.value }))
    // console.log(response)
  }
  const loadOptionsKota = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterKota(inputValue))
    }, 1000)
  }
  const handleChangeInputKota = (newValue: any) => {
    setValKota((prevstate: any) => ({ ...prevstate, ...newValue }))
    // console.log('ini val kejadian', valJenisKejadian)
  }

  return (
    <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
      <div className='d-flex flex-column flex-column-fluid'>
        <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
          <div
            id='kt_app_toolbar_container'
            className='app-container container-xxl d-flex flex-stack'
          >
            <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
              <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
                Daftar Laporan Kejadian
              </h1>
            </div>
          </div>
        </div>
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            {aksi === 3 ? (
              <div className='card'>
                <div className='card-header border-1 py-6 d-flex justify-content-center align-items-center'>
                  <h3 className='fs-4 fw-semibold'>TIDAK MEMILIKI HAK AKSES HALAMAN INI</h3>
                </div>
              </div>
            ) : (
              <div className='card'>
                <div className='card-header border-1 pt-6'>
                  <div className='accordion accordion-icon-toggle' id='kt_accordion_2'>
                    <div className='mb-5'>
                      <div
                        className='accordion-header py-3 d-flex'
                        data-bs-toggle='collapse'
                        data-bs-target='#kt_accordion_2_item_1'
                      >
                        <span className='accordion-icon'>
                          <span className='svg-icon svg-icon-4'>
                            <svg
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <rect
                                opacity='0.5'
                                x='18'
                                y='13'
                                width='13'
                                height='2'
                                rx='1'
                                transform='rotate(-180 18 13)'
                                fill='currentColor'
                              />
                              <path
                                d='M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z'
                                fill='currentColor'
                              />
                            </svg>
                          </span>
                        </span>
                        <h3 className='fs-4 fw-semibold mb-0 ms-4'>Pilihan Filter</h3>
                      </div>
                      <div
                        id='kt_accordion_2_item_1'
                        className='fs-6 collapse show ps-10'
                        data-bs-parent='#kt_accordion_2'
                      >
                        {/* <Button onClick={vKabid}>Kabid</Button>
                            <Button onClick={vAdmin}>Admin</Button>
                            <Button onClick={vPimpinan}>Pimpinan</Button> */}
                        {aksi === 0 ? (
                          // VIEW KABID

                          <div className='row w-100 mt-10 mb-10'>
                            {/* <div className='col-md-6 col-lg-6 col-sm-12'>
                            <div className='mb-10'>
                              <div className='row'>
                                <div className='col-4 pt-2'>
                                  <label className='form-label align-middle'>Kecamatan</label>
                                </div>
                                <div className='col-8'>
                                </div>
                              </div>
                            </div>
                          </div> */}
                            <div className='col-md-6 col-lg-6 col-sm-12'>
                              <div className='mb-10'>
                                <div className='row'>
                                  <div className='col-4 pt-2'>
                                    <label className='form-label align-middle'>
                                      Jenis Kejadian
                                    </label>
                                  </div>
                                  <div className='col-8'>
                                    <AsyncSelect
                                      name='filter_jenis_kejadian_id_selection'
                                      defaultOptions
                                      value={valJenisKejadian}
                                      loadOptions={loadOptionsJenisKejadian}
                                      onChange={handleChangeInputJenisKejadian}
                                      styles={
                                        calculatedMode === 'dark'
                                          ? reactSelectDarkThem
                                          : reactSelectLightThem
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-6 col-lg-6 col-sm-12'>
                              <div className='mb-10'>
                                <div className='row'>
                                  <div className='col-4 pt-2'>
                                    <label className='form-label'>Tanggal Awal</label>
                                  </div>
                                  <div className='col-8'>
                                    <input
                                      type='date'
                                      name='tanggal_kunjungan'
                                      className='form-control'
                                      value={tanggalAwal.val}
                                      onChange={handleChangeInputTanggalAwal}
                                      placeholder={'Pilih Tanggal'}
                                      // onChange={(o: any) => {
                                      //   setTanggalAwal(o.target.value)
                                      // }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-6 col-lg-6 col-sm-12'>
                              <div className='mb-10'>
                                <div className='row'>
                                  <div className='col-4 pt-2'>
                                    <label className='form-label align-middle'>Tanggal Akhir</label>
                                  </div>
                                  <div className='col-8'>
                                    <input
                                      name='tanggal_kunjungan'
                                      type='date'
                                      className='form-control'
                                      value={tanggalAkhir.val}
                                      onChange={handleChangeInputTanggalAkhir}
                                      placeholder={'Pilih Tanggal'}

                                      // onChange={(o: any) => {
                                      //   setTanggalAkhir(o.target.value)
                                      // }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='row g-8 mt-2'>
                              <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                                <Button
                                  className='btn btn-light-primary me-2'
                                  onClick={handleFilter}
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/general/gen021.svg'
                                    className='svg-icon-2'
                                  />
                                  Cari
                                </Button>
                                <Button
                                  className='btn btn-light-primary me-2'
                                  onClick={handleFilterReset}
                                >
                                  <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                                  Reset
                                </Button>
                              </div>
                              <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                                {/* begin::Button Unduh */}
                                <button
                                  type='button'
                                  className='btn btn-light-primary me-2'
                                  data-kt-menu-trigger='click'
                                  data-kt-menu-placement='bottom-end'
                                  onClick={() => unduhCSV(data)}
                                >
                                  <>
                                    <KTSVG
                                      path='/media/icons/duotune/arrows/arr078.svg'
                                      className='svg-icon-2'
                                    />
                                    Unduh
                                  </>
                                  {/* end::Button Unduh */}
                                </button>
                                {/* begin::Filter Button */}
                                <Button
                                  onClick={() => navigate('/pelaporan/tambah-laporan-kejadian')}
                                  className='btn btn-primary me-2'
                                >
                                  {/* begin::Add user */}
                                  <KTSVG
                                    path='/media/icons/duotune/arrows/arr075.svg'
                                    className='svg-icon-2'
                                  />
                                  Tambah
                                  {/* end::Add user */}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : aksi === 1 ? (
                          // VIEW ADMIN
                          <div className='row w-100 mt-10 mb-10'>
                            <div className='col-md-6 col-lg-6 col-sm-12'>
                              <div className='mb-10'>
                                <div className='row'>
                                  <div className='col-4 pt-2'>
                                    <label className='form-label align-middle'>
                                      Jenis Kejadian
                                    </label>
                                  </div>
                                  <div className='col-8'>
                                    <AsyncSelect
                                      name='filter_jenis_kejadian_id_selection'
                                      defaultOptions
                                      value={valJenisKejadian}
                                      loadOptions={loadOptionsJenisKejadian}
                                      onChange={handleChangeInputJenisKejadian}
                                      styles={
                                        calculatedMode === 'dark'
                                          ? reactSelectDarkThem
                                          : reactSelectLightThem
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-6 col-lg-6 col-sm-12'>
                              <div className='mb-10'>
                                <div className='row'>
                                  <div className='col-4 pt-2'>
                                    <label className='form-label'>Tanggal Awal</label>
                                  </div>
                                  <div className='col-8'>
                                    <input
                                      type='date'
                                      name='tanggal_kunjungan'
                                      className='form-control'
                                      value={tanggalAwal.val}
                                      onChange={handleChangeInputTanggalAwal}
                                      placeholder={'Pilih Tanggal'}
                                      // onChange={(o: any) => {
                                      //   setTanggalAwal(o.target.value)
                                      // }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-6 col-lg-6 col-sm-12'>
                              <div className='mb-10'>
                                <div className='row'>
                                  <div className='col-4 pt-2'>
                                    <label className='form-label align-middle'>Tanggal Akhir</label>
                                  </div>
                                  <div className='col-8'>
                                    <input
                                      name='tanggal_kunjungan'
                                      type='date'
                                      className='form-control'
                                      value={tanggalAkhir.val}
                                      onChange={handleChangeInputTanggalAkhir}
                                      placeholder={'Pilih Tanggal'}
                                      // onChange={(o: any) => {
                                      //   setTanggalAkhir(o.target.value)
                                      // }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='row g-8 mt-2'>
                              <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                                <Button
                                  className='btn btn-light-primary me-2'
                                  onClick={handleFilter}
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/general/gen021.svg'
                                    className='svg-icon-2'
                                  />
                                  Cari
                                </Button>
                                <Button
                                  className='btn btn-light-primary me-2'
                                  onClick={handleFilterReset}
                                >
                                  <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                                  Reset
                                </Button>
                              </div>
                              <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                                {/* begin::Button Unduh */}
                                <button
                                  type='button'
                                  className='btn btn-light-primary me-2'
                                  data-kt-menu-trigger='click'
                                  data-kt-menu-placement='bottom-end'
                                  onClick={() => unduhCSV(data)}
                                >
                                  <>
                                    <KTSVG
                                      path='/media/icons/duotune/arrows/arr078.svg'
                                      className='svg-icon-2'
                                    />
                                    Unduh
                                  </>
                                  {/* end::Button Unduh */}
                                </button>
                                {/* begin::Filter Button */}
                                <Button
                                  onClick={() => navigate('/pelaporan/tambah-laporan-kejadian')}
                                  className='btn btn-primary me-2'
                                >
                                  {/* begin::Add user */}
                                  <KTSVG
                                    path='/media/icons/duotune/arrows/arr075.svg'
                                    className='svg-icon-2'
                                  />
                                  Tambah
                                  {/* end::Add user */}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // VIEW PIMPINAN
                          <div className='row mt-10 mb-10'>
                            {pimpinanView === 0 ? (
                              <div className='mb-10'>
                                {/* <div className='col-md-6 col-lg-6 col-sm-12'> */}
                                <div className='row'>
                                  <div className='col pt-2'>
                                    <label className='form-label align-middle'>Kota</label>
                                  </div>
                                  <div className='col'>
                                    <AsyncSelect
                                      name='id'
                                      defaultOptions
                                      value={valKota}
                                      loadOptions={loadOptionsKota}
                                      onChange={handleChangeInputKota}
                                      styles={
                                        calculatedMode === 'dark'
                                          ? reactSelectDarkThem
                                          : reactSelectLightThem
                                      }
                                    />
                                  </div>
                                  {/* </div> */}
                                </div>
                                <div className='row g-8 mt-2'>
                                  <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                                    <Button
                                      className='btn btn-light-primary me-2'
                                      onClick={handleFilterKota}
                                    >
                                      <KTSVG
                                        path='/media/icons/duotune/general/gen021.svg'
                                        className='svg-icon-2'
                                      />
                                      Cari
                                    </Button>
                                    <Button
                                      className='btn btn-light-primary me-2'
                                      onClick={handleFilterResetKota}
                                    >
                                      <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                                      Reset
                                    </Button>
                                  </div>
                                  <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                                    {/* begin::Filter Button */}
                                    <ReactToPrint
                                      trigger={() => (
                                        <button
                                          type='button'
                                          className='btn btn-light-primary'
                                          data-kt-menu-trigger='click'
                                          data-kt-menu-placement='bottom-end'
                                        >
                                          <>
                                            <KTSVG
                                              path='/media/icons/duotune/arrows/arr078.svg'
                                              className='svg-icon-2'
                                            />
                                            Unduh PDF
                                          </>
                                          {/* )} */}
                                        </button>
                                      )}
                                      pageStyle='
                                      @page {
                                        size: auto;
                                        margin: 20mm;
                                      }
                                      @media print {
                                        html,
                                        body {
                                          height: 100%; /* Use 100% here to support printing more than a single page*/
                                          margin: 0 !important;
                                          padding: 0 !important;
                                          overflow: hidden;
                                        }
                                      }
                                      @media all {
                                        .pagebreak {
                                          display: inline;
                                        }
                                      }'
                                      content={() => componentRef}
                                    />

                                    {/* end::Filter Button */}
                                    {/* begin::SubMenu */}

                                    {/* end::SubMenu */}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <>
                                {kotaId !== 0 && jenisKejadianId !== 0 ? (
                                  ''
                                ) : (
                                  <div className='col-md-6 col-lg-6 col-sm-12'>
                                    <div className='mb-10'>
                                      <div className='row'>
                                        <div className='col-4 pt-2'>
                                          <label className='form-label align-middle'>
                                            Jenis Kejadian
                                          </label>
                                        </div>
                                        <div className='col-8'>
                                          <AsyncSelect
                                            name='filter_jenis_kejadian_id_selection'
                                            defaultOptions
                                            value={valJenisKejadian}
                                            loadOptions={loadOptionsJenisKejadian}
                                            onChange={handleChangeInputJenisKejadian}
                                            styles={
                                              calculatedMode === 'dark'
                                                ? reactSelectDarkThem
                                                : reactSelectLightThem
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <div className='col-md-6 col-lg-6 col-sm-12'>
                                  <div className='mb-10'>
                                    <div className='row'>
                                      <div className='col-4 pt-2'>
                                        <label className='form-label'>Tanggal Awal</label>
                                      </div>
                                      <div className='col-8'>
                                        <input
                                          type='date'
                                          name='tanggal_kunjungan'
                                          className='form-control'
                                          value={tanggalAwal.val}
                                          onChange={handleChangeInputTanggalAwal}
                                          placeholder={'Pilih Tanggal'}
                                          // onChange={(o: any) => {
                                          //   setTanggalAwal(o.target.value)
                                          // }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-6 col-lg-6 col-sm-12'>
                                  <div className='mb-10'>
                                    <div className='row'>
                                      <div className='col-4 pt-2'>
                                        <label className='form-label align-middle'>
                                          Tanggal Akhir
                                        </label>
                                      </div>
                                      <div className='col-8'>
                                        <input
                                          name='tanggal_kunjungan'
                                          type='date'
                                          className='form-control'
                                          value={tanggalAkhir.val}
                                          onChange={handleChangeInputTanggalAkhir}
                                          placeholder={'Pilih Tanggal'}
                                          // onChange={(o: any) => {
                                          //   setTanggalAkhir(o.target.value)
                                          // }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='row g-8 mt-2'>
                                  <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                                    <Button
                                      className='btn btn-light-primary me-2'
                                      onClick={
                                        kotaId !== 0 && jenisKejadianId !== 0
                                          ? handleFilterDetail
                                          : handleFilterDetailJumlah
                                      }
                                    >
                                      <KTSVG
                                        path='/media/icons/duotune/general/gen021.svg'
                                        className='svg-icon-2'
                                      />
                                      Cari
                                    </Button>
                                    <Button
                                      className='btn btn-light-primary me-2'
                                      onClick={
                                        kotaId !== 0 && jenisKejadianId !== 0
                                          ? handleFilterResetDetail
                                          : handleFilterResetDetailJumlah
                                      }
                                    >
                                      <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                                      Reset
                                    </Button>
                                  </div>
                                  <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                                    {/* begin::Filter Button */}
                                    {/* <button
                                          type='button'
                                          className='btn btn-light-primary'
                                          data-kt-menu-trigger='click'
                                          data-kt-menu-placement='bottom-end'
                                        > */}
                                    {/* {btnLoadingUnduh ? (
                                    <>
                                      <span className='spinner-border spinner-border-md align-middle me-3'></span>{' '}
                                      Memproses Unduh...
                                    </>
                                  ) : ( */}
                                    {/* <>
                                            <KTSVG
                                              path='/media/icons/duotune/arrows/arr078.svg'
                                              className='svg-icon-2'
                                            />
                                            Unduh
                                          </> */}
                                    {/* )} */}
                                    {/* </button> */}
                                    {/* end::Filter Button */}
                                    {/* begin::SubMenu */}
                                    {/* <div
                                          className='menu menu-sub menu-sub-dropdown w-100px w-md-150px'
                                          data-kt-menu='true'
                                        > */}
                                    {/* begin::Header */}
                                    {/* <div className='px-7 py-5'>
                                            <div className='fs-5 text-dark fw-bolder'>
                                              Pilihan Unduh
                                            </div>
                                          </div> */}
                                    {/* end::Header */}

                                    {/* begin::Separator */}
                                    {/* <div className='separator border-gray-200'></div> */}
                                    {/* end::Separator */}

                                    {/* begin::Content */}
                                    {/* <div
                                            className='px-7 py-5'
                                            data-kt-user-table-filter='form'
                                          >
                                            <button
                                              //   onClick={handleUnduh}
                                              className='btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success w-100'
                                            >
                                              Excel
                                            </button>
                                          </div> */}
                                    {/* end::Content */}

                                    {/* begin::Content */}
                                    {/* <div
                                            className='px-7 py-2'
                                            data-kt-user-table-filter='form'
                                          >
                                            <button className='btn btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger w-100'>
                                              PDF
                                            </button>
                                          </div> */}
                                    {/* end::Content */}
                                    {/* </div> */}
                                    {/* end::SubMenu */}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card-body py-4'>
                  {aksi === 0 ? (
                    <DtKabid
                      data={data}
                      totalRows={totalRows}
                      handlePerRowsChange={handlePerRowsChange}
                      handlePageChange={handlePageChange}
                      loading={loading}
                      hakAkses={hakAkses}
                      wilayahBidang={wilayahBidang}
                      theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                    />
                  ) : aksi === 1 ? (
                    <DtAdmin
                      data={data}
                      totalRows={totalRows}
                      handlePerRowsChange={handlePerRowsChange}
                      handlePageChange={handlePageChange}
                      loading={loading}
                      hakAkses={hakAkses}
                      wilayahBidang={wilayahBidang}
                      konfirDel={konfirDel}
                      theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                    />
                  ) : (
                    // Pimpinan
                    <div ref={(el) => (componentRef = el)}>
                      <div className='row'>
                        <div className='col fs-4 mb-2 fw-semibold text-center'>
                          LAPORAN HASIL KEJADIAN
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col fs-4 mb-2 fw-semibold text-center'>
                          PADA SATPOL PP......................................
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col fs-4 mb-6 fw-semibold text-center'>
                          PERIODE .................... s/d .......................
                        </div>
                      </div>
                      {pimpinanView === 0 ? (
                        <DtPimpinan
                          aksi={viewPimpinanDetail}
                          jumlah={viewPimpinanDetailJumlah}
                          theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                          kota={kota}
                          pelaporanUrl={PELAPORAN_URL}
                        />
                      ) : (
                        <>
                          <DtKabid
                            data={
                              kotaId !== 0 && jenisKejadianId !== 0
                                ? dataPimpinan
                                : dataPimpinanJumlah
                            }
                            totalRows={totalRows}
                            handlePerRowsChange={handlePerRowsChangeDetail}
                            handlePageChange={handlePageChangeDetail}
                            loading={loading}
                            hakAkses={hakAkses}
                            wilayahBidang={wilayahBidang}
                            theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                          />{' '}
                          <Button className='btn btn-secondary me-2' onClick={viewPimpinan}>
                            <i className='fa-solid fa-arrow-left'></i>
                            Kembali
                          </Button>
                        </>
                      )}
                      <div className='row'>
                        <div className='col-8'></div>
                        <div className='col-4 fs-6 mb-2 fw-semibold text-center'>
                          Jakarta, ..............................20...
                          <div className='col fs-6 mb-15 fw-semibold text-center'>
                            KEPALA SATUAN POLISI PAMONG PRAJA
                            ...............................................................
                          </div>
                          <div className='col fs-6 mb-2 fw-semibold text-center'>NAMA</div>
                          <div className='col fs-6 mb-2 fw-semibold text-center'>
                            NIP. ......................
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
