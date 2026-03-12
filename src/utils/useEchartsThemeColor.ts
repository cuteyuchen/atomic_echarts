import type { Ref } from 'vue';
import type { Theme } from '../types';
import { computed, ref, unref } from 'vue';
import { ECHART_COLOR } from '../config/config';

export type EchartsThemeColor = {
  drpColor: Ref<string>;
  flowColor: Ref<string>;
  lineColor: Ref<string>;
  textColor: Ref<string>;
  theme: Ref<Theme>;
  waterColor: Ref<string>;
};

export default function useEchartsThemeColor(themeType: Theme | Ref<Theme> = 'light'): EchartsThemeColor {
  const theme = ref(unref(themeType));
  
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
