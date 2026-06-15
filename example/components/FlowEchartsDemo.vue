<script setup lang="ts">
import { toRef, useTemplateRef } from 'vue';
import { useFlowEcharts } from 'atomic-echarts';
import type { Theme } from 'atomic-echarts';
import { useDemoChart } from '../composables/useDemoChart';

/***********************组件入参*********************/
const props = defineProps<{ theme: Theme }>();
const theme = toRef(props, 'theme');

/***********************图表数据*********************/
const XData = ['01/01', '01/02', '01/03', '01/04', '01/05', '01/06', '01/07', '01/08', '01/09', '01/10'];
const FlowData = [1200, 1350, 1800, 2100, 1950, 1650, 1400, 1100, 980, 850];

/***********************图表配置*********************/
const { getEchartsOptions } = useFlowEcharts(theme);
const chartContainerRef = useTemplateRef<HTMLDivElement>('chartContainer');

/***********************图表生命周期*********************/
useDemoChart(chartContainerRef, theme, () => getEchartsOptions(XData, FlowData));
</script>

<template>
  <div class="demo-wrapper">
    <div class="demo-header">
      <h2 class="demo-title">useFlowEcharts — 流量折线图</h2>
      <p class="demo-desc">展示流量随时间变化的折线图，Y 轴单位为 m³/s。</p>
    </div>

    <div class="demo-body">
      <div ref="chartContainer" class="chart-container" />

      <div class="code-block">
        <div class="code-label">用法示例</div>
        <pre><code>import { useFlowEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useFlowEcharts('light');
chart.setOption(getEchartsOptions(XData, FlowData));

// 传入 customOption 覆盖 tooltip 格式
chart.setOption(
  getEchartsOptions(XData, FlowData, {
    tooltip: { formatter: params => `流量：${params[0].value[1]} m³/s` },
  })
);</code></pre>
      </div>
    </div>
  </div>
</template>
