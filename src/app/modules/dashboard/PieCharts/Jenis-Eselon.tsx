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
        country: '1A',
        sales: 100000,
      },
      {
        country: '1B',
        sales: 160000,
      },
      {
        country: '1C',
        sales: 80000,
      },
      {
        country: '2A',
        sales: 80000,
      },
      {
        country: '2B',
        sales: 80000,
      },
      {
        country: '2C',
        sales: 80000,
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