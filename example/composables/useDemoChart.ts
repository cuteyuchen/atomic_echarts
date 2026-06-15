import type { Ref } from 'vue';
import type { EChartsOption, Theme } from 'atomic-echarts';

import { onMounted, onUnmounted, watchEffect } from 'vue';
import * as echarts from 'echarts';

type ChartContainerRef = {
  readonly value: HTMLElement | null;
};

/***********************示例图表生命周期*********************/
export function useDemoChart(containerRef: ChartContainerRef, theme: Ref<Theme>, getOptions: () => EChartsOption) {
  let chart: echarts.EChartsType | null = null;

  function resizeChart() {
    chart?.resize();
  }

  watchEffect(() => {
    const containerEl = containerRef.value;
    if (!containerEl) return;

    chart?.dispose();
    chart = echarts.init(containerEl, theme.value === 'dark' ? 'dark' : undefined);
    chart.setOption(getOptions(), true);
  });

  onMounted(() => {
    window.addEventListener('resize', resizeChart);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart);
    chart?.dispose();
    chart = null;
  });
}
