import type { EChartsOption } from '../types';
import type { Theme } from '../types';

import { useGetWaterSeries } from '../config/seriesConfig';
import { useGetTimeXAxis } from '../config/xAxisConfig';
import { useGetWaterYAxis } from '../config/yAxisConfig';
import useEchartsThemeColor from '../utils/useEchartsThemeColor';

export default function useWaterEcharts(theme: Theme = 'light') {
  const { textColor, lineColor, waterColor } = useEchartsThemeColor(theme);

  function getEchartsOptions(XData: any[], WaterData: any[]): EChartsOption {
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
        data: [{ name: '水位', icon: 'circle' }],
        top: 20,
        left: 'center',
      },
      xAxis: [useGetTimeXAxis({ data: XData, textColor: textColor.value, lineColor: lineColor.value })],
      yAxis: [useGetWaterYAxis({ data: WaterData, textColor: textColor.value, lineColor: lineColor.value })],
      series: [useGetWaterSeries({ showSymbol: true, symbolSize: 10, data: WaterData, color: waterColor.value })],
    };
  }

  return {
    getEchartsOptions,
  };
}
