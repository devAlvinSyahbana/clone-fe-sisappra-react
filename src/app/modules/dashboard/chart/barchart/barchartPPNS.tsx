import React, {useLayoutEffect} from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

function Pie(props: {chartID: any; valueField?: any; categoryField: any}) {
  //const chart = useRef(null);
  const chartID = props.chartID
  const valueField = props.valueField
  const categoryField = props.categoryField
  console.log('Chart ID', categoryField)
  console.log({chartID})

  useLayoutEffect(() => {
    // Create root and chart
    var root = am5.Root.new(chartID)

    root.setThemes([am5themes_Animated.new(root)])

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
      })
    )
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 30,
    })
    // Craete Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: categoryField,
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(root, {themeTags: ['axis']}),
      })
    )

    // Create X-Axis
    var xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        extraMax: 0.1,
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    )
    // xAxis.data.setAll(chartID)

    // Create series
    var series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: valueField,
        categoryYField: categoryField,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'left',
          labelText: '{valueX}',
        }),
      })
    )
    // Rounded corners for columns
    series1.columns.template.setAll({
      cornerRadiusTR: 5,
      cornerRadiusBR: 5,
    })

    // Make each column to be of a different color
    series1.columns.template.adapters.add('fill', function (fill, target) {
      return chart.get('colors')?.getIndex(series1.columns.indexOf(target))
    })

    series1.columns.template.adapters.add('stroke', function (stroke, target) {
      return chart.get('colors')?.getIndex(series1.columns.indexOf(target))
    })
    yAxis.data.setAll(chartID)
    series1.data.setAll(chartID)

    chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
        yAxis: yAxis,
      })
    )
  }, [chartID, valueField, categoryField])

  return <div id={chartID} style={{height: 700}}></div>
}
export default Pie
