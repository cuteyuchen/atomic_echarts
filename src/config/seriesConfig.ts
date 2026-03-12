import type { MyBarSeriesOption, MyLineSeriesOption } from '../types';

// echarts 配置
import { mergeDeep } from '../utils/merge';

import { getColorFromOptionsByTheme } from '../utils/useEchartsUtils';

const DEFAULT_LINE_SERIES_OPTION: Readonly<MyLineSeriesOption> = {
  xAxisIndex: 0,
  yAxisIndex: 0,
  name: '数据',
  type: 'line',
  showSymbol: false,
  lineStyle: {
    type: 'solid',
    width: 3,
    shadowBlur: 15,
    shadowOffsetY: 12,
  },
  // data: []
};

const DEFAULT_BAR_SERIES_OPTION: Readonly<MyBarSeriesOption> = {
  xAxisIndex: 0,
  yAxisIndex: 0,
  name: '数据',
  type: 'bar',
  barMaxWidth: 20,
  // data: []
};

export function useCommonLineSeries(option: MyLineSeriesOption = {}): MyLineSeriesOption {
  const seriesOption = mergeDeep({}, DEFAULT_LINE_SERIES_OPTION, option);
  if (option.color && seriesOption.lineStyle) {
    seriesOption.lineStyle.shadowColor = option.color as string;
  }
  return seriesOption;
}

export function useCommonBarSeries(option: MyBarSeriesOption = {}): MyBarSeriesOption {
  return mergeDeep({}, DEFAULT_BAR_SERIES_OPTION, option);
}

// 水位series
export function useGetWaterSeries(options: MyLineSeriesOption = {}): MyLineSeriesOption {
  const { waterColor } = getColorFromOptionsByTheme(options, ['waterColor']);
  return useCommonLineSeries(mergeDeep({}, { name: '水位', color: waterColor }, options));
}

// 流量series
export function useGetFlowSeries(options: MyLineSeriesOption = {}): MyLineSeriesOption {
  const { flowColor } = getColorFromOptionsByTheme(options, ['flowColor']);
  return useCommonLineSeries(mergeDeep({}, { name: '流量', color: flowColor, yAxisIndex: 1 }, options));
}

// 降雨series
export function useGetRainSeries(options: MyBarSeriesOption = {}): MyBarSeriesOption {
  const { drpColor } = getColorFromOptionsByTheme(options, ['drpColor']);
  return useCommonBarSeries(mergeDeep({}, { name: '降雨', itemStyle: { color: drpColor } }, options));
}
