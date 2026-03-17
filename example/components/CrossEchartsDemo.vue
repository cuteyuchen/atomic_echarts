<script setup lang="ts">
import { onMounted, onUnmounted, toRef, watchEffect } from 'vue';
import * as echarts from 'echarts';
import { useCrossEcharts } from 'atomic-echarts';
import type { Theme } from 'atomic-echarts';

const props = defineProps<{ theme: Theme }>();
const theme = toRef(props, 'theme');

let chart: echarts.EChartsType | null = null;
let containerEl: HTMLElement | null = null;

// 每行: [距离(m), 河床高程(m), 水位(m), 左堤(m), 右堤(m)]
const source: number[][] = [
  [0, 42, 47, 52, 52],
  [10, 38, 47, 51, 51],
  [20, 32, 47, 50, 51],
  [30, 26, 47, 50, 50],
  [40, 21, 47, 49, 50],
  [50, 18, 47, 49, 49],
  [60, 21, 47, 49, 50],
  [70, 26, 47, 50, 50],
  [80, 32, 47, 50, 51],
  [90, 38, 47, 51, 51],
  [100, 42, 47, 52, 52],
];
const IdData = source.map((_, i) => `距桩号 ${i * 10}m`);
const markPointData = [{ xAxis: 50, yAxis: 47 }];

const { getEchartsOptions } = useCrossEcharts(theme);

onMounted(() => {
  containerEl = document.getElementById('cross-chart')!;
  watchEffect(() => {
    chart?.dispose();
    chart = echarts.init(containerEl!, theme.value === 'dark' ? 'dark' : undefined);
    chart.setOption(getEchartsOptions(IdData, source, { markPointData }), true);
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
      <h2 class="demo-title">useCrossEcharts — 横断面图</h2>
      <p class="demo-desc">展示河道横断面，包含河床、水位、左堤、右堤四条线，支持 markPoint 标注特殊位置。</p>
    </div>

    <div class="demo-body">
      <div id="cross-chart" class="chart-container" />

      <div class="code-block">
        <div class="code-label">用法示例</div>
        <pre><code>import { useCrossEcharts } from 'atomic-echarts';

// source 每行格式：[距离, 河床, 水位, 左堤, 右堤]
const source: number[][] = [[0,42,47,52,52], [50,18,47,49,49], ...];
const IdData = source.map((_, i) => `桩号${i * 10}m`);

const { getEchartsOptions } = useCrossEcharts(theme);

// markPointData 与 ECharts option 统一放入 options 对象
chart.setOption(
  getEchartsOptions(IdData, source, {
    markPointData: [{ xAxis: 50, yAxis: 47 }],
    grid: { left: 80 },
  })
);</code></pre>
      </div>
    </div>
  </div>
</template>
