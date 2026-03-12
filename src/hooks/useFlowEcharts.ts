import type { EChartsOption } from '../types';
import type { Theme } from '../types';

import { useGetFlowSeries } from '../config/seriesConfig';
import { useGetTimeXAxis } from '../config/xAxisConfig';
import { useGetFlowYAxis } from '../config/yAxisConfig';
import useEchartsThemeColor from '../utils/useEchartsThemeColor';

export default function useFlowEcharts(theme: Theme = 'light') {
  const { textColor, lineColor, flowColor } = useEchartsThemeColor(theme);

  function getEchartsOptions(XData: any[], FlowData: any[]): EChartsOption {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: 50,
        right: 30,
        bottom: 30,
        top: 50,
      },
      legend: {
        textStyle: {
          color: textColor.value,
        },
        data: [{ name: '流量', icon: 'circle' }],
        top: 20,
        left: 'center',
      },
      xAxis: [useGetTimeXAxis({ data: XData, textColor: textColor.value, lineColor: lineColor.value })],
      yAxis: [useGetFlowYAxis({ position: 'left', data: FlowData, textColor: textColor.value, lineColor: lineColor.value })],
      series: [useGetFlowSeries({ showSymbol: true, symbolSize: 10, data: FlowData, yAxisIndex: 0, color: flowColor.value })],
    };
  }

  return {
    getEchartsOptions,
  };
}
