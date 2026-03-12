import type { EChartsOption } from '../types';
import type { Theme } from '../types';

import { useGetFlowSeries, useGetWaterSeries } from '../config/seriesConfig';
import { useGetTimeXAxis } from '../config/xAxisConfig';
import { useGetFlowYAxis, useGetWaterYAxis } from '../config/yAxisConfig';
import useEchartsThemeColor from '../utils/useEchartsThemeColor';

export default function useWaterFlowEcharts(theme: Theme = 'dark') {
  const { textColor, lineColor, waterColor } = useEchartsThemeColor(theme);
  const icon =
    'path://M1.39023 1.95609C1.5113 1.10862 2.2371 0.479126 3.09318 0.479126H11.6595C12.7063 0.479126 13.5105 1.40632 13.3624 2.44265L12.1337 11.0439C12.0126 11.8913 11.2868 12.5208 10.4307 12.5208H1.86444C0.817587 12.5208 0.0134372 11.5936 0.161485 10.5573L1.39023 1.95609Z';

  function getEchartsOptions(XData: any[], WaterData: any[], FlowData: any[]): EChartsOption {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        top: 33,
        right: '11%',
        bottom: 20,
      },
      legend: {
        textStyle: {
          color: textColor.value,
        },
        data: [
          { name: '水位', icon },
          { name: '流量', icon },
        ],
        top: 0,
        left: 'center',
      },
      xAxis: [useGetTimeXAxis({ data: XData, textColor: textColor.value, lineColor: lineColor.value })],
      yAxis: [
        useGetWaterYAxis({ data: WaterData, textColor: textColor.value, lineColor: lineColor.value }),
        useGetFlowYAxis({ data: FlowData, textColor: textColor.value, lineColor: lineColor.value }),
      ],
      series: [useGetWaterSeries({ data: WaterData, color: waterColor.value }), useGetFlowSeries({ data: FlowData, color: '#24FF8C' })],
    };
  }

  return {
    getEchartsOptions,
  };
}
