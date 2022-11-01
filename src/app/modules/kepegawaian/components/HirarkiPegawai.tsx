import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';

import { useMemo } from 'react'
import { useTable, ColumnInstance, Row } from 'react-table'
import { CustomRow } from './users-list/table/columns/CustomRow'
import { useQueryResponseData, useQueryResponseLoading } from './users-list/core/QueryResponseProvider'
import { usersColumns } from './users-list/table/columns/_columns'
import { User } from './users-list/core/_models'
import { UsersListLoading } from './users-list/components/loading/UsersListLoading'
import { UsersListPagination } from './users-list/components/pagination/UsersListPagination'
import { KTCardBody } from '../../../../_metronic/helpers'
import { CustomHeaderColumn } from './users-list/table/columns/CustomHeaderColumn';
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { SelectOptionAutoCom } from './KepegawaianInterface'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
// Chart
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import OrganizationChart from "@dabeng/react-orgchart";
import StrukturalOrganisasi from "./hirarki-chart/StrukturalOrganisasi";
import FileDownload from 'js-file-download'
// import MyNode from "./hirarki-chart/my-node";
import PropTypes from "prop-types";
import "./hirarki-chart/my-node.css";

// OrgChart
import OrganizationalChart from './hirarki-chart/components/orgChart';
// API
const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const ATASAN_URL = `${API_URL}/kepegawaian`



export function HirarkiPegawai() {
  const users = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => users, [users])
  const columns = useMemo(() => usersColumns, [])
  const arrStatPegawai = ['PNS', 'PTT', 'PJLP']
  const [valStatPegawai, setValStatPegawai] = useState({ val: '' })

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  })
  const { id, status } = useParams()
  console.log('id, status', id, status)
  const [lgShow, setLgShow] = useState(false);
  const [inputValAtasan, setDataPegawai] = useState({ label: '', value: null })

  const initialValues = {
    friends: [
      {
        nrk: '',
        nama: '',
      },
    ],
  };

  // Autocomplete Pegawai
  const filterPegawai = async (inputValue: string) => {
    const response = await axios.get(`${ATASAN_URL}/auto-search-pegawai?status=${valStatPegawai.val ? valStatPegawai.val : "PNS"}&nomor=${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({ label: i.no_pegawai + " - " + i.nama, value: i.id }))
  }
  const loadOptionsPegawai = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
    setTimeout(async () => {
      callback(await filterPegawai(inputValue))
    }, 1000)
  }
  const handleInputPegawai = (newValue: any) => {
    setDataPegawai((prevstate: any) => ({ ...prevstate, ...newValue }))
  }

  const handleChangeStatPegawai = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValStatPegawai({ val: event.target.value })
  }

  // Struktural Organisasi
  const StyledNode = styled.div`
    padding: 5px;
    border-radius: 2px;
    display: inline-block;
    border: 1px solid black;
  `;

  // Org Chart

  const orgchart = useRef();

  const ds = {
    id: "level1",
    name: "Lao Lao",
    title: "KEPALA SATPOL PP",
    children: [
      {
        id: "sublevel1",
        name: "Bo Miao",
        title: "WAKIL KEPALA SATPOL PP",
        children: [
          {
            id: "sublevel1.2.1",
            name: "Su Miao",
            title: "SEKRETARIAT",
            children: [
              { id: "sublevel1.2.1.1", name: "Tie Hua", title: "SUBBAGIAN UMUM" },
              { id: "sublevel1.2.1.2", name: "Hei Hei", title: "SUBBAGIAN KEPEGAWAIAN" },
              { id: "sublevel1.2.1.3", name: "Pang Pang", title: "SUBBAGIAN PROGRAM DAN KEUANGAN" },
              { id: "sublevel1.2.1.4", name: "Pang Pang", title: "SUBBAGIAN PERALATAN DAN PERLENGKAPAN" }
            ]
          },
          {
            id: "sublevel1.2.2",
            name: "Su Miao",
            title: "BIDANG KETENTRAMAN DAN KETERTIBAN UMUM",
            children: [
              { id: "sublevel1.2.2.1", name: "Tie Hua", title: "SEKSI PENGADUAN DAN SENGKETA" },
              { id: "sublevel1.2.2.2", name: "Hei Hei", title: "SEKSI KETERTIBAN SARANA DAN PRASARANA KOTA" },
              { id: "sublevel1.2.2.3", name: "Pang Pang", title: "SEKSI DATA DAN INFORMASI" }
            ]
          },
          {
            id: "sublevel1.2.3",
            name: "Su Miao",
            title: "BIDANG PENGAWASAN DAN PENGENDALIAN TEMPAT USAHA, HIBURAN DAN REKREASI",
            children: [
              { id: "sublevel1.2.3.1", name: "Tie Hua", title: "SEKSI PENGAWASAN DAN PENGENDALIAN TEMPAT USAHA INDUSTRI" },
              { id: "sublevel1.2.3.2", name: "Hei Hei", title: "SEKSI PENGAWASAN DAN PENGENDALIAN TEMPAT USAHA NON INDUSTRI" },
              { id: "sublevel1.2.3.3", name: "Pang Pang", title: "SEKSI PENGAWASAN DAN PENGENDALIAN TEMPAT USAHA HIBURAN DAN REKREASI" }
            ]
          },
          {
            id: "sublevel1.2.4",
            name: "Su Miao",
            title: "BIDANG PERLINDUNGAN MASYARAKAT",
            children: [
              { id: "sublevel1.2.4.1", name: "Tie Hua", title: "SEKSI PENGARAHAN DAN PENGENDALIAN" },
              { id: "sublevel1.2.4.2", name: "Hei Hei", title: "SEKSI PROTOKOL DAN PENGENDALIAN" },
              { id: "sublevel1.2.4.3", name: "Pang Pang", title: "SEKSI BIMBINGAN DAN PENYULUHAN" }
            ]
          },
          {
            id: "sublevel1.2.5",
            name: "Su Miao",
            title: "BIDANG PENEGAKAN DAN PENINDAKAN",
            children: [
              { id: "sublevel1.2.5.1", name: "Tie Hua", title: "SEKSI PEMANTAUAN" },
              { id: "sublevel1.2.5.2", name: "Hei Hei", title: "SEKSI OPERASI" },
              { id: "sublevel1.2.5.3", name: "Pang Pang", title: "SEKSI ANALISA DAN EVALUASI" }
            ]
          },
          {
            id: "sublevel1.2.6",
            name: "Su Miao",
            title: "BIDANG PPNS",
            children: [
              { id: "sublevel1.2.6.1", name: "Tie Hua", title: "SEKSI PEMBINAAN" },
              { id: "sublevel1.2.6.2", name: "Hei Hei", title: "SEKSI PENYELIDIKAN" },
              { id: "sublevel1.2.6.3", name: "Pang Pang", title: "SEKSI HUBUNGAN ANTAR LEMBAGA" }
            ]
          },
          {
            id: "sublevel1.2.7",
            name: "Su Miao",
            title: "SATPOL PP KOTA",
            children: [
              { id: "sublevel1.2.7.1", name: "Tie Hua", title: "SUBBAGIAN TATA USAHA" },
              { id: "sublevel1.2.7.2", name: "Hei Hei", title: "SEKSI KETENTRAMAN" },
              { id: "sublevel1.2.7.3", name: "Pang Pang", title: "SEKSI PERLINDUNGAN MASYARAKAT" },
              { id: "sublevel1.2.7.4", name: "Pang Pang", title: "SEKSI PPNS DAN PENINDAKAN" },
              {
                id: "sublevel1.2.7.5", name: "Pang Pang", title: "SATPOL PP KECAMATAN",
                children: [
                  { id: "sublevel1.2.7.5.1", name: "Pang Pang", title: "SATPOL PP KELURAHAN" }
                ]
              },
              { id: "sublevel1.2.7.6", name: "Pang Pang", title: "SUB KELOMPOK JABATAN FUNGSIONAL" }
            ]
          },
          {
            id: "sublevel1.2.8",
            name: "Su Miao",
            title: "SATPOL PP KABUPATEN",
            children: [
              { id: "sublevel1.2.8.1", name: "Tie Hua", title: "SUBBAGIAN TATA USAHA" },
              { id: "sublevel1.2.8.2", name: "Hei Hei", title: "SEKSI KETENTRAMAN" },
              { id: "sublevel1.2.8.3", name: "Pang Pang", title: "SEKSI PERLINDUNGAN MASYARAKAT" },
              { id: "sublevel1.2.8.4", name: "Pang Pang", title: "SEKSI PPNS DAN PENINDAKAN" },
              {
                id: "sublevel1.2.8.5", name: "Pang Pang", title: "SATPOL PP KECAMATAN",
                children: [
                  { id: "sublevel1.2.8.5.1", name: "Pang Pang", title: "SATPOL PP KELURAHAN" }
                ]
              },
              { id: "sublevel1.2.8.6", name: "Pang Pang", title: "SUB KELOMPOK JABATAN FUNGSIONAL" }
            ]
          },
          {
            id: "sublevel1.2.9",
            name: "Su Miao",
            title: "KELOMPOK JABATAN FUNGSIONAL",
          },
        ]
      },
    ]
  };

  const exportTo = async () => {
    // setbtnLoadingUnduh(true)
    await axios({
      url: orgchart.current,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(
        response.data,
        filename + fileextension
      )
      // setbtnLoadingUnduh(false)
    })
  }

  // const exportTo = () => {
  // FileDownload(orgchart.current, filename + fileextension)
  // orgchart.current.exportTo(filename, fileextension);
  // };

  const [filename, setFilename] = useState("organization_chart");
  const [fileextension, setFileextension] = useState("png");

  const onNameChange = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setFilename(event.target.value);
  };

  const onExtensionChange = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setFileextension(event.target.value);
  };

  // Data Tipe 3
  const datasatpolpp = [
    {
      id: 1,
      parentId: "",
      name: "John",
      positionName: "CEO",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      parentId: "1",
      name: "Smith",
      positionName: "COO",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
    },

    {
      id: 3,
      parentId: "1",
      name: "Kate",
      positionName: "CTO",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 4,
      parentId: "6",
      team: "HR team",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 5,
      parentId: "3",
      name: "Erica",
      positionName: "Manager of something",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      id: 6,
      parentId: "3",
      name: "Paul",
      positionName: "Manager of something",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      id: 7,
      parentId: "5",
      team: "Developers",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 8,
      parentId: "3",
      name: "Tony",
      positionName: "Manager of something",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 9,
      parentId: "2",
      name: "Sally",
      positionName: "Manager of something",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      id: 10,
      parentId: "4",
      name: "Scott",
      positionName: "HR assistant",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
    },

    {
      id: 11,
      parentId: "1",
      name: "James",
      positionName: "CGO",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 12,
      parentId: "4",
      name: "Tony",
      positionName: "HR assistant",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 13,
      parentId: "4",
      name: "Sally",
      positionName: "HR assistant",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      id: 14,
      parentId: "8",
      name: "Scott",
      positionName: "Teacher",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
    },

    {
      id: 15,
      parentId: "8",
      name: "James",
      positionName: "Teacher",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 16,
      parentId: "7",
      name: "Tony",
      positionName: "Developer",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 17,
      parentId: "7",
      name: "Sally",
      positionName: "Developer",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      id: 18,
      parentId: "8",
      name: "Scott",
      positionName: "Teacher",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      id: 19,
      parentId: "7",
      name: "Tony",
      positionName: "Developer",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 20,
      parentId: "7",
      name: "Tony",
      positionName: "Developer",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 21,
      parentId: "7",
      name: "Tony",
      positionName: "Developer",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 22,
      parentId: "7",
      name: "Tony",
      positionName: "Developer",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 23,
      parentId: "7",
      name: "Tony",
      positionName: "Developer",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 24,
      parentId: "7",
      name: "Tony",
      positionName: "Developer",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 25,
      parentId: "7",
      name: "Tony",
      positionName: "Developer",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 26,
      parentId: "7",
      name: "Tony",
      positionName: "Developer",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 27,
      parentId: "7",
      name: "Tony",
      positionName: "Developer",
      phone: "99887766",
      email: "employee@email.com",
      team: "",
      location: "LA Branch",
      department: "Marketing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
  ];

  return (
    <>
      <div className={`card`}>
        {/* begin::Body */}
        <div className='card mb-5 mb-xl-10'>
          <div className='card-body pt-9 pb-0'>
            <div className='card-header border-0 pt-6'>
              <div className='card-title'>
                <div className="d-flex align-items-center position-relative my-1">
                  <span className="svg-icon svg-icon-1 position-absolute ms-6">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height={2} rx={1} transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                      <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                    </svg>
                  </span>
                  <input type="text" data-kt-user-table-filter="search" className="form-control form-control-solid w-250px ps-14" placeholder="Cari pegawai" />
                </div>
              </div>
              <div className="card-toolbar">
                <div className="d-flex justify-content-end" data-kt-user-table-toolbar="base">
                  <button type="button" className="btn btn-primary" onClick={() => setLgShow(true)}>
                    <span className="svg-icon svg-icon-2">
                      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.5" x="11.364" y="20.364" width={16} height={2} rx={1} transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                        <rect x="4.36396" y="11.364" width={16} height={2} rx={1} fill="currentColor" />
                      </svg>
                    </span>
                    Tambah Atasan
                  </button>
                </div>
                <div className="d-flex justify-content-end align-items-center d-none" data-kt-user-table-toolbar="selected">
                  <div className="fw-bold me-5">
                    <span className="me-2" data-kt-user-table-select="selected_count" />Terpilih
                  </div>
                  <button type="button" className="btn btn-danger" data-kt-user-table-select="delete_selected">
                    Hapus Terpilih
                  </button>
                </div>
                <div className="modal fade" id="kt_modal_export_users" tabIndex={-1} aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered mw-650px">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h2 className="fw-bold">Export Pengguna</h2>
                      </div>
                      <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
                        <form id="kt_modal_export_users_form" className="form" action="#">
                          <div className="fv-row mb-10">
                            <label className="fs-6 fw-semibold form-label mb-2">Pilih Hak Akses:</label>
                            <select name="role" data-control="select2" data-placeholder="Pilih" data-hide-search="true" className="form-select form-select-solid fw-bold">
                              <option />
                              <option value="Administrator">
                                Administrator
                              </option>
                              <option value="Analyst">Analyst</option>
                              <option value="Developer">
                                Developer
                              </option>
                              <option value="Support">Support</option>
                              <option value="Trial">Trial</option>
                            </select>
                          </div>
                          <div className="fv-row mb-10">
                            <label className="required fs-6 fw-semibold form-label mb-2">Pilih Format Export:</label>
                            <select name="format" data-control="select2" data-placeholder="Pilih" data-hide-search="true" className="form-select form-select-solid fw-bold">
                              <option />
                              <option value="excel">Excel</option>
                              <option value="pdf">PDF</option>
                              <option value="cvs">CVS</option>
                              <option value="zip">ZIP</option>
                            </select>
                          </div>
                          <div className="text-center">
                            <button type="reset" className="btn btn-light me-3" data-kt-users-modal-action="cancel">
                              Batal
                            </button>
                            <button type="submit" className="btn btn-primary" data-kt-users-modal-action="submit">
                              <span className="indicator-label">Export</span>
                              <span className="indicator-progress">Harap tunggu...
                                <span className="spinner-border spinner-border-sm align-middle ms-2" /></span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <Modal
                  size="lg"
                  show={lgShow}
                  onHide={() => setLgShow(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                      <h2 className="fw-bold">Tambah Atasan</h2>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        alert(JSON.stringify(values, null, 2));
                      }}
                    >
                      {({ values }) => (
                        <Form>
                          <FieldArray name="friends">
                            {({ insert, remove, push }) => (
                              <div>
                                <div className="modal-content">
                                  <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
                                    <div className="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_user_header" data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px">
                                      <div className='form-group'>
                                        <label htmlFor='' className='fw-semibold fs-6 mb-2'>
                                          Status Kepegawaian
                                        </label>
                                        <select
                                          className='form-select form-select-solid mb-5'
                                          aria-label='Select example'
                                          value={valStatPegawai.val}
                                          onChange={handleChangeStatPegawai}
                                          name='val'
                                        >
                                          <option value=''>Pilih</option>
                                          {arrStatPegawai.map((val: string) => {
                                            return <option value={val}>{val}</option>
                                          })}
                                        </select>
                                      </div>
                                      <div className="fv-row mb-7">
                                        <label className="fw-semibold fs-6 mb-2">NRK/NPTT/NPJLP</label>
                                        <AsyncSelect
                                          cacheOptions
                                          loadOptions={loadOptionsPegawai}
                                          defaultOptions
                                          onChange={handleInputPegawai}
                                          placeholder={'Cari NRK/NPTT/NPJLP'}
                                        />
                                      </div>
                                    </div>

                                    <div className='separator border-3 my-10'></div>

                                    <label className="fw-semibold fs-6 mb-7">Tambah bawahan</label>
                                    {values.friends.length > 0 &&
                                      values.friends.map((friend, index) => (


                                        <div className='form-group mb-5'>
                                          <div className="row" key={index}>
                                            <div className="col-md-9">
                                              <label className="form-label">NRK:</label>
                                              <AsyncSelect
                                                cacheOptions
                                                loadOptions={loadOptionsPegawai}
                                                defaultOptions
                                                onChange={handleInputPegawai}
                                                placeholder={'Cari NRK/NPTT/NPJLP'}
                                              />
                                              {/* <Field
                                                name={`friends.${index}.nama`}
                                                className="form-control mb-2 mb-md-0"
                                                placeholder="Masukkan NRK/NPTT/NPJLP"
                                                type="text"
                                              /> */}
                                              <ErrorMessage
                                                name={`friends.${index}.nama`}
                                                component="div"
                                                className="field-error"
                                              />
                                            </div>
                                            <div className="col-md-3">
                                              <button
                                                type="button"
                                                className="btn btn-sm btn-light-danger mt-3 mt-md-8"
                                                onClick={() => remove(index)}
                                              >
                                                <i className="la la-trash-o" />
                                                Delete
                                              </button>
                                            </div>
                                          </div>
                                        </div>

                                      ))}
                                    <div className="form-group mt-5">
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-light-primary"
                                        onClick={() => push({ name: '', email: '' })}
                                      >
                                        <i className="la la-plus" />
                                        Tambah
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </FieldArray>
                          <div className="text-center pt-15">
                            <button type="reset" className="btn btn-light me-3" data-kt-users-modal-action="cancel">
                              Batal
                            </button>
                            <button type="submit" className="btn btn-primary" data-kt-users-modal-action="submit">
                              <span className="indicator-label">Simpan</span>
                              <span className="indicator-progress">Harap tunggu...
                                <span className="spinner-border spinner-border-sm align-middle ms-2" /></span>
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                    {/*end::Modal content*/}
                  </Modal.Body>
                </Modal>
                {/*end::Modal - Add task*/}
              </div>
            </div>

            {/* <div>
              <KTCardBody className='py-4'>
                <div className='table-responsive'>
                  <table
                    id='kt_table_users'
                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                    {...getTableProps()}
                  >
                    <thead>
                      <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                        {headers.map((column: ColumnInstance<User>) => (
                          <CustomHeaderColumn key={column.id} column={column} />
                        ))}
                      </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                      {rows.length > 0 ? (
                        rows.map((row: Row<User>, i) => {
                          prepareRow(row)
                          return <CustomRow row={row} key={`row-${i}-${row.id}`} />
                        })
                      ) : (
                        <tr>
                          <td colSpan={7}>
                            <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                              No matching records found
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <UsersListPagination />
                {isLoading && <UsersListLoading />}
              </KTCardBody>
            </div> */}

            {/* START :: Coba org-chart */}
            <div>
              {/* <section className="toolbar">
                <label htmlFor="txt-filename">Filename:</label>
                <input
                  id="txt-filename"
                  type="text"
                  value={filename}
                  onChange={onNameChange}
                  style={{ fontSize: "1rem", marginRight: "2rem" }}
                />
                <span>Fileextension: </span>
                <input
                  id="rd-png"
                  type="radio"
                  value="png"
                  checked={fileextension === "png"}
                  onChange={onExtensionChange}
                />
                <label htmlFor="rd-png">png</label>
                <input
                  style={{ marginLeft: "1rem" }}
                  id="rd-pdf"
                  type="radio"
                  value="pdf"
                  checked={fileextension === "pdf"}
                  onChange={onExtensionChange}
                />
                <label htmlFor="rd-pdf">pdf</label>
                <button onClick={exportTo} style={{ marginLeft: "2rem" }}>
                  Export
                </button>
              </section>
              <OrganizationChart
                datasource={ds}
                pan={true}
                zoom={true}
                chartClass="myChart" */}
              {/* // NodeTemplate={this.MyNode}
              /> */}

              {/* TIPE 2 */}
              {/* <StrukturalOrganisasi /> */}

              {/* TIPE 3 */}
              {/* <h1 style={styles.title}>Organization Chart</h1> */}
              <OrganizationalChart data={datasatpolpp} />
            </div>
            {/* END :: Coba org-chart */}
          </div>
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}
