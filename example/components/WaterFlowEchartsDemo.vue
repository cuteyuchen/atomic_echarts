<script setup lang="ts">
import { onMounted, onUnmounted, toRef, watchEffect } from 'vue';
import * as echarts from 'echarts';
import { useWaterFlowEcharts } from 'atomic-echarts';
import type { Theme } from 'atomic-echarts';

const props = defineProps<{ theme: Theme }>();
const theme = toRef(props, 'theme');

let chart: echarts.EChartsType | null = null;
let containerEl: HTMLElement | null = null;

const XData = ['01/01', '01/02', '01/03', '01/04', '01/05', '01/06', '01/07', '01/08', '01/09', '01/10'];
const WaterData = [45.20, 46.10, 47.80, 48.30, 47.50, 46.90, 45.80, 44.20, 43.50, 42.80];
const FlowData = [1200, 1350, 1800, 2100, 1950, 1650, 1400, 1100, 980, 850];

const { getEchartsOptions } = useWaterFlowEcharts(theme);

onMounted(() => {
  containerEl = document.getElementById('waterflow-chart')!;
  watchEffect(() => {
    chart?.dispose();
    chart = echarts.init(containerEl!, theme.value === 'dark' ? 'dark' : undefined);
    chart.setOption(getEchartsOptions(XData, WaterData, FlowData), true);
  });
  window.addEventListener('resize', () => chart?.resize());
});

onUnmounted(() => {
  chart?.dispose();
  chart = null;
});
</script>

<template>
  <div class="demo-wrapper">
    <div class="demo-header">
      <h2 class="demo-title">useWaterFlowEcharts — 水位流量双轴图</h2>
      <p class="demo-desc">同时展示水位（左 Y 轴）和流量（右 Y 轴），采用双轴结构。</p>
    </div>

    <div class="demo-body">
      <div id="waterflow-chart" class="chart-container" />

      <div class="code-block">
        <div class="code-label">用法示例</div>
        <pre><code>import { useWaterFlowEcharts } from 'atomic-echarts';

// 默认 dark 主题
const { getEchartsOptions } = useWaterFlowEcharts('dark');
chart.setOption(getEchartsOptions(XData, WaterData, FlowData));

// 自定义 grid 留白
chart.setOption(
  getEchartsOptions(XData, WaterData, FlowData, {
    grid: { top: 50, right: '15%' },
  })
);</code></pre>
      </div>
    </div>
  </div>
</template>
