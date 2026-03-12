import type { MyYAxisOption, YAxisOption } from '../types';

import { mergeDeep } from '../utils/merge';

import { LIGHT_COLOR } from './config';
import { getColorFromOptionsByTheme, getYAxisIntervalMaxMin } from '../utils/useEchartsUtils';

const DEFAULT_Y_AXIS_OPTION: Readonly<YAxisOption> = {
  name: 'Y轴',
  nameTextStyle: {
    color: LIGHT_COLOR.textColor,
    align: 'center',
    padding: [0, 25, 0, 0],
  },
  axisLine: {
    lineStyle: {
      color: LIGHT_COLOR.lineColor,
    },
  },
};

export function useCommonYAxis(options: MyYAxisOption = {}): YAxisOption {
  const { textColor = LIGHT_COLOR.textColor, lineColor = LIGHT_COLOR.lineColor } = getColorFromOptionsByTheme(options, ['textColor', 'lineColor']);
  const { data = [] } = options;
  const dataInterValMaxMin = getYAxisIntervalMaxMin(data);
  const YAxisOption: MyYAxisOption = mergeDeep(
    {},
    DEFAULT_Y_AXIS_OPTION,
    {
      interval: dataInterValMaxMin.interval,
      min: dataInterValMaxMin.min,
      max: dataInterValMaxMin.max,
    },
    options,
  );
  if (textColor && YAxisOption.nameTextStyle) {
    YAxisOption.nameTextStyle.color = textColor;
    // delete YAxisOption.textColor;
  }
  if (lineColor && YAxisOption.axisLine && YAxisOption.axisLine.lineStyle) {
    YAxisOption.axisLine.lineStyle.color = lineColor;
    // delete YAxisOption.lineColor;
  }
  if (YAxisOption.data) {
    // delete YAxisOption.data;
  }
  return YAxisOption;
}

// 水位Y轴
export function useGetWaterYAxis(options: MyYAxisOption = {}): YAxisOption {
  const { textColor = LIGHT_COLOR.textColor } = getColorFromOptionsByTheme(options, ['textColor']);
  return useCommonYAxis(
    mergeDeep(
      {},
      {
        name: '水位(m)',
        type: 'value',
        position: 'left',
        axisLine: { show: false },
        splitLine: { show: true, lineStyle: { type: 'dashed' } },
        axisLabel: {
          color: textColor,
        },
      },
      options,
    ),
  );
}

// 流量Y轴
export function useGetFlowYAxis(options: MyYAxisOption = {}): YAxisOption {
  const { textColor = LIGHT_COLOR.textColor } = getColorFromOptionsByTheme(options, ['textColor']);
  return useCommonYAxis(
    mergeDeep(
      {},
      {
        name: '流量(m³/s)',
        type: 'value',
        nameTextStyle: {
          color: textColor,
          align: 'center',
          padding: [0, 0, 0, 10],
        },
        position: 'right',
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: textColor,
          fontSize: 12,
        },
      },
      options,
    ),
  );
}

// 雨量Y轴
export function useGetRainYAxis(options: MyYAxisOption = {}): YAxisOption {
  const { textColor = LIGHT_COLOR.textColor } = getColorFromOptionsByTheme(options, ['textColor']);
  return useCommonYAxis(
    mergeDeep(
      {},
      {
        name: '雨量(mm)',
        minInterval: 1,
        type: 'value',
        nameTextStyle: {
          color: textColor,
          align: 'center',
        },
        position: 'left',
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: textColor,
          fontSize: 12,
        },
      },
      options,
    ),
  );
}
