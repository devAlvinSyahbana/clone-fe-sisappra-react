import React, {FC, useEffect} from "react";
import Select from 'react-select'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {updateProp} from "../../../../redux/slices/pelaporan-kegiatan.slice";

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

    return (<div className='w-50'>
        <div className='pb-10 pb-lg-15'>
            <h2 className='fw-bolder text-dark mb-10'>Kegiatan</h2>

            {useSelector((s: RootState) => s.pelaporanKegiatan.kegiatan__jenis_kegiatan_id)}

            <div className="mb-10">
                <label className="required form-label">Jenis Kegiatan</label>
                <Select options={jenisKegiatanList} onChange={(o)=>dispatch(updateProp({value: o?.value, field: 'kegiatan__jenis_kegiatan_id'}))}/>
            </div>

            <div className="mb-10">
                <label className="required form-label">Jumlah Personil</label>
                <input
                    type="number"
                    className="form-control"
                    value={useSelector((s: RootState) => s.pelaporanKegiatan.kegiatan__jumlah_personil)}
                    onChange={(o:any)=>dispatch(updateProp({value: o.target.value, field: 'kegiatan__jumlah_personil'}))}
                />
            </div>

            <div className="mb-10">
                <label className="required form-label">Uraian Kegiatan</label>
                <textarea
                    className="form-control"
                    value={useSelector((s: RootState) => s.pelaporanKegiatan.kegiatan__uraian_kegiatan)}
                    onChange={(o:any)=>dispatch(updateProp({value: o.target.value, field: 'kegiatan__uraian_kegiatan'}))}
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