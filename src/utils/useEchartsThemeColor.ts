import type { Ref } from 'vue';
import type { Theme } from '../types';
import { computed, isRef, ref } from 'vue';
import { ECHART_COLOR } from '../config/config';

export type EchartsThemeColor = {
  drpColor: Ref<string>;
  flowColor: Ref<string>;
  lineColor: Ref<string>;
  textColor: Ref<string>;
  theme: Ref<Theme>;
  waterColor: Ref<string>;
};

/**
 * 获取响应式主题颜色。
 * 支持传入静态 Theme 字符串或响应式 Ref<Theme>。
 * 当 theme 或 ECHART_COLOR（通过 setGlobalColor 修改）变化时，所有颜色值自动更新。
 */
export default function useEchartsThemeColor(themeType: Theme | Ref<Theme> = 'light'): EchartsThemeColor {
  // 若传入 Ref<Theme> 则直接使用，保留响应性；否则包装为普通 ref
  const theme = isRef(themeType) ? themeType : ref<Theme>(themeType);

  const textColor = computed(() => ECHART_COLOR[theme.value].textColor);
  const lineColor = computed(() => ECHART_COLOR[theme.value].lineColor);
  const waterColor = computed(() => ECHART_COLOR[theme.value].waterColor);
  const flowColor = computed(() => ECHART_COLOR[theme.value].flowColor);
  const drpColor = computed(() => ECHART_COLOR[theme.value].drpColor);

  return {
    theme,
    textColor,
    lineColor,
    waterColor,
    flowColor,
    drpColor,
  };
}
