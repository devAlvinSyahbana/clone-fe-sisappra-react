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
        category: '0',
        sales: 400.9,
      },
      {
        category: '20 - 25',
        sales: 300.9,
      },
      {
        category: '26-30',
        sales: 200.9,
      },
      {
        category: '31 - 35',
        sales: 100.9,
      },
      {
        category: '36 - 40',
        sales: 400.9,
      },
      {
        category: '41 - 45',
        sales: 300.9,
      },
      {
        category: '46 - 50',
        sales: 200.9,
      },
      {
        category: '51 - 55',
        sales: 100.9,
      },
      {
        category: '56 - 60',
        sales: 400.9,
      },
      {
        category: '< 20',
        sales: 300.9,
      },
      {
        category: '>60',
        sales: 200.9,
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
