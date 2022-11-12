import React, {FC, useEffect} from "react";
import Select from 'react-select'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {
    jenisKegiatanIdChanged,
    jumlahPersonilChanged,
    uraianKegiatanChanged
} from "../../../../redux/slices/pelaporan-kegiatan.slice";

interface ComboBox {
    label: string,
    value: string
}

interface StepDetailKegiatanProps {

}

type SelectOptionType = { label: string, value: string }

export const StepDetailKegiatan: FC<StepDetailKegiatanProps> = ({ }) => {
    const dispatch = useDispatch()
    const jenisKegiatanList = useSelector((s: RootState) => s.pelaporanKegiatan.jenis_kegiatan_list)
    const jenisKegiatanId = useSelector((s: RootState) => s.pelaporanKegiatan.kegiatan__jenis_kegiatan_id)
    const jumlahPersonil = useSelector((s: RootState) => s.pelaporanKegiatan.kegiatan__jumlah_personil)

    return (<div className='w-50'>
        <div className='pb-10 pb-lg-15'>
            <h2 className='fw-bolder text-dark mb-10'>Kegiatan</h2>

            {jumlahPersonil}

            <div className="mb-10">
                <label className="required form-label">Jenis Kegiatan</label>
                <Select options={jenisKegiatanList} onChange={(o)=>dispatch(jenisKegiatanIdChanged(o?.value))}/>
            </div>

            <div className="mb-10">
                <label className="required form-label">Jumlah Personil</label>
                <input
                    type="number"
                    className="form-control"
                    onChange={(o:any)=>dispatch(jumlahPersonilChanged(o.target.value))}
                />
            </div>

            <div className="mb-10">
                <label className="required form-label">Uraian Kegiatan</label>
                <textarea
                    className="form-control"
                    onChange={(o:any)=>dispatch(uraianKegiatanChanged(o.target.value))}
                />
            </div>

            <div className="mb-10">
                <label className="required form-label">Tanggal Kegiatan</label>
                <input
                    type="date"
                    className="form-control"
                />
            </div>

            <div className="mb-10">
                <label className="required form-label">Waktu Kegiatan</label>
                <input
                    type="time"
                    className="form-control"
                />
            </div>

            <div className="mb-10">
                <label className="required form-label">Lokasi Kegiatan</label>
                <input
                    type="text"
                    className="form-control"
                />
            </div>

        </div>
    </div>)
}