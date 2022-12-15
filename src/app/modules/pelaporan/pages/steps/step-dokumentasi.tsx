import React, {ChangeEvent, Fragment, useState, FC} from 'react'
import Form from 'react-bootstrap/Form'
import {ErrorMessage, Field} from 'formik'
import {ToFieldStateCE} from '../../components/fields.formikcto'
import {changedValue} from '../../../../redux/slices/pelaporan-kegiatan.slice'
import {useDispatch, useSelector} from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DataTable, {createTheme} from 'react-data-table-component'

export const StepDokumentasi: FC = () => {
  const dispatch = useDispatch()

  let no = 1

  const columns = [
    {
      name: 'No',
      cell: (record: any) => {
        return <div className='mt-5 mb-5'>{no++}</div>
      },
    },
    {
      name: 'Dokumentasi',
      selector: (row: any) => row.nama,
    },
    {
      name: 'Keterangan',
      selector: (row: any) => row.nama,
    },
    {
      name: 'Aksi',
      sortable: false,
      className: 'action',
      center: true,
      allowOverflow: true,
      fixed: true,
      cell: (record: any) => {
        return (
          <Fragment>
            <div className='d-flex mb-2 mt-2 flex-end'>
              {[DropdownButton].map((DropdownType, idx) => (
                <DropdownType
                  as={ButtonGroup}
                  key={idx}
                  id={`dropdown-button-drop-${idx}`}
                  size='sm'
                  variant='light'
                  title='Aksi'
                >
                  <Dropdown.Item
                    href='#'
                    //   onClick={() => konfirDel(record.id, record.status_pegawai)}
                  >
                    Hapus
                  </Dropdown.Item>
                </DropdownType>
              ))}
            </div>
          </Fragment>
        )
      },
    },
  ]

  const data = [
    {
      id: 1,
      no: '1',
      dokumentasi: '-',
      ket: '-',
      aksi: '-',
    },
  ]

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-10'>Dokumentasi</h2>

        <div className='mb-10 form-group'>
          <label className='required form-label'>Dokumentasi</label>
          <Form.Group controlId='formFileSm' className='mb-3'>
            <Form.Control type='file' size='sm' />
          </Form.Group>
        </div>

        <div className='mb-10 form-group'>
          <label className='required form-label'>Keterangan</label>
          <Field
            as='textarea'
            type='text'
            name='null'
            className='form-control'
            placeholder='Masukkan Keterangan'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='keterangan' />
          </div>
        </div>

        <div className='mb-10 form-group'>
          <label className='form-label'>Tabel Data</label>
          <DataTable
            columns={columns}
            data={data}
            noDataComponent={
              <div className='alert alert-primary d-flex align-items-center p-5 mt-10 mb-10'>
                <div className='d-flex flex-column'>
                  <h5 className='mb-1 text-center'>Data tidak ditemukan..!</h5>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}
