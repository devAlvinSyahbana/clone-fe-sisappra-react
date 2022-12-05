import axios from "axios";
import { useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { Link } from 'react-router-dom'
import DataTable, { createTheme } from 'react-data-table-component'
import { ThemeModeComponent } from "../../../../../_metronic/assets/ts/layout";
import moment from 'moment'
import { useThemeMode } from "../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";

createTheme(
    'darkMetro',
    {
        text: {
            primary: '#92929f',
            secondary: '#92929f',
        },
        background: {
            default: '#1e1e2e',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#2b2c41',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    },
    'dark'
)
const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function UnduhLaporanPegawaiPensiunPdf() {
    let componentRef: any;
    const { mode } = useThemeMode()
    const calculatedMode = mode === 'system' ? systemMode : mode
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [valStatPegawai, setValStatPegawai] = useState({ val: '' })

    const LoadingAnimation = (props: any) => {
        return (
            <>
                <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
                    {/* <span className="svg-icon svg-icon-2hx svg-icon-primary me-3">...</span> */}
                    <span className='spinner-border spinner-border-xl align-middle me-3'></span>
                    <div className='d-flex flex-column'>
                        <h5 className='mb-1'>Sedang mengambil data...</h5>
                    </div>
                </div>
            </>
        )
    }

    var num = 1;

    const columns = [
        {
            name: 'No',
            wrap: true,
            cell: (row: number) => {
                return (
                    <div className='mb-2 mt-2'>
                        {num++}
                    </div>
                )
            },
        },
        {
            name: 'Nama',
            // selector: (row: any) => row.nama,
            sortable: true,
            sortField: 'nama',
            width: '150px',
            wrap: true,
            cell: (row: any) => {
                return (
                    <div className='mb-2 mt-2' style={{ textTransform: 'uppercase' }}>
                        {row.nama}
                    </div>
                )
            },
            // cell: (record: any) => {
            //     return (
            //         <Fragment>
            //             <div className='d-flex align-items-center'>
            //                 {/* begin:: Avatar */}
            //                 <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
            //                     {record?.foto !== '' ? (
            //                         <div className='symbol-label'>
            //                             <img src={record?.foto} alt={record?.nama} className='w-100' />
            //                         </div>
            //                     ) : (
            //                         <div className={clsx('symbol-label fs-3', `bg-light-primary`, `text-primary`)}>
            //                             {record?.nama.charAt(0)}
            //                         </div>
            //                     )}
            //                 </div>
            //                 <div className='d-flex flex-column'>
            //                     <span>{record?.nama}</span>
            //                 </div>
            //             </div>
            //         </Fragment>
            //     )
            // },
        },
        {
            name: 'NIP',
            selector: (row: any) => row.nip,
            sortable: true,
            sortField: 'kepegawaian_nip',
            wrap: true,
            center: true,
        },
        {
            name:
                valStatPegawai.val !== ''
                    ? valStatPegawai.val === 'PTT'
                        ? 'NPTT'
                        : valStatPegawai.val === 'PJLP'
                            ? 'NPJLP'
                            : 'NRK'
                    : 'NRK',
            selector: (row: any) => row.nrk_nptt_pjlp,
            sortable: true,
            sortField: 'kepegawaian_nrk',
            wrap: true,
            center: true,
        },
        {
            name: 'Status',
            selector: (row: any) => row.kepegawaian_status_pegawai,
            sortable: true,
            sortField: 'kepegawaian_status_pegawai',
            wrap: true,
        },
        {
            name: 'Jabatan',
            selector: (row: any) => row.jabatan,
            sortable: true,
            sortField: 'jabatan',
            wrap: true,
            width: "100px",
        },
        {
            name: 'Tempat Tugas Wilayah/Bidang',
            selector: (row: any) => row.tempat_tugas,
            sortable: true,
            sortField: 'wilayah',
            wrap: true,
            width: "250px",
        },
        {
            name: 'Tempat Tugas Kecamatan/Seksi',
            selector: (row: any) => row.subbag_seksi_kecamatan,
            sortable: true,
            sortField: 'kecamatan',
            wrap: true,
            width: "250px",
        },
        {
            name: 'Tempat Lahir',
            selector: (row: any) => row.tempat_lahir,
            sortable: true,
            sortField: 'tempat_lahir',
            wrap: true,
            width: '150px',
        },
        {
            name: 'Tanggal Lahir',
            selector: (row: any) => moment(row.tgl_lahir).format('D MMMM YYYY'),
            sortable: true,
            sortField: 'tgl_lahir',
            wrap: true,
            width: '150px',
        },
        {
            name: 'Tahun Pensiun',
            selector: (row: any) => row.tahun_pensiun,
            sortable: true,
            sortField: 'thn_pensiun',
            wrap: true,
            minWidth: '15',
        },
        // {
        //     name: 'Ket',
        //     selector: (row: any) => row.thn_pensiun,
        //     sortable: true,
        //     sortField: 'thn_pensiun',
        //     wrap: true,
        //     minWidth: '15',
        // },
        // {
        //     name: 'Aksi',
        //     sortable: false,
        //     text: 'Aksi',
        //     className: 'action',
        //     center: true,
        //     allowOverflow: true,
        //     cell: (record: any) => {
        //         return (
        //             <Fragment>
        //                 <div className='mb-2 mt-2'>
        //                     {[DropdownButton].map((DropdownType, idx) => (
        //                         <>
        //                             <DropdownType
        //                                 as={ButtonGroup}
        //                                 key={idx}
        //                                 id={`dropdown-button-drop-${idx}`}
        //                                 size='sm'
        //                                 variant='light'
        //                                 title='Aksi'
        //                             >
        //                                 <Dropdown.Item
        //                                     href='#'
        //                                     onClick={() =>
        //                                         navigate(
        //                                             `/kepegawaian/InformasiDataPegawai/DataPribadi/${record?.id}/${record?.kepegawaian_status_pegawai}`,
        //                                             { replace: true }
        //                                         )
        //                                     }
        //                                 >
        //                                     Detail
        //                                 </Dropdown.Item>
        //                                 <Dropdown.Item
        //                                     href='#'
        //                                     onClick={() =>
        //                                         navigate(
        //                                             `/kepegawaian/InformasiDataPegawai/UpdateDataPribadi/${record?.id}/${record?.kepegawaian_status_pegawai}`,
        //                                             { replace: true }
        //                                         )
        //                                     }
        //                                 >
        //                                     Ubah
        //                                 </Dropdown.Item>
        //                             </DropdownType>
        //                         </>
        //                     ))}
        //                 </div>
        //             </Fragment>
        //         )
        //     },
        // },
    ]



    return (
        <div className='row g-5 g-xxl-8'>
            <div className="card">
                <div className="card-body">
                    <div className='row'>
                        <div className='col-6'>
                            <Link
                                className='text-reset text-decoration-none'
                                to={`/kepegawaian/laporan-rekapitulasi-pegawai/tab-rekapitulasi-data-pegawai-pensiun`}
                            >
                                <button className='float-none btn btn-secondary align-self-center m-1'>
                                    <i className='fa-solid fa-arrow-left'></i>
                                    Kembali
                                </button>
                            </Link>
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <ReactToPrint
                                trigger={() => (
                                    <a className='float-none btn btn-primary align-self-center m-1' href='#'>
                                        Unduh Pdf
                                    </a>
                                )}
                                pageStyle='
                            @page { 
                                size: auto; 
                                margin: 0mm; 
                                } 
                                @media 
                                print { 
                                
                                .header, .header-space,
                    .footer, .footer-space {
                    height: 100px;
                    }
                    .header {
                    position: fixed;
                    top: 0;
                    }
                    .footer {
                    position: fixed;
                    bottom: 0;
                    }
                                }

            
            
                                @media all {
                                .pagebreak {
                                    display: inline;
                                }
                                }
                            '
                                content={() => componentRef}
                            />
                        </div>
                    </div>
                    {/* START :: Konten Download */}
                    {/* START :: Isi Konten Download */}
                    <div ref={(el) => (componentRef = el)}>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <td
                                        style={{
                                            border: '0px',
                                        }}
                                    >
                                        <div className='header-space'></div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            border: '0px',
                                        }}
                                    >
                                        <div className='content'>
                                            <div className='col-12'>
                                                <h1 className='text-dark fw-bold fs-3 text-center'>
                                                    DAFTAR NAMA PEGAWAI YANG MEMASUKI MASA PENSIUN
                                                </h1>
                                                <h1 className='text-dark fw-bold fs-3 text-center'>
                                                    PADA SATUAN POLISI PAMONG PRAJA PROVINSI DKI JAKARTA
                                                </h1>
                                            </div>
                                            <div className='p-4'></div>
                                            {/* START :: Table */}
                                            <div className='row g-5 g-xxl-8 ms-15 me-15'>
                                                {/* <DataTable
                                                    columns={columns}
                                                    data={data}
                                                    progressPending={loading}
                                                    progressComponent={<LoadingAnimation />}
                                                    highlightOnHover
                                                    theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                                                // conditionalRowStyles={conditionalRowStyles}
                                                /> */}
                                            </div>
                                            {/* END :: Table */}
                                            {/* START :: Buat Tanda Tangan */}
                                            <div className='row'>
                                                <div className='col-8'></div>
                                                <div className='col-4 fs-6 mb-2 mt-20 fw-semibold text-center'>
                                                    <div className='col fs-6 mb-2 fw-semibold text-center'>
                                                        ................................................
                                                    </div>
                                                    <div className='col fs-6 fw-semibold text-center'>
                                                        Kepala Satpol PP................................
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-8'></div>
                                                <div className='col-4 fs-6 mb-2 mt-20 fw-semibold text-center'>
                                                    <div className='col fs-6 mb-2 fw-semibold text-center'>
                                                        ................................................
                                                    </div>
                                                    <div className='col fs-6 fw-semibold text-center'>
                                                        NIP. .........................................
                                                    </div>
                                                </div>
                                            </div>
                                            {/* END :: Buat Tanda Tangan */}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td
                                        style={{
                                            border: '0px',
                                        }}
                                    >
                                        <div className='footer-space'></div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className='header'></div>
                        <div className='footer'></div>
                    </div>
                    {/* END :: End Isi Konten Download */}
                </div>
            </div>
        </div>
    )
}