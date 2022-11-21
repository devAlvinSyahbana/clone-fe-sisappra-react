import React, {useEffect, useRef, useState} from 'react'
import Modal from 'react-bootstrap/Modal'

import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomRow} from './users-list/table/columns/CustomRow'
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from './users-list/core/QueryResponseProvider'
import {usersColumns} from './users-list/table/columns/_columns'
import {User} from './users-list/core/_models'
import {UsersListLoading} from './users-list/components/loading/UsersListLoading'
import {UsersListPagination} from './users-list/components/pagination/UsersListPagination'
import {KTCardBody, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {CustomHeaderColumn} from './users-list/table/columns/CustomHeaderColumn'
import {ErrorMessage, Field, FieldArray, Form, Formik, FormikHelpers} from 'formik'
import {SelectOptionAutoCom} from './KepegawaianInterface'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import AsyncSelect from 'react-select/async'
// Chart
import {Tree, TreeNode} from 'react-organizational-chart'
import styled from 'styled-components'
import OrganizationChart from '@dabeng/react-orgchart'
import StrukturalOrganisasi from './hirarki-chart/StrukturalOrganisasi'
import FileDownload from 'js-file-download'
// import MyNode from "./hirarki-chart/my-node";
import PropTypes from 'prop-types'
import './hirarki-chart/my-node.css'

// OrgChart
import OrganizationalChart from './hirarki-chart/components/orgChart'
// API
const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const ATASAN_URL = `${API_URL}/kepegawaian`
export const DATA_HIRARKI_URL = `${API_URL}/master/struktur_data_hirarki`

export function HirarkiPegawai() {
  const users = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  // const data = useMemo(() => users, [users])
  const columns = useMemo(() => usersColumns, [])
  const arrStatPegawai = ['PNS', 'PTT', 'PJLP']
  const [valStatPegawai, setValStatPegawai] = useState({val: ''})

  // const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
  //   columns,
  //   data,
  // })
  const {id, status} = useParams()
  // console.log('id, status', id, status)
  const [lgShow, setLgShow] = useState(false)
  const [inputValAtasan, setDataPegawai] = useState({label: '', value: null})

  const initialValues = {
    friends: [
      {
        nrk: '',
        nama: '',
      },
    ],
  }

  // Autocomplete Pegawai
  const filterPegawai = async (inputValue: string) => {
    const response = await axios.get(
      `${ATASAN_URL}/auto-search-pegawai?status=${
        valStatPegawai.val ? valStatPegawai.val : 'PNS'
      }&nomor=${inputValue}`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.no_pegawai + ' - ' + i.nama, value: i.id}))
  }
  const loadOptionsPegawai = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterPegawai(inputValue))
    }, 1000)
  }
  const handleInputPegawai = (newValue: any) => {
    setDataPegawai((prevstate: any) => ({...prevstate, ...newValue}))
  }

  const handleChangeStatPegawai = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValStatPegawai({val: event.target.value})
  }

  // Struktural Organisasi TIPE 1
  const StyledNode = styled.div`
    padding: 5px;
    border-radius: 2px;
    display: inline-block;
    border: 1px solid black;
  `

  // Org Chart TIPE 2

  const orgchart = useRef()

  const ds = {
    id: 'level1',
    name: 'Lao Lao',
    title: 'KEPALA SATPOL PP',
    children: [
      {
        id: 'sublevel1',
        name: 'Bo Miao',
        title: 'WAKIL KEPALA SATPOL PP',
        children: [
          {
            id: 'sublevel1.2.1',
            name: 'Su Miao',
            title: 'SEKRETARIAT',
            children: [
              {id: 'sublevel1.2.1.1', name: 'Tie Hua', title: 'SUBBAGIAN UMUM'},
              {id: 'sublevel1.2.1.2', name: 'Hei Hei', title: 'SUBBAGIAN KEPEGAWAIAN'},
              {id: 'sublevel1.2.1.3', name: 'Pang Pang', title: 'SUBBAGIAN PROGRAM DAN KEUANGAN'},
              {
                id: 'sublevel1.2.1.4',
                name: 'Pang Pang',
                title: 'SUBBAGIAN PERALATAN DAN PERLENGKAPAN',
              },
            ],
          },
          {
            id: 'sublevel1.2.2',
            name: 'Su Miao',
            title: 'BIDANG KETENTRAMAN DAN KETERTIBAN UMUM',
            children: [
              {id: 'sublevel1.2.2.1', name: 'Tie Hua', title: 'SEKSI PENGADUAN DAN SENGKETA'},
              {
                id: 'sublevel1.2.2.2',
                name: 'Hei Hei',
                title: 'SEKSI KETERTIBAN SARANA DAN PRASARANA KOTA',
              },
              {id: 'sublevel1.2.2.3', name: 'Pang Pang', title: 'SEKSI DATA DAN INFORMASI'},
            ],
          },
          {
            id: 'sublevel1.2.3',
            name: 'Su Miao',
            title: 'BIDANG PENGAWASAN DAN PENGENDALIAN TEMPAT USAHA, HIBURAN DAN REKREASI',
            children: [
              {
                id: 'sublevel1.2.3.1',
                name: 'Tie Hua',
                title: 'SEKSI PENGAWASAN DAN PENGENDALIAN TEMPAT USAHA INDUSTRI',
              },
              {
                id: 'sublevel1.2.3.2',
                name: 'Hei Hei',
                title: 'SEKSI PENGAWASAN DAN PENGENDALIAN TEMPAT USAHA NON INDUSTRI',
              },
              {
                id: 'sublevel1.2.3.3',
                name: 'Pang Pang',
                title: 'SEKSI PENGAWASAN DAN PENGENDALIAN TEMPAT USAHA HIBURAN DAN REKREASI',
              },
            ],
          },
          {
            id: 'sublevel1.2.4',
            name: 'Su Miao',
            title: 'BIDANG PERLINDUNGAN MASYARAKAT',
            children: [
              {id: 'sublevel1.2.4.1', name: 'Tie Hua', title: 'SEKSI PENGARAHAN DAN PENGENDALIAN'},
              {id: 'sublevel1.2.4.2', name: 'Hei Hei', title: 'SEKSI PROTOKOL DAN PENGENDALIAN'},
              {id: 'sublevel1.2.4.3', name: 'Pang Pang', title: 'SEKSI BIMBINGAN DAN PENYULUHAN'},
            ],
          },
          {
            id: 'sublevel1.2.5',
            name: 'Su Miao',
            title: 'BIDANG PENEGAKAN DAN PENINDAKAN',
            children: [
              {id: 'sublevel1.2.5.1', name: 'Tie Hua', title: 'SEKSI PEMANTAUAN'},
              {id: 'sublevel1.2.5.2', name: 'Hei Hei', title: 'SEKSI OPERASI'},
              {id: 'sublevel1.2.5.3', name: 'Pang Pang', title: 'SEKSI ANALISA DAN EVALUASI'},
            ],
          },
          {
            id: 'sublevel1.2.6',
            name: 'Su Miao',
            title: 'BIDANG PPNS',
            children: [
              {id: 'sublevel1.2.6.1', name: 'Tie Hua', title: 'SEKSI PEMBINAAN'},
              {id: 'sublevel1.2.6.2', name: 'Hei Hei', title: 'SEKSI PENYELIDIKAN'},
              {id: 'sublevel1.2.6.3', name: 'Pang Pang', title: 'SEKSI HUBUNGAN ANTAR LEMBAGA'},
            ],
          },
          {
            id: 'sublevel1.2.7',
            name: 'Su Miao',
            title: 'SATPOL PP KOTA',
            children: [
              {id: 'sublevel1.2.7.1', name: 'Tie Hua', title: 'SUBBAGIAN TATA USAHA'},
              {id: 'sublevel1.2.7.2', name: 'Hei Hei', title: 'SEKSI KETENTRAMAN'},
              {id: 'sublevel1.2.7.3', name: 'Pang Pang', title: 'SEKSI PERLINDUNGAN MASYARAKAT'},
              {id: 'sublevel1.2.7.4', name: 'Pang Pang', title: 'SEKSI PPNS DAN PENINDAKAN'},
              {
                id: 'sublevel1.2.7.5',
                name: 'Pang Pang',
                title: 'SATPOL PP KECAMATAN',
                children: [
                  {id: 'sublevel1.2.7.5.1', name: 'Pang Pang', title: 'SATPOL PP KELURAHAN'},
                ],
              },
              {id: 'sublevel1.2.7.6', name: 'Pang Pang', title: 'SUB KELOMPOK JABATAN FUNGSIONAL'},
            ],
          },
          {
            id: 'sublevel1.2.8',
            name: 'Su Miao',
            title: 'SATPOL PP KABUPATEN',
            children: [
              {id: 'sublevel1.2.8.1', name: 'Tie Hua', title: 'SUBBAGIAN TATA USAHA'},
              {id: 'sublevel1.2.8.2', name: 'Hei Hei', title: 'SEKSI KETENTRAMAN'},
              {id: 'sublevel1.2.8.3', name: 'Pang Pang', title: 'SEKSI PERLINDUNGAN MASYARAKAT'},
              {id: 'sublevel1.2.8.4', name: 'Pang Pang', title: 'SEKSI PPNS DAN PENINDAKAN'},
              {
                id: 'sublevel1.2.8.5',
                name: 'Pang Pang',
                title: 'SATPOL PP KECAMATAN',
                children: [
                  {id: 'sublevel1.2.8.5.1', name: 'Pang Pang', title: 'SATPOL PP KELURAHAN'},
                ],
              },
              {id: 'sublevel1.2.8.6', name: 'Pang Pang', title: 'SUB KELOMPOK JABATAN FUNGSIONAL'},
            ],
          },
          {
            id: 'sublevel1.2.9',
            name: 'Su Miao',
            title: 'KELOMPOK JABATAN FUNGSIONAL',
          },
        ],
      },
    ],
  }

  const exportTo = async () => {
    // setbtnLoadingUnduh(true)
    await axios({
      url: orgchart.current,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(response.data, filename + fileextension)
      // setbtnLoadingUnduh(false)
    })
  }

  // const exportTo = () => {
  // FileDownload(orgchart.current, filename + fileextension)
  // orgchart.current.exportTo(filename, fileextension);
  // };

  const [filename, setFilename] = useState('organization_chart')
  const [fileextension, setFileextension] = useState('png')

  const onNameChange = (event: {preventDefault: () => void; target: {value: any; name: any}}) => {
    setFilename(event.target.value)
  }

  const onExtensionChange = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFileextension(event.target.value)
  }

  // Data Tipe 3
  const [datasatpp, setDataSatPP] = useState()

  useEffect(() => {
    const fetchDataPP = async () => {
      const value = await axios.get(`${DATA_HIRARKI_URL}/find-bagan`)
      const fixedData = value.data.data.map((item: any) => {
        const {parentid, position_name, ...newItem} = item
        return {
          ...newItem,
          parentId: parentid == '0' ? '' : parentid + '',
          positionName: position_name,
        }
      })
      setDataSatPP(fixedData)
    }
    console.log('ini buat data test', datasatpp)
    fetchDataPP()
  }, [])

  const datasatpol = [{id: 1, parentId: '', positionName: 'KEPALA SATPOL PP DKI JAKARTA', team: ''}]

  const datasatpolpp = [
    {
      id: 1,
      parentId: '',
      positionName: 'Kepala Satpol PP',
      team: '',
      tempatLahir: 'Jakarta',
      tanggalLahir: '16 Des 1967',
      nrk: '1252151',
      statusPegawai: 'PNS',
      jenisKelamin: 'Laki-laki',
      agama: 'Islam',
      imageUrl: '',
    },
    {
      id: 2,
      parentId: '1',
      name: 'Sahat Parulian',
      positionName: 'Wakil Kepala Satpol PP',
      team: '',
      tempatLahir: 'Bekasi',
      tanggalLahir: '16 Jan 1967',
      nrk: '1252151',
      statusPegawai: 'PNS',
      jenisKelamin: 'Laki-laki',
      agama: 'Islam',
      imageUrl: '',
    },
    {
      id: 3,
      parentId: '43',
      name: 'Kate',
      positionName: 'SEKRETARIAT',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      tempatLahir: 'Jakarta',
      tanggalLahir: '16 Des 1967',
      nrk: '1252151',
      statusPegawai: 'PNS',
      jenisKelamin: 'Laki-laki',
      agama: 'Islam',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 4,
      parentId: '3',
      name: 'Kate',
      positionName: 'SUBBAGIAN UMUM',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 5,
      parentId: '3',
      name: 'Kate',
      positionName: 'SUBBAGIAN KEPEGAWAIAN',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 6,
      parentId: '3',
      name: 'Kate',
      positionName: 'SUBBAGIAN PROGRAM DAN KEUANGAN',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 7,
      parentId: '3',
      name: 'Kate',
      positionName: 'SUBBAGIAN PERALATAN DAN PERLENGKAPAN',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 8,
      parentId: '44',
      name: 'Kate',
      positionName: 'BIDANG KETENTRAMAN DAN KETERTIBAN UMUM',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      id: 9,
      parentId: '8',
      name: 'Kate',
      positionName: 'SEKSI PENGADUAN DAN SENGKETA',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 10,
      parentId: '8',
      name: 'Kate',
      positionName: 'SEKSI KETERTIBAN SARANA DAN PRASARAN KOTA',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 11,
      parentId: '8',
      name: 'Kate',
      positionName: 'SEKSI DATA DAN INFORMASI',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 12,
      parentId: '45',
      name: 'Kate',
      positionName: 'BIDANG PENGAWASAN DAN PENGENDALIAN TEMPAT USAHA DAN INDUSTRI',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      id: 13,
      parentId: '12',
      name: 'Kate',
      positionName: 'SEKSI PENGAWASAN DAN PENGENDALIAN TEMPAT USAHA INDUSTRI',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 14,
      parentId: '12',
      name: 'Kate',
      positionName: 'SEKSI PENGAWASAN DAN PENGENDALIAN TEMPAT USAHA NON INDUSTRI',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 15,
      parentId: '12',
      name: 'Kate',
      positionName: 'SEKSI PENGAWASAN DAN PENGENDALIAN TEMPAT USAHA HIBURAN DAN REKREASI',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 16,
      parentId: '46',
      name: 'Kate',
      positionName: 'Bidang Perlindungan Masyarakat',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      id: 17,
      parentId: '16',
      name: 'Kate',
      positionName: 'Seksi Pengerahan dan Pengendalian',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 18,
      parentId: '16',
      name: 'Kate',
      positionName: 'Seksi Protokol dan Pengamanan Obyek Vital',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 19,
      parentId: '16',
      name: 'Kate',
      positionName: 'Seksi Bimbingan dan Penyuluhan',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 20,
      parentId: '47',
      name: 'Kate',
      positionName: 'Bidang Penegakan dan Penindakan',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      id: 21,
      parentId: '20',
      name: 'Kate',
      positionName: 'Seksi Pemantauan',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 22,
      parentId: '20',
      name: 'Kate',
      positionName: 'Seksi Operasi',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 23,
      parentId: '20',
      name: 'Kate',
      positionName: 'Seksi Analisa dan Evakuasi',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 24,
      parentId: '48',
      name: 'Kate',
      positionName: 'Bidang PPNS',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      id: 25,
      parentId: '24',
      name: 'Kate',
      positionName: 'Seksi Pembinaan',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 26,
      parentId: '24',
      name: 'Kate',
      positionName: 'Seksi Penyelidikan',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 27,
      parentId: '24',
      name: 'Kate',
      positionName: 'Seksi Hubungan Antar Lembaga',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 28,
      parentId: '49',
      name: 'Kate',
      positionName: 'Satpol PP Kota',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      id: 29,
      parentId: '28',
      name: 'Kate',
      positionName: 'Subbagian Tata Usaha',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 30,
      parentId: '28',
      name: 'Kate',
      positionName: 'Seksi Ketentraman',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 31,
      parentId: '28',
      name: 'Kate',
      positionName: 'Seksi Perlindungan Masyarakat',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 32,
      parentId: '28',
      name: 'Kate',
      positionName: 'Seksi PPNS dan Penindakan',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 33,
      parentId: '28',
      name: 'Kate',
      positionName: 'Satpol PP Kecamatan',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 34,
      parentId: '33',
      name: 'Kate',
      positionName: 'Satpol PP Kelurahan',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 35,
      parentId: '28',
      name: 'Kate',
      positionName: 'Sub Kelompok Jabatan Fungsional',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 36,
      parentId: '50',
      name: 'Kate',
      positionName: 'Satpol PP Kabupaten',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      id: 37,
      parentId: '36',
      name: 'Kate',
      positionName: 'Subbagian Tata Usaha',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 38,
      parentId: '36',
      name: 'Kate',
      positionName: 'Seksi Ketentraman',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 39,
      parentId: '36',
      name: 'Kate',
      positionName: 'Seksi Perlindungan Masyarakat',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 39,
      parentId: '36',
      name: 'Kate',
      positionName: 'Seksi PPNS dan Penindakan',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 40,
      parentId: '36',
      name: 'Kate',
      positionName: 'Satpol PP Kecamatan',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 41,
      parentId: '40',
      name: 'Kate',
      positionName: 'Satpol PP Kelurahan',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 42,
      parentId: '36',
      name: 'Kate',
      positionName: 'Sub Kelompok Jabatan Fungsional',
      phone: '-',
      email: '@email.com',
      team: '',
      location: 'JAKARTA',
      department: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 43,
      parentId: '2',
      team: 'Sekretariat',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 44,
      parentId: '2',
      team: 'Bidang Ketentraman',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 45,
      parentId: '2',
      team: 'Bidang Pengawasan',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 46,
      parentId: '2',
      team: 'Bidang Perlindungan Masyarakat',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 47,
      parentId: '2',
      team: 'Bidang Penegakan dan Penindakan',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 48,
      parentId: '2',
      team: 'Bidang PPNS',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 49,
      parentId: '2',
      team: 'Satpol PP Kota',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 50,
      parentId: '2',
      team: 'Satpol PP Kabupaten',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ]

  return (
    <>
      <div className={`card`}>
        {/* begin::Body */}
        <div className='card mb-5 mb-xl-10'>
          <div className='card-body pt-9 pb-0'>
            <div className='container pb-5 pt-5'>
              <div className='row'>
                <div className='col'>
                  <div className='d-flex justify-content-center'>
                    <img
                      src={toAbsoluteUrl('/media/logos/logo-dki-jakarta.png')}
                      width='250px'
                      height='150px'
                      alt='Profile'
                    />
                  </div>
                </div>
                <div className='col-md'>
                  <div className='col-12 pt-6'>
                    <h1 className='text-dark fw-bold fs-1 text-center'>STRUKTUR ORGANISASI</h1>
                    <h1 className='text-dark fw-bold fs-1 text-center'>
                      SATUAN POLISI PAMONG PRAJA
                    </h1>
                    <h1 className='text-dark fw-bold fs-1 text-center'>PROVINSI DKI JAKARTA</h1>
                  </div>
                </div>
                <div className='col'>
                  <div className='d-flex justify-content-center pt-3'>
                    <img
                      src={toAbsoluteUrl('/media/logos/logo-satpol-pp.png')}
                      width='190px'
                      height='120px'
                      alt='Profile'
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Menampilkan Struktur Organisasi */}
            {/* {datasatpp && <OrganizationalChart data={datasatpp} />} */}
            <OrganizationalChart data={datasatpp} />
          </div>
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}
