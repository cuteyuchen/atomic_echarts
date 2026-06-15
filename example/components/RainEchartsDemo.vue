<script setup lang="ts">
import { toRef, useTemplateRef } from 'vue';
import { useRainEcharts } from 'atomic-echarts';
import type { Theme } from 'atomic-echarts';
import { useDemoChart } from '../composables/useDemoChart';

/***********************组件入参*********************/
const props = defineProps<{ theme: Theme }>();
const theme = toRef(props, 'theme');

/***********************图表数据*********************/
const XData: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const DrpData: number[] = [0, 2.5, 8.3, 15.2, 5.6, 2.1, 0, 3.4, 12.8, 6.5];

/***********************图表配置*********************/
const { getEchartsOptions } = useRainEcharts(theme);
const chartContainerRef = useTemplateRef<HTMLDivElement>('chartContainer');

/***********************图表生命周期*********************/
useDemoChart(chartContainerRef, theme, () => getEchartsOptions(XData, DrpData));
</script>

<template>
  <div class="demo-wrapper">
    <div class="demo-header">
      <h2 class="demo-title">useRainEcharts — 降雨量柱状图</h2>
      <p class="demo-desc">展示逐时降雨量柱状图，支持通过 customOption 自定义颜色、图例等配置。</p>
    </div>

    <div class="demo-body">
      <div ref="chartContainer" class="chart-container" />

      <div class="code-block">
        <div class="code-label">用法示例</div>
        <pre><code>import { useRainEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useRainEcharts('light');
chart.setOption(getEchartsOptions(XData, DrpData));

// 自定义标题
chart.setOption(
  getEchartsOptions(XData, DrpData, {
    title: { text: '逐时面雨量', left: 'center' },
  })
);</code></pre>
      </div>
    </div>
  </div>
</template>
