import type { Ref } from 'vue';
import type { EChartsOption } from '../types';
import type { Theme } from '../types';

import { useGetFlowSeries, useGetRainSeries, useGetWaterSeries } from '../config/seriesConfig';
import { useGetTimeXAxis } from '../config/xAxisConfig';
import { useGetFlowYAxis, useGetRainYAxis, useGetWaterYAxis } from '../config/yAxisConfig';
import useEchartsThemeColor from '../utils/useEchartsThemeColor';
import { mergeEchartsOption } from '../utils/merge';

export default function useWaterFlowRainEcharts(theme: Theme | Ref<Theme> = 'dark') {
  const { textColor, lineColor, waterColor, flowColor, drpColor } = useEchartsThemeColor(theme);
  const icon =
    'path://M1.39023 1.95609C1.5113 1.10862 2.2371 0.479126 3.09318 0.479126H11.6595C12.7063 0.479126 13.5105 1.40632 13.3624 2.44265L12.1337 11.0439C12.0126 11.8913 11.2868 12.5208 10.4307 12.5208H1.86444C0.817587 12.5208 0.0134372 11.5936 0.161485 10.5573L1.39023 1.95609Z';

  /**
   * 获取水位流量雨量组合图表配置
   * @param XData X 轴时间数据
   * @param WaterData 水位数据
   * @param FlowData 流量数据
   * @param DrpData 雨量数据
   * @param customOption 自定义配置，按索引深度合并，可选择性覆盖默认配置中的任意属性
   */
  function getEchartsOptions(XData: string[], WaterData: number[], FlowData: number[], DrpData: number[], customOption?: EChartsOption): EChartsOption {
    const defaultOption: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
      },
      axisPointer: {
        link: [{ xAxisIndex: 'all' }],
      },
      grid: [
        { left: 55, right: '11%', top: 45, height: 90 },
        { left: 55, right: '11%', top: 165, bottom: 35 },
      ],
      legend: {
        textStyle: { color: textColor.value },
        data: [
          { name: '降雨量', icon },
          { name: '水位', icon },
          { name: '流量', icon },
        ],
        top: 8,
        left: 'center',
      },
      xAxis: [
        useGetTimeXAxis({
          gridIndex: 0,
          data: XData,
          boundaryGap: true,
          textColor: textColor.value,
          lineColor: lineColor.value,
          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
        }),
        useGetTimeXAxis({
          gridIndex: 1,
          data: XData,
          textColor: textColor.value,
          lineColor: lineColor.value,
        }),
      ],
      yAxis: [
        useGetRainYAxis({
          gridIndex: 0,
          data: DrpData,
          inverse: true,
          nameLocation: 'start',
          textColor: textColor.value,
          lineColor: lineColor.value,
        }),
        useGetWaterYAxis({
          gridIndex: 1,
          data: WaterData,
          textColor: textColor.value,
          lineColor: lineColor.value,
        }),
        useGetFlowYAxis({
          gridIndex: 1,
          data: FlowData,
          textColor: textColor.value,
          lineColor: lineColor.value,
        }),
      ],
      series: [
        useGetRainSeries({
          name: '降雨量',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: DrpData,
          itemStyle: { color: drpColor.value, borderRadius: [6, 6, 0, 0] },
        }),
        useGetWaterSeries({
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: WaterData,
          color: waterColor.value,
        }),
        useGetFlowSeries({
          xAxisIndex: 1,
          yAxisIndex: 2,
          data: FlowData,
          color: flowColor.value,
        }),
      ],
    };
    return mergeEchartsOption({}, defaultOption, customOption ?? {});
  }

  return { getEchartsOptions };
}
