<script setup lang="ts">
import { ref } from 'vue';
import { setGlobalColor } from 'atomic-echarts';
import type { Theme } from 'atomic-echarts';

import WaterEchartsDemo from './components/WaterEchartsDemo.vue';
import FlowEchartsDemo from './components/FlowEchartsDemo.vue';
import WaterFlowEchartsDemo from './components/WaterFlowEchartsDemo.vue';
import CrossEchartsDemo from './components/CrossEchartsDemo.vue';
import RainEchartsDemo from './components/RainEchartsDemo.vue';
import SectionalViewDemo from './components/SectionalViewDemo.vue';

const theme = ref<Theme>('dark');
const activeTab = ref('water');

const tabs = [
  { key: 'water', label: '水位图' },
  { key: 'flow', label: '流量图' },
  { key: 'waterflow', label: '水位流量双轴' },
  { key: 'cross', label: '横断面图' },
  { key: 'rain', label: '降雨量图' },
  { key: 'sectional', label: '断面图' },
];

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}

// 演示全局颜色替换：将当前主题的水位颜色改为橙色
let colorToggled = false;
function toggleGlobalColor() {
  if (!colorToggled) {
    setGlobalColor(theme.value, { waterColor: '#FF6600', flowColor: '#FF0080' });
    colorToggled = true;
  } else {
    setGlobalColor('light', { waterColor: '#037AFF', flowColor: '#23D692' });
    setGlobalColor('dark', { waterColor: '#00B2FF', flowColor: '#FFB20F' });
    colorToggled = false;
  }
}
</script>

<template>
  <div class="layout" :class="theme">
    <!-- 顶部栏 -->
    <header class="topbar">
      <div class="topbar-brand">
        <span class="brand-icon">📊</span>
        <span class="brand-name">Atomic ECharts</span>
        <span class="brand-sub">交互示例</span>
      </div>
      <div class="topbar-actions">
        <button class="btn" @click="toggleGlobalColor">
          {{ colorToggled ? '🔄 还原颜色' : '🎨 全局换色' }}
        </button>
        <button class="btn btn-primary" @click="toggleTheme">
          {{ theme === 'dark' ? '☀️ 亮色主题' : '🌙 暗色主题' }}
        </button>
      </div>
    </header>

    <!-- 标签页 -->
    <nav class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </nav>

    <!-- 内容区 -->
    <main class="content">
      <WaterEchartsDemo v-if="activeTab === 'water'" :theme="theme" />
      <FlowEchartsDemo v-else-if="activeTab === 'flow'" :theme="theme" />
      <WaterFlowEchartsDemo v-else-if="activeTab === 'waterflow'" :theme="theme" />
      <CrossEchartsDemo v-else-if="activeTab === 'cross'" :theme="theme" />
      <RainEchartsDemo v-else-if="activeTab === 'rain'" :theme="theme" />
      <SectionalViewDemo v-else-if="activeTab === 'sectional'" :theme="theme" />
    </main>
  </div>
</template>

<style>
/* ===== 全局重置 ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #app { height: 100%; }
body { overflow: hidden; }

/* ===== 布局变量 ===== */
.layout {
  --bg: #f0f2f5;
  --bg-card: #ffffff;
  --bg-code: #f6f8fa;
  --text: #1f2328;
  --text-sub: #656d76;
  --border: #d0d7de;
  --accent: #0969da;
  --tab-hover: #e8ecf0;
  --tab-active-bg: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s, color 0.3s;
}

.layout.dark {
  --bg: #0d1117;
  --bg-card: #161b22;
  --bg-code: #1c2128;
  --text: #e6edf3;
  --text-sub: #8b949e;
  --border: #30363d;
  --accent: #58a6ff;
  --tab-hover: #21262d;
  --tab-active-bg: #161b22;
}

/* ===== 顶部栏 ===== */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 52px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.topbar-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-icon { font-size: 20px; }

.brand-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
}

.brand-sub {
  font-size: 12px;
  color: var(--text-sub);
  background: var(--bg);
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid var(--border);
}

.topbar-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text);
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;
}

.btn:hover { background: var(--tab-hover); }

.btn.btn-primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.btn.btn-primary:hover { opacity: 0.88; }

/* ===== 标签页 ===== */
.tabs {
  display: flex;
  gap: 2px;
  padding: 8px 16px 0;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  overflow-x: auto;
}

.tab-btn {
  padding: 8px 16px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--text-sub);
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 6px 6px 0 0;
  transition: color 0.15s, background 0.15s;
}

.tab-btn:hover {
  color: var(--text);
  background: var(--tab-hover);
}

.tab-btn.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
  background: var(--tab-active-bg);
  font-weight: 600;
}

/* ===== 内容区 ===== */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

/* ===== Demo 组件通用样式（全局，供各 Demo 使用） ===== */
.demo-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1100px;
  margin: 0 auto;
}

.demo-header {
  padding: 16px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
}

.demo-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}

.demo-desc {
  font-size: 14px;
  color: var(--text-sub);
}

.demo-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-container {
  width: 100%;
  height: 380px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
}

.code-block {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

.code-label {
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-sub);
  background: var(--bg-code);
  border-bottom: 1px solid var(--border);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-block pre {
  padding: 16px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
}

.code-block code {
  font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
  color: var(--text);
}
</style>
