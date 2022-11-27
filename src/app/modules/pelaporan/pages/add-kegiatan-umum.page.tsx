import React, {FC, useEffect, useState} from "react";
import {StepDetailKegiatan} from "./steps/step-detail-kegiatan";
import {StepTindaklanjut} from "./steps/step-tindaklanjut";
import {StepDokumentasi} from "./steps/step-dokumentasi";
import {useDispatch, useSelector} from "react-redux";
import {
    createSchemaPelaporanKegiatan,
    initialState,
    PelaporanKegiatanState,
    changedValue
} from "../../../redux/slices/pelaporan-kegiatan.slice";
import {Formik, Form, FormikValues} from 'formik'
import axios from "axios";
import {ToFieldStateBNV} from "../components/fields.formikcto";
import {RootState} from "../../../redux/store";

const excludeJenisKegiatan = ["SIDANG TIPIRING", "PENERTIBAN BANGUNAN", "KEGIATAN PPKM", "LAPORAN MASYARAKAT", "PENERTIBAN MINUMAN BERALKOHOL", "PENGAMANAN"]

export const AddKegiatanUmumPage: FC = () => {
    const [currentSchema, setCurrentSchema] = useState(createSchemaPelaporanKegiatan[0])
    const dispatch = useDispatch()

    const updateJenisKegiatanList = () => {
        axios.get(`http://localhost:3001/jenis-kegiatan/combobox?$orderby=nama`).then(res => {
            const data = res.data.data
                .map((d: any) => ({label: d.text, value: String(d.value)}))
                // .filter((v: any) => !excludeJenisKegiatan.includes(v.label))
            dispatch(changedValue(ToFieldStateBNV('list_jenis_kegiatan', data)))
        })
    }

    const updateJenisUsahaList = () => {
        axios.get(`http://localhost:3001/jenis-usaha/combobox?$oderby=nama`).then(res => {
            const data = res.data.data
                .map((d: any) => ({label: d.text, value: String(d.value)}))
            dispatch(changedValue(ToFieldStateBNV('list_jenis_usaha', data)))
        })
    }

    const updateJenisPenindakanList = () => {
        axios.get(`http://localhost:3001/jenis-penindakan/combobox?$oderby=nama`).then(res => {
            const data = res.data.data
                .map((d: any) => ({label: d.text, value: String(d.value)}))
            dispatch(changedValue(ToFieldStateBNV('list_jenis_penindakan', data)))
        })
    }

    useEffect(() => {
        updateJenisKegiatanList()
        updateJenisUsahaList()
        updateJenisPenindakanList()
    })



    const submitPelaporanKegiatan = (values: PelaporanKegiatanState, actions: FormikValues) => {

    }

    return (<>
        <Formik validationSchema={currentSchema} initialValues={initialState} onSubmit={submitPelaporanKegiatan}>
            {({handleReset, handleSubmit, errors, values}) => (
                <Form className='mx-auto w-100 pt-15 pb-10' id='pelaporan_kegiatan_form'>
                    <div className='card'>
                        <div className='card-body'>
                            <ul className="nav nav-tabs nav-line-tabs mb-5 fs-6">
                                <li className="nav-item">
                                    <a className="nav-link active" data-bs-toggle="tab"
                                       href="#kt_tab_pane_1">KEGIATAN</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_2">TINDAK LANJUT</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_3">DOKUMENTASI</a>
                                </li>
                            </ul>

                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="kt_tab_pane_1" role="tabpanel">
                                    <StepDetailKegiatan values={values}/>
                                </div>
                                <div className="tab-pane fade" id="kt_tab_pane_2" role="tabpanel">
                                    <StepTindaklanjut/>
                                </div>
                                <div className="tab-pane fade" id="kt_tab_pane_3" role="tabpanel">
                                    <StepDokumentasi/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card mt-5'>
                        <div className='card-body'>
                            {/*<div className="float-lg-none">*/}
                            {/*    */}
                            {/*</div>*/}
                            <div className="row w-100">
                                <div className="col">

                                </div>
                                <div className="col">
                                    <div className="row">
                                        <a href="#" className="col-5 btn btn-flex btn-secondary px-6 m-3">
                                            <span className="svg-icon svg-icon-2x"><i
                                                className='fa-solid fa-arrow-left'></i></span>
                                            <span className="d-flex flex-column align-items-start ms-2">
                                                <span className="fs-3 fw-bold">Kembali</span>
                                                <span className="fs-7">Some description</span>
                                            </span>
                                        </a>
                                        <button type="submit" className="col-5 btn btn-flex btn-primary px-6 m-3">
                                            <span className="svg-icon svg-icon-2x"><i
                                                className='fa-solid fa-paper-plane'></i></span>
                                            <span className="d-flex flex-column align-items-start ms-2">
                                                <span className="fs-3 fw-bold">Simpan</span>
                                                <span className="fs-7">Some description</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    </>)
}
