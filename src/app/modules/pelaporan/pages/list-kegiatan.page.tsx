import React, {ChangeEvent, FC, useEffect, useState} from "react";
import DatePicker from "react-multi-date-picker";
import AsyncSelect from "react-select/async";
import {Link} from "react-router-dom";
import {Formik, Field, Form, FormikValues} from 'formik'
import {DatePickerField, SelectField, ToFieldStateBNV, ToFieldStateCE} from "../components/fields.formikcto";
import {
    changedValue, createSchemaFilterPelaporanKegiatan,
    initialState, PelaporanKegiatanState
} from "../../../redux/slices/pelaporan-kegiatan.slice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import axios from "axios";

export const ListKegiatanPage: FC = () => {
    const dispatch = useDispatch()
    const [currentSchema, setCurrentSchema] = useState(createSchemaFilterPelaporanKegiatan[0])
    const [jenisKegiatanList, setJenisKegiatanList] = useState([])

    const updateJenisKegiatanList = () => {
        axios.get(`http://localhost:3001/jenis-kegiatan/combobox?$orderby=nama`).then(res => {
            const data = res.data.data
                .map((d: any) => ({label: d.text, value: String(d.value)}))
            // .filter((v: any) => !excludeJenisKegiatan.includes(v.label))
            setJenisKegiatanList(data)
        })
    }

    useEffect(() => {
        updateJenisKegiatanList()
        // updateJenisUsahaList()
        // updateJenisPenindakanList()
    },[])

    function loadOptionsKota() {
        return []
    }

    const [period, setPeriod] = useState({start: Date.now() - 10, end: Date.now()})

    const filterPelaporanKegiatan = (values: PelaporanKegiatanState, actions: FormikValues) => {

    }

    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                    <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                Daftar Laporan Kegiatan
                            </h1>
                        </div>
                    </div>
                </div>
                <div id="kt_app_content" className="app-content flex-column-fluid">
                    <div id="kt_app_content_container" className="app-container container-xxl">
                        <div className="card">
                            <div className="card-header border-1 pt-6">
                                <div className="accordion accordion-icon-toggle" id="kt_accordion_2">
                                    <div className="mb-5">
                                        <div className="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                                             data-bs-target="#kt_accordion_2_item_1">
                                                <span className="accordion-icon">
                                                    <span className="svg-icon svg-icon-4">
                                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                           xmlns="http://www.w3.org/2000/svg">
                                                        <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1"
                                                              transform="rotate(-180 18 13)" fill="currentColor"/>
                                                        <path
                                                            d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                                                            fill="currentColor"/>
                                                      </svg>
                                                    </span>
                                                </span>
                                            <h3 className="fs-4 fw-semibold mb-0 ms-4">
                                                Pilihan Filter
                                            </h3>
                                        </div>
                                        <div id="kt_accordion_2_item_1" className="fs-6 collapse show ps-10"
                                             data-bs-parent="#kt_accordion_2">
                                            <Formik validationSchema={currentSchema} initialValues={initialState}
                                                    onSubmit={filterPelaporanKegiatan}>
                                                <Form id="list_pelaporan_kegiatan_filter">
                                                    <div className="row w-100 mt-10 mb-10">
                                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                                            <div className="mb-10">
                                                                <div className="row">
                                                                    <div className="col-4 pt-2">
                                                                        <label className="form-label">Jenis Kegiatan</label>
                                                                    </div>
                                                                    <div className="col-8">
                                                                        <Field
                                                                            name="filter_jenis_kegiatan_id_selection"
                                                                            target="filter_jenis_kegiatan_id"
                                                                            className="form-control"
                                                                            component={SelectField}
                                                                            options={jenisKegiatanList}
                                                                            onChange={(o: ChangeEvent<any>) => {
                                                                                // dispatch(changedValue(ToFieldStateCE(o)))
                                                                                // updateJenisPasalList()
                                                                                // updateJenisPenyelesaianList()
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                                            <div className="mb-10">
                                                                <div className="row">
                                                                    <div className="col-4 pt-2">
                                                                        <label className="form-label align-middle">Seksi/Kecamatan</label>
                                                                    </div>
                                                                    <div className="col-8">
                                                                        <select
                                                                            className="form-select form-select-solid form-control"
                                                                            data-control="select2">
                                                                            <option value="" disabled selected>Pilih
                                                                                Jenis
                                                                                Korban Jiwa
                                                                            </option>
                                                                            <option value="meninggal">Meninggal</option>
                                                                            <option value="luka_berat">Luka Berat
                                                                            </option>
                                                                            <option value="luka_ringan">Luka Ringan
                                                                            </option>
                                                                            <option value="hilang">Hilang</option>
                                                                            <option value="terserang_penyakit">Terserang
                                                                                Penyakit
                                                                            </option>
                                                                            <option value="pengungsi">Pengungsi</option>
                                                                            <option value="nihil">Nihil</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-10 col-lg-10 col-sm-24">
                                                            <div className="mb-10">
                                                                <div className="row">
                                                                    <div className="col-4 pt-2">
                                                                        <label className="form-label align-middle">Tanggal</label>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <Field
                                                                            name="kegiatan__tanggal"
                                                                            className="form-control"
                                                                            component={DatePickerField}
                                                                            onChange={(o:any)=>{
                                                                                dispatch(changedValue(ToFieldStateCE(o)))
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <Field
                                                                            name="kegiatan__tanggal"
                                                                            className="form-control"
                                                                            component={DatePickerField}
                                                                            onChange={(o:any)=>{
                                                                                dispatch(changedValue(ToFieldStateCE(o)))
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                                            <div className="d-flex">
                                                                <button type="submit"
                                                                        className="btn btn-sm btn-primary fw-semibold me-auto px-6"
                                                                        data-kt-menu-dismiss="true"
                                                                        data-kt-user-table-filter="filter">
                                                                    <i className="fa fa-search"></i>
                                                                    Cari
                                                                </button>
                                                                <Link to="/pelaporan/TambahLaporanKejadian">
                                                                    <a className="btn btn-success me-1"
                                                                       data-bs-toggle="modal"><i
                                                                        className="fa-solid fa-plus"></i>Tambah</a>
                                                                </Link>
                                                                <a href="#" className="btn btn-sm btn-danger me-1"
                                                                   data-bs-toggle="modal"><i
                                                                    className="fa-solid fa-trash"></i> Hapus</a>
                                                                <div className="my-1 me-0">
                                                                    <select
                                                                        className="form-select form-select-sm form-select-solid w-180px"
                                                                        data-control="select2"
                                                                        data-placeholder="Select Hours"
                                                                        data-hide-search="true">
                                                                        <option disabled selected>Unduh</option>
                                                                        <option value="2">Excel</option>
                                                                        <option value="3">Pdf</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body py-4">
                                <div className="row">
                                    <div className="col fs-4 mb-2 fw-semibold text-center">
                                        LAPORAN HASIL KEGIATAN
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col fs-4 mb-2 fw-semibold text-center">
                                        PADA SATPOL PP......................................
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col fs-4 mb-6 fw-semibold text-center">
                                        PERIODE .................... s/d .......................
                                    </div>
                                </div>
                                {/*<DataTable*/}
                                {/*    columns={columns}*/}
                                {/*    data={data}*/}
                                {/*    pagination*/}
                                {/*/>*/}
                            </div>
                            <div className="row">
                                <div className="col-8"></div>
                                <div className="col-4 fs-6 mb-2 fw-semibold text-center">
                                    Jakarta, ..............................20...
                                    <div className="col fs-6 mb-15 fw-semibold text-center">
                                        KEPALA SATUAN POLISI PAMONG PRAJA
                                        ...............................................................
                                    </div>
                                    <div className="col fs-6 mb-2 fw-semibold text-center">
                                        NAMA
                                    </div>
                                    <div className="col fs-6 mb-2 fw-semibold text-center">
                                        NIP. ......................
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="kt_app_footer" className="app-footer">
                <div
                    className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
                </div>
            </div>
        </div>
    )
}
