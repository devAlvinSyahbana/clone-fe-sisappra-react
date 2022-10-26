// Chart
import React, { useRef, useState } from "react";
import MyNode from "./my-node";
import OrganizationChart from "@dabeng/react-orgchart";

const StrukturalOrganisasi = () => {
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

    const exportTo = () => {
        orgchart.current.exportTo(filename, fileextension);
    };

    const [filename, setFilename] = useState("organization_chart");
    const [fileextension, setFileextension] = useState("png");

    const onNameChange = event => {
        setFilename(event.target.value);
    };

    const onExtensionChange = event => {
        setFileextension(event.target.value);
    };

    return (
        <>
            <section className="toolbar">
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
                chartClass="myChart"
                NodeTemplate={MyNode}
                pan={true}
                zoom={true}
            />
        </>
    );
};

export default StrukturalOrganisasi;
