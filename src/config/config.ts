// 除了字体线条颜色外的其他主要颜色
import { reactive } from 'vue';
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

// 所有颜色（静态常量，用于初始化）
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

// 响应式颜色对象，修改后所有依赖该颜色的 computed 将自动更新
export const ECHART_COLOR = reactive<Record<'light' | 'dark', EchartsColor>>({
  light: { ...LIGHT_COLOR },
  dark: { ...DARK_COLOR },
});

/**
 * 全局替换指定主题的颜色配置。
 * 调用后，所有通过 useEchartsThemeColor 读取颜色的图表均会自动响应更新。
 * @param theme 主题类型 'light' | 'dark'
 * @param colors 需要覆盖的颜色字段（部分覆盖即可）
 * @example
 * setGlobalColor('light', { waterColor: '#FF6600', textColor: '#333' })
 */
export function setGlobalColor(theme: 'light' | 'dark', colors: Partial<EchartsColor>): void {
  Object.assign(ECHART_COLOR[theme], colors);
}

// 主要颜色列表
export const LIGHT_COLOR_LIST = Object.values(LIGHT_MAIN_COLOR);
export const DARK_COLOR_LIST = Object.values(DARK_MAIN_COLOR);
