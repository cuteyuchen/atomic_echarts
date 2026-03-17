import type { Ref } from 'vue';
import type { EChartsOption } from '../types';
import type { Theme } from '../types';

import { useGetWaterSeries } from '../config/seriesConfig';
import { useCommonXAxis } from '../config/xAxisConfig';
import { useGetWaterYAxis } from '../config/yAxisConfig';
import useEchartsThemeColor from '../utils/useEchartsThemeColor';
import { mergeEchartsOption } from '../utils/merge';

export default function useSectionalViewEcharts(theme?: Theme | Ref<Theme>) {
  const { textColor, lineColor, waterColor } = useEchartsThemeColor(theme);
  const icon =
    'path://M1.39023 1.95609C1.5113 1.10862 2.2371 0.479126 3.09318 0.479126H11.6595C12.7063 0.479126 13.5105 1.40632 13.3624 2.44265L12.1337 11.0439C12.0126 11.8913 11.2868 12.5208 10.4307 12.5208H1.86444C0.817587 12.5208 0.0134372 11.5936 0.161485 10.5573L1.39023 1.95609Z';

  /**
   * 获取断面图配置
   * @param XData X 轴测点标签（首尾会自动设为左岸/右岸）
   * @param WaterData 水位数据
   * @param RiverBedData 河床高程数据
   * @param customOption 自定义配置，按索引深度合并，可选择性覆盖默认配置中的任意属性
   */
  function getEchartsOptions(XData: string[], WaterData: number[], RiverBedData: number[], customOption?: EChartsOption): EChartsOption {
    XData[0] = '左岸';
    XData[XData.length - 1] = '右岸';
    const defaultOption: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
      },
      grid: {
        top: 33,
        left: 80,
        right: 80,
        bottom: 40,
      },
      legend: {
        textStyle: {
          color: textColor.value,
        },
        data: [
          { name: '水位', icon },
          { name: '河床', icon },
        ],
        top: 0,
        right: 0,
      },
      xAxis: [useCommonXAxis({ data: XData, textColor: textColor.value, lineColor: lineColor.value })],
      yAxis: [
        useGetWaterYAxis({
          data: [...WaterData, ...RiverBedData],
          textColor: textColor.value,
          lineColor: lineColor.value,
          splitLine: { show: false },
        }),
      ],
      series: [
        useGetWaterSeries({
          data: WaterData,
          color: waterColor.value,
          z: 1,
          symbol: 'none',
          areaStyle: {
            color: '#06B7FD',
            opacity: 1,
          },
        }),
        {
          name: '河床',
          color: '#835f26',
          data: RiverBedData,
          type: 'line',
          symbol: 'none',
          z: 2,
          lineStyle: {
            type: 'solid',
            width: 3,
            color: '#835f26',
          },
          areaStyle: {
            opacity: 1,
            color: '#9a752b',
          },
        },
      ],
    };
    return mergeEchartsOption({}, defaultOption, customOption ?? {});
  }

  return { getEchartsOptions };
}
