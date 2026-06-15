<script setup lang="ts">
import { toRef, useTemplateRef } from 'vue';
import { useWaterEcharts } from 'atomic-echarts';
import type { Theme } from 'atomic-echarts';
import { useDemoChart } from '../composables/useDemoChart';

/***********************组件入参*********************/
const props = defineProps<{ theme: Theme }>();
const theme = toRef(props, 'theme');

/***********************图表数据*********************/
const XData = ['01/01', '01/02', '01/03', '01/04', '01/05', '01/06', '01/07', '01/08', '01/09', '01/10'];
const WaterData = [45.20, 46.10, 47.80, 48.30, 47.50, 46.90, 45.80, 44.20, 43.50, 42.80];

/***********************图表配置*********************/
const { getEchartsOptions } = useWaterEcharts(theme);
const chartContainerRef = useTemplateRef<HTMLDivElement>('chartContainer');

/***********************图表生命周期*********************/
useDemoChart(chartContainerRef, theme, () => getEchartsOptions(XData, WaterData));
</script>

<template>
  <div class="demo-wrapper">
    <div class="demo-header">
      <h2 class="demo-title">useWaterEcharts — 水位折线图</h2>
      <p class="demo-desc">展示水位随时间变化的折线图，支持亮/暗主题与自定义颜色。</p>
    </div>

    <div class="demo-body">
      <div ref="chartContainer" class="chart-container" />

      <div class="code-block">
        <div class="code-label">用法示例</div>
        <pre><code>import { useWaterEcharts, setGlobalColor } from 'atomic-echarts';

// 基础用法
const { getEchartsOptions } = useWaterEcharts('light');
chart.setOption(getEchartsOptions(XData, WaterData));

// 传入 customOption 覆盖默认配置（深度合并）
chart.setOption(
  getEchartsOptions(XData, WaterData, {
    title: { text: '自定义标题', left: 'center' },
    grid: { top: 60 },
  })
);

// 全局替换 light 主题水位颜色
setGlobalColor('light', { waterColor: '#FF6600' });</code></pre>
      </div>
    </div>
  </div>
</template>
