import type { Ref } from 'vue';
import type { EChartsOption } from '../types';
import type { Theme } from '../types';

import { useGetRainSeries } from '../config/seriesConfig';
import { useGetTimeXAxis } from '../config/xAxisConfig';
import { useGetRainYAxis } from '../config/yAxisConfig';
import useEchartsThemeColor from '../utils/useEchartsThemeColor';
import { mergeEchartsOption } from '../utils/merge';

export default function useRainEcharts(theme: Theme | Ref<Theme> = 'light') {
  const { textColor, lineColor, drpColor } = useEchartsThemeColor(theme);

  /**
   * 获取降雨量柱状图配置
   * @param XData X 轴时间数据
   * @param DrpData 降雨量数据
   * @param customOption 自定义配置，按索引深度合并，可选择性覆盖默认配置中的任意属性
   */
  function getEchartsOptions(XData: string[], DrpData: number[], customOption?: EChartsOption): EChartsOption {
    const defaultOption: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      grid: { left: 50, right: 30, bottom: 30, top: 50 },
      legend: {
        textStyle: { color: textColor.value },
        data: [{ name: '降雨量', icon: 'circle' }],
        top: 20,
        left: 'center',
      },
      xAxis: [useGetTimeXAxis({ data: XData, textColor: textColor.value, lineColor: lineColor.value })],
      yAxis: [useGetRainYAxis({ data: DrpData, textColor: textColor.value, lineColor: lineColor.value })],
      series: [useGetRainSeries({ name: '降雨量', data: DrpData, itemStyle: { color: drpColor.value, borderRadius: [10, 10, 0, 0] } })],
    };
    return mergeEchartsOption({}, defaultOption, customOption ?? {});
  }

  return { getEchartsOptions };
}
