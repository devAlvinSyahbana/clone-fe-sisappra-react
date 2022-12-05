import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';
import { RMIUploader } from "react-multiple-image-uploader";
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import AsyncSelect from 'react-select/async';
import { SelectOptionAutoCom } from '../../kepegawaian/components/KepegawaianInterface';
import axios from 'axios';


const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KOTA_URL = `${API_URL}/master/kota`

export function TambahLaporanKejadian() {
  const [valJenisKejadian, setValJenisKejadian] = useState({ val: '' })
  const arrJenisKejadian = ['Banjir', 'Hewan Buas dan Berbisa', 'Kebakaran', 'Pendampingan Kekerasan Pada Perempuan Dan Anak', 'Kerusakan Konstruksi', 'Kriminalitas', 'Pembunuhan', 'Penemuan Mayat', 'Penyelamatan Orang', 'Pohon Tumbang', 'Tawuran', 'Terorisme', 'Unjuk Rasa']
  // BEGIN::JK BANJIR
  const [valKetinggianAir, setValKetinggianAir] = useState({ val: '' })
  const [valJumlahPengungsi, setValJumlahPengungsi] = useState({ val: '' })
  const [valJumlahPengungsiPerKK, setValJumlahPengungsiPerKK] = useState({ val: '' })
  const [valLokasiPenampungan, setValLokasiPenampungan] = useState({ val: '' })
  const [valLokasiDapurUmum, setValLokasiDapurUmum] = useState({ val: '' })
  // END:: JK BANJIR

  // Begin :: JK "Pendampingan Kekerasan"
  const [valSumberInformasi, setValSumberInformasi] = useState({ val: '' })
  const arrSumberInformasi = ['Pengaduan Langsung', 'Pengaduan CRM(112)', 'Media Sosial', 'Lain-lain']
  const [valJenisKekerasan, setValJenisKekerasan] = useState({ val: '' })
  const arrJenisKekerasan = ['KDRT/KDP (FISIK)', 'Penelantaran', 'Seksual', 'Psikis', 'Bullying']
  // End :: JK "Pendampingan Kekerasan"

  // Begin :: JK "Unjuk Rasa"
  const [valJumlahMassa, setValJumlahMassa] = useState({ val: '' })
  const [valTuntutan, setValTuntutan] = useState({ val: '' })
  const [valPJUnras, setValPJUnras] = useState({ val: '' })
  // End :: JK "Unjuk Rasa"

  const handleChangeJenisKejadian = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValJenisKejadian({ val: event.target.value })
  }

  // BEGIN::JK "BANJIR"
  const handleChangeInputKetinggianAir = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValKetinggianAir({ val: event.target.value })
  }
  const handleChangeInputJumlahPengungsi = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValJumlahPengungsi({ val: event.target.value })
  }
  const handleChangeInputJumlahPengungsiPerKK = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValJumlahPengungsiPerKK({ val: event.target.value })
  }
  const handleChangeInputLokasiPenampungan = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValLokasiPenampungan({ val: event.target.value })
  }
  const handleChangeInputLokasiDapurUmum = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValLokasiDapurUmum({ val: event.target.value })
  }
  // End::JK "BANJIR"

  // Begin :: JK "Pendampingan Kekerasan" 
  const handleChangeSumberInformasi = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValSumberInformasi({ val: event.target.value })
  }
  const handleChangeJenisKekerasan = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValJenisKekerasan({ val: event.target.value })
  }
  // End :: JK "Pendampingan Kekerasan"

  // Begin :: JK "Unjuk Rasa" 
  const handleChangeJumlahMassa = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValJumlahMassa({ val: event.target.value })
  }
  const handleChangeTuntutan = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValTuntutan({ val: event.target.value })
  }
  const handleChangePJUnras = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValPJUnras({ val: event.target.value })
  }
  // End :: JK "Unjuk Rasa"

  const [inputValAtasan, setDataAtasan] = useState({ label: '', value: null })
  const filterAtasan = async (inputValue: string) => {
    const response = await axios.get(KOTA_URL + "/find");
    const json = await response.data.data
    return json.map((i: any) => ({ label: i.kota, value: i.kota }))
  }

  const loadOptionsAtasan = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
    setTimeout(async () => {
      callback(await filterAtasan(inputValue))
    }, 1000)
  }
  const handleInputAtasan = (newValue: any) => {
    setDataAtasan((prevstate: any) => ({ ...prevstate, ...newValue }))
  }
  const initialValues = {
    friends: [
      {
        Jrnis_bantuan: '',
      },
    ],
  };

  var [value, onChange] = useState(new Date()); /* Date Picker */
  const initialState = { alt: "", src: "" };
  const [{ alt, src }, setPreview] = useState(initialState);

  const fileHandler = (event: { target: { files: any; }; }) => {
    const { files } = event.target;
    setPreview(
      files.length
        ? {
          src: URL.createObjectURL(files[0]),
          alt: files[0].name
        }
        : initialState
    );
  };

  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
          <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
              <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                Tambah Laporan Kejadian
              </h1>
            </div>
          </div>
        </div>
        <div id="kt_app_content" className="app-content flex-column-fluid">
          <div id="kt_app_content_container" className="app-container container-xxl">
            <div className="card mb-5 mb-xl-10">
              <div className="card-body">
                <Tabs>
                  <TabList>
                    <Tab>Kejadian</Tab>
                    <Tab>Tindak Lanjut</Tab>
                  </TabList>
                  <form>
                    <div className="form-group">
                      <TabPanel>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Tanggal Kejadian</label>
                          </div>
                          <div className="col-md-4">
                            <DatePicker className="form-control form-control-solid" onChange={onChange} value={value} />
                            {/* <input className="form-control form-control-solid" placeholder="20/12/2021"
                              id="kt_daterangepicker_single"></input> */}
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Waktu Kejadian</label>
                          </div>
                          <div className="col-md-4">
                            <input placeholder="07:00:00" className="form-control form-control-solid"
                              id="kt_datepicker_time" />
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Kota</label>
                          </div>
                          <div className="col-md-4">
                            <input type="text" placeholder="Jakarta Selatan"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Kecamatan</label>
                          </div>
                          <div className="col-md-4">
                            <input type="text" placeholder="Jagakarsa"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Kelurahan</label>
                          </div>
                          <div className="col-md-4">
                            <input type="text" placeholder="Ciganjur"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Alamat Lengkap</label>
                          </div>
                          <div className="col-md-4">
                            <textarea className="form-control form-control form-control-solid" data-kt-autosize="true"
                              placeholder="Jl. Sirsak Ujung Kel. Ciganjur Kec. Jagakarsa"></textarea>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Jenis Kejadian</label>
                          </div>
                          <div className="col-md-4">
                            <select
                              className="form-select form-select-solid"
                              value={valJenisKejadian.val}
                              onChange={handleChangeJenisKejadian}
                              name='val'
                            >
                              <option value='' className='text-muted' disabled>Pilih Jenis Kejadian</option>
                              {arrJenisKejadian.map((val: string) => {
                                return <option value={val}>{val}</option>
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Uraian Kejadian</label>
                          </div>
                          <div className="col-md-4">
                            <textarea className="form-control form-control form-control-solid" data-kt-autosize="true"
                              placeholder="Telah terjadi ........................................"></textarea>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Jumlah Personil Satpol PP</label>
                          </div>
                          <div className="col-md-1">
                            <input placeholder="0" type="number"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Jumlah Personil Instansi Lain</label>
                          </div>
                          <div className="col-md-1">
                            <input placeholder="0" type="number"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                        </div>
                        {valJenisKejadian.val === 'Banjir' ? (
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">
                                Ketinggian Air
                              </label>
                            </div>
                            <div className="col-md-4">
                              <input
                                type='text'
                                className='form-control form-control form-control-solid'
                                name='ketinggianair'
                                value={valKetinggianAir.val}
                                onChange={handleChangeInputKetinggianAir}
                                placeholder='20'
                              />
                            </div>
                          </div>
                        ) : null}
                        {valJenisKejadian.val === 'Banjir' ? (
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">
                                {valJenisKejadian.val === 'Banjir'
                                  ? 'Jumlah Pengungsi'
                                  : 'Jumlah Pengungsi'}
                              </label>
                            </div>
                            <div className="col-md-4">
                              <input
                                type='text'
                                className='form-control form-control form-control-solid'
                                value={valJumlahPengungsi.val}
                                onChange={handleChangeInputJumlahPengungsi}
                                placeholder={
                                  valJenisKejadian.val === 'Banjir'
                                    ? 'Jumlah Pengungsi'
                                    : 'Jumlah Pengungsi'
                                }
                              />
                            </div>
                          </div>
                        ) : null}
                        {valJenisKejadian.val === 'Banjir' ? (
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">
                                {valJenisKejadian.val === 'Banjir'
                                  ? 'Jumlah Pengungsi Per KK'
                                  : 'Jumlah Pengungsi Per KK'}
                              </label>
                            </div>
                            <div className="col-md-4">
                              <input
                                type='text'
                                className='form-control form-control form-control-solid'
                                value={valJumlahPengungsiPerKK.val}
                                onChange={handleChangeInputJumlahPengungsiPerKK}
                                placeholder={
                                  valJenisKejadian.val === 'Banjir'
                                    ? 'Jumlah Pengungsi Per KK'
                                    : 'Jumlah Pengungsi Per KK'
                                }
                              />
                            </div>
                          </div>
                        ) : null}
                        {valJenisKejadian.val === 'Banjir' ? (
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">
                                {valJenisKejadian.val === 'Banjir'
                                  ? 'Lokasi Penampungan'
                                  : 'Lokasi Penampungan'}
                              </label>
                            </div>
                            <div className="col-md-4">
                              <input
                                type='text'
                                className='form-control form-control form-control-solid'
                                value={valLokasiPenampungan.val}
                                onChange={handleChangeInputLokasiPenampungan}
                                placeholder={
                                  valJenisKejadian.val === 'Banjir'
                                    ? 'Lokasi Penampungan'
                                    : 'Lokasi Penampungan'
                                }
                              />
                            </div>
                          </div>
                        ) : null}
                        {valJenisKejadian.val === 'Banjir' ? (
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">
                                {valJenisKejadian.val === 'Banjir'
                                  ? 'Lokasi Dapur Umum'
                                  : 'Lokasi Dapur Umum'}
                              </label>
                            </div>
                            <div className="col-md-4">
                              <input
                                type='text'
                                className='form-control form-control form-control-solid'
                                value={valLokasiDapurUmum.val}
                                onChange={handleChangeInputLokasiDapurUmum}
                                placeholder={
                                  valJenisKejadian.val === 'Banjir'
                                    ? 'Lokasi Dapur Umum'
                                    : 'Lokasi Dapur Umum'
                                }
                              />
                            </div>
                          </div>
                        ) : null}
                      </TabPanel>
                      <TabPanel>
                        {/* BEGIN :: FORM PENDAMPINGAN KEKERASAN */}
                        {valJenisKejadian.val === 'Pendampingan Kekerasan Pada Perempuan Dan Anak' ? (
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">
                                {valJenisKejadian.val === 'Pendampingan Kekerasan Pada Perempuan Dan Anak'
                                  ? 'Sumber Informasi'
                                  : 'Sumber Informasi'}
                              </label>
                            </div>
                            <div className="col-md-4">
                              <select
                                className="form-select form-select-solid"
                                value={valSumberInformasi.val}
                                onChange={handleChangeSumberInformasi}
                                name='val'
                              >
                                <option value='' className='text-muted' disabled>Pilih Sumber Informasi</option>
                                {arrSumberInformasi.map((val: string) => {
                                  return <option value={val}>{val}</option>
                                })}
                              </select>
                            </div>
                          </div>
                        ) : null}
                        {valJenisKejadian.val === 'Pendampingan Kekerasan Pada Perempuan Dan Anak' ? (
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">
                                {valJenisKejadian.val === 'Pendampingan Kekerasan Pada Perempuan Dan Anak'
                                  ? 'Jenis Kekerasan'
                                  : 'Jenis Kekerasan'}
                              </label>
                            </div>
                            <div className="col-md-4">
                              <select
                                className="form-select form-select-solid"
                                value={valJenisKekerasan.val}
                                onChange={handleChangeJenisKekerasan}
                                name='val'
                              >
                                <option value='' className='text-muted' disabled>Pilih Jenis Kekerasan</option>
                                {arrJenisKekerasan.map((val: string) => {
                                  return <option value={val}>{val}</option>
                                })}
                              </select>
                            </div>
                          </div>
                        ) : null}
                        {/* END :: FORM PENDAMPINGAN KEKERASAN */}

                        {/* BEGIN :: FORM UNJUK RASA */}
                        {valJenisKejadian.val === 'Unjuk Rasa' ? (
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">
                                {valJenisKejadian.val === 'Unjuk Rasa'
                                  ? 'Jumlah Massa'
                                  : 'Jumlah Massa'}
                              </label>
                            </div>
                            <div className="col-md-4">
                              <input
                                type='text'
                                className='form-control form-control form-control-solid'
                                value={valJumlahMassa.val}
                                onChange={handleChangeJumlahMassa}
                                placeholder={
                                  valJenisKejadian.val === 'Unjuk Rasa'
                                    ? 'Masukkan Jumlah Massa'
                                    : 'Masukkan Jumlah Massa'
                                }
                              />
                            </div>
                          </div>
                        ) : null}
                        {valJenisKejadian.val === 'Unjuk Rasa' ? (
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">
                                {valJenisKejadian.val === 'Unjuk Rasa'
                                  ? 'Tuntutan'
                                  : 'Tuntutan'}
                              </label>
                            </div>
                            <div className="col-md-4">
                              <input
                                type='text'
                                className='form-control form-control form-control-solid'
                                value={valTuntutan.val}
                                onChange={handleChangeTuntutan}
                                placeholder={
                                  valJenisKejadian.val === 'Unjuk Rasa'
                                    ? 'Masukkan Tuntutan'
                                    : 'Masukkan Tuntutan'
                                }
                              />
                            </div>
                          </div>
                        ) : null}
                        {valJenisKejadian.val === 'Unjuk Rasa' ? (
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">
                                {valJenisKejadian.val === 'Unjuk Rasa'
                                  ? 'Penanggungjawab Unras'
                                  : 'Penanggungjawab Unras'}
                              </label>
                            </div>
                            <div className="col-md-4">
                              <input
                                type='text'
                                className='form-control form-control form-control-solid'
                                value={valPJUnras.val}
                                onChange={handleChangePJUnras}
                                placeholder={
                                  valJenisKejadian.val === 'Unjuk Rasa'
                                    ? 'Penanggungjawab Unras'
                                    : 'Penanggungjawab Unras'
                                }
                              />
                            </div>
                          </div>
                        ) : null}
                        {/* END :: FORM UNJUK RASA */}

                        <div className="row mb-2">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Jenis Bantuan</label>
                          </div>
                          <div className="col-md-4">
                            <label className="col-form-label fw-semibold fs-6">Satpol PP</label>
                          </div>
                          <div className="col-md-4">
                            <label className="col-form-label fw-semibold fs-6">Instansi Terkait</label>
                          </div>
                        </div>
                        {/* <Formik
                          initialValues={initialValues}
                          onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            alert(JSON.stringify(values, null, 2));
                          }}
                        >
                          {({ values }) => (

                            <FieldArray name="friends">
                              {({ insert, remove, push }) => (
                                <div>
                                  <div className="form-group bg-info">
                                    <div className="modal-body scroll-y mx-5 mx-xl-15 my-7 bg-info">
                                      {values.friends.length > 0 &&
                                        values.friends.map((friend, index) => (



                                          <div className="row bg-danger" key={index}>
                                            <div className="col-md-5 bg-warning">
                                              <AsyncSelect
                                                cacheOptions
                                                loadOptions={loadOptionsAtasan}
                                                defaultOptions
                                                onChange={handleInputAtasan}
                                                placeholder={'Masukkan NRK/NPTT/NPJLP'}
                                              />
                                              <ErrorMessage
                                                name={`friends.${index}.nama`}
                                                component="div"
                                                className="field-error"
                                              />
                                            </div>
                                            <div className="col-md-4 bg-info">
                                              <Field
                                                name={`friends.${index}.nrk`}
                                                className="form-control mb-2 mb-md-0"
                                                placeholder="Masukkan Nama"
                                                type="text"
                                                readonly
                                              />
                                              <ErrorMessage
                                                name={`friends.${index}.nama`}
                                                component="div"
                                                className="field-error"
                                              />
                                            </div>
                                            <div className="col-md-3">
                                              <button
                                                type="button"
                                                className="btn btn-sm btn-light-danger mt-3 mb-md-8"
                                                onClick={() => remove(index)}
                                              >
                                                <i className="la la-trash-o" />
                                                Delete
                                              </button>
                                            </div>
                                          </div>

                                        ))}
                                      <div className="form-group mt-5">
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-light-primary"
                                          onClick={() => push({ name: '', email: '' })}
                                        >
                                          <i className="la la-plus" />
                                          Tambah
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </FieldArray>
                          )}
                        </Formik> */}
                        <div id="kt_docs_repeater_nested">
                          <div className="form-group">
                            <div data-repeater-list="kt_docs_repeater_nested_outer">
                              <div data-repeater-item>
                                <div className="form-group row justify-content-center mb-5">
                                  <div className="col-md-4">
                                    <div className="inner-repeater">
                                      <div data-repeater-list="kt_docs_repeater_nested_inner" className="mb-5">
                                        <div data-repeater-item>
                                          <div className="input-group pb-3">
                                            <select className="form-select form-select-solid" data-control="select2">
                                              <option value="Select All" className='text-muted' disabled selected>Pilih Jenis Bantuan</option>
                                              <option value="a">Dibawa ke rumah sakit</option>
                                              <option value="b">Memanggil Pemadam Kebakaran</option>
                                              <option value="a">Mengamankan</option>
                                              <option value="b">Relokasi</option>
                                              <option value="a">Dibawa ke tempat penampungan</option>
                                              <option value="b">Evakuasi</option>
                                            </select>
                                            <button className="border border-secondary btn btn-icon btn-light-danger"
                                              data-repeater-delete type="button">
                                              <i className="la la-trash-o fs-3"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <button className="btn btn-sm btn-light-primary" data-repeater-create type="button">
                                        <i className="la la-plus"></i> Tambah
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="inner-repeater">
                                      <div data-repeater-list="kt_docs_repeater_nested_inner" className="mb-5">
                                        <div data-repeater-item>
                                          <div className="input-group pb-3">
                                            <select className="form-select form-select-solid" data-control="select2">
                                              <option className='text-muted' disabled selected>Pilih Jenis Bantuan</option>
                                              <option value="a">Dibawa ke rumah sakit</option>
                                              <option value="b">Memanggil Pemadam Kebakaran</option>
                                              <option value="a">Mengamankan</option>
                                              <option value="b">Relokasi</option>
                                              <option value="a">Dibawa ke tempat penampungan</option>
                                              <option value="b">Evakuasi</option>
                                            </select>
                                            <button className="border border-secondary btn btn-icon btn-light-danger"
                                              data-repeater-delete type="button">
                                              <i className="la la-trash-o fs-3"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <button className="btn btn-sm btn-light-primary" data-repeater-create type="button">
                                        <i className="la la-plus"></i> Tambah
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="kt_docs_repeater_basic">
                          <div className="form-group">
                            <div data-repeater-list="kt_docs_repeater_basic">
                              <div data-repeater-item>
                                <div className="form-group row mb-2">
                                  <div className="col-md-2">
                                    <label className="col-form-label fw-semibold fs-6">Korban Jiwa</label>
                                  </div>
                                  <div className="col-md-2">
                                    <select className="form-select form-select-solid" data-control="select2">
                                      <option className='text-muted' disabled selected>Pilih Korban Jiwa</option>
                                      <option value="a">Meninggal</option>
                                      <option value="b">Luka - luka Berat</option>
                                      <option value="a">Luka - luka Ringan</option>
                                      <option value="b">Terserang Penyakit</option>
                                      <option value="a">Hilang</option>
                                      <option value="b">Pengungsi</option>
                                      <option value="a">Nihil</option>
                                    </select>
                                  </div>
                                  <div className="col-md-2">
                                    <label className="col-form-label fw-semibold fs-6">Jumlah Korban Pria</label>
                                  </div>
                                  <div className="col-md-1">
                                    <input type="number" placeholder="0"
                                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                  </div>
                                  <div className="col-md-2">
                                    <label className="col-form-label fw-semibold fs-6">Jumlah Korban Wanita</label>
                                  </div>
                                  <div className="col-md-1">
                                    <input type="number" placeholder="0"
                                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                  </div>
                                  <div className="col-md-2">
                                    <a href="javascript:;" data-repeater-delete className="btn btn-sm btn-light-danger">
                                      <i className="la la-trash-o"></i>Hapus
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group mt-1">
                            <a href="javascript:;" data-repeater-create className="btn btn-light-primary">
                              <i className="la la-plus"></i>Tambah
                            </a>
                          </div>
                        </div>
                        {valJenisKejadian.val != 'Pendampingan Kekerasan Pada Perempuan Dan Anak' && valJenisKejadian.val != 'Unjuk Rasa' ? (
                          <div id="kt_docs_repeater_basic_2">
                            <div className="form-group">
                              <div data-repeater-list="kt_docs_repeater_basic_2">
                                <div data-repeater-item>
                                  <div className="form-group row mb-2">
                                    <div className="col-md-2">
                                      <label className="col-form-label fw-semibold fs-6">Korban Material</label>
                                    </div>
                                    <div className="col-md-2">
                                      <select className="form-select form-select-solid" data-control="select2"
                                        data-placeholder="Pilih">
                                        <option className='text-muted' disabled selected>Pilih Korban Material</option>
                                        <option value="a">Rumah Rusak</option>
                                        <option value="b">Rumah Tergenang</option>
                                        <option value="a">Tempat Ibadah</option>
                                        <option value="b">Fasilitas Umum</option>
                                        <option value="a">Kendaraan Roda 4</option>
                                        <option value="b">Kendaraan Roda 2</option>
                                        <option value="a">Lain - lain</option>
                                      </select>
                                    </div>
                                    <div className="col-md-2">
                                      <label className="col-form-label fw-semibold fs-6">Jumlah Korban</label>
                                    </div>
                                    <div className="col-md-1">
                                      <input type="number" placeholder="0"
                                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                    </div>
                                    <div className="col-md-2">
                                      <a href="javascript:;" data-repeater-delete className="btn btn-sm btn-light-danger">
                                        <i className="la la-trash-o"></i>Hapus
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group mt-5">
                              <a href="javascript:;" data-repeater-create className="btn btn-light-primary">
                                <i className="la la-plus"></i>Tambah
                              </a>
                            </div>
                          </div>
                        ) : null}
                        <div className="row mb-2">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Dokumentasi</label>
                          </div>
                        </div>
                        <div className="row mb-10 justify-content-center">
                          <label htmlFor="firstimg">
                            {/* <MultiFileUploadComponent /> */}
                          </label>
                          <input className="form-control" type="file"
                            id="formFileMultiple" multiple></input>
                          {/* <div className="col-md-3">
                            <label htmlFor="firstimg"></label>
                            <div className="image-input image-input-empty image-input-outline" id="kt_image_5">
                              <img className="preview image-input-wrapper" src={src} alt={alt} />
                              <input accept="image/*" type="file" onChange={fileHandler} />
                            </div>
                          </div> */}
                          {/* <div className="col-md-3">
                            <label htmlFor="firstimg"></label>
                            <input type="file" name="" id="firstimg"></input>
                          </div>
                          <div className="col-md-3">
                            <label htmlFor="firstimg"></label>
                            <input type="file" name="" id="firstimg"></input>
                          </div> */}
                        </div>
                      </TabPanel>
                    </div>
                  </form>
                </Tabs>
              </div>
              <div className="card-footer">
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link to="/pelaporan/LaporanKejadian">
                    <button className="btn btn-secondary"><i
                      className="fa-solid fa-arrow-left"></i> Kembali
                    </button>
                  </Link>
                  <Link to="/pelaporan/LaporanKejadian">
                    <button className="btn btn-primary"><i className="fa-solid fa-paper-plane"></i> Simpan
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </div >
  )
}
