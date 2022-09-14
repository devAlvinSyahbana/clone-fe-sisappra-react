import React, {useLayoutEffect} from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

function Pie(props: {chartID: any; valueField?: any; categoryField: any}) {
  //const chart = useRef(null);
  const chartID = props.chartID
  const valueField = props.valueField
  const categoryField = props.categoryField
  console.log('Props Result', chartID)
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
        categoryField: categoryField,
      })
    )
    xAxis.data.setAll(chartID)

    // Create series
    var series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: valueField,
        categoryXField: categoryField,
        tooltip: am5.Tooltip.new(root, {}),
      })
    )
    series1.data.setAll(chartID)

    // Add legend
    var legend = chart.children.push(am5.Legend.new(root, {}))
    legend.data.setAll(chart.series.values)
  }, [chartID, valueField, categoryField])

  return <div id={chartID} style={{height: 200}}></div>
}
export default Pie
