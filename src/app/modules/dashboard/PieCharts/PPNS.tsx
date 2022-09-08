import React, {useLayoutEffect} from 'react'
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

//chart type
import * as am5percent from '@amcharts/amcharts5/percent'

function Pie(props: {chartID: any}) {
  //const chart = useRef(null);
  const chartID = props.chartID
  console.log({chartID})

  useLayoutEffect(() => {
    // Create root and chart
    var root = am5.Root.new(chartID)

    root.setThemes([am5themes_Animated.new(root)])

    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    )

    // Define data
    var data = [
      {
        category: 'Satpol PP Provinsi DKI Jakarta',
        sales: 501.9,
      },
      {
        category: 'Dinas Perindustriian dan Energi Provinsi DKI Jakarta',
        sales: 301.9,
      },
      {
        category: 'Inspektorat Provinsi DKI Jakarta',
        sales: 201.1,
      },
      {
        category: 'Dinas Kehutanan Provinsi DKI Jakarta',
        sales: 165.8,
      },
      {
        category: 'Dinas Pendidikan Provinsi DKI Jakarta',
        sales: 139.9,
      },
      {
        category: 'Badan Pajak dan Restribusi Daerah Provinsi DKI Jakarta',
        sales: 128.3,
      },
      {
        category: 'Dinas Koperasi, Usaha Kecil dan Menengah serta Perdagangan Provinsi DKI Jakarta',
        sales: 99,
      },
      {
        category: 'Dinas Sosial Provinsi DKI Jakarta',
        sales: 201.1,
      },
      {
        category: 'Dinas Sumber Daya Air Provinsi DKI Jakarta',
        sales: 165.8,
      },
      {
        category: 'Badan Kesatuan Bangsa dan Politik Provinsi DKI Jakarta',
        sales: 139.9,
      },
      {
        category: 'Dinas Cipta Karya, Tata Ruang dan Pertanahan Provinsi DKI Jakarta',
        sales: 165.8,
      },
      {
        category: 'Dinas Ketahanan Pangan, Kelautan dan Pertanian Provinsi DKI Jakarta',
        sales: 400.9,
      },
    ]

    // Create series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: 'Series',
        valueField: 'sales',
        categoryField: 'country',
      })
    )
    series.data.setAll(data)

    // Add legend
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout,
      })
    )

    legend.data.setAll(series.dataItems)
  }, [chartID])

  return <div id={chartID} style={{height: 200}}></div>
}
export default Pie
