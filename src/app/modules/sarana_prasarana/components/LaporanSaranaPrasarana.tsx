import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

export function LaporanSaranaPrasarana() {
  return (
    <div className={`card`}>
      {/* begin::Body */}


      <div className="row g-8 mt-2 ms-5 me-5">
        <div className='col-md-6 col-lg-6 col-sm-12'>
          <Link to='#'>
            <button className='btn btn-primary'>Tambah</button>
          </Link>
        </div>
      </div>

      <div className='table-responsive mt-5 ms-5 me-5'>
        <table className="table gs-7 gy-7 gx-7">
          <thead>
            <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
              <th>No</th>
              <th className='min-w-200px'>Jenis Sarana Prasarana</th>
              <th className='min-w-200px'>Status Sarana Prasaran</th>
              <th className='min-w-200px'>Jumlah</th>
              <th className='min-w-200px'>Kondisi</th>
              <th className='min-w-200px'>Keterangan</th>
              <th className='min-w-200px'>Dokumentasi</th>
              <th className='min-w-200px'>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Gedung</td>
              <td>Aset</td>
              <td>10</td>
              <td>baik</td>
              <td>baru dibangun</td>
              <td>flaza</td>
              <td></td>              
            </tr>
            <tr>
              <td>1</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
