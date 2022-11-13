import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import DatePicker, { DateObject } from "react-multi-date-picker";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import { Button, Collapse } from 'react-bootstrap'
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import DtLaporanKegiatan from '../datatable/DtLaporanKegiatan'
import { string } from 'yup';

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KOTA_URL = `${API_URL}/master/kota`

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

export function LaporanKegiatan() {

  const [value, setValue] = useState([
    new DateObject().setDay(15),
    new DateObject().add(1, "month").setDay(15),
  ]);

  const [open, setOpen] = useState(false)

  const columns = [
    {
      name: 'No',
      selector: (row: { no: any; }) => row.no,
    },
    {
      name: 'Pelaksanaan Bidang / Wilayah',
      selector: (row: { pelaksanaan: any; }) => row.pelaksanaan,
    },
    {
      name: 'Jumlah Pengawasan dan Pendidikan',
      selector: (row: { jmlhpengawasandanpendidikan: any; }) => row.jmlhpengawasandanpendidikan,
    },
    {
      name: 'Peringatan',
      selector: (row: { peringatan: any; }) => row.peringatan,
    },
    {
      name: 'Penghalauan',
      selector: (row: { penghalauan: any; }) => row.penghalauan,
    },
    {
      name: 'Teguran Tertulis',
      selector: (row: { tegurantertulis: any; }) => row.tegurantertulis,
    },
    {
      name: 'Penyegelan',
      selector: (row: { penyegelan: any; }) => row.penyegelan,
    },
    {
      name: 'Penghentian Kegiatan',
      selector: (row: { penghentiankegiatan: any; }) => row.penghentiankegiatan,
    },
    {
      name: 'Pembongkaran',
      selector: (row: { pembongkaran: any; }) => row.pembongkaran,
    },

    {
      name: 'Ditertibkan',
      selector: (row: { ditertibkan: any; }) => row.ditertibkan,
    },
    {
      name: 'Bongkar Sendiri',
      selector: (row: { bongkarsendiri: any; }) => row.bongkarsendiri,
    },
    {
      name: 'Pemusnahan',
      selector: (row: { pemusnahan: any; }) => row.pemusnahan,
    },
    {
      name: 'Pengusiran',
      selector: (row: { pengusiran: any; }) => row.pengusiran,
    },
    {
      name: 'Penghentian Kegiatan Sementara 1x24 Jam',
      selector: (row: { pemusnahan: any; }) => row.pemusnahan,
    },
    {
      name: 'Penghentian Kegiatan Sementara 3x24 Jam',
      selector: (row: { pemusnahan: any; }) => row.pemusnahan,
    },
    {
      name: 'Penghentian Kegiatan Sementara 7x24 Jam',
      selector: (row: { pemusnahan: any; }) => row.pemusnahan,
    },
    {
      name: ' Pencabutan izin',
      selector: (row: { pencabutanizin: any; }) => row.pencabutanizin,
    },
    {
      name: ' Pembekuan Sementara Izin',
      selector: (row: { pembekuansementaraizin: any; }) => row.pembekuansementaraizin,
    },
    {
      name: ' Pembubaran',
      selector: (row: { pembubaran: any; }) => row.pembubaran,
    },
    {
      name: ' Pengusiran',
      selector: (row: { pengusiran: any; }) => row.pengusiran,
    },

    {
      name: 'Razia',
      selector: (row: { razia: any; }) => row.razia,
    },
    {
      name: 'Penjemputan',
      selector: (row: { penjemputan: any; }) => row.penjemputan,
    },
    {
      name: 'Penangkapan',
      selector: (row: { penangkapan: any; }) => row.penangkapan,
    },
    {
      name: 'Penyitaan',
      selector: (row: { penyitaan: any; }) => row.penyitaan,
    },
    {
      name: 'Penyitaan',
      selector: (row: { penyitaan: any; }) => row.penyitaan,
    },
    {
      name: 'Pembersihan',
      selector: (row: { pembersihan: any; }) => row.pembersihan,
    },
    {
      name: 'Pencopotan/Pelepasan/Pencabutan',
      selector: (row: { pembersihan: any; }) => row.pembersihan,
    },
    {
      name: 'penyidikan',
      selector: (row: { penyidikan: any; }) => row.penyidikan,
    },
    {
      name: 'Kerja Sosial',
      selector: (row: { penyidikan: any; }) => row.penyidikan,
    },
    {
      name: 'Denda Administratif',
      selector: (row: { penyidikan: any; }) => row.penyidikan,
    },
    {
      name: 'Terbit Izin',
      selector: (row: { penyidikan: any; }) => row.penyidikan,
    },
    {
      name: 'Dikembalikan',
      selector: (row: { penyidikan: any; }) => row.penyidikan,
    },
    {
      name: 'Belum Ditertibkan',
      selector: (row: { penyidikan: any; }) => row.penyidikan,
    },
    {
      name: ' Tidak di Temukan Pelanggaran',
      selector: (row: { penyidikan: any; }) => row.penyidikan,
    },
    {
      name: 'Yustisi',
      selector: (row: { yustisi: any; }) => row.yustisi,
    },

    {
      name: 'Denda',
      selector: (row: { denda: any; }) => row.denda,
    },
    {
      name: 'Keterangan',
      selector: (row: { keterangan: any; }) => row.keterangan,
    },
    {
      name: 'Aksi',
      sortable: false,
      text: "Action",
      className: "action",
      align: "left",
      cell: (record: any) => {
        return (
          <Fragment>

            <div className="mb-2">
              {[DropdownButton].map((DropdownType, idx) => (
                <>
                  <DropdownType
                    as={ButtonGroup}
                    key={idx}
                    id={`dropdown-button-drop-${idx}`}
                    size="sm"
                    variant="light"
                    title="Aksi">
                    <Dropdown.Item href="/pelaporan/DetailLaporanKegiatan">Detail</Dropdown.Item>
                    <Dropdown.Item href="/#/action-2">Ubah</Dropdown.Item>
                    <Dropdown.Item href="/#/action-2">Hapus</Dropdown.Item>
                  </DropdownType>
                </>
              ))}
            </div>
          </Fragment>
        );
      },
    },
  ];

  const dataObj = [
    {
      id: 1,
      pelaksana_bidang_wilayah: "Kota Administrasi Jakarta Timur",
      tindak_lanjut: "cok",
      administrasi: "aer",
      peringatan: "noan",
      is_deleted: 0,
      deleted_by: "",
      deleted_at: "",
      created_by: "",
      created_at: "2022-08-25T19:49:07.328Z",
      updated_by: "",
      updated_at: "",
      penutupan_atau_penyegelan: "",
      pencabutan_izin: "",
      yang_lainnya: "",
      denda: "",
      keterangan: "",
      penghalauan: "1",
      pembubaran: "1",
      pengusiran: "1",
      teguran_tertulis: "1",
      penyegelan: "1",
      penghentian_kegiatan: "1",
      pembongkaran: "",
      ditertibkan: "",
      bongkar_sendiri: "",
      pemusnahan: "",
      pecabutan_izin: "",
      pembekuan_sementara_izin: "",
      razia: "",
      penjemputan: "",
      penangkapan: "",
      penyitaan: "",
      pembersihan: "",
      pencopotan_pelepasan_pencabutan: "",
      penyidikan: "",
      kerja_sosial: "",
      denda_administratif: "",
      terbit_izin: "",
      dikembalikan: "",
      belum_diterbitkan: "",
      lain_lain: "",
      tidak_ditemukan: "",
      pengadilan_yustisi: "TEST",
      non_pengadilan: "TEST",
      penghentian_kegiatan_sementara_1x24jam: "",
      penghentian_kegiatan_sementara_3x24jam: "",
      penghentian_kegiatan_sementara_7x24jam: "",
    },
    {
      id: 2,
      pelaksana_bidang_wilayah: "Kota Administrasi Jakarta Timur",
      tindak_lanjut: "cok",
      administrasi: "aer",
      peringatan: "noan",
      is_deleted: 0,
      deleted_by: "",
      deleted_at: "",
      created_by: "",
      created_at: "2022-08-25T19:49:07.328Z",
      updated_by: "",
      updated_at: "",
      penutupan_atau_penyegelan: "",
      pencabutan_izin: "",
      yang_lainnya: "",
      denda: "",
      keterangan: "",
      penghalauan: "",
      pembubaran: "",
      pengusiran: "",
      teguran_tertulis: "",
      penyegelan: "",
      penghentian_kegiatan: "",
      pembongkaran: "",
      ditertibkan: "",
      bongkar_sendiri: "",
      pemusnahan: "",
      pecabutan_izin: "",
      pembekuan_sementara_izin: "",
      razia: "",
      penjemputan: "",
      penangkapan: "",
      penyitaan: "",
      pembersihan: "",
      pencopotan_pelepasan_pencabutan: "",
      penyidikan: "",
      kerja_sosial: "",
      denda_administratif: "",
      terbit_izin: "",
      dikembalikan: "",
      belum_diterbitkan: "",
      lain_lain: "",
      tidak_ditemukan: "",
      pengadilan_yustisi: "",
      non_pengadilan: "",
      penghentian_kegiatan_sementara_1x24jam: "",
      penghentian_kegiatan_sementara_3x24jam: "",
      penghentian_kegiatan_sementara_7x24jam: "",
    },
    {
      id: 3,
      pelaksana_bidang_wilayah: "Kota Administrasi Jakarta Timur",
      tindak_lanjut: "cok",
      administrasi: "aer",
      peringatan: "noan",
      is_deleted: 0,
      deleted_by: "",
      deleted_at: "",
      created_by: "",
      created_at: "2022-08-25T19:49:07.328Z",
      updated_by: "",
      updated_at: "",
      penutupan_atau_penyegelan: "",
      pencabutan_izin: "",
      yang_lainnya: "",
      denda: "",
      keterangan: "",
      penghalauan: "",
      pembubaran: "",
      pengusiran: "",
      teguran_tertulis: "",
      penyegelan: "",
      penghentian_kegiatan: "",
      pembongkaran: "",
      ditertibkan: "",
      bongkar_sendiri: "",
      pemusnahan: "",
      pecabutan_izin: "",
      pembekuan_sementara_izin: "",
      razia: "",
      penjemputan: "",
      penangkapan: "",
      penyitaan: "",
      pembersihan: "",
      pencopotan_pelepasan_pencabutan: "",
      penyidikan: "",
      kerja_sosial: "",
      denda_administratif: "",
      terbit_izin: "",
      dikembalikan: "",
      belum_diterbitkan: "",
      lain_lain: "",
      tidak_ditemukan: "",
      pengadilan_yustisi: "",
      non_pengadilan: "",
      penghentian_kegiatan_sementara_1x24jam: "",
      penghentian_kegiatan_sementara_3x24jam: "",
      penghentian_kegiatan_sementara_7x24jam: "",
    },
    {
      id: 4,
      pelaksana_bidang_wilayah: "Kota Administrasi Jakarta Timur",
      tindak_lanjut: "cok",
      administrasi: "aer",
      peringatan: "noan",
      is_deleted: 0,
      deleted_by: "",
      deleted_at: "",
      created_by: "",
      created_at: "2022-08-25T19:49:07.328Z",
      updated_by: "",
      updated_at: "",
      penutupan_atau_penyegelan: "",
      pencabutan_izin: "",
      yang_lainnya: "",
      denda: "",
      keterangan: "",
      penghalauan: "",
      pembubaran: "",
      pengusiran: "",
      teguran_tertulis: "",
      penyegelan: "",
      penghentian_kegiatan: "",
      pembongkaran: "",
      ditertibkan: "",
      bongkar_sendiri: "",
      pemusnahan: "",
      pecabutan_izin: "",
      pembekuan_sementara_izin: "",
      razia: "",
      penjemputan: "",
      penangkapan: "",
      penyitaan: "",
      pembersihan: "",
      pencopotan_pelepasan_pencabutan: "",
      penyidikan: "",
      kerja_sosial: "",
      denda_administratif: "",
      terbit_izin: "",
      dikembalikan: "",
      belum_diterbitkan: "",
      lain_lain: "",
      tidak_ditemukan: "",
      pengadilan_yustisi: "",
      non_pengadilan: "",
      penghentian_kegiatan_sementara_1x24jam: "",
      penghentian_kegiatan_sementara_3x24jam: "",
      penghentian_kegiatan_sementara_7x24jam: "",
    },
    {
      id: 5,
      pelaksana_bidang_wilayah: "Kota Administrasi Jakarta Timur",
      tindak_lanjut: "cok",
      administrasi: "aer",
      peringatan: "noan",
      is_deleted: 0,
      deleted_by: "",
      deleted_at: "",
      created_by: "",
      created_at: "2022-08-25T19:49:07.328Z",
      updated_by: "",
      updated_at: "",
      penutupan_atau_penyegelan: "",
      pencabutan_izin: "",
      yang_lainnya: "",
      denda: "",
      keterangan: "",
      penghalauan: "",
      pembubaran: "",
      pengusiran: "",
      teguran_tertulis: "",
      penyegelan: "",
      penghentian_kegiatan: "",
      pembongkaran: "",
      ditertibkan: "",
      bongkar_sendiri: "",
      pemusnahan: "",
      pecabutan_izin: "",
      pembekuan_sementara_izin: "",
      razia: "",
      penjemputan: "",
      penangkapan: "",
      penyitaan: "",
      pembersihan: "",
      pencopotan_pelepasan_pencabutan: "",
      penyidikan: "",
      kerja_sosial: "",
      denda_administratif: "",
      terbit_izin: "",
      dikembalikan: "",
      belum_diterbitkan: "",
      lain_lain: "",
      tidak_ditemukan: "",
      pengadilan_yustisi: "",
      non_pengadilan: "",
      penghentian_kegiatan_sementara_1x24jam: "",
      penghentian_kegiatan_sementara_3x24jam: "",
      penghentian_kegiatan_sementara_7x24jam: "",
    },
    {
      id: 6,
      pelaksana_bidang_wilayah: "Kota Administrasi Jakarta Timur",
      tindak_lanjut: "cok",
      administrasi: "aer",
      peringatan: "noan",
      is_deleted: 0,
      deleted_by: "",
      deleted_at: "",
      created_by: "",
      created_at: "2022-08-25T19:49:07.328Z",
      updated_by: "",
      updated_at: "",
      penutupan_atau_penyegelan: "",
      pencabutan_izin: "",
      yang_lainnya: "",
      denda: "",
      keterangan: "",
      penghalauan: "",
      pembubaran: "",
      pengusiran: "",
      teguran_tertulis: "",
      penyegelan: "",
      penghentian_kegiatan: "",
      pembongkaran: "",
      ditertibkan: "",
      bongkar_sendiri: "",
      pemusnahan: "",
      pecabutan_izin: "",
      pembekuan_sementara_izin: "",
      razia: "",
      penjemputan: "",
      penangkapan: "",
      penyitaan: "",
      pembersihan: "",
      pencopotan_pelepasan_pencabutan: "",
      penyidikan: "",
      kerja_sosial: "",
      denda_administratif: "",
      terbit_izin: "",
      dikembalikan: "",
      belum_diterbitkan: "",
      lain_lain: "",
      tidak_ditemukan: "",
      pengadilan_yustisi: "",
      non_pengadilan: "",
      penghentian_kegiatan_sementara_1x24jam: "",
      penghentian_kegiatan_sementara_3x24jam: "",
      penghentian_kegiatan_sementara_7x24jam: "",
    },
    {
      id: 7,
      pelaksana_bidang_wilayah: "Kota Administrasi Jakarta Timur",
      tindak_lanjut: "cok",
      administrasi: "aer",
      peringatan: "noan",
      is_deleted: 0,
      deleted_by: "",
      deleted_at: "",
      created_by: "",
      created_at: "2022-08-25T19:49:07.328Z",
      updated_by: "",
      updated_at: "",
      penutupan_atau_penyegelan: "",
      pencabutan_izin: "",
      yang_lainnya: "",
      denda: "",
      keterangan: "",
      penghalauan: "",
      pembubaran: "",
      pengusiran: "",
      teguran_tertulis: "",
      penyegelan: "",
      penghentian_kegiatan: "",
      pembongkaran: "",
      ditertibkan: "",
      bongkar_sendiri: "",
      pemusnahan: "",
      pecabutan_izin: "",
      pembekuan_sementara_izin: "",
      razia: "",
      penjemputan: "",
      penangkapan: "",
      penyitaan: "",
      pembersihan: "",
      pencopotan_pelepasan_pencabutan: "",
      penyidikan: "",
      kerja_sosial: "",
      denda_administratif: "",
      terbit_izin: "",
      dikembalikan: "",
      belum_diterbitkan: "",
      lain_lain: "",
      tidak_ditemukan: "",
      pengadilan_yustisi: "",
      non_pengadilan: "",
      penghentian_kegiatan_sementara_1x24jam: "",
      penghentian_kegiatan_sementara_3x24jam: "",
      penghentian_kegiatan_sementara_7x24jam: "",
    },
    {
      id: 8,
      pelaksana_bidang_wilayah: "Kota Administrasi Jakarta Timur",
      tindak_lanjut: "cok",
      administrasi: "aer",
      peringatan: "noan",
      is_deleted: 0,
      deleted_by: "",
      deleted_at: "",
      created_by: "",
      created_at: "2022-08-25T19:49:07.328Z",
      updated_by: "",
      updated_at: "",
      penutupan_atau_penyegelan: "",
      pencabutan_izin: "",
      yang_lainnya: "",
      denda: "",
      keterangan: "",
      penghalauan: "",
      pembubaran: "",
      pengusiran: "",
      teguran_tertulis: "",
      penyegelan: "",
      penghentian_kegiatan: "",
      pembongkaran: "",
      ditertibkan: "",
      bongkar_sendiri: "",
      pemusnahan: "",
      pecabutan_izin: "",
      pembekuan_sementara_izin: "",
      razia: "",
      penjemputan: "",
      penangkapan: "",
      penyitaan: "",
      pembersihan: "",
      pencopotan_pelepasan_pencabutan: "",
      penyidikan: "",
      kerja_sosial: "",
      denda_administratif: "",
      terbit_izin: "",
      dikembalikan: "",
      belum_diterbitkan: "",
      lain_lain: "",
      tidak_ditemukan: "",
      pengadilan_yustisi: "",
      non_pengadilan: "",
      penghentian_kegiatan_sementara_1x24jam: "",
      penghentian_kegiatan_sementara_3x24jam: "",
      penghentian_kegiatan_sementara_7x24jam: "",
    },
    {
      id: 9,
      pelaksana_bidang_wilayah: "Kota Administrasi Jakarta Timur",
      tindak_lanjut: "cok",
      administrasi: "aer",
      peringatan: "noan",
      is_deleted: 0,
      deleted_by: "",
      deleted_at: "",
      created_by: "",
      created_at: "2022-08-25T19:49:07.328Z",
      updated_by: "",
      updated_at: "",
      penutupan_atau_penyegelan: "",
      pencabutan_izin: "",
      yang_lainnya: "",
      denda: "",
      keterangan: "",
      penghalauan: "",
      pembubaran: "",
      pengusiran: "",
      teguran_tertulis: "",
      penyegelan: "",
      penghentian_kegiatan: "",
      pembongkaran: "",
      ditertibkan: "",
      bongkar_sendiri: "",
      pemusnahan: "",
      pecabutan_izin: "",
      pembekuan_sementara_izin: "",
      razia: "",
      penjemputan: "",
      penangkapan: "",
      penyitaan: "",
      pembersihan: "",
      pencopotan_pelepasan_pencabutan: "",
      penyidikan: "",
      kerja_sosial: "",
      denda_administratif: "",
      terbit_izin: "",
      dikembalikan: "",
      belum_diterbitkan: "",
      lain_lain: "",
      tidak_ditemukan: "",
      pengadilan_yustisi: "",
      non_pengadilan: "",
      penghentian_kegiatan_sementara_1x24jam: "",
      penghentian_kegiatan_sementara_3x24jam: "",
      penghentian_kegiatan_sementara_7x24jam: "",
    },
    {
      id: 10,
      pelaksana_bidang_wilayah: "Kota Administrasi Jakarta Timur",
      tindak_lanjut: "cok",
      administrasi: "aer",
      peringatan: "noan",
      is_deleted: 0,
      deleted_by: "",
      deleted_at: "",
      created_by: "",
      created_at: "2022-08-25T19:49:07.328Z",
      updated_by: "",
      updated_at: "",
      penutupan_atau_penyegelan: "",
      pencabutan_izin: "",
      yang_lainnya: "",
      denda: "",
      keterangan: "",
      penghalauan: "",
      pembubaran: "",
      pengusiran: "",
      teguran_tertulis: "",
      penyegelan: "",
      penghentian_kegiatan: "",
      pembongkaran: "",
      ditertibkan: "",
      bongkar_sendiri: "",
      pemusnahan: "",
      pecabutan_izin: "",
      pembekuan_sementara_izin: "",
      razia: "",
      penjemputan: "",
      penangkapan: "",
      penyitaan: "",
      pembersihan: "",
      pencopotan_pelepasan_pencabutan: "",
      penyidikan: "",
      kerja_sosial: "",
      denda_administratif: "",
      terbit_izin: "",
      dikembalikan: "",
      belum_diterbitkan: "",
      lain_lain: "",
      tidak_ditemukan: "",
      pengadilan_yustisi: "",
      non_pengadilan: "",
      penghentian_kegiatan_sementara_1x24jam: "",
      penghentian_kegiatan_sementara_3x24jam: "",
      penghentian_kegiatan_sementara_7x24jam: "",
    },
    {
      id: 11,
      pelaksana_bidang_wilayah: "Kota Administrasi Jakarta Timur",
      tindak_lanjut: "cok",
      administrasi: "aer",
      peringatan: "noan",
      is_deleted: 0,
      deleted_by: "",
      deleted_at: "",
      created_by: "",
      created_at: "2022-08-25T19:49:07.328Z",
      updated_by: "",
      updated_at: "",
      penutupan_atau_penyegelan: "",
      pencabutan_izin: "",
      yang_lainnya: "",
      denda: "",
      keterangan: "",
      penghalauan: "",
      pembubaran: "",
      pengusiran: "",
      teguran_tertulis: "",
      penyegelan: "",
      penghentian_kegiatan: "",
      pembongkaran: "",
      ditertibkan: "",
      bongkar_sendiri: "",
      pemusnahan: "",
      pecabutan_izin: "",
      pembekuan_sementara_izin: "",
      razia: "",
      penjemputan: "",
      penangkapan: "",
      penyitaan: "",
      pembersihan: "",
      pencopotan_pelepasan_pencabutan: "",
      penyidikan: "",
      kerja_sosial: "",
      denda_administratif: "",
      terbit_izin: "",
      dikembalikan: "",
      belum_diterbitkan: "",
      lain_lain: "",
      tidak_ditemukan: "",
      pengadilan_yustisi: "",
      non_pengadilan: "",
      penghentian_kegiatan_sementara_1x24jam: "",
      penghentian_kegiatan_sementara_3x24jam: "",
      penghentian_kegiatan_sementara_7x24jam: "",
    }
    
  ]

  

  const data = [
    {
      id: 1,
      no: '1',
      pelaksanaan: 'Kota Administrasi Jakarta Pusat',
      jmlhpengawasandanpendidikan: '',
      tindaklanjut: 'Peringatan',
      peringatan: 1,
      penghalauan: 2,
      penyegelan: 3,
      tegurantertulis: 2,
      penghentiankegiatan: 5,
      pembongkaran: 3,
      ditertibkan: 8,
      bongkarsendiri: 7,
      pemusnahan: 3,
      pencabutanizin: 4,
      pembekuansementaraizin: 3,
      pembubaran: 9,
      pengusiran: 2,
      razia: 6,
      penjemputan: 2,
      penangkapan: 7,
      penyitaan: 9,
      pembersihan: 9,
      penyidikan: 1,
      yustisi: 9,
      denda: '',
      keterangan: '',
    },
  ]

  // GET DATA
  interface SelectOptionAutoCom {
    readonly value: string
    readonly label: string
  }

  // GET KOTA
  const [inputValKota, setDataKota] = useState({ label: '', value: null })
  const filterKota = async (inputValue: string) => {
    const response = await axios.get(KOTA_URL + "/find");
    const json = await response.data.data
    return json.map((i: any) => ({ label: i.kota, value: i.kota }))
  }
  const loadOptionsKota = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
    setTimeout(async () => {
      callback(await filterKota(inputValue))
    }, 1000)
  }
  const handleInputKota = (newValue: any) => {
    setDataKota((prevstate: any) => ({ ...prevstate, ...newValue }))
  }
  // END :: GET KOTA

  function MyComponent() {
    return (<>
      <DataTable
        columns={columns}
        data={data}
      />
    </>

    );
  };
  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
          <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
              <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                Daftar Laporan Kegiatan
              </h1>
            </div>
          </div>
        </div>
        <div id="kt_app_content" className="app-content flex-column-fluid">
          <div id="kt_app_content_container" className="app-container container-xxl">
            <div className="card">
              <div className="card-header border-1 pt-6">
                <div className="accordion accordion-icon-toggle" id="kt_accordion_2">
                  <div className="mb-5">
                    <div className="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                      data-bs-target="#kt_accordion_2_item_1">
                      <span className="accordion-icon">
                        <span className="svg-icon svg-icon-4">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1"
                              transform="rotate(-180 18 13)" fill="currentColor" />
                            <path
                              d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                              fill="currentColor" />
                          </svg>
                        </span>
                      </span>
                      <h3 className="fs-4 fw-semibold mb-0 ms-4">
                        Pilihan Filter
                      </h3>
                    </div>
                    <div id="kt_accordion_2_item_1" className="fs-6 collapse show ps-10"
                      data-bs-parent="#kt_accordion_2">
                      <div className="row w-100 mt-10 mb-10">
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Pelaksanaan
                                  Kegiatan</label>
                              </div>
                              <div className="col-8">
                                <select className="form-select form-select-solid" data-control="select2"
                                  data-placeholder="Pilih">
                                  <option></option>
                                  <option value="a">-</option>
                                  <option value="b">-</option>
                                  <option value="a">-</option>
                                  <option value="b">-</option>
                                  <option value="a">-</option>
                                  <option value="b">-</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4">
                                <label
                                  className="form-label align-middle">Tanggal</label>
                              </div>
                              <div className="col-8">
                                <DatePicker
                                  value={value}
                                  range
                                  numberOfMonths={2}
                                  plugins={[
                                    <Footer position="bottom" />
                                  ]}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label align-middle">Kota</label>
                              </div>
                              <div className="col-8">
                                {/* <input className="form-control form-control-solid" placeholder="Pilih Kota" /> */}
                                <AsyncSelect
                                  cacheOptions
                                  loadOptions={loadOptionsKota}
                                  defaultOptions
                                  onChange={handleInputKota}
                                  placeholder={'Pilih Kota'}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6">
                          </div>
                          <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="mb-10">
                              <div className="row">
                                <div className="col-4">
                                  <label
                                    className="form-label align-middle">Kecamatan</label>
                                </div>
                                <div className="col-8">
                                  <select className="form-select form-select-solid" data-control="select2"
                                    data-placeholder="Pilih">
                                    <option></option>
                                    <option value="a">Jagakarsa</option>
                                    <option value="b">Pasar Minggu</option>
                                    <option value="a">Cilandak</option>
                                    <option value="b">Pesanggrahan</option>
                                    <option value="a">Kebayoran Lama</option>
                                    <option value="b">Kebayoran Baru</option>
                                    <option value="a">Mampang Prapatan</option>
                                    <option value="b">Pancoran</option>
                                    <option value="a">Tebet</option>
                                    <option value="b">Pasar Rebo</option>
                                    <option value="a">Ciracas</option>
                                    <option value="b">Cipayung</option>
                                    <option value="a">Makasar</option>
                                    <option value="b">Kramatjati</option>
                                    <option value="a">Jatinegara</option>
                                    <option value="b">Duren Sawit</option>
                                    <option value="a">Cakung</option>
                                    <option value="b">Pulogadung</option>
                                    <option value="a">Matraman</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6">
                          </div>
                          <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="mb-10">
                              <div className="row">
                                <div className="col-4">
                                  <label
                                    className="form-label align-middle">Kelurahan</label>
                                </div>
                                <div className="col-8">
                                  <select className="form-select form-select-solid" data-control="select2"
                                    data-placeholder="Pilih">
                                    <option></option>
                                    <option value="a">Kelapa Gading Barat</option>
                                    <option value="b">Kepala Gading Timur</option>
                                    <option value="a">Pegangsaan Dua</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6">
                          </div>
                          <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="mb-10">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label align-middle">Jenis
                                    Kegiatan</label>
                                </div>
                                <div className="col-8">
                                  <select className="form-select form-select-solid" data-control="select2"
                                    data-placeholder="Pilih">
                                    <option></option>
                                    <option value="a">Laporan Masyarakat</option>
                                    <option value="b">Deteksi dan Cegah Dini</option>
                                    <option value="a">Pembinaan dan Sosialisasi</option>
                                    <option value="b">Penanganan Unjuk Rasa</option>
                                    <option value="a">Patroli</option>
                                    <option value="b">Pengamanan</option>
                                    <option value="a">Pengawalan</option>
                                    <option value="b">Penertiban</option>
                                    <option value="a">Kerja Bakti</option>
                                    <option value="b">Sidang Tipiring</option>
                                    <option value="a">Sosialisasi P4GN</option>
                                    <option value="b">Apel</option>
                                    <option value="a">Penertiban Bangunan</option>
                                    <option value="b">Rapat</option>
                                    <option value="a">Penertiban Minuman</option>
                                    <option value="b">Pengaturan Lalu Lintas</option>
                                    <option value="a">Kegiatan PPKM</option>
                                    <option value="b">Sosialisasi P4GN (Narkoba)</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6">
                          </div>
                          <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="mb-10">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label align-middle">Jenis
                                    Penertiban</label>
                                </div>
                                <div className="col-8">
                                  <select className="form-select form-select-solid" data-control="select2"
                                    data-placeholder="Pilih">
                                    <option></option>
                                    <option value="22">
                                      -
                                    </option>
                                    <option value="23">
                                      -
                                    </option>
                                    <option value="24">
                                      -
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6">
                          </div>
                          <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="mb-10">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label align-middle">Jenis
                                    Perda</label>
                                </div>
                                <div className="col-8">
                                  <select className="form-select form-select-solid" data-control="select2"
                                    data-placeholder="Pilih">
                                    <option></option>
                                    <option value="22">
                                      -
                                    </option>
                                    <option value="23">
                                      -
                                    </option>
                                    <option value="24">
                                      -
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className='row g-8'>
                              <div className='col-md-6 col-lg-6 col-sm-12'>
                                <Button type="submit"
                                  className='btn btn-sm btn-primary fw-semibold me-auto px-6'
                                  data-kt-menu-dismiss="true" data-kt-user-table-filter="filter"
                                  onClick={() => setOpen(!open)}
                                  aria-controls='example-collapse-text'
                                  aria-expanded={open}
                                ><i className="fa fa-search"></i>
                                  Cari
                                </Button>
                              </div>
                              <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                                <Link to="/pelaporan/TambahLaporanKegiatan">
                                  <Button className="btn btn-sm btn-success me-1" data-bs-toggle="modal"><i
                                    className="fa-solid fa-plus"></i>
                                    Tambah
                                  </Button>
                                </Link>
                                <Link to="/pelaporan/TambahLaporanKegiatan">
                                  <Button className="btn btn-sm btn-danger me-1" data-bs-toggle="modal"><i
                                    className="fa-solid fa-trash"></i>
                                    Hapus
                                  </Button>
                                </Link>
                                <div className='justify-content-end col-md-6 col-lg-6 col-sm-12'>
                                  <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                      Unduh
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item>Excel</Dropdown.Item>
                                      <Dropdown.Item>PDF</Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Collapse in={open}>
              <div className='card'>
                <div className="card-body py-4">
                  <div className="row">
                    <div className="col fs-4 mb-2 fw-semibold text-center">
                      LAPORAN HASIL KEGIATAN
                    </div>
                  </div>
                  <div className="row">
                    <div className="col fs-4 mb-2 fw-semibold text-center">
                      PADA SATPOL PP......................................
                    </div>
                  </div>
                  <div className="row">
                    <div className="col fs-4 mb-6 fw-semibold text-center">
                      PERIODE .................... s/d .......................
                    </div>
                  </div>
                  <DtLaporanKegiatan data={dataObj} />
                  {/* <DataTable
                    columns={columns}
                    data={data}
                    pagination
                  /> */}
                  <div className="row">
                    <div className="col-8"></div>
                    <div className="col-4 fs-6 mb-2 fw-semibold text-center">
                      Jakarta, ..............................20...
                      <div className="col fs-6 mb-15 fw-semibold text-center">
                        KEPALA SATUAN POLISI PAMONG PRAJA
                        ...............................................................
                      </div>
                      <div className="col fs-6 mb-2 fw-semibold text-center">
                        NAMA
                      </div>
                      <div className="col fs-6 mb-2 fw-semibold text-center">
                        NIP. ......................
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </div >
  )
}
