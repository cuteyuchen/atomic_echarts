<script setup lang="ts">
import { onMounted, onUnmounted, toRef, watchEffect } from 'vue';
import * as echarts from 'echarts';
import { useDoCountRainDrpEcharts } from 'atomic-echarts';
import type { Theme } from 'atomic-echarts';

const props = defineProps<{ theme: Theme }>();
const theme = toRef(props, 'theme');

let chart: echarts.EChartsType | null = null;
let containerEl: HTMLElement | null = null;

const XData: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const DrpData: number[] = [0, 2.5, 8.3, 15.2, 5.6, 2.1, 0, 3.4, 12.8, 6.5];

const { getEchartsOptions } = useDoCountRainDrpEcharts(theme);

onMounted(() => {
  containerEl = document.getElementById('rain-chart')!;
  watchEffect(() => {
    chart?.dispose();
    chart = echarts.init(containerEl!, theme.value === 'dark' ? 'dark' : undefined);
    chart.setOption(getEchartsOptions(XData, DrpData), true);
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
      <h2 class="demo-title">useDoCountRainDrpEcharts — 降雨量柱状图</h2>
      <p class="demo-desc">展示逐时降雨量柱状图，支持预报开始时间标注线。</p>
    </div>

    <div class="demo-body">
      <div id="rain-chart" class="chart-container" />

      <div class="code-block">
        <div class="code-label">用法示例</div>
        <pre><code>import { useDoCountRainDrpEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useDoCountRainDrpEcharts('light');
chart.setOption(getEchartsOptions(XData, DrpData));

// 自定义颜色和标题
chart.setOption(
  getEchartsOptions(XData, DrpData, {
    color: ['#00B2FF'],
    title: { text: '逐时面雨量', left: 'center' },
  })
);</code></pre>
      </div>
    </div>
  </div>
</template>
