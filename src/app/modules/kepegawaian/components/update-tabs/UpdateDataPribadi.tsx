import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Select from 'react-select'
import { UpdateHeaderDetail } from './UpdateHeaderDetail'
import { DetailPegawaiInterface } from '../KepegawaianInterface'
import { Formik, Field, FormikHelpers } from 'formik';

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function UpdateDataPribadi() {
  const { id, status } = useParams()
  console.log('id, status', id, status)
  const [data, setData] = useState<DetailPegawaiInterface>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${KEPEGAWAIAN_URL}/findone/${id}/${status}`
      )
      setData((prevstate) => ({ ...prevstate, ...response.data.data }))
      // console.log(response.data.data);
    }
    fetchData()
  }, [setData])

  const jenisKelamin = [
    { value: 'LAKI-LAKI', label: 'LAKI-LAKI' },
    { value: 'PEREMPUAN', label: 'PEREMPUAN' }
  ]

  const statusPerkawinan = [
    { value: 'KAWIN', label: 'KAWIN' },
    { value: 'BELUM KAWIN', label: 'BELUM KAWIN' }
  ]

  const agama = [
    { value: 'Islam', label: 'Islam' },
    { value: 'Katolik', label: 'Katolik' },
    { value: 'Kristen Protestan', label: 'Kristen Protestan' }
  ]

  const provinsi = [
    { value: 'DKI JAKARTA', label: 'DKI JAKARTA' },
    { value: 'JAWA BARAT', label: 'JAWA BARAT' },
    { value: 'JAWA TIMUR', label: 'JAWA TIMUR' }
  ]

  const kabKota = [
    { value: 'KOTA JAKARTA UTARA', label: 'KOTA JAKARTA UTARA' },
    { value: 'KELAPA GADING BARAT', label: 'KELAPA GADING BARAT' },
    { value: 'KELAPA GADING TIMUR', label: 'KELAPA GADING TIMUR' },
    { value: 'PEGANGSAAN DUA', label: 'PEGANGSAAN DUA' }
  ]

  const kecamatan = [
    { value: 'TANJUNG PRIOK', label: 'TANJUNG PRIOK' },
    { value: 'KELAPA GADING BARAT', label: 'KELAPA GADING BARAT' },
    { value: 'KELAPA GADING TIMUR', label: 'KELAPA GADING TIMUR' },
    { value: 'PEGANGSAAN DUA', label: 'PEGANGSAAN DUA' }
  ]

  const kelurahan = [
    { value: 'PAPANGO', label: 'PAPANGO' },
    { value: 'KELAPA GADING BARAT', label: 'KELAPA GADING BARAT' },
    { value: 'KELAPA GADING TIMUR', label: 'KELAPA GADING TIMUR' },
    { value: 'PEGANGSAAN DUA', label: 'PEGANGSAAN DUA' }
  ]

  return (
    <>
      {/* begin::Body */}
      <UpdateHeaderDetail />
      {/* Second Card */}

      <Formik
        initialValues={{
          ...data
        }}
        onSubmit={(
          values: DetailPegawaiInterface,
          { setSubmitting }: FormikHelpers<DetailPegawaiInterface>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
        enableReinitialize
      >
        <div className='card mb-5 mb-xl-10'>
          <div className="card-header cursor-pointer">
            <div className="card-title m-0">
              <h3 className="fw-bold m-0">Data Pribadi</h3>
            </div>
          </div>
          <div className="card-body p-9">
            <div className="row">
              <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                <label htmlFor="" className="mb-3">Nama</label>
                <Field className="form-control form-control form-control-solid mb-4" name="nama" id="nama" placeholder="John" />
              </div>
              <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                <label htmlFor="" className="mb-3">Tempat, Tanggal Lahir</label>
                <div className="row">
                  <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                    <Field type="text" name="tempat_lahir" className="form-control form-control form-control-solid mb-4" placeholder="Tempat" />
                  </div>
                  <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                    <Field type="date" name="tgl_lahir" className="form-control form-control-solid" placeholder="Tanggal Lahir" />
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                <div className="row">
                  <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                    <label htmlFor="" className="mb-3">Jenis Kelamin</label>
                    <Select name="jenis_kelamin" options={jenisKelamin} />
                  </div>
                  <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                    <label htmlFor="" className="mb-3">Agama</label>
                    <Select options={agama} />
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="" className="mb-3">NIK</label>
                    <Field type="text" name="nik" className="form-control form-control form-control-solid mb-4" placeholder="NIK" />
                  </div>
                  <div className="col-6">
                    <label htmlFor="" className="mb-3">Nomor KK</label>
                    <Field type="text" name="no_kk" className="form-control form-control form-control-solid mb-4" placeholder="Nomor KK" />
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                <div className="row">
                  <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                    <label htmlFor="" className="mb-3">Status Perkawinan</label>
                    <Select options={statusPerkawinan} />
                  </div>
                  <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                    <label htmlFor="" className="mb-3">Umur</label>
                    <Field type="number" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="Umur" />
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                <label htmlFor="" className="mb-3">Nomor HP</label>
                <Field type="text" className="form-control form-control form-control-solid mb-4" name="no_hp" placeholder="Nomor HP" />
              </div>

              <div className="col-12 mb-4">
                <hr className="fg-gray" />
              </div>

              <div className="col-12">
                <div className="row">
                  <div className="col-xxl-10 col-md-10 col-lg-10 col-sm-12">
                    <label htmlFor="" className="mb-3">Alamat Sesuai KTP</label>
                    <Field type="text" className="form-control form-control form-control-solid mb-3" name="sesuai_ktp_alamat" placeholder="Alamat Sesuai KTP" />
                  </div>
                  <div className="col-xxl-2 col-md-2 col-lg-2 col-sm-12">
                    <label htmlFor="" className="mb-3">RT/RW</label>
                    <Field type="text" className="form-control form-control form-control-solid mb-4" name="sesuai_ktp_rtrw" placeholder="RT/RW" />
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                <div className="row">
                  <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                    <label htmlFor="" className="mb-3">Provinsi</label>
                    <Select options={provinsi} />
                  </div>
                  <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                    <label htmlFor="" className="mb-3">Kab/Kota</label>
                    <Select options={kabKota} />
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                <div className="row">
                  <div className="col-xxl-6 col-md-10 col-lg-6 col-sm-12">
                    <label htmlFor="" className="mb-3">Kecamatan</label>
                    <Select options={kecamatan} />
                  </div>
                  <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                    <label htmlFor="" className="mb-3">Kelurahan</label>
                    <Select options={kelurahan} />
                  </div>
                </div>
              </div>

              <div className="col-12 mt-7">
                <hr className="fg-gray" />
              </div>

              <div className="col-12 mt-4">
                <div className="row">
                  <div className="col-xxl-10 col-md-10 col-lg-10 col-sm-12">
                    <label htmlFor="" className="mb-3">Alamat Domisili</label>
                    <Field type="text" className="form-control form-control form-control-solid mb-4" name="domisili_alamat" placeholder="Alamat Domisili" />
                  </div>
                  <div className="col-xxl-2 col-md-2 col-lg-2 col-sm-12">
                    <label htmlFor="" className="mb-3">RT/RW</label>
                    <Field type="text" className="form-control form-control form-control-solid mb-4" name="domisili_rtrw" placeholder="RT/RW" />
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                <div className="row">
                  <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                    <label htmlFor="" className="mb-3">Provinsi</label>
                    <Select options={provinsi} />
                  </div>
                  <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                    <label htmlFor="" className="mb-3">Kab/Kota</label>
                    <Select options={kabKota} />
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                <div className="row">
                  <div className="col-xxl-6 col-md-10 col-lg-6 col-sm-12">
                    <label htmlFor="" className="mb-3">Kecamatan</label>
                    <Select options={kecamatan} />
                  </div>
                  <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                    <label htmlFor="" className="mb-3">Kelurahan</label>
                    <Select options={kelurahan} />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-0 mt-6">
              <div className="text-center">
                <Link
                  className="text-reset text-decoration-none"
                  to="/kepegawaian/InformasiDataPegawai"
                >
                  <button className="float-none btn btn-secondary align-self-center m-1">
                    <i className="fa fa-close"></i>
                    Batal
                  </button>
                </Link>
                <Link
                  className="text-reset text-decoration-none"
                  to={`/kepegawaian/UpdateDataKeluarga/${id}/${status}`}
                >
                  <button className="float-none btn btn-primary align-self-center m-1">
                    <i className="fa-solid fa-arrow-right"></i>
                    Lanjut
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Formik>
      {/* end::Body */}
    </>

  )
}
