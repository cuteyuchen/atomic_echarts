<script setup lang="ts">
import { toRef, useTemplateRef } from 'vue';
import { useWaterFlowRainEcharts } from 'atomic-echarts';
import type { Theme } from 'atomic-echarts';
import { useDemoChart } from '../composables/useDemoChart';

/***********************组件入参*********************/
const props = defineProps<{ theme: Theme }>();
const theme = toRef(props, 'theme');

/***********************图表数据*********************/
const XData = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const WaterData = [45.2, 45.6, 46.4, 47.8, 48.3, 47.5, 46.9, 46.1, 45.5, 44.8];
const FlowData = [980, 1120, 1350, 1800, 2100, 1950, 1650, 1400, 1180, 1020];
const DrpData = [0, 2.5, 8.3, 15.2, 5.6, 2.1, 0, 3.4, 12.8, 6.5];

/***********************图表实例*********************/
const chartContainerRef = useTemplateRef<HTMLDivElement>('chartContainer');

/***********************图表配置*********************/
const { getEchartsOptions } = useWaterFlowRainEcharts(theme);

/***********************图表生命周期*********************/
useDemoChart(chartContainerRef, theme, () => getEchartsOptions(XData, WaterData, FlowData, DrpData));
</script>

<template>
  <div class="demo-wrapper">
    <div class="demo-header">
      <h2 class="demo-title">useWaterFlowRainEcharts — 水位流量雨量组合图</h2>
      <p class="demo-desc">上方展示雨量柱状图，下方展示水位和流量双轴曲线，共用同一组时间数据。</p>
    </div>

    <div class="demo-body">
      <div ref="chartContainer" class="chart-container water-flow-rain-chart" />

      <div class="code-block">
        <div class="code-label">用法示例</div>
        <pre><code>import { useWaterFlowRainEcharts } from 'atomic-echarts';

// 默认 dark 主题
const { getEchartsOptions } = useWaterFlowRainEcharts('dark');
chart.setOption(getEchartsOptions(XData, WaterData, FlowData, DrpData));

// 按索引覆盖：series[2] 是流量线，grid[0] 是雨量区域
chart.setOption(
  getEchartsOptions(XData, WaterData, FlowData, DrpData, {
    grid: [{ height: 110 }],
    series: [{}, {}, { lineStyle: { width: 4 } }],
  })
);</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.water-flow-rain-chart {
  height: 440px;
}
</style>
