<script setup lang="ts">
import { onMounted, onUnmounted, toRef, watchEffect } from 'vue';
import * as echarts from 'echarts';
import { useFlowEcharts } from 'atomic-echarts';
import type { Theme } from 'atomic-echarts';

const props = defineProps<{ theme: Theme }>();
const theme = toRef(props, 'theme');

let chart: echarts.EChartsType | null = null;
let containerEl: HTMLElement | null = null;

const XData = ['01/01', '01/02', '01/03', '01/04', '01/05', '01/06', '01/07', '01/08', '01/09', '01/10'];
const FlowData = [1200, 1350, 1800, 2100, 1950, 1650, 1400, 1100, 980, 850];

const { getEchartsOptions } = useFlowEcharts(theme);

onMounted(() => {
  containerEl = document.getElementById('flow-chart')!;
  watchEffect(() => {
    chart?.dispose();
    chart = echarts.init(containerEl!, theme.value === 'dark' ? 'dark' : undefined);
    chart.setOption(getEchartsOptions(XData, FlowData), true);
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
      <h2 class="demo-title">useFlowEcharts — 流量折线图</h2>
      <p class="demo-desc">展示流量随时间变化的折线图，Y 轴单位为 m³/s。</p>
    </div>

    <div class="demo-body">
      <div id="flow-chart" class="chart-container" />

      <div class="code-block">
        <div class="code-label">用法示例</div>
        <pre><code>import { useFlowEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useFlowEcharts('light');
chart.setOption(getEchartsOptions(XData, FlowData));

// 传入 customOption 覆盖 tooltip 格式
chart.setOption(
  getEchartsOptions(XData, FlowData, {
    tooltip: { formatter: (p: any) => `流量：${p[0].value[1]} m³/s` },
  })
);</code></pre>
      </div>
    </div>
  </div>
</template>
