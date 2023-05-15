import { useState, useEffect, FC } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import buildQuery from 'odata-query-sequelize'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeModeComponent } from '../../../../_metronic/assets/ts/layout'
import { DtPerdaPerkadaPelaksana } from './datatables/data-table-laporan-perda-perkada'
import { useThemeMode } from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { LaporanPerdaPerkadaHeader } from './LaporanPerdaPerkadaHeader'
import { KTSVG } from '../../../../_metronic/helpers'
import AsyncSelect from 'react-select/async'
import FileDownload from 'js-file-download'
import Swal from 'sweetalert2'


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
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`
export const MASTER_URL = `${API_URL}/master`

interface pelaksanaInterface {
  no: number
  pelaksana: string
  jumlah_pelanggaran: number
  peringatan: number
  penutupan_penyegelan: number
  pencabutan_izin: number
  yang_lain: number
  denda_pengadilan: string
  denda_non_pengadilan: string
}

interface SelectOptionAutoCom {
  readonly value: string
  readonly label: string
  readonly kode: string
}

export const PerdaPerkada_Pelaksana: FC = () => {
  const navigate = useNavigate()
  const { mode } = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)

  const [jenisKegiatanList, setJenisKegiatanList] = useState([])
  const [valJenisPenertiban, setValJenisPenertiban] = useState({ value: '', label: '' })
  const [valJenisPerdaPerkada, setValJenisPerdaPerkada] = useState({ value: '', label: '' })

  const [hakAkses, setHakAkses] = useState([])
  const [wilayahBidang, setWilayahBidang] = useState([])
  const [tanggalAwal, setTanggalAwal] = useState({ val: '' })
  const [tanggalAkhir, setTanggalAkhir] = useState({ val: '' })

  const [data, setData] = useState<pelaksanaInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [qParamFind, setUriFind] = useState({ strparam: '' })
  useEffect(() => {
    handleHakAkses()
    handleWilayahBidang()
  }, [])

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

  const handleFilter = async () => {
    let uriParam = ''
    if (tanggalAwal.val && tanggalAkhir.val) {
      uriParam += `kegiatan__tanggal%20ge%20%27${tanggalAwal.val}%27%20and%20kegiatan__tanggal%20le%20%27${tanggalAkhir.val}%27`
    } else if (tanggalAwal.val !== '') {
      uriParam += `kegiatan__tanggal%20eq%20%27${tanggalAwal.val}%27`
    } else if (tanggalAkhir.val !== '') {
      uriParam += `kegiatan__tanggal%20eq%20%27${tanggalAkhir.val}%27`
    }
    if (valJenisPenertiban.value !== '' && (tanggalAwal.val || tanggalAkhir.val)) {
      uriParam += `%20and%tindak_lanjut__administrasi__jenis_penertiban%20eq%20%27${valJenisPenertiban.value}%27`
    } else if (valJenisPenertiban.value !== '') {
      uriParam += `tindak_lanjut__administrasi__jenis_penertiban%20eq%20%27${valJenisPenertiban.value}%27`
    }
    if (valJenisPerdaPerkada.value !== '' && (tanggalAwal.val || tanggalAkhir.val)) {
      uriParam += `%20and%tindak_lanjut__administrasi__perda_perkada%20eq%20%27${valJenisPerdaPerkada.value}%27`
    } else if (valJenisPerdaPerkada.value !== '') {
      uriParam += `tindak_lanjut__administrasi__perda_perkada%20eq%20%27${valJenisPerdaPerkada.value}%27`
    }
    setUriFind((prevState) => ({ ...prevState, strparam: uriParam }))
  }

  const handleFilterReset = () => {
    setTanggalAwal({ val: '' })
    setTanggalAkhir({ val: '' })
    setDataKota({ value: '', label: '' })
    setDataKec({ value: '', label: '' })
    setDataKel({ value: '', label: '' })
    setUriFind((prevState) => ({ ...prevState, strparam: '' }))
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
        // const arr: pelaksanaInterface[] = [
        // { no: 1, pelaksana: 'KOTA ADMINISTRASI JAKARTA PUSAT', jumlah_pelanggaran: 35, peringatan: 5, penutupan_penyegelan: 10, pencabutan_izin: 0, yang_lain: 20, denda_pengadilan: '2.000.000', denda_non_pengadilan: '50.000.000' }, 
        // { no: 2, pelaksana: 'KOTA ADMINISTRASI JAKARTA UTARA', jumlah_pelanggaran: 70, peringatan: 10, penutupan_penyegelan: 20, pencabutan_izin: 0, yang_lain: 40, denda_pengadilan: '2.000.000', denda_non_pengadilan: '50.000.000' }, 
        // { no: 3, pelaksana: 'KOTA ADMINISTRASI JAKARTA BARAT', jumlah_pelanggaran: 100, peringatan: 15, penutupan_penyegelan: 25, pencabutan_izin: 0, yang_lain: 60, denda_pengadilan: '2.000.000', denda_non_pengadilan: '50.000.000' }, 
        // { no: 4, pelaksana: 'KOTA ADMINISTRASI JAKARTA SELATAN', jumlah_pelanggaran: 95, peringatan: 20, penutupan_penyegelan: 30, pencabutan_izin: 0, yang_lain: 45, denda_pengadilan: '2.000.000', denda_non_pengadilan: '50.000.000' },
        // { no: 5, pelaksana: 'KOTA ADMINISTRASI JAKARTA TIMUR', jumlah_pelanggaran: 95, peringatan: 20, penutupan_penyegelan: 30, pencabutan_izin: 0, yang_lain: 45, denda_pengadilan: '2.000.000', denda_non_pengadilan: '50.000.000' }]
        setData(data)
        setTotalRows(res.data.total_items)
        setLoading(false)

        return [data, setData] as const
      })
  }

  useEffect(() => {
    dataPerdaPerkada(0)
  }, [qParamFind, perPage])

  const [kota, setKota] = useState([])
  const [qParamFindKota, setUriFindKota] = useState({ strParamKota: '' })

  const kotaList = async () => {
    const response = await axios.get(`${MASTERDATA_URL}/kota${qParamFindKota.strParamKota}`)
    const dataKota = response.data.data.map((d: any) => ({
      id: d.id,
      no: d.id,
      pelaksana_kegiatan: d.nama,
    }))
    Array.from(dataKota).forEach((item: any, index: any) => {
      item.serial = index + 1
    })
    setKota(dataKota)

    return [kota, setKota] as const
  }

  useEffect(() => {
    kotaList()
  }, [qParamFindKota])

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
          total_item: d.total_item,
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

  const LoadingAnimation = (props: any) => {
    return (
      <>
        <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
          <span className='spinner-border spinner-border-xl align-middle me-3'></span>
          <div className='d-flex flex-column'>
            <h5 className='mb-1'>Sedang mengambil data...</h5>
          </div>
        </div>
      </>
    )
  }

  const handleHakAkses = async () => {
    const response = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/hak-akses/find`)
    setHakAkses(response.data.data)
  }

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

  const filterbidangwilayah = async (inputValue: string) => {
    const response = await axios.get(`${MASTERDATA_URL}/filter/${inputValue}`)
    const json = response.data.data
    return json.map((i: any) => ({ label: i.nama, value: i.id }))
  }
  const loadOptionsbidangwilayah = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterbidangwilayah(inputValue))
    }, 1000)
  }

  // GET KOTA
  const [inputValKota, setDataKota] = useState<any>({})
  const filterKota = async (inputValue: string) => {
    const response = await axios.get(MASTERDATA_URL + '/kota')
    let json = await response.data.data

    if (inputValue !== '') {
      const mappingData: any[] = await json.filter((i: any) => {
        const valueLabel: string = i.nama.toLowerCase()
        if (valueLabel.indexOf(inputValue.toLowerCase()) >= 0)
          return i
      })
      return mappingData.map((i: any) => ({ label: i.nama, value: i.id, kode: i.kode }))

    }
    return json.map((i: any) => ({ label: i.nama, value: i.id, kode: i.kode }))
  }

  const loadOptionsKota = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKota(inputValue))
    }, 1000)
  }

  const handleChangeInputKota = async (newValue: any) => {
    const filter = {
      kode_kota: { eq: newValue.kode }
    }
    const query = buildQuery({ filter })
    const response = await axios.get(MASTERDATA_URL + '/kecamatan' + query)
    let json = await response.data.data
    setKec(json.map((i: any) => ({ label: i.nama, value: i.id, kode: i.kode })))
    setDataKota({ ...newValue })

  }

  // GET KECAMATAN
  const [inputValKec, setDataKec] = useState<any>({})
  const [inputKec, setKec] = useState<SelectOptionAutoCom[]>([])

  const filterKec = async (inputValue: string) => {
    const filter = {
      kode_kota: { eq: inputValKota.kode }
    }
    const query = buildQuery({ filter })
    const response = await axios.get(MASTERDATA_URL + '/kecamatan' + query)
    let json = response.data.data

    if (inputValue !== "") {
      const mappingData: any[] = await json.filter((i: any) => {
        const valueLabel: string = i.nama.toLowerCase()
        if (valueLabel.indexOf(inputValue.toLowerCase()) >= 0) return i
      })
      return mappingData.map((i: any) => ({ label: i.nama, value: i.id, kode: i.kode }))
    }
    return inputKec
  }
  const loadOptionsKec = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
    setTimeout(async () => {
      callback(await filterKec(inputValue))
    }, 1000)
  }

  const handleInputKec = async (newValue: any) => {
    const filter = {
      kode_kecamatan: { eq: newValue.kode }
    }
    const query = buildQuery({ filter })
    const response = await axios.get(MASTERDATA_URL + '/kelurahan' + query)
    let json = await response.data.data
    setKel(json.map((i: any) => ({ label: i.nama, value: i.id, kode: i.kode })))
    setDataKec((prevstate: any) => ({ ...prevstate, ...newValue }))
  }

  // GET KELURAHAN
  const [inputValKel, setDataKel] = useState<any>({})
  const [inputKel, setKel] = useState<SelectOptionAutoCom[]>([])

  const filterKel = async (inputValue: string) => {
    const filter = {
      kode_kecamatan: { eq: inputValKec.kode }
    }
    const query = buildQuery({ filter })
    const response = await axios.get(MASTERDATA_URL + '/kelurahan' + query)
    let json = await response.data.data

    if (inputValue !== "") {
      const mappingData: any[] = await json.filter((i: any) => {
        const valueLabel: string = i.nama.toLowerCase();
        if (valueLabel.indexOf(inputValue.toLowerCase()) >= 0) return i;
      })
      return mappingData.map((i: any) => ({ label: i.nama, value: i.id, kode: i.kode }))
    }
    return inputKel
  }
  const loadOptionsKel = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
    setTimeout(async () => {
      callback(await filterKel(inputValue))
    }, 1000)
  }
  const handleInputKel = (newValue: any) => {
    setDataKel((prevstate: any) => ({ ...prevstate, ...newValue }))
  }

  return (
    <>
      <LaporanPerdaPerkadaHeader />
      <div className='card'>
        {/* begin::Body */}
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
                <div className='row w-100 mt-10 mb-10'>
                  <div className='col-md-6 col-lg-6 col-sm-12'>
                    <div className='mb-10'>
                      <div className='row'>
                        <div className='col-4 pt-2'>
                          <label className='form-label align-middle'>Pelaksana Kegiatan</label>
                        </div>
                        <div className='col-8'>
                          <AsyncSelect
                            defaultOptions
                            placeholder='Pilih Pelaksana Kegiatan'
                            // value={valJenisPenertiban}
                            // loadOptions={loadOptionsJenisPenertiban}
                            // onChange={handleChangeInputJenisPenertiban}
                            styles={
                              calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
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
                          <label className='form-label align-middle'>Kota</label>
                        </div>
                        <div className='col-8'>
                          <AsyncSelect
                            defaultOptions
                            loadOptions={loadOptionsKota}
                            onChange={handleChangeInputKota}
                            placeholder={'Pilih Kota'}
                            styles={
                              calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
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
                          <label className='form-label align-middle'>Kecamatan</label>
                        </div>
                        <div className='col-8'>
                          <AsyncSelect
                            defaultOptions={inputKec}
                            loadOptions={loadOptionsKec}
                            onChange={handleInputKec}
                            placeholder={'Pilih Kecamatan'}
                            styles={
                              calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
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
                          <label className='form-label align-middle'>Kelurahan</label>
                        </div>
                        <div className='col-8'>
                          <AsyncSelect
                            defaultOptions={inputKel}
                            loadOptions={loadOptionsKel}
                            onChange={handleInputKel}
                            placeholder={'Pilih Kelurahan'}
                            styles={
                              calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
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
                            placeholder='Isi Tanggal Kunjungan'
                            type='date'
                            name='tanggal_kunjungan'
                            className='form-control'
                            value={tanggalAwal.val}
                            onChange={handleChangeInputTanggalAwal}
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
                            placeholder='Isi Tanggal Kunjungan'
                            name='tanggal_kunjungan'
                            type='date'
                            className='form-control'
                            value={tanggalAkhir.val}
                            onChange={handleChangeInputTanggalAkhir}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* END :: Filter Form */}

                  {/* Search and Reset */}
                  <div className='row g-8 mt-2'>
                    <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                      <Link to='#'>
                        <Button className='btn btn-light-primary me-2' onClick={handleFilter}>
                          <KTSVG
                            path='/media/icons/duotune/general/gen021.svg'
                            className='svg-icon-2'
                          />
                          Cari
                        </Button>
                      </Link>
                      <Link to='#'>
                        <Button className='btn btn-light-primary me-2' onClick={handleFilterReset}>
                          <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                          Reset
                        </Button>
                      </Link>
                    </div>
                    <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                      <Button
                        type='button'
                        className='btn btn-primary'
                        data-kt-menu-trigger='click'
                        data-kt-menu-placement='bottom-end'
                      >
                        Pilih Tabel Berdasarkan
                      </Button>
                      <div
                        className='menu menu-sub menu-sub-dropdown w-180px w-md-200px'
                        data-kt-menu='true'
                      >
                        {/* begin::Separator */}
                        <div className='separator border-gray-200'></div>
                        {/* end::Separator */}

                        {/* begin::Content */}
                        <div data-kt-user-table-filter='form'>
                          <button
                            onClick={() => navigate('/perdaperkada/LaporanPerdaPerkada/')}
                            className='btn btn-outline btn-active-light-primary w-100'
                          >
                            Pelaksana Kegiatan
                          </button>
                        </div>
                        {/* end::Content */}

                        {/* begin::Content */}
                        <div data-kt-user-table-filter='form'>
                          <button
                            onClick={() => navigate('/perdaperkada/PerdaPerkada_Pelaksana/')}
                            className='btn btn-outline btn-active-light-primary w-100'
                          >
                            Jenis Penertiban
                          </button>
                        </div>
                        {/* end::Content */}
                      </div>
                      {/*  end::SubMenu */}
                    </div>
                  </div>
                  {/* END :: Button */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col fs-4 mb-2 fw-semibold text-center'>
            LAPORAN HASIL PENEGAKAN PERDA / PERKADA
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
        <div className='card-body py-4'>
          <DtPerdaPerkadaPelaksana
            data={data}
            kota={kota}
            totalRows={totalRows}
            handlePerRowsChange={handlePerRowsChange}
            handlePageChange={handlePageChange}
            loading={loading}
            jenisKegiatanList={jenisKegiatanList}
            hakAkses={hakAkses}
            wilayahBidang={wilayahBidang}
            theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
          />
        </div>
      </div>
    </>
  )
}
