import React, {useEffect} from 'react'
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

//chart type
import * as am5percent from '@amcharts/amcharts5/percent'

function Pie(props: {chartID?: any; valueField?: any; categoryField?: any}) {
  //const chart = useRef(null);
  const chartID = props.chartID
  const valueField = props.valueField
  const categoryField = props.categoryField
  console.log('Props Result', chartID)

  useEffect(() => {
    var root = am5.Root.new(chartID)

    root.setThemes([am5themes_Animated.new(root)])

    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.horizontalLayout,
      })
    )

    // Create series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: 'Series',
        valueField: valueField,
        categoryField: categoryField,
        legendLabelText: '[{fill}]{category}[/]',
        legendValueText: '[bold {fill}]{value}[/]',
      })
    )
    series.data.setAll(chartID)
    series.labels.template.set('forceHidden', true)
    series.ticks.template.set('forceHidden', true)

    // Add legendy
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: root.verticalLayout,
      })
    )

    legend.data.setAll(series.dataItems)
  }, [chartID, valueField, categoryField])

  return <div id={chartID} style={{height: 600}}></div>
}
export default Pie
