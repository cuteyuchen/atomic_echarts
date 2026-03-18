import { ECHART_COLOR } from '../config/config';
import type { EchartsColor } from '../types';
import { Theme } from '../types';

/**
 * 根据主题和选项获取颜色配置
 * @param options 配置项，可能包含 theme 和特定的颜色覆盖
 * @param keys 需要获取的颜色键名数组
 * @returns 包含对应颜色值的对象
 */
export function getColorFromOptionsByTheme(options: any, keys: Array<keyof EchartsColor>) {
  const theme: Theme = options.theme || 'light';
  const themeColors = ECHART_COLOR[theme];
  const result: Partial<EchartsColor> = {};
  keys.forEach(key => {
    // 优先取 options 中的值，其次取 themeColors 中的值
    result[key] = options[key] || themeColors[key];
  });
  return result;
}

/**
 * 获取 Y 轴的最大值、最小值和间隔
 * @param data 数据数组
 * @returns { max, min, interval }
 */
export function getYAxisIntervalMaxMin(data: number[]) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return { min: undefined, max: undefined, interval: undefined };
  }

  let max = -Infinity;
  let min = Infinity;
  
  data.forEach(v => {
      const val = Number(v);
      if (!isNaN(val)) {
          if (val > max) max = val;
          if (val < min) min = val;
      }
  });
  
  if (max === -Infinity || min === Infinity) {
       return { min: undefined, max: undefined, interval: undefined };
  }

  // 简单的自适应范围策略：上下留 10% 的余量
  // 如果 min >= 0，尝试保持 min >= 0（除非 min 离 0 很远）
  const range = max - min;
  
  let resultMax = max;
  let resultMin = min;

  if (range === 0) {
      if (max === 0) {
          resultMax = 1;
          resultMin = 0;
      } else {
          resultMax = max * 1.2;
          resultMin = min * 0.8;
      }
  } else {
      resultMax = max + range * 0.1;
      resultMin = min - range * 0.1;
  }

  // 修正浮点数精度问题
  resultMax = Math.ceil(resultMax * 100) / 100;
  resultMin = Math.floor(resultMin * 100) / 100;

  return {
    max: resultMax,
    min: resultMin,
    interval: undefined // 让 echarts 自动计算
  };
}
