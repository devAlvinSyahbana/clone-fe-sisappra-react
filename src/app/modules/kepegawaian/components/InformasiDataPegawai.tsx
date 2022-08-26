import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

export function InformasiDataPegawai() {

  return (
    <div className={`card`}>
      {/* begin::Body */}

      <div className="row g-8 mt-2 ms-5 me-5">
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor="" className='mb-3'>Status Kepegawaian</label>
            <select className="form-select form-select-solid" aria-label="Select example">
              <option>Pilih</option>
              <option value="1">PNS</option>
              <option value="2">PTT</option>
              <option value="3">PJLP</option>
            </select>
          </div>
        </div>
        <div className="col-xxl-6">
          <label htmlFor="" className='mb-3'>Status Kepegawaian</label>
          <input type="text" className="form-control form-control form-control-solid" name="tags" placeholder="Nama" />
        </div>
        <div className="col-xxl-6">
          <input type="text" className="form-control form-control form-control-solid" name="tags" placeholder="NIP" />
        </div>
      </div>

      <div className="row g-8 mt-2 ms-5 me-5">
        <div className="col-xxl-6">
          <input type="text" className="form-control form-control form-control-solid" name="tags" placeholder="NRK" />
        </div>
        <div className="col-xxl-6">
          <input type="text" className="form-control form-control form-control-solid" name="tags" placeholder="NPTT" />
        </div>
      </div>

      <div className="row g-8 mt-2 ms-5 me-5">
        <div className='col-md-6 col-lg-6 col-sm-12'>
          <Link to='/kepegawaian/FormInformasiDataPegawai'>
            <button className='btn btn-primary'>Tambah</button>
          </Link>
        </div>
      </div>

      <div className='table-responsive mt-5 ms-5 me-5'>
        <table className="table gs-7 gy-7 gx-7">
          <thead>
            <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
              <th>No</th>
              <th className='min-w-200px'>Nama</th>
              <th className='min-w-200px'>Tempat Lahir</th>
              <th className='min-w-200px'>Tanggal Lahir</th>
              <th className='min-w-200px'>Jenis Kelamin</th>
              <th className='min-w-200px'>Agama</th>
              <th className='min-w-200px'>NIK</th>
              <th className='min-w-200px'>Nomor KK</th>
              <th className='min-w-200px'>Status Perkawinan</th>
              <th className='min-w-200px'>Umur</th>
              <th className='min-w-200px'>Nomor HP</th>
              <th className='min-w-200px'>Alamat Sesuai KTP</th>
              <th className='min-w-200px'>RT/RW</th>
              <th className='min-w-200px'>Provinsi</th>
              <th className='min-w-200px'>Kab/Kota</th>
              <th className='min-w-200px'>Kecamatan</th>
              <th className='min-w-200px'>Kelurahan</th>
              <th className='min-w-200px'>Hubungan Keluarga</th>
              <th className='min-w-200px'>Jenis Pendidikan</th>
              <th className='min-w-200px'>Nama Sekolah/Pendidikan</th>
              <th className='min-w-200px'>Nomor Ijazah</th>
              <th className='min-w-200px'>Tanggal Ijazah</th>
              <th className='min-w-200px'>Jurusan</th>
              <th className='min-w-200px'>Fakultas</th>
              <th className='min-w-200px'>NRK</th>
              <th className='min-w-200px'>NIP</th>
              <th className='min-w-200px'>Pangkat</th>
              <th className='min-w-200px'>Golongan</th>
              <th className='min-w-200px'>TMT Pangkat</th>
              <th className='min-w-200px'>Pendidikan Pada SK</th>
              <th className='min-w-200px'>Jabatan</th>
              <th className='min-w-200px'>Eselon</th>
              <th className='min-w-200px'>Tempat Tugas</th>
              <th className='min-w-200px'>Subbag/Seksi/Kecamatan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>1</td>
              <td>1</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>1</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* end::Body */}
    </div>
  )
}
