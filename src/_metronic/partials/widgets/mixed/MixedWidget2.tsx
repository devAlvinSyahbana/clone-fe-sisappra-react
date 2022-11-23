/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {KTSVG} from '../../../helpers'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import {JumlahSeluruhSatpol} from '../../../../app/modules/kepegawaian/components/LaporanRekapPegawaiInterface'

type Props = {
  className: string
  chartColor: string
  strokeColor: string
  chartHeight: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

const MixedWidget2: React.FC<Props> = ({className, chartColor, chartHeight, strokeColor}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()

  const [jpegawaisatpol, setJpegawaisatpol] = useState<JumlahSeluruhSatpol>()

  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(
      chartRef.current,
      chartOptions(chartHeight, chartColor, strokeColor)
    )
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = refreshChart()

    const fetchData = async () => {
      const jsatpol = await axios.get(`${KEPEGAWAIAN_URL}/rekapitulasi-jumlah-pegawai-polpp`)

      setJpegawaisatpol(jsatpol.data.data)
    }
    fetchData()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className={`card-header border-0 py-5 bg-${chartColor}`}>
        <h3 className='card-title fw-bold text-white'>Data Pegawai</h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body p-0'>
        {/* begin::Chart */}
        <div
          ref={chartRef}
          className={`mixed-widget-2-chart card-rounded-bottom bg-${chartColor}`}
        ></div>
        {/* end::Chart */}
        {/* begin::Stats */}
        <div className='card-p mt-n20 position-relative'>
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <div className='col bg-light-info px-6 py-8 rounded-2 me-7 mb-7 '>
              <div className='text-info '>Total Data</div>
              <div className='text-info fw-semibold fs-6'>Seluruh Pegawai Satpol PP</div>
              <div className='text-info fw-bold mt-3 text-end'>
                {jpegawaisatpol?.jmlh_seluruh_pegawai_satpol !== 0
                  ? jpegawaisatpol?.jmlh_seluruh_pegawai_satpol
                  : '-'}{' '}
                orang
              </div>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-primary px-6 py-8 rounded-2 mb-7 '>
              <div className='text-primary fs-6'> Total Data</div>
              <div className='text-primary fw-semibold fs-6'> PNS</div>
              <div className='text-primary fw-bold mt-3 text-end'>
                {' '}
                {jpegawaisatpol?.jmlh_seluruh_pns !== 0
                  ? jpegawaisatpol?.jmlh_seluruh_pns
                  : '-'}{' '}
                orang
              </div>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <div className='col bg-light-danger px-6 py-8 rounded-2 me-7 '>
              <div className='text-danger fs-6 mt-2'>Total Data </div>
              <div className='text-danger fw-semibold fs-6'>PTT</div>
              <div className='text-danger fw-bold mt-3 text-end'>
                {' '}
                {jpegawaisatpol?.jmlh_seluruh_non_pns_ptt !== 0
                  ? jpegawaisatpol?.jmlh_seluruh_non_pns_ptt
                  : '-'}{' '}
                orang
              </div>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-success px-6 py-8 rounded-2 '>
              <div className='text-success  fs-6 mt-2'>Total Data</div>
              <div className='text-success fw-semibold'>PJLP</div>
              <div className='text-success fw-bold mt-3 text-end'>
                {' '}
                {jpegawaisatpol?.jmlh_seluruh_non_pns_pjlp !== 0
                  ? jpegawaisatpol?.jmlh_seluruh_non_pns_pjlp
                  : '-'}{' '}
                orang
              </div>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
        </div>
        {/* end::Stats */}
      </div>
      {/* end::Body */}
    </div>
  )
}

const chartOptions = (
  chartHeight: string,
  chartColor: string,
  strokeColor: string
): ApexOptions => {
  const labelColor = getCSSVariableValue('--kt-gray-500')
  const borderColor = getCSSVariableValue('--kt-gray-200')
  const color = getCSSVariableValue('--kt-' + chartColor)

  return {
    series: [
      {
        name: 'Net Profit',
        data: [30, 45, 32, 70, 40, 40, 40],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: strokeColor,
        opacity: 0.5,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 0,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [strokeColor],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 3,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 80,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return '$' + val + ' thousands'
        },
      },
      marker: {
        show: false,
      },
    },
    colors: ['transparent'],
    markers: {
      colors: [color],
      strokeColors: [strokeColor],
      strokeWidth: 3,
    },
  }
}

export {MixedWidget2}
