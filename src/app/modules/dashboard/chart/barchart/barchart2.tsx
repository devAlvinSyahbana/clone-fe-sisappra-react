import React, { useLayoutEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

function Pie(props: { chartID: any; valueField?: any; categoryField: any }) {
  //const chart = useRef(null);
  const chartID = props.chartID
  const valueField = props.valueField
  const categoryField = props.categoryField
  console.log('Chart ID', categoryField)
  console.log({ chartID })

  useLayoutEffect(() => {
    // Create root and chart
    var root = am5.Root.new(chartID)

    root.setThemes([am5themes_Animated.new(root)])

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none"

      })
    )
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
    // Craete Y-axis
    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0,
      categoryField: categoryField,
      renderer: yRenderer,
      tooltip: am5.Tooltip.new(root, { themeTags: ["axis"] })
    }));

    // Create X-Axis
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      extraMax:0.1,
      renderer: am5xy.AxisRendererX.new(root, {})
    }));
    // xAxis.data.setAll(chartID)

    // Create series
    // Create series
    var series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: valueField,
        categoryYField: categoryField,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "left",
          labelText: "{valueX}"
        }),
      })
    )
    // Rounded corners for columns
    series1.columns.template.setAll({
      cornerRadiusTR: 5,
      cornerRadiusBR: 5
    });

    // Make each column to be of a different color
    series1.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors")?.getIndex(series1.columns.indexOf(target));
    });

    series1.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors")?.getIndex(series1.columns.indexOf(target));
    });
    yAxis.data.setAll(chartID);
    series1.data.setAll(chartID)

    // sortCategoryAxis();
    // // Get series item by category
    // function getSeriesItem(category: any) {
    //   for (var i = 0; i < series1.dataItems.length; i++) {
    //     var dataItem = series1.dataItems[i];
    //     if (dataItem.get("categoryY") == category) {
    //       return dataItem;
    //     }
    //   }
    // }

    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none",
      xAxis: xAxis,
      yAxis: yAxis
    }));

    // // Axis sorting
    // function sortCategoryAxis() {

    //   // Sort by value
    //   series1.dataItems.sort(function (x, y) {
    //     return x.get("valueX") ? - y.get("valueX")! : 0; // descending
    //     //return y.get("valueY") - x.get("valueX"); // ascending
    //   })

    //   // Go through each axis item
    //   am5.array.each(yAxis.dataItems, function (dataItem) {
    //     // get corresponding series item
    //     var seriesDataItem = getSeriesItem(dataItem.get("category"));

    //     if (seriesDataItem) {
    //       // get index of series data item
    //       var index = series1.dataItems.indexOf(seriesDataItem);
    //       // calculate delta position
    //       var deltaPosition = (index - dataItem.get("index", 0)) / series1.dataItems.length;
    //       // set index to be the same as series data item index
    //       dataItem.set("index", index);
    //       // set deltaPosition instanlty
    //       dataItem.set("deltaPosition", -deltaPosition);
    //       // animate delta position to 0
    //       dataItem.animate({
    //         key: "deltaPosition",
    //         to: 0,
    //         duration: 1000,
    //         easing: am5.ease.out(am5.ease.cubic)
    //       })
    //     }
    //   });

    //   // Sort axis items by index.
    //   // This changes the order instantly, but as deltaPosition is set,
    //   // they keep in the same places and then animate to true positions.
    //   yAxis.dataItems.sort(function (x, y) {
    //     return x.get("index") ? - y.get("index")! : 0;
    //   });
    // }

    // setInterval(function () {
    //   updateData();
    // }, )
    
    // function updateData() {
    //   am5.array.each(series1.dataItems, function (dataItem) {
    //     var value = dataItem.get("valueX")!;
    //     if (value < 0) {
    //       value = 500000000;
    //     }
    //     // both valueY and workingValueY should be changed, we only animate workingValueY
    //     dataItem.set("valueX", value);
    //     dataItem.animate({
    //       key: "valueXWorking",
    //       to: value,
    //       duration: 600,
    //       easing: am5.ease.out(am5.ease.cubic)
    //     });
    //   })
    
    //   sortCategoryAxis();
    // }
  }, [chartID, valueField, categoryField])


  return <div id={chartID} style={{ height: 2000 }}></div>
}
export default Pie
