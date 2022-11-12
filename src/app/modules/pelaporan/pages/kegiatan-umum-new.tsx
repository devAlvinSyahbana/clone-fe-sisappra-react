import {FC, useEffect, useState} from "react";
import {StepDetailKegiatan} from "./steps/step-detail-kegiatan";
import {StepTindaklanjut} from "./steps/step-tindaklanjut";
import {StepDokumentasi} from "./steps/step-dokumentasi";
import {useDispatch} from "react-redux";
import {setJenisKegiatanList} from "../../../redux/slices/pelaporan-kegiatan.slice";
import axios from "axios";


export const AddKegiatanUmumPage: FC = () => {
    const dispatch = useDispatch()
    const excludeJenisKegiatan = ["SIDANG TIPIRING", "PENERTIBAN BANGUNAN", "KEGIATAN PPKM","LAPORAN MASYARAKAT","PENERTIBAN MINUMAN BERALKOHOL","PENGAMANAN"]

    useEffect(()=>{
        axios.get('http://localhost:3001/jenis-kegiatan/combobox?$orderby=nama').then(res=> {
            const data = res.data.data.map((d:any)=> ({label: d.text, value: String(d.value)}))
            dispatch(setJenisKegiatanList(data.filter((v:any)=> !excludeJenisKegiatan.includes(v.label))))
        })
    })

    return (<>
        <div className='card'>
            <div className='card-body'>
                <ul className="nav nav-tabs nav-line-tabs mb-5 fs-6">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#kt_tab_pane_1">KEGIATAN</a>
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
                        <StepDetailKegiatan/>
                    </div>
                    <div className="tab-pane fade" id="kt_tab_pane_2" role="tabpanel">
                        <StepTindaklanjut/>
                    </div>
                    <div className="tab-pane fade" id="kt_tab_pane_3" role="tabpanel">
                        <StepDokumentasi />
                    </div>
                </div>
            </div>
        </div>
        <div className='card mt-5'>
            <div className='card-body'>sdfsdf</div>
        </div>
    </>)
}