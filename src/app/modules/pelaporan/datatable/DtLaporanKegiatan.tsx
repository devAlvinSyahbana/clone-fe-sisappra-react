import React, { useEffect, useRef } from 'react'
import "datatables.net-dt/css/jquery.dataTables.min.css"


export default function DtLaporanKegiatan(props: any) {
    var $ = require('jquery');
    $.DataTable = require('datatables.net')

    const tableRef = useRef<any>()
    const tableName = "tableLaporanKegiatan"
    useEffect(() => {
        console.log(tableRef.current)
        const table = $(`#${tableName}`).DataTable(
            {
                // pagingType: "scrolling",
                pagingType: 'full_numbers',
                //  dom: '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
                dom: 'rt<"bottom"iflp<"clear">>',
                scrollX: true,
                data: props.data,
                columns: [
                    {
                        data: "id",
                        // title: "No"
                    },
                    {
                        data: "pelaksana_bidang_wilayah",
                        // title: "PELAKSANA BIDANG/WILAYAH"
                    },
                    {
                        data: "peringatan",
                    },
                    {
                        data: "peringatan",
                    },
                    {
                        data: "penghalauan",
                    },
                    {
                        data: "teguran_tertulis",
                    },
                    {
                        data: "penyegelan",
                    },
                    {
                        data: "penghentian_kegiatan",
                    },
                    {
                        data: "pembongkaran",
                    },
                    {
                        data: "ditertibkan",
                    },
                    {
                        data: "bongkar_sendiri",
                    },
                    {
                        data: "pemusnahan",
                    },
                    {
                        data: "penghentian_kegiatan_sementara_1x24jam",
                    },
                    {
                        data: "penghentian_kegiatan_sementara_3x24jam",
                    },
                    {
                        data: "penghentian_kegiatan_sementara_7x24jam",
                    },
                    {
                        data: "pecabutan_izin",
                    },
                    {
                        data: "pembekuan_sementara_izin",
                    },
                    {
                        data: "pembubaran",
                    },
                    {
                        data: "pengusiran",
                    },
                    {
                        data: "razia",
                    },
                    {
                        data: "penjemputan",
                    },
                    {
                        data: "penangkapan",
                    },
                    {
                        data: "penyitaan",
                    },
                    {
                        data: "pembersihan",
                    },
                    {
                        data: "pencopotan_pelepasan_pencabutan",
                    },
                    {
                        data: "penyidikan",
                    },
                    {
                        data: "kerja_sosial",
                    },
                    {
                        data: "denda_administratif",
                    },
                    {
                        data: "terbit_izin",
                    },
                    {
                        data: "dikembalikan",
                    },
                    {
                        data: "belum_diterbitkan",
                    },
                    {
                        data: "lain_lain",
                    },
                    {
                        data: "tidak_ditemukan",
                    },

                    {
                        data: "pengadilan_yustisi",
                    },
                    {
                        data: "non_pengadilan",
                    },
                    {
                        data: "lain_lain",
                    },

                ],
                // columns: [
                //     { title: "pelaksanaan" },
                //     { title: "pelaksanaan" },
                // ],
                destroy: true,  // I think some clean up is happening here
                searching: false
            }
        )
        console.log(table);
        // console.log("Table destroyed")
        // Extra step to do extra clean-up.
        return function () {
            // console.log("Table destroyed")
            table.destroy()
        }
    }, [])

    return (
        <div>
            <table className="display" width="100%" id={tableName} ref={tableRef}>
                <thead>
                    <tr>
                        <th rowSpan={3} className="text-center">No</th>
                        <th rowSpan={3} className="text-center">PELAKSANA BIDANG/WILAYAH</th>
                        <th rowSpan={3} className="text-center">JUMLAH PENGAWASAN DAN PENINDAKAN</th>
                        <th colSpan={32} className="text-center">Tindak Lanjut</th>
                        <th rowSpan={3} className="text-center">Ket</th>
                    </tr>
                    <tr>
                        <th colSpan={3} className="text-center">Peringatan</th>
                        <th colSpan={9} className="text-center">Penutupan/Penyegelan</th>
                        <th colSpan={2} className="text-center">Pencabutan izin</th>
                        <th colSpan={16} className="text-center">Yang lainnya </th>
                        <th colSpan={2} className="text-center">Denda (Rp)</th>
                    </tr>
                    <tr>
                        <th>Peringatan</th>
                        <th>Penghalauan</th>
                        <th>Teguran Tertulis</th>
                        <th>Penyegelan</th>
                        <th>Penghentian Kegiatan</th>
                        <th>Pembongkaran</th>
                        <th>Ditertibkan</th>
                        <th>Bongkar Sendiri</th>
                        <th>Pemusnahan</th>
                        <th>Penghentian Kegiatan Sementara 1x24 Jam</th>
                        <th>Penghentian Kegiatan Sementara 3x24 Jam</th>
                        <th>Penghentian Kegiatan Sementara 7x24 Jam</th>
                        <th>Pencabutan izin</th>
                        <th>Pembekuan Sementara Izin</th>
                        <th>Pembubaran</th>
                        <th>Pengusiran</th>
                        <th>Razia</th>
                        <th>Penjemputan</th>
                        <th>Penangkapan</th>
                        <th>Penyitaan</th>
                        <th>Pembersihan</th>
                        <th>Pencopotan/Pelepasan/Pencabutan</th>
                        <th>Penyidikan</th>
                        <th>Kerja Sosial</th>
                        <th>Denda Administratif</th>
                        <th>Terbit Izin</th>
                        <th>Dikembalikan</th>
                        <th>Belum Ditertibkan</th>
                        <th>Lain-lain</th>
                        <th>Tidak di Temukan Pelanggaran</th>
                        <th>Pengadilan (Yustisi)</th>
                        <th>Non Pengadilan (PPKM)</th>
                    </tr>
                </thead>
            </table>
        </div>

    )
}
