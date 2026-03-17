import type { Ref } from 'vue';
import type { EChartsOption } from '../types';
import type { Theme } from '../types';

import { useGetFlowSeries, useGetWaterSeries } from '../config/seriesConfig';
import { useGetTimeXAxis } from '../config/xAxisConfig';
import { useGetFlowYAxis, useGetWaterYAxis } from '../config/yAxisConfig';
import useEchartsThemeColor from '../utils/useEchartsThemeColor';
import { mergeEchartsOption } from '../utils/merge';

export default function useWaterFlowEcharts(theme: Theme | Ref<Theme> = 'dark') {
  const { textColor, lineColor, waterColor } = useEchartsThemeColor(theme);
  const icon =
    'path://M1.39023 1.95609C1.5113 1.10862 2.2371 0.479126 3.09318 0.479126H11.6595C12.7063 0.479126 13.5105 1.40632 13.3624 2.44265L12.1337 11.0439C12.0126 11.8913 11.2868 12.5208 10.4307 12.5208H1.86444C0.817587 12.5208 0.0134372 11.5936 0.161485 10.5573L1.39023 1.95609Z';

  /**
   * 获取水位流量双轴图表配置
   * @param XData X 轴时间数据
   * @param WaterData 水位数据
   * @param FlowData 流量数据
   * @param customOption 自定义配置，按索引深度合并，可选择性覆盖默认配置中的任意属性
   */
  function getEchartsOptions(XData: string[], WaterData: number[], FlowData: number[], customOption?: EChartsOption): EChartsOption {
    const defaultOption: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
      },
      grid: { top: 33, right: '11%', bottom: 20 },
      legend: {
        textStyle: { color: textColor.value },
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
      series: [
        useGetWaterSeries({ data: WaterData, color: waterColor.value }),
        useGetFlowSeries({ data: FlowData, color: '#24FF8C' }),
      ],
    };
    return mergeEchartsOption({}, defaultOption, customOption ?? {});
  }

  return { getEchartsOptions };
}
