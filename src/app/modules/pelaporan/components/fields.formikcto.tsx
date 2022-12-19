import React, {ChangeEvent} from 'react'
import {FieldProps} from 'formik'
import DatePicker, {DateObject} from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import Select, {OptionProps} from 'react-select'
import {useSelector} from 'react-redux'
import {RootState} from '../../../redux/store'

export type FieldState = {target: {name: string; value: any}}

export const ToFieldStateCE = ({target}: ChangeEvent<any>): FieldState => ({
  target: {name: target.name, value: target.value},
})
export const ToFieldStateBNV = (name: string, value: any): FieldState => ({target: {name, value}})

export interface DefaultCTOField {
  className: string
  onChange: {
    /** Classic React change handler, keyed by input name */
    (e: React.ChangeEvent<any>): void
    /** Preact-like linkState. Will return a handleChange function.  */
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void
  }
}

export interface DatePickerFieldProps extends DefaultCTOField {}
export interface TimePickerFieldProps extends DefaultCTOField {
  range: boolean
}
export interface SelectFieldProps extends DefaultCTOField {
  target: string
}

export const DatePickerField = ({
  className,
  field,
  onChange,
}: FieldProps & DatePickerFieldProps) => (
  <DatePicker
    containerClassName={className}
    inputClass='form-control'
    format='YYYY-MM-DD'
    value={field.value}
    onChange={(o: DateObject) => {
      field.onChange({target: {name: field.name, value: o?.toString()}})
      onChange({target: {name: field.name, value: o?.toString()}})
    }}
  />
)

export const DatePickerFieldRange = ({
  className,
  field,
  onChange,
}: FieldProps & DatePickerFieldProps) => (
  <DatePicker
    containerClassName={className}
    inputClass='form-control'
    range
    value={field.value}
    onChange={(o: DateObject) => {
      field.onChange({target: {name: field.name, value: o?.toString()}})
      onChange({target: {name: field.name, value: o?.toString()}})
    }}
  />
)

export const TimePickerField = ({
  field,
  range,
  form,
  className,
  onChange,
}: FieldProps & TimePickerFieldProps) => (
  <DatePicker
    disableDayPicker
    containerClassName={className}
    inputClass='form-control'
    format='HH:mm'
    plugins={[<TimePicker hideSeconds />]}
    onChange={(o: DateObject) => {
      field.onChange({target: {name: field.name, value: o?.toString()}})
      onChange({target: {name: field.name, value: o?.toString()}})
    }}
  />
)

export const SelectField = ({
  form,
  field,
  target,
  onChange,
  options,
}: OptionProps & SelectFieldProps & FieldProps & any) => {
  const allValues = useSelector((s: RootState) => s.pelaporanKegiatan)
  return (
    <Select
      isLoading={typeof options === 'object' && options.length === 0}
      options={typeof options === 'string' ? [] : options}
      value={Number(field.value?.value) !== allValues[target] ? '' : field.value}
      onChange={(o) => {
        field.onChange({target: {name: field.name, value: o}})
        form.setFieldValue(target, o?.value)
        onChange({target: {name: target, value: o?.value}})
      }}
    />
  )
}
