import React, {useLayoutEffect} from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

function Pie(props: {chartID: any}) {
  //const chart = useRef(null);
  const chartID = props.chartID
  console.log({chartID})

  useLayoutEffect(() => {
    // Create root and chart
    var root = am5.Root.new(chartID)

    root.setThemes([am5themes_Animated.new(root)])

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      })
    )

    // Define data
    var data = [
      {
        category: 'Provinsi',
        value1: 1000,
      },
      {
        category: 'Jakarta Pusat',
        value2: 1200,
      },
      {
        category: 'Jakarta Utara',
        value3: 850,
      },
      {
        category: 'Jakarta Barat',
        value4: 850,
      },
      {
        category: 'Jakarta Selatan',
        value5: 850,
      },
      {
        category: 'Jakarta Timur',
        value6: 850,
      },
      {
        category: 'Kepulauan Seribu',
        value7: 850,
      },
    ]

    // Craete Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    )

    // Create X-Axis
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.2,
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: 'category',
      })
    )
    xAxis.data.setAll(data)

    // Create series
    var series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Provinsi',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value1',
        categoryXField: 'category',
        tooltip: am5.Tooltip.new(root, {}),
      })
    )
    series1.data.setAll(data)

    var series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Jakarta',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value2',
        categoryXField: 'category',
      })
    )
    series2.data.setAll(data)

    var series3 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Jakarta Utara',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value3',
        categoryXField: 'category',
      })
    )
    series3.data.setAll(data)

    var series4 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Jakarta Barat',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value4',
        categoryXField: 'category',
      })
    )
    series4.data.setAll(data)

    var series5 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Jakarta Selatan',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value5',
        categoryXField: 'category',
      })
    )
    series5.data.setAll(data)

    var series6 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Jakarta Timur',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value6',
        categoryXField: 'category',
      })
    )
    series6.data.setAll(data)

    var series7 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Kepulauan Seribu',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value7',
        categoryXField: 'category',
      })
    )
    series7.data.setAll(data)

    // Add legend
    var legend = chart.children.push(am5.Legend.new(root, {}))
    legend.data.setAll(chart.series.values)
  }, [chartID])

  return <div id={chartID} style={{height: 200}}></div>
}
export default Pie
