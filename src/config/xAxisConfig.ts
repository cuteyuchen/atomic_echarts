import type { MyXAxisOption, XAxisOption } from '../types';

import { mergeDeep } from '../utils/merge';

import { LIGHT_COLOR } from './config';
import { getColorFromOptionsByTheme } from '../utils/useEchartsUtils';

const DEFAULT_X_AXIS_OPTION: Readonly<XAxisOption> = {
  boundaryGap: false,
  axisLine: {
    lineStyle: {
      type: 'dashed',
      color: LIGHT_COLOR.textColor,
    },
  },
  axisTick: {
    show: false,
  },
  splitLine: {
    show: false,
  },
  axisLabel: {
    show: true,
    color: LIGHT_COLOR.lineColor,
    fontSize: 12,
  },
};

export function useCommonXAxis(option: MyXAxisOption = {}): XAxisOption {
  const XAxisOption = mergeDeep({}, DEFAULT_X_AXIS_OPTION, option);
  if (option.textColor && XAxisOption.axisLine) {
    if (XAxisOption.axisLine.lineStyle) {
      XAxisOption.axisLine.lineStyle.color = option.textColor;
    }
  }
  if (option.lineColor && XAxisOption.axisLabel) {
    XAxisOption.axisLabel.color = option.lineColor;
  }
  return XAxisOption;
}

// 时间X轴
export function useGetTimeXAxis(option: MyXAxisOption = {}): XAxisOption {
  const { textColor = LIGHT_COLOR.textColor } = getColorFromOptionsByTheme(option, ['textColor']);
  return useCommonXAxis(
    mergeDeep(
      {},
      {
        type: 'category',
        axisLabel: {
          show: true,
          color: textColor,
          fontSize: 12
        },
      },
      option,
    ),
  );
}
