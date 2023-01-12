import React, {FC} from "react";
import {ErrorMessage, Field} from "formik";
import {KTSVG} from "../../../../../_metronic/helpers";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export const StepPilihKegiatan: FC = () => {

    const {
        data: jenisKegiatanList,
        error,
        isLoading
    } = useQuery(['jeniskegiatan'], async () => await axios.get('http://localhost:3001/jenis-kegiatan/combobox'))

    const excludeJenisKegiatan = ["SIDANG TIPIRING", "PENERTIBAN BANGUNAN", "KEGIATAN PPKM","LAPORAN MASYARAKAT","PENERTIBAN MINUMAN BERALKOHOL","PENGAMANAN"]

    return (<div className='w-100'>
        <div className='pb-10 pb-lg-15'>
            <h2 className='fw-bolder text-dark'>Kegiatan</h2>

            <div className='text-gray-400 fw-bold fs-6'>
                If you need more info, please check out
                <a href='/dashboard' className='link-primary fw-bolder'>
                    {' '}
                    Help Page
                </a>
                .
            </div>
        </div>

        <div className='mb-0 fv-row'>
            <label className='d-flex align-items-center form-label mb-5'>
                Pilih Jenis Kegiatan
                <i
                    className='fas fa-exclamation-circle ms-2 fs-7'
                    data-bs-toggle='tooltip'
                    title='Monthly billing will be based on your account plan'
                ></i>
            </label>

            {jenisKegiatanList?.data.data.map((jk: any) => excludeJenisKegiatan.includes(jk.text) ? (<></>) : (<label className='d-flex flex-stack mb-5 cursor-pointer' key={jk.value}>
                    <span className='d-flex align-items-center me-2'>
                      <span className='symbol symbol-50px me-6'>
                        <span className='symbol-label'>
                          <KTSVG
                              path='/media/icons/duotune/finance/fin001.svg'
                              className='svg-icon-1 svg-icon-gray-600'
                          />
                        </span>
                      </span>

                      <span className='d-flex flex-column'>
                        <span className='fw-bolder text-gray-800 text-hover-primary fs-5'>
                          {jk.text}
                        </span>
                        <span className='fs-6 fw-bold text-gray-400'>
                          Use images to enhance your post flow
                        </span>
                      </span>
                    </span>

                <span className='form-check form-check-custom form-check-solid'>
                      <Field className='form-check-input' type='radio' name='kegiatan__jenis_kegiatan_id' value={String(jk.value)}/>
                    </span>
            </label>))}
        </div>

    </div>)
}