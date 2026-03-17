# atomic-echarts

基于 Vue 3 + ECharts 的原子化 Hook 库，专注于水文、气象等领域的图表可视化�?
## 安装

```bash
npm install atomic-echarts
```

## Peer Dependencies

```json
{
  "echarts": "^6.0.0",
  "vue": "^3.0.0"
}
```

## 运行示例

```bash
npm run dev   # 访问 http://localhost:3000
```

示例涵盖所�?Hook 的交互演示，包含�?暗主题切换和全局换色功能�?
---

## 核心功能

### 全局颜色替换 �?`setGlobalColor`

调用后，**所有依赖该主题颜色的图表将自动响应更新**（无需手动刷新），这得益于内部使用 Vue `reactive` 管理颜色�?
```typescript
import { setGlobalColor } from 'atomic-echarts';

// �?light 主题的水位色改为橙色，使用该主题的图表立即更�?setGlobalColor('light', { waterColor: '#FF6600' });

// 支持部分覆盖
setGlobalColor('dark', {
  textColor: '#FFFFFF',
  lineColor: '#CCCCCC',
  waterColor: '#00B2FF',
  flowColor: '#FFB20F',
});
```

`EchartsColor` 可覆盖字段：

| 字段 | 说明 |
|------|------|
| `textColor` | 图例/轴标签文字颜�?|
| `lineColor` | 轴线颜色 |
| `waterColor` | 水位系列颜色 |
| `flowColor` | 流量系列颜色 |
| `drpColor` | 降雨系列颜色 |
| `color1` / `color2` | 其他扩展颜色 |

---

### 响应式主�?�?`Ref<Theme>` 支持

所�?Hook 均支持传�?`Ref<Theme>`。配�?`watchEffect`，主题切换时图表**自动重绘**，无需手动监听�?
```typescript
import { ref, watchEffect, onMounted } from 'vue';
import * as echarts from 'echarts';
import { useWaterEcharts } from 'atomic-echarts';

const theme = ref<'light' | 'dark'>('dark');

// 传入 Ref<Theme>，内部颜色会�?theme 响应变化
const { getEchartsOptions } = useWaterEcharts(theme);

let chart: echarts.EChartsType | null = null;

onMounted(() => {
  const el = document.getElementById('chart')!;
  watchEffect(() => {
    chart?.dispose();
    chart = echarts.init(el, theme.value === 'dark' ? 'dark' : undefined);
    chart.setOption(getEchartsOptions(xData, waterData));
  });
});

// 切换主题 �?watchEffect 自动触发 �?图表自动重绘
theme.value = 'light';

// setGlobalColor 同样会触�?watchEffect 自动重绘
setGlobalColor('light', { waterColor: '#FF6600' });
```

---

### 自定�?Option 合并

每个 Hook �?`getEchartsOptions` 最后一个参数均为可选的 `customOption?: EChartsOption`，内部使�?[`mergeEchartsOption`](#工具函数) 按数组索引深度合并，可精确覆盖任意属性：

```typescript
// 覆盖标题、grid
getEchartsOptions(xData, waterData, {
  title: { text: '水位趋势', left: 'center' },
  grid: { top: 60, left: 60 },
});

// 精确覆盖第一�?series 的颜色（不影响其�?series�?getEchartsOptions(xData, waterData, {
  series: [{ lineStyle: { color: '#FF0000' } }],
});
```

---

## Hooks

### `useWaterEcharts` �?水位折线�?
```typescript
import { useWaterEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useWaterEcharts('light'); // 或传�?Ref<Theme>

chart.setOption(
  getEchartsOptions(
    ['01/01', '01/02', '01/03'],  // XData: string[]
    [45.2, 46.1, 47.8],           // WaterData: number[]
    { title: { text: '水位趋势', left: 'center' } }, // customOption（可选）
  )
);
```

---

### `useFlowEcharts` �?流量折线�?
```typescript
import { useFlowEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useFlowEcharts('light');

chart.setOption(
  getEchartsOptions(
    ['01/01', '01/02', '01/03'], // XData: string[]
    [1200, 1350, 1800],          // FlowData: number[]
  )
);
```

---

### `useWaterFlowEcharts` �?水位流量双轴�?
水位（左 Y 轴）与流量（�?Y 轴）同框展示。默认主题为 `dark`�?
```typescript
import { useWaterFlowEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useWaterFlowEcharts('dark');

chart.setOption(
  getEchartsOptions(
    ['01/01', '01/02', '01/03'], // XData: string[]
    [45.2, 46.1, 47.8],          // WaterData: number[]
    [1200, 1350, 1800],          // FlowData: number[]
    { grid: { right: '15%' } },  // customOption（可选）
  )
);
```

---

### `useCrossEcharts` �?横断面图

展示河道横断面（河床 / 水位 / 左堤 / 右堤），支持水位标注点�?
额外参数 `markPointData` 并入 `options` 对象�?*不再**作为独立可选参数�?
```typescript
import { useCrossEcharts } from 'atomic-echarts';
import type { CrossEchartsOptions } from 'atomic-echarts';

// source 每行：[距离(m), 河床高程(m), 水位(m), 左堤(m), 右堤(m)]
const source: number[][] = [
  [0, 42, 47, 52, 52],
  [50, 18, 47, 49, 49],
  [100, 42, 47, 52, 52],
];
const IdData = source.map((_, i) => `桩号${i * 10}m`);

const { getEchartsOptions } = useCrossEcharts('dark');

const options: CrossEchartsOptions = {
  markPointData: [{ name: '峰�?, xAxis: 50, yAxis: 47 }], // 标注�?  grid: { left: 80 },                                       // ECharts 覆盖配置
};

chart.setOption(getEchartsOptions(IdData, source, options));
```

---

### `useRainEcharts` �?降雨量柱状图

```typescript
import { useRainEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useRainEcharts('light'); // 或传入 Ref<Theme>

chart.setOption(
  getEchartsOptions(
    ['08:00', '09:00', '10:00'], // XData: string[]
    [0, 2.5, 8.3],               // DrpData: number[]
    { title: { text: '逐时面雨量', left: 'center' } }, // customOption（可选）
  )
);
```

---

### `useSectionalViewEcharts` �?断面�?
首尾 X 轴标签自动替换为「左岸�?「右岸」�?
```typescript
import { useSectionalViewEcharts } from 'atomic-echarts';

const XData = ['0','1','2','3','4','5','6','7','8','9'];
const WaterData = [47,47,47,47,47,47,47,47,47,47]; // 水位均�?const RiverBedData = [52,40,30,24,19,19,24,30,40,52]; // 河床

const { getEchartsOptions } = useSectionalViewEcharts('light');

// 注意：传入副本，因内部会修改 XData[0] �?XData[末尾]
chart.setOption(getEchartsOptions([...XData], WaterData, RiverBedData));
```

---

## 工具函数

### `mergeEchartsOption`

专用�?ECharts option 的深度合并。与 `mergeDeep` 的区别：**当同一属性为数组时，按索引深度合并每个元�?*，而非整体替换。适用于精确覆�?`series[n]`、`yAxis[n]` 等数组元素�?
```typescript
import { mergeEchartsOption } from 'atomic-echarts';

const result = mergeEchartsOption(
  {},
  defaultOption,
  {
    // 只改第一�?series 的颜色，不影响其�?series
    series: [{ lineStyle: { color: 'red' } }],
  }
);
```

### `mergeDeep`

通用深度合并，数组按整体替换�?
### `useEchartsThemeColor`

获取响应式主题颜色，支持 `Ref<Theme>`�?
```typescript
import useEchartsThemeColor from 'atomic-echarts/utils/useEchartsThemeColor';

const theme = ref<'light' | 'dark'>('dark');
const { textColor, lineColor, waterColor, flowColor, drpColor } = useEchartsThemeColor(theme);

// textColor.value 会随 theme �?setGlobalColor 变化自动更新
```

---

## 配置模块

可直接使用底层配置函数构建自定义图表�?
```typescript
import {
  useGetWaterSeries,
  useGetFlowSeries,
  useGetRainSeries,
  useCommonLineSeries,
  useCommonBarSeries,
} from 'atomic-echarts';

import {
  useGetTimeXAxis,
  useCommonXAxis,
} from 'atomic-echarts';

import {
  useGetWaterYAxis,
  useGetFlowYAxis,
  useGetRainYAxis,
  useCommonYAxis,
} from 'atomic-echarts';
```

---

## 构建与发布

```bash
npm run build           # TypeScript 编译到 dist/
npm run publish-flat    # 构建 + 发布
npm run publish-flat-dry # 试运行（不实际发布）
```

## License

ISC
