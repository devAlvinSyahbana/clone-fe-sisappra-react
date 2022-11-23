import React, {useLayoutEffect} from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

function Pie(props: {chartID: any; valueField?: any; categoryField: any}) {
  //const chart = useRef(null);
  const chartID = props.chartID
  const valueField = props.valueField
  const categoryField = props.categoryField
  // console.log('Props Result', chartID)
  // console.log({chartID})

  useLayoutEffect(() => {
    // Create root and chart
    const root = am5.Root.new(categoryField)

    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      })
    )

    let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}))
    cursor.lineY.set('visible', false)

    let xRenderer = am5xy.AxisRendererX.new(root, {minGridDistance: 30})
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
    })

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    )

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: categoryField,
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    )

    // Create series
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: valueField,
        sequencedInterpolation: true,
        categoryXField: categoryField,
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      })
    )
    xAxis.data.setAll(chartID)
    series.data.setAll(chartID)

    // series.columns.template.setAll({cornerRadiusTL: 5, cornerRadiusTR: 5})
    // series.columns.template.adapters.add('fill', function (fill, target) {
    //   return chart.get('colors').getIndex(series.columns.indexOf(target))
    // })

    series.appear(1000)
    chart.appear(1000, 100)

    // // Add legend
    // const legend = chart.children.push(am5.Legend.new(root, {}))
    // legend.data.setAll(chart.series.values)
  }, [chartID, valueField, categoryField])

  return <div id={categoryField} style={{height: 400}}></div>
}
export default Pie
