import {useState} from 'react'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Link, useParams} from 'react-router-dom'
import {Button, Collapse} from 'react-bootstrap'
import {HeaderDetailWrapper} from './HeaderDetail'

export function HirarkiKepegawaianDUK() {
  const [open, setOpen] = useState(false)
  const {id, status} = useParams()
  return (
    <div>
      {/* Header */}
      <HeaderDetailWrapper />
      {/* Second Card */}
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bold my-2'>
          Bawahan
          <span className='fs-6 text-gray-400 fw-semibold ms-1'>(29)</span>
        </h3>
      </div>
      <div className='row g-6 mb-6 g-xl-9 mb-xl-9'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body d-flex flex-center flex-column py-9 px-5'>
              <div className='symbol symbol-65px symbol-circle mb-5'>
                <img src={toAbsoluteUrl('/media/avatars/300-11.jpg')} alt='' />
                <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
              </div>
              <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                Patric Watson
              </a>
              <div className='fw-semibold text-gray-400 mb-6'>
                FUNGSIONAL POL PP PELAKSANA / TERAMPIL
              </div>
              <div className='d-flex flex-center flex-wrap mb-5'>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>2</div>
                  <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                </div>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>S1</div>
                  <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body d-flex flex-center flex-column py-9 px-5'>
              <div className='symbol symbol-65px symbol-circle mb-5'>
                <img src={toAbsoluteUrl('/media/avatars/300-6.jpg')} alt='' />
                <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
              </div>
              <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                Olivia Larson
              </a>
              <div className='fw-semibold text-gray-400 mb-6'>PENGADMINISTRASI UMUM</div>
              <div className='d-flex flex-center flex-wrap mb-5'>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>2</div>
                  <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                </div>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>S1</div>
                  <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body d-flex flex-center flex-column py-9 px-5'>
              <div className='symbol symbol-65px symbol-circle mb-5'>
                <span className='symbol-label fs-2x fw-semibold text-warning bg-light-warning'>
                  A
                </span>
              </div>
              <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                Adam Williams
              </a>
              <div className='fw-semibold text-gray-400 mb-6'>PETUGAS KEAMANAN</div>
              <div className='d-flex flex-center flex-wrap mb-5'>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>2</div>
                  <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                </div>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>S1</div>
                  <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body d-flex flex-center flex-column py-9 px-5'>
              <div className='symbol symbol-65px symbol-circle mb-5'>
                <span className='symbol-label fs-2x fw-semibold text-info bg-light-info'>P</span>
                <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
              </div>
              <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                Paul Marcus
              </a>
              <div className='fw-semibold text-gray-400 mb-6'>
                FUNGSIONAL POL PP PELAKSANA / TERAMPIL
              </div>
              <div className='d-flex flex-center flex-wrap mb-5'>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>2</div>
                  <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                </div>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>S1</div>
                  <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body d-flex flex-center flex-column py-9 px-5'>
              <div className='symbol symbol-65px symbol-circle mb-5'>
                <span className='symbol-label fs-2x fw-semibold text-info bg-light-info'>N</span>
                <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
              </div>
              <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                Neil Owen
              </a>
              <div className='fw-semibold text-gray-400 mb-6'>
                PENYUSUN KEBUTUHAN BARANG INVENTARIS
              </div>
              <div className='d-flex flex-center flex-wrap mb-5'>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>2</div>
                  <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                </div>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>S1</div>
                  <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body d-flex flex-center flex-column py-9 px-5'>
              <div className='symbol symbol-65px symbol-circle mb-5'>
                <span className='symbol-label fs-2x fw-semibold text-primary bg-light-primary'>
                  S
                </span>
                <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
              </div>
              <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                Sean Paul
              </a>
              <div className='fw-semibold text-gray-400 mb-6'>
                PENGELOLA KEAMANAN DAN KETERTIBAN
              </div>
              <div className='d-flex flex-center flex-wrap mb-5'>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>2</div>
                  <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                </div>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>S1</div>
                  <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body d-flex flex-center flex-column py-9 px-5'>
              <div className='symbol symbol-65px symbol-circle mb-5'>
                <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='' />
                <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
              </div>
              <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                Kitona Johnson
              </a>
              <div className='fw-semibold text-gray-400 mb-6'>
                PENGADMINISTRASI UMUM SEKSI PPNS DAN PENINDAKAN
              </div>
              <div className='d-flex flex-center flex-wrap mb-5'>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>2</div>
                  <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                </div>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>S1</div>
                  <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body d-flex flex-center flex-column py-9 px-5'>
              <div className='symbol symbol-65px symbol-circle mb-5'>
                <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='' />
                <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
              </div>
              <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                Robert Doe
              </a>
              <div className='fw-semibold text-gray-400 mb-6'>Marketing Analytic at Avito Ltd.</div>
              <div className='d-flex flex-center flex-wrap mb-5'>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>2</div>
                  <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                </div>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>S1</div>
                  <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body d-flex flex-center flex-column py-9 px-5'>
              <div className='symbol symbol-65px symbol-circle mb-5'>
                <img src={toAbsoluteUrl('/media/avatars/300-12.jpg')} alt='' />
                <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
              </div>
              <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                Soul Jacob
              </a>
              <div className='fw-semibold text-gray-400 mb-6'>
                FUNGSIONAL POL PP PELAKSANA / TERAMPIL
              </div>
              <div className='d-flex flex-center flex-wrap mb-5'>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>2</div>
                  <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                </div>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>S1</div>
                  <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body d-flex flex-center flex-column py-9 px-5'>
              <div className='symbol symbol-65px symbol-circle mb-5'>
                <img src={toAbsoluteUrl('/media/avatars/300-7.jpg')} alt='' />
                <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
              </div>
              <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                Nina Strong
              </a>
              <div className='fw-semibold text-gray-400 mb-6'>KOMANDAN PETUGAS KEAMANAN</div>
              <div className='d-flex flex-center flex-wrap mb-5'>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>2</div>
                  <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                </div>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>S1</div>
                  <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body d-flex flex-center flex-column py-9 px-5'>
              <div className='symbol symbol-65px symbol-circle mb-5'>
                <img src={toAbsoluteUrl('/media/avatars/300-11.jpg')} alt='' />
                <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
              </div>
              <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                Patric Watson
              </a>
              <div className='fw-semibold text-gray-400 mb-6'>
                FUNGSIONAL POL PP PELAKSANA / TERAMPIL
              </div>
              <div className='d-flex flex-center flex-wrap mb-5'>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>2</div>
                  <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                </div>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>S1</div>
                  <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body d-flex flex-center flex-column py-9 px-5'>
              <div className='symbol symbol-65px symbol-circle mb-5'>
                <img src={toAbsoluteUrl('/media/avatars/300-6.jpg')} alt='' />
                <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
              </div>
              <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                Olivia Larson
              </a>
              <div className='fw-semibold text-gray-400 mb-6'>PENGADMINISTRASI UMUM</div>
              <div className='d-flex flex-center flex-wrap mb-5'>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>2</div>
                  <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                </div>
                <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                  <div className='fs-6 fw-bold text-gray-700'>S1</div>
                  <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Collapse in={open}>
          <div id='example-collapse-text'>
            <div className='row g-6 mb-6 g-xl-9 mb-xl-9'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-body d-flex flex-center flex-column py-9 px-5'>
                    <div className='symbol symbol-65px symbol-circle mb-5'>
                      <img src={toAbsoluteUrl('/media/avatars/300-11.jpg')} alt='' />
                      <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
                    </div>
                    <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                      Patric Watson
                    </a>
                    <div className='fw-semibold text-gray-400 mb-6'>
                      FUNGSIONAL POL PP PELAKSANA / TERAMPIL
                    </div>
                    <div className='d-flex flex-center flex-wrap mb-5'>
                      <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                        <div className='fs-6 fw-bold text-gray-700'>2</div>
                        <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                      </div>
                      <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                        <div className='fs-6 fw-bold text-gray-700'>S1</div>
                        <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-body d-flex flex-center flex-column py-9 px-5'>
                    <div className='symbol symbol-65px symbol-circle mb-5'>
                      <img src={toAbsoluteUrl('/media/avatars/300-6.jpg')} alt='' />
                      <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
                    </div>
                    <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                      Olivia Larson
                    </a>
                    <div className='fw-semibold text-gray-400 mb-6'>PENGADMINISTRASI UMUM</div>
                    <div className='d-flex flex-center flex-wrap mb-5'>
                      <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                        <div className='fs-6 fw-bold text-gray-700'>2</div>
                        <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                      </div>
                      <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                        <div className='fs-6 fw-bold text-gray-700'>S1</div>
                        <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-body d-flex flex-center flex-column py-9 px-5'>
                    <div className='symbol symbol-65px symbol-circle mb-5'>
                      <span className='symbol-label fs-2x fw-semibold text-warning bg-light-warning'>
                        A
                      </span>
                    </div>
                    <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                      Adam Williams
                    </a>
                    <div className='fw-semibold text-gray-400 mb-6'>PETUGAS KEAMANAN</div>
                    <div className='d-flex flex-center flex-wrap mb-5'>
                      <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                        <div className='fs-6 fw-bold text-gray-700'>2</div>
                        <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                      </div>
                      <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                        <div className='fs-6 fw-bold text-gray-700'>S1</div>
                        <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-body d-flex flex-center flex-column py-9 px-5'>
                    <div className='symbol symbol-65px symbol-circle mb-5'>
                      <span className='symbol-label fs-2x fw-semibold text-info bg-light-info'>
                        P
                      </span>
                      <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
                    </div>
                    <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                      Paul Marcus
                    </a>
                    <div className='fw-semibold text-gray-400 mb-6'>
                      FUNGSIONAL POL PP PELAKSANA / TERAMPIL
                    </div>
                    <div className='d-flex flex-center flex-wrap mb-5'>
                      <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                        <div className='fs-6 fw-bold text-gray-700'>2</div>
                        <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                      </div>
                      <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                        <div className='fs-6 fw-bold text-gray-700'>S1</div>
                        <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-body d-flex flex-center flex-column py-9 px-5'>
                    <div className='symbol symbol-65px symbol-circle mb-5'>
                      <span className='symbol-label fs-2x fw-semibold text-info bg-light-info'>
                        N
                      </span>
                      <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
                    </div>
                    <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                      Neil Owen
                    </a>
                    <div className='fw-semibold text-gray-400 mb-6'>
                      PENYUSUN KEBUTUHAN BARANG INVENTARIS
                    </div>
                    <div className='d-flex flex-center flex-wrap mb-5'>
                      <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                        <div className='fs-6 fw-bold text-gray-700'>2</div>
                        <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                      </div>
                      <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                        <div className='fs-6 fw-bold text-gray-700'>S1</div>
                        <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-body d-flex flex-center flex-column py-9 px-5'>
                    <div className='symbol symbol-65px symbol-circle mb-5'>
                      <span className='symbol-label fs-2x fw-semibold text-primary bg-light-primary'>
                        S
                      </span>
                      <div className='bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3'></div>
                    </div>
                    <a href='/#' className='fs-4 text-gray-800 text-hover-primary fw-bold mb-0'>
                      Sean Paul
                    </a>
                    <div className='fw-semibold text-gray-400 mb-6'>
                      PENGELOLA KEAMANAN DAN KETERTIBAN
                    </div>
                    <div className='d-flex flex-center flex-wrap mb-5'>
                      <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                        <div className='fs-6 fw-bold text-gray-700'>2</div>
                        <div className='fw-semibold text-gray-400'>Jumlah Anggota Keluarga</div>
                      </div>
                      <div className='border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3'>
                        <div className='fs-6 fw-bold text-gray-700'>S1</div>
                        <div className='fw-semibold text-gray-400'>Pendidikan Terakhir</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
        <div className='d-flex flex-center'>
          <Button
            className='btn btn-secondary'
            onClick={() => setOpen(!open)}
            aria-controls='example-collapse-text'
            aria-expanded={open}
          >
            Menampilkan lebih banyak
          </Button>
        </div>

        <div className='p-0 mt-6'>
          <div className='text-center'>
            <Link
              className='text-reset text-decoration-none'
              to='/kepegawaian/informasi-data-pegawai'
            >
              <button className='float-none btn btn-secondary align-self-center m-1'>Keluar</button>
            </Link>
            <Link
              className='text-reset text-decoration-none'
              to={`/kepegawaian/informasi-data-pegawai/detail-data-kepegawaian/${id}/${status}`}
            >
              <button className='float-none btn btn-primary align-self-center m-1'>
                <i className='fa-solid fa-arrow-left'></i>
                Kembali
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}
