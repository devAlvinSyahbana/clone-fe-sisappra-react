import { FC, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'

export const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MASTERDATA_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL
export const PELAPORAN_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL

const LoadingAnimation = (props: any) => {
    return (
        <>
            <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
                <span className='spinner-border spinner-border-xl align-middle me-3'></span>
                <div className='d-flex flex-column'>
                    <h5 className='mb-1'>Sedang mengambil data...</h5>
                </div>
            </div>
        </>
    )
}

export const DtPPKMMasker: FC<any> = ({
    kota,
    totalKegiatan,
    setTotalKegiatan,
    loading,
    theme,
    aksi,
}) => {

    useEffect(() => {
        const fetchDTPPKMMasker = async () => {
            const { data } = await axios.get(
                `${PELAPORAN_URL}/kegiatan-umum/?%24filter=tindak_lanjut__administrasi__jenis_penertiban%20eq%20%27TERTIB%20PENGGUNAAN%20MASKER%20%28PPKM%29%27&%24top=1&%24select=id`
            )
            const res = await axios.get(
                `${PELAPORAN_URL}/kegiatan-umum/?%24filter=tindak_lanjut__administrasi__jenis_penertiban%20eq%20%27TERTIB%20PENGGUNAAN%20MASKER%20%28PPKM%29%27&%24top=${data.total_items}&%24select=id%2C%20kegiatan__kota_id%2C%20tindak_lanjut__administrasi__penyelesaian_id%2C%20kegiatan__kota_id%2C%20tindak_lanjut__denda__pengadilan%2C%20tindak_lanjut__denda__non_pengadilan%2C%20kegiatan__tanggal%2C%20kegiatan__jam_start%2C%20kegiatan__jam_end%2C%20kegiatan__uraian_kegiatan`
            )
            setTotalKegiatan(res.data.data)
        }
        fetchDTPPKMMasker()
    }, [])

    const GetPerJenis = ({ row, jenis }: any) => {
        let countJumlah = 0
        if (row && !jenis) {
            countJumlah = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
        }
        if (row && jenis) {
            let jumlahJenis = 0
            for (let i = 0; i < jenis.length; i++) {
                jumlahJenis = totalKegiatan.filter(
                    (item: any) => item.kegiatan__kota_id === row && item.tindak_lanjut__administrasi__penyelesaian_id === jenis[i]
                ).length;
                countJumlah += jumlahJenis
            }
        }
        return (
            <>
                {countJumlah}
            </>
        )
    }

    const GetPerDenda = ({ row, jenis }: any) => {
        let totalDenda = 0
        if (row && !jenis) {
            totalDenda = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
        }
        if (row && jenis) {
            const jumlah = totalKegiatan.filter(
                (item: any) => item.kegiatan__kota_id === row && item[jenis]
            )
            totalDenda = jumlah.reduce((acc: any, item: any) => acc + item[jenis], 0)
            console.log(row, jenis, jumlah)
        }
        return <>{totalDenda}</>
    }

    const columns = [
        {
            name: 'No',
            width: '80px',
            sortField: 'id',
            wrap: true,
            selector: (row: any) => row.serial,
            cell: (row: any) => {
                return <div className='mb-2 mt-2'>{row.serial}</div>
            },
        },
        {
            name: 'Pelaksana Kegiatan',
            wrap: true,
            center: true,
            width: '300px',
            selector: (row: any) => row.pelaksana_kegiatan,
            cell: (row: any) => {
                return (
                    <>
                        <a
                            className='table table-hover mb-0'
                            onClick={() => aksi(row.no)}>{row.pelaksana_kegiatan}</a>
                    </>
                )
            },
        },
        {
            name: 'Jumlah Pengawasan',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} />,
        },
        {
            name: 'Teguran Tertulis',
            center: true,
            width: '150px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[31]} />,
        },
        {
            name: 'Kerja Sosial',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[6]} />,
        },
        {
            name: 'Denda Pengadilan',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => (
                <GetPerDenda row={record.no} jenis={'tindak_lanjut__denda__pengadilan'} />
            ),
        },
        {
            name: 'Denda Non Pengadilan',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => (
                <GetPerDenda row={record.no} jenis={'tindak_lanjut__denda__non_pengadilan'} />
            ),
        },
    ]

    return (
        <div>
            <DataTable
                pagination
                data={kota}
                columns={columns}
                progressPending={loading}
                progressComponent={<LoadingAnimation />}
                theme={theme}
            />
        </div>
    )
}
export const DtPPKMBangunan: FC<any> = ({
    kota,
    totalKegiatan,
    setTotalKegiatan,
    loading,
    theme,
    aksi,
}) => {

    useEffect(() => {
        const fetchDTPPKMBangunan = async () => {
            const { data } = await axios.get(
                `${PELAPORAN_URL}/kegiatan-umum/?%24filter=tindak_lanjut__administrasi__jenis_penertiban%20eq%20%27TERTIB%20PERKANTORAN%20%2F%20TEMPAT%20KERJA%2C%20TEMPAT%20USAHA%2C%20TEMPAT%20INDUSTRI%2C%20PERHOTELAN%2F%20PENGINAPAN%20LAIN%20%28PPKM%29%27&%24top=1&%24select=id`
            )
            const res = await axios.get(
                `${PELAPORAN_URL}/kegiatan-umum/?%24filter=tindak_lanjut__administrasi__jenis_penertiban%20eq%20%27TERTIB%20PERKANTORAN%20%2F%20TEMPAT%20KERJA%2C%20TEMPAT%20USAHA%2C%20TEMPAT%20INDUSTRI%2C%20PERHOTELAN%2F%20PENGINAPAN%20LAIN%20%28PPKM%29%27&%24top=${data.total_items}&%24select=id%2C%20kegiatan__kota_id%2C%20tindak_lanjut__administrasi__penyelesaian_id%2C%20kegiatan__kota_id%2C%20tindak_lanjut__denda__pengadilan%2C%20tindak_lanjut__denda__non_pengadilan%2C%20kegiatan__tanggal%2C%20kegiatan__jam_start%2C%20kegiatan__jam_end%2C%20kegiatan__uraian_kegiatan`
            )
            setTotalKegiatan(res.data.data)
        }
        fetchDTPPKMBangunan()
    }, [])

    const GetPerJenis = ({ row, jenis }: any) => {
        let countJumlah = 0

        if (row && !jenis) {
            countJumlah = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
        }
        if (row && jenis) {
            let jumlahJenis = 0
            for (let i = 0; i < jenis.length; i++) {
                jumlahJenis = totalKegiatan.filter(
                    (item: any) => item.kegiatan__kota_id === row && item.tindak_lanjut__administrasi__penyelesaian_id === jenis[i]
                ).length;
                countJumlah += jumlahJenis
            }
        }
        return (
            <>
                {countJumlah}
            </>
        )
    }

    const GetPerDenda = ({ row, jenis }: any) => {
        let totalDenda = 0
        if (row && !jenis) {
            totalDenda = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
        }
        if (row && jenis) {
            const jumlah = totalKegiatan.filter(
                (item: any) => item.kegiatan__kota_id === row && item[jenis]
            )
            totalDenda = jumlah.reduce((acc: any, item: any) => acc + item[jenis], 0)
            console.log(row, jenis, jumlah)
        }
        return <>{totalDenda}</>
    }

    var num = 1
    const columns = [
        {
            name: 'No',
            width: '80px',
            sortField: 'id',
            wrap: true,
            selector: (row: any) => row.serial,
            cell: (row: any) => {
                return <div className='mb-2 mt-2'>{row.serial}</div>
            },
        },
        {
            name: 'Pelaksana Kegiatan',
            wrap: true,
            center: true,
            width: '300px',
            selector: (row: any) => row.pelaksana_kegiatan,
            cell: (row: any) => {
                return (
                    <>
                        <a
                            className='table table-hover mb-0'
                            onClick={() => aksi(row.no)}>{row.pelaksana_kegiatan}</a>
                    </>
                )
            },
        },
        {
            name: 'Jumlah Pengawasan',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} />,
        },
        {
            name: 'Teguran Lisan',
            center: true,
            width: '150px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[30]} />,
        },
        {
            name: 'Penutupan Sementara 3x24 Jam',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[20]} />,
        },
        {
            name: 'Penutupan Sementara 7x24 Jam',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[21]} />,
        },
        {
            name: 'Pembekuan Sementara/Pencabutan izin',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[8, 15]} />,
        },
        {
            name: 'Tidak Ditemukan Pelanggaran',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[34, 42]} />,
        },
        {
            name: 'Denda Pengadilan',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => (
                <GetPerDenda row={record.no} jenis={'tindak_lanjut__denda__pengadilan'} />
            ),
        },
        {
            name: 'Denda Non Pengadilan',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => (
                <GetPerDenda row={record.no} jenis={'tindak_lanjut__denda__non_pengadilan'} />
            ),
        },
    ]

    return (
        <div>
            <DataTable
                pagination
                data={kota}
                columns={columns}
                progressPending={loading}
                progressComponent={<LoadingAnimation />}
                theme={theme}
            />
        </div>
    )
}
export const DtPPKMRumahMakan: FC<any> = ({
    kota,
    totalKegiatan,
    setTotalKegiatan,
    loading,
    theme,
    aksi,
}) => {

    useEffect(() => {
        const fetchDTPPKMRumahMakan = async () => {
            const { data } = await axios.get(
                `${PELAPORAN_URL}/kegiatan-umum/?%24filter=tindak_lanjut__administrasi__jenis_penertiban%20eq%20%27TERTIB%20WARUNG%20MAKAN%2C%20RUMAH%20MAKAN%2C%20KAFE%20ATAU%20RESTORAN%20%28PPKM%29%27&%24top=1&%24select=id`
            )
            const res = await axios.get(
                `${PELAPORAN_URL}/kegiatan-umum/?%24filter=tindak_lanjut__administrasi__jenis_penertiban%20eq%20%27TERTIB%20WARUNG%20MAKAN%2C%20RUMAH%20MAKAN%2C%20KAFE%20ATAU%20RESTORAN%20%28PPKM%29%27&%24top=${data.total_items}&%24select=id%2C%20kegiatan__kota_id%2C%20tindak_lanjut__administrasi__penyelesaian_id%2C%20kegiatan__kota_id%2C%20tindak_lanjut__administrasi__penyelesaian_id%2C%20kegiatan__kota_id%2C%20tindak_lanjut__denda__pengadilan%2C%20tindak_lanjut__denda__non_pengadilan%2C%20kegiatan__tanggal%2C%20kegiatan__jam_start%2C%20kegiatan__jam_end%2C%20kegiatan__uraian_kegiatan`
            )
            setTotalKegiatan(res.data.data)
        }
        fetchDTPPKMRumahMakan()
    }, [])

    const GetPerJenis = ({ row, jenis }: any) => {
        let countJumlah = 0
        if (row && !jenis) {
            countJumlah = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
        }
        if (row && jenis) {
            let jumlahJenis = 0
            for (let i = 0; i < jenis.length; i++) {
                jumlahJenis = totalKegiatan.filter(
                    (item: any) => item.kegiatan__kota_id === row && item.tindak_lanjut__administrasi__penyelesaian_id === jenis[i]
                ).length;
                countJumlah += jumlahJenis
            }
        }
        return (
            <>
                {countJumlah}
            </>
        )
    }

    const GetPerDenda = ({ row, jenis }: any) => {
        let totalDenda = 0
        if (row && !jenis) {
            totalDenda = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
        }
        if (row && jenis) {
            const jumlah = totalKegiatan.filter(
                (item: any) => item.kegiatan__kota_id === row && item[jenis]
            )
            totalDenda = jumlah.reduce((acc: any, item: any) => acc + item[jenis], 0)
            console.log(row, jenis, jumlah)
        }
        return <>{totalDenda}</>
    }

    var num = 1
    const columns = [
        {
            name: 'No',
            width: '80px',
            sortField: 'id',
            wrap: true,
            selector: (row: any) => row.serial,
            cell: (row: any) => {
                return <div className='mb-2 mt-2'>{row.serial}</div>
            },
        },
        {
            name: 'Pelaksana Kegiatan',
            wrap: true,
            center: true,
            width: '300px',
            selector: (row: any) => row.pelaksana_kegiatan,
            cell: (row: any) => {
                return (
                    <>
                        <a
                            className='table table-hover mb-0'
                            onClick={() => aksi(row.no)}>{row.pelaksana_kegiatan}</a>
                    </>
                )
            },
        },
        {
            name: 'Jumlah Pengawasan',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} />,
        },
        {
            name: 'Pembubaran Kegiatan',
            center: true,
            width: '150px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[12]} />,
        },
        {
            name: 'Teguran Lisan',
            center: true,
            width: '150px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[30]} />,
        },
        {
            name: 'Penutupan Sementara 1x24 Jam',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[19]} />,
        },
        {
            name: 'Penutupan Sementara 3x24 Jam',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[20]} />,
        },
        {
            name: 'Penutupan Sementara 7x24 Jam',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[21]} />,
        },
        {
            name: 'Pembekuan Sementara/Pencabutan izin',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[8, 15]} />,
        },
        {
            name: 'Tidak Ditemukan Pelanggaran',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[34, 42]} />,
        },
        {
            name: 'Denda Pengadilan',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => (
                <GetPerDenda row={record.no} jenis={'tindak_lanjut__denda__pengadilan'} />
            ),
        },
        {
            name: 'Denda Non Pengadilan',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => (
                <GetPerDenda row={record.no} jenis={'tindak_lanjut__denda__non_pengadilan'} />
            ),
        },
    ]

    return (
        <div>
            <DataTable
                pagination
                data={kota}
                columns={columns}
                progressPending={loading}
                progressComponent={<LoadingAnimation />}
                theme={theme}
            />
        </div>
    )
}
export const DtPPKMPKL: FC<any> = ({
    kota,
    totalKegiatan,
    setTotalKegiatan,
    loading,
    theme,
    aksi,
}) => {

    useEffect(() => {
        const fetchDTPPKMPKL = async () => {
            const { data } = await axios.get(
                `${PELAPORAN_URL}/kegiatan-umum/?%24filter=tindak_lanjut__administrasi__jenis_penertiban%20eq%20%27TERTIB%20PEDAGANG%20KAKI%20LIMA%20%28PPKM%29%27&%24top=1&%24select=id`
            )
            const res = await axios.get(
                `${PELAPORAN_URL}/kegiatan-umum/?%24filter=tindak_lanjut__administrasi__jenis_penertiban%20eq%20%27TERTIB%20PEDAGANG%20KAKI%20LIMA%20%28PPKM%29%27&%24top=${data.total_items}&%24select=id%2C%20kegiatan__kota_id%2C%20tindak_lanjut__administrasi__penyelesaian_id%2C%20kegiatan__tanggal%2C%20kegiatan__jam_start%2C%20kegiatan__jam_end%2C%20kegiatan__uraian_kegiatan`
            )
            setTotalKegiatan(res.data.data)
        }
        fetchDTPPKMPKL()
    }, [])

    const GetPerJenis = ({ row, jenis }: any) => {
        let countJumlah = 0
        if (row && !jenis) {
            countJumlah = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
        }
        if (row && jenis) {
            let jumlahJenis = 0
            for (let i = 0; i < jenis.length; i++) {
                jumlahJenis = totalKegiatan.filter(
                    (item: any) => item.kegiatan__kota_id === row && item.tindak_lanjut__administrasi__penyelesaian_id === jenis[i]
                ).length;
                countJumlah += jumlahJenis
            }
        }
        return (
            <>
                {countJumlah}
            </>
        )
    }

    var num = 1
    const columns = [
        {
            name: 'No',
            width: '80px',
            sortField: 'id',
            wrap: true,
            selector: (row: any) => row.serial,
            cell: (row: any) => {
                return <div className='mb-2 mt-2'>{row.serial}</div>
            },
        },
        {
            name: 'Pelaksana Kegiatan',
            wrap: true,
            center: true,
            width: '300px',
            selector: (row: any) => row.pelaksana_kegiatan,
            cell: (row: any) => {
                return (
                    <>
                        <a
                            className='table table-hover mb-0'
                            onClick={() => aksi(row.no)}>{row.pelaksana_kegiatan}</a>
                    </>
                )
            },
        },
        {
            name: 'Jumlah Pengawasan',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} />,
        },
        {
            name: 'Teguran Tertulis',
            center: true,
            width: '150px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[31]} />,
        },
        {
            name: 'Pembubaran Kegiatan',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[12]} />,
        },
        {
            name: 'Tidak Ditemukan Pelanggaran',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[34, 42]} />,
        },
    ]

    return (
        <div>
            <DataTable
                pagination
                data={kota}
                columns={columns}
                progressPending={loading}
                progressComponent={<LoadingAnimation />}
                theme={theme}
            />
        </div>
    )
}
export const DtPPKMKerumunan: FC<any> = ({
    kota,
    totalKegiatan,
    setTotalKegiatan,
    loading,
    theme,
    aksi,
}) => {

    useEffect(() => {
        const fetchDTPPKMKerumunan = async () => {
            const { data } = await axios.get(
                `${PELAPORAN_URL}/kegiatan-umum/?%24filter=tindak_lanjut__administrasi__jenis_penertiban%20eq%20%27TERTIB%20AREA%20PUBLIK%20DAN%20TEMPAT%20LAINNYA%20%28PPKM%29%27&%24top=1&%24select=id`
            )
            const res = await axios.get(
                `${PELAPORAN_URL}/kegiatan-umum/?%24filter=tindak_lanjut__administrasi__jenis_penertiban%20eq%20%27TERTIB%20AREA%20PUBLIK%20DAN%20TEMPAT%20LAINNYA%20%28PPKM%29%27&%24top=${data.total_items}&%24select=id%2C%20kegiatan__kota_id%2C%20tindak_lanjut__administrasi__penyelesaian_id%2C%20kegiatan__tanggal%2C%20kegiatan__jam_start%2C%20kegiatan__jam_end%2C%20kegiatan__uraian_kegiatan`
            )
            setTotalKegiatan(res.data.data)
        }
        fetchDTPPKMKerumunan()
    }, [])

    const GetPerJenis = ({ row, jenis }: any) => {
        let countJumlah = 0
        if (row && !jenis) {
            countJumlah = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row).length
        }
        if (row && jenis) {
            let jumlahJenis = 0
            for (let i = 0; i < jenis.length; i++) {
                jumlahJenis = totalKegiatan.filter(
                    (item: any) => item.kegiatan__kota_id === row && item.tindak_lanjut__administrasi__penyelesaian_id === jenis[i]
                ).length;
                countJumlah += jumlahJenis
            }
        }
        return (
            <>
                {countJumlah}
            </>
        )
    }

    var num = 1
    const columns = [
        {
            name: 'No',
            width: '80px',
            sortField: 'id',
            wrap: true,
            selector: (row: any) => row.serial,
            cell: (row: any) => {
                return <div className='mb-2 mt-2'>{row.serial}</div>
            },
        },
        {
            name: 'Pelaksana Kegiatan',
            wrap: true,
            center: true,
            width: '300px',
            selector: (row: any) => row.pelaksana_kegiatan,
            cell: (row: any) => {
                return (
                    <>
                        <a
                            className='table table-hover mb-0'
                            onClick={() => aksi(row.no)}>{row.pelaksana_kegiatan}</a>
                    </>
                )
            },
        },
        {
            name: 'Jumlah Pengawasan',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} />,
        },
        {
            name: 'Teguran Tertulis',
            center: true,
            width: '150px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[31]} />,
        },
        {
            name: 'Pembubaran Kegiatan',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[12]} />,
        },
        {
            name: 'Tidak Ditemukan Pelanggaran',
            center: true,
            width: '200px',
            selector: (row: any) => row.no,
            cell: (record: any) => <GetPerJenis row={record.no} jenis={[34, 42]} />,
        },
    ]

    return (
        <div>
            <DataTable
                pagination
                data={kota}
                columns={columns}
                progressPending={loading}
                progressComponent={<LoadingAnimation />}
                theme={theme}
            />
        </div>
    )
}

export const DtDetail: FC<any> = ({
    data,
    loading,
    theme,
}) => {

    const GetKota = ({ row }: { row: number }) => {
        const [valData, setValData] = useState('')
        useEffect(() => {
            async function fetchDT(id: number) {
                const { data } = await axios.get(`${MASTERDATA_URL}/kota/?%24filter=id%20eq%20${id}`)
                const result: string = data.data[0].nama
                setValData(result)
            }
            fetchDT(row)
        }, [valData, row])

        return <>{valData}</>
    }

    const GetPenyelesaian = ({ row }: { row: number }) => {
        const [valData, setValData] = useState('')
        useEffect(() => {
            async function fetchDT(id: number) {
                const { data } = await axios.get(`${MASTERDATA_URL}/jenis-penyelesaian/?%24filter=id%20eq%20${id}`)
                const result: string = data.data[0].nama
                setValData(result)
            }
            fetchDT(row)
        }, [valData, row])

        return <>{valData}</>
    }

    const columns = [
        {
            name: 'No',
            width: '80px',
            selector: (row: any) => row.serial,
            sortable: true,
            cell: (row: any) => {
                return <div className='mb-2 mt-2'>{row.serial}</div>
            },
        },
        {
            name: 'Pelaksana Kegiatan',
            wrap: true,
            center: true,
            width: '300px',
            selector: (row: any) => row.kegiatan__kota_id,
            cell: (record: any) => <GetKota row={parseInt(record.kegiatan__kota_id)} />,
        },
        {
            name: 'Jenis Penyelesaian',
            wrap: true,
            center: true,
            width: '300px',
            selector: (row: any) => row.tindak_lanjut__administrasi__penyelesaian_id,
            cell: (record: any) => <GetPenyelesaian row={parseInt(record.tindak_lanjut__administrasi__penyelesaian_id)} />,
        },
        {
            name: 'Denda Pengadilan',
            center: true,
            width: '200px',
            selector: (row: any) => row.tindak_lanjut__denda__pengadilan,
        },
        {
            name: 'Denda Non Pengadilan',
            center: true,
            width: '200px',
            selector: (row: any) => row.tindak_lanjut__denda__non_pengadilan,
        },
        {
            name: 'Tanggal Kegiatan',
            center: true,
            width: '140px',
            selector: (row: any) => row.kegiatan__tanggal,
        },
        {
            name: 'Waktu Mulai',
            center: true,
            width: '140px',
            selector: (row: any) => row.kegiatan__jam_start,
        },
        {
            name: 'Waktu Selesai',
            center: true,
            width: '140px',
            selector: (row: any) => row.kegiatan__jam_end,
        },
        {
            name: 'Uraian Kegiatan',
            width: '300px',
            wrap: true,
            selector: (row: any) => row.kegiatan__uraian_kegiatan,
        },
        {
            name: 'Wilayah',
            width: '200px',
            wrap: true,
            selector: (row: any) => row.kegiatan__wilayah,
        },
    ]

    return (
        <div>
            <DataTable
                pagination
                data={data}
                columns={columns}
                progressComponent={<LoadingAnimation />}
                progressPending={loading}
                theme={theme}
            />
        </div>
    )
}