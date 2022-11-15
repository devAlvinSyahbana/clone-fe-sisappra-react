/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import {JumlahSeluruhSatpol} from '../../../../app/modules/kepegawaian/components/LaporanRekapPegawaiInterface'
import {KTSVG} from '../../../helpers'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

const MixedWidget10: React.FC<Props> = ({className, chartColor, chartHeight}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()

  const [jpegawaisatpol, setJpegawaisatpol] = useState<JumlahSeluruhSatpol>()

  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartColor, chartHeight))
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
      {/* begin::Body */}
      <div className='card-body d-flex flex-column p-0'>
        {/* begin::Stats */}
        <div className='flex-grow-1 card-p pb-0'>
          <div className='d-flex flex-stack flex-wrap'>
            <div className='me-2'>
              <a href='#' className='text-dark text-hover-primary fw-bold fs-3'>
                Summary Sub Modul Sisappra
              </a>
            </div>
          </div>
          {/* begin::Stats */}
          <div className='card-p mt-n35 '>
            {/* begin::Row */}
            <div className='row g-0'>
              {/* begin::Col */}
              <div className='col bg-light-primary px-6 py-8 rounded-2 me-7 mb-7'>
                <div className='text-primary '>Total Data</div>
                <div className='text-primary fw-semibold fs-6'>Seluruh Pegawai Satpol PP</div>
                <div className='text-primary fw-bold mt-3 text-end'>
                  {jpegawaisatpol?.jmlh_seluruh_pegawai_satpol !== 0
                    ? jpegawaisatpol?.jmlh_seluruh_pegawai_satpol
                    : '-'}{' '}
                  orang
                </div>
              </div>
              {/* end::Col */}
              {/* begin::Col */}
              <div className='col bg-light-primary px-6 py-8 rounded-2 mb-7'>
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
              <div className='col bg-light-primary px-6 py-8 rounded-2 me-7'>
                <div className='text-primary fs-6 mt-2'>Total Data </div>
                <div className='text-primary fw-semibold fs-6'>PTT</div>
                <div className='text-primary fw-bold mt-3 text-end'>
                  {' '}
                  {jpegawaisatpol?.jmlh_seluruh_non_pns_ptt !== 0
                    ? jpegawaisatpol?.jmlh_seluruh_non_pns_ptt
                    : '-'}{' '}
                  orang
                </div>
              </div>
              {/* end::Col */}
              {/* begin::Col */}
              <div className='col bg-light-primary px-6 py-8 rounded-2'>
                <div className='text-primary  fs-6 mt-2'>Total Data</div>
                <div className='text-primary fw-semibold'>PJLP</div>
                <div className='text-primary fw-bold mt-3 text-end'>
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
        {/* end::Stats */}

        {/* begin::Chart */}
        <div className='mixed-widget-7-chart card-rounded-bottom'></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

const chartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue('--kt-gray-800')
  const strokeColor = getCSSVariableValue('--kt-gray-300')
  const baseColor = getCSSVariableValue('--kt-' + chartColor)
  const lightColor = getCSSVariableValue('--kt-' + chartColor + '-light')

  return {
    series: [
      {
        name: 'Net Profit',
        data: [15, 25, 15, 40, 20, 50],
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
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
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
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      max: 60,
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
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  }
}

export {MixedWidget10}
