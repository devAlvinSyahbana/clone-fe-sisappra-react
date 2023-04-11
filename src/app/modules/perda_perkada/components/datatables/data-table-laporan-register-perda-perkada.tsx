import { FC, Fragment } from 'react'
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { useTable, Column } from 'react-table'
import { useNavigate } from 'react-router-dom'

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

export const DtRegisterPerdaPerkada: FC<any> = ({
    data,
    totalRows,
    handlePerRowsChange,
    handlePageChange,
    loading,
    hakAkses,
    wilayahBidang,
    konfirDel,
    theme,
}) => {
    const navigate = useNavigate()
    const GetHakAkses = ({ row }: { row: number }) => {
        const handleHakAkses = hakAkses.find((i: any) => i.id === row)
        return <>{handleHakAkses?.nama_hak_akses}</>
    }

    var num = 1
    const columns = [
        {
            name: 'No',
            width: '80px',
            sortField: 'id',
            wrap: true,
            selector: (row: any) => row.no,
            cell: (row: any) => {
                return <div className='mb-2 mt-2'>{row.no}</div>
            },
        },
        {
            name: 'Jenis Pelanggaran',
            wrap: true,
            center: true,
            width: '500px',
            sortField: 'jenis_penertiban',
            selector: (row: any) => row.jenis_penertiban,
          },
        {
            name: 'Jumlah Kasus',
            center: true,
            width: '200px',
            sortField: 'total_item',
            selector: (row: any) => row.total_item,
        },
        {
            name: 'Yustisi',
            center: true,
            width: '150px',
            sortField: 'total_item',
            selector: (row: any) => row.total_item,
        },
        {
            name: 'Non Yustisi',
            center: true,
            width: '200px',
            sortField: 'total_item',
            selector: (row: any) => row.total_item,
        },
        {
            name: 'Lidik',
            center: true,
            width: '150px',
            sortField: 'total_item',
            selector: (row: any) => row.total_item,
        },
        {
            name: 'Sidik',
            center: true,
            width: '150px',
            sortField: 'total_item',
            selector: (row: any) => row.total_item,
        },
        {
            name: 'P-21',
            center: true,
            width: '300px',
            sortField: 'total_item',
            selector: (row: any) => row.total_item,
        },
        {
            name: 'SP-3',
            center: true,
            width: '300px',
            sortField: 'total_item',
            selector: (row: any) => row.total_item,
        },
        {
            name: 'Dalam Proses',
            center: true,
            width: '300px',
            sortField: 'total_item',
            selector: (row: any) => row.total_item,
        },
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                progressPending={loading}
                pagination
                paginationServer
                progressComponent={<LoadingAnimation />}
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                theme={theme}
            />
        </div>
    )
}
