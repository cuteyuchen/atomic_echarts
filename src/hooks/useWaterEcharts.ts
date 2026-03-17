import type { Ref } from 'vue';
import type { EChartsOption } from '../types';
import type { Theme } from '../types';

import { useGetWaterSeries } from '../config/seriesConfig';
import { useGetTimeXAxis } from '../config/xAxisConfig';
import { useGetWaterYAxis } from '../config/yAxisConfig';
import useEchartsThemeColor from '../utils/useEchartsThemeColor';
import { mergeEchartsOption } from '../utils/merge';

export default function useWaterEcharts(theme: Theme | Ref<Theme> = 'light') {
  const { textColor, lineColor, waterColor } = useEchartsThemeColor(theme);

  /**
   * 获取水位图表配置
   * @param XData X 轴时间数据
   * @param WaterData 水位数据
   * @param customOption 自定义配置，按索引深度合并，可选择性覆盖默认配置中的任意属性
   */
  function getEchartsOptions(XData: string[], WaterData: number[], customOption?: EChartsOption): EChartsOption {
    const defaultOption: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
      },
      grid: { left: 50, right: 30, bottom: 30, top: 50 },
      legend: {
        textStyle: { color: textColor.value },
        data: [{ name: '水位', icon: 'circle' }],
        top: 20,
        left: 'center',
      },
      xAxis: [useGetTimeXAxis({ data: XData, textColor: textColor.value, lineColor: lineColor.value })],
      yAxis: [useGetWaterYAxis({ data: WaterData, textColor: textColor.value, lineColor: lineColor.value })],
      series: [useGetWaterSeries({ showSymbol: true, symbolSize: 10, data: WaterData, color: waterColor.value })],
    };
    return mergeEchartsOption({}, defaultOption, customOption ?? {});
  }

  return { getEchartsOptions };
}
