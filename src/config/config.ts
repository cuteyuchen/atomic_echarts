// 除了字体线条颜色外的其他主要颜色
import type { EchartsColor } from '../types';

export const LIGHT_MAIN_COLOR = {
  waterColor: '#037AFF',
  flowColor: '#23D692',
  drpColor: '#037aff',
  color1: '#4836DB',
  color2: '#23DF7B',
};
export const DARK_MAIN_COLOR = {
  waterColor: '#00B2FF',
  flowColor: '#FFB20F',
  drpColor: '#037aff',
  color1: '#4836DB',
  color2: '#23DF7B',
};

// 所有颜色
export const LIGHT_COLOR: EchartsColor = {
  textColor: '#999999',
  lineColor: '#999999',
  ...LIGHT_MAIN_COLOR,
};
export const DARK_COLOR: EchartsColor = {
  textColor: '#D9F8FF',
  lineColor: '#D9F8FF',
  ...DARK_MAIN_COLOR,
};

export const ECHART_COLOR: any = {
  light: LIGHT_COLOR,
  dark: DARK_COLOR,
};

// 主要颜色列表
export const LIGHT_COLOR_LIST = Object.values(LIGHT_MAIN_COLOR);
export const DARK_COLOR_LIST = Object.values(DARK_MAIN_COLOR);
