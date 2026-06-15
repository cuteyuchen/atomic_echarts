<script setup lang="ts">
import { toRef, useTemplateRef } from 'vue';
import { useSectionalViewEcharts } from 'atomic-echarts';
import type { Theme } from 'atomic-echarts';
import { useDemoChart } from '../composables/useDemoChart';

/***********************组件入参*********************/
const props = defineProps<{ theme: Theme }>();
const theme = toRef(props, 'theme');

/***********************图表数据*********************/
const XData: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// 水位线（均值，形成平面）
const WaterData: number[] = [47, 47, 47, 47, 47, 47, 47, 47, 47, 47];
// 河床高程（U 型河床）
const RiverBedData: number[] = [52, 40, 30, 24, 19, 19, 24, 30, 40, 52];

/***********************图表配置*********************/
const { getEchartsOptions } = useSectionalViewEcharts(theme);
const chartContainerRef = useTemplateRef<HTMLDivElement>('chartContainer');

/***********************图表生命周期*********************/
useDemoChart(chartContainerRef, theme, () => getEchartsOptions(XData, WaterData, RiverBedData));
</script>

<template>
  <div class="demo-wrapper">
    <div class="demo-header">
      <h2 class="demo-title">useSectionalViewEcharts — 断面图</h2>
      <p class="demo-desc">展示河道断面水位与河床对比，水位面积填充蓝色，河床填充棕色，首尾节点自动标注左岸/右岸。</p>
    </div>

    <div class="demo-body">
      <div ref="chartContainer" class="chart-container" />

      <div class="code-block">
        <div class="code-label">用法示例</div>
        <pre><code>import { useSectionalViewEcharts } from 'atomic-echarts';

// XData 首尾会自动被替换为「左岸」和「右岸」
const XData = ['0','1','2','3','4','5','6','7','8','9'];
const WaterData = [47,47,47,47,47,47,47,47,47,47];
const RiverBedData = [52,40,30,24,19,19,24,30,40,52];

const { getEchartsOptions } = useSectionalViewEcharts('light');
chart.setOption(getEchartsOptions(XData, WaterData, RiverBedData));

// 覆盖 grid 让图表更紧凑
chart.setOption(
  getEchartsOptions(XData, WaterData, RiverBedData, {
    grid: { left: 60, right: 60 },
  })
);</code></pre>
      </div>
    </div>
  </div>
</template>
