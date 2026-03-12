# atomic-echarts

基于 Vue 3 和 ECharts 的原子化 Hook 库，专注于水文、气象等领域的图表可视化。

## 安装

```bash
npm install atomic-echarts
# 或者
yarn add atomic-echarts
```

## 依赖

atomic-echarts 需要以下依赖：

```json
{
  "echarts": "^5.0.0",
  "vue": "^3.0.0"
}
```

## 快速开始

```typescript
import { useFlowEcharts } from 'atomic-echarts';
import * as echarts from 'echarts';

const chartDom = document.getElementById('chart');
const myChart = echarts.init(chartDom);

const { getEchartsOptions } = useFlowEcharts('light');

const xData = ['2024-01-01', '2024-01-02', '2024-01-03'];
const flowData = [120, 200, 150];

myChart.setOption(getEchartsOptions(xData, flowData));
```

## 功能模块

### 1. 流量图表 - useFlowEcharts

用于展示流量数据的折线图。

```typescript
import { useFlowEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useFlowEcharts('light');

const xData = ['2024-01-01', '2024-01-02', '2024-01-03'];
const flowData = [120, 200, 150];

const options = getEchartsOptions(xData, flowData);
```

**参数：**
- `theme`: 主题类型 `'light' | 'dark'`，默认 `'light'`

**方法：**
- `getEchartsOptions(XData: any[], FlowData: any[])`: 生成流量图表配置

---

### 2. 水位图表 - useWaterEcharts

用于展示水位数据的折线图。

```typescript
import { useWaterEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useWaterEcharts('light');

const xData = ['2024-01-01', '2024-01-02', '2024-01-03'];
const waterData = [10.5, 12.3, 11.8];

const options = getEchartsOptions(xData, waterData);
```

**参数：**
- `theme`: 主题类型 `'light' | 'dark'`，默认 `'light'`

**方法：**
- `getEchartsOptions(XData: any[], WaterData: any[])`: 生成水位图表配置

---

### 3. 水位流量组合图表 - useWaterFlowEcharts

用于同时展示水位和流量数据的双 Y 轴图表。

```typescript
import { useWaterFlowEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useWaterFlowEcharts('dark');

const xData = ['2024-01-01', '2024-01-02', '2024-01-03'];
const waterData = [10.5, 12.3, 11.8];
const flowData = [120, 200, 150];

const options = getEchartsOptions(xData, waterData, flowData);
```

**参数：**
- `theme`: 主题类型 `'light' | 'dark'`，默认 `'dark'`

**方法：**
- `getEchartsOptions(XData: any[], WaterData: any[], FlowData: any[])`: 生成水位流量组合图表配置

---

### 4. 断面图表 - useCrossEcharts

用于展示河道断面的图表，包含河床、水位、左堤、右堤等数据。

```typescript
import { useCrossEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useCrossEcharts('light');

const idData = ['断面1', '断面2', '断面3'];
const source = [
  [0, 0],
  [10, 5],
  [20, 8],
  // 数据格式：[距离, 河床, 水位, 左堤, 右堤]
];

const options = getEchartsOptions(idData, source);
```

**参数：**
- `theme`: 主题类型 `'light' | 'dark'`（可选）

**方法：**
- `getEchartsOptions(IdData: any[], source: any[], markPointData?: any[])`: 生成断面图表配置

---

### 5. 雨量统计图表 - useDoCountRainDrpEcharts

用于展示降雨量数据的柱状图。

```typescript
import { useDoCountRainDrpEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useDoCountRainDrpEcharts('light');

const xData = ['2024-01-01', '2024-01-02', '2024-01-03'];
const drpData = [5, 15, 8];

const options = getEchartsOptions(xData, drpData);
```

**参数：**
- `theme`: 主题类型 `'light' | 'dark'`，默认 `'light'`

**方法：**
- `getEchartsOptions(XData: any[], DrpData: any[])`: 生成雨量统计图表配置

---

### 6. 剖面图表 - useSectionalViewEcharts

用于展示河道剖面，包含水位和河床数据。

```typescript
import { useSectionalViewEcharts } from 'atomic-echarts';

const { getEchartsOptions } = useSectionalViewEcharts('light');

const xData = [0, 10, 20, 30, 40, 50];
const waterData = [null, null, 8.5, 9.2, 8.8, null];
const riverBedData = [0, 2, 5, 6, 3, 0];

const options = getEchartsOptions(xData, waterData, riverBedData);
```

**参数：**
- `theme`: 主题类型 `'light' | 'dark'`（可选）

**方法：**
- `getEchartsOptions(XData: any[], WaterData: any[], RiverBedData: any[])`: 生成剖面图表配置

---

## 配置函数

### 主题颜色 - useEchartsThemeColor

获取主题颜色配置。

```typescript
import useEchartsThemeColor from 'atomic-echarts';

const { textColor, lineColor, waterColor, flowColor } = useEchartsThemeColor('light');
```

---

## 构建

```bash
npm install
npm run build
```

构建完成后，生成的文件在 `dist` 目录下：

- `index.js` - 主入口文件
- `index.d.ts` - TypeScript 类型声明
- `config/` - 图表配置模块
- `hooks/` - 图表 Hook 模块
- `types/` - 类型定义模块
- `utils/` - 工具函数模块

## 发布

```bash
npm run publish-flat
```

或者先试运行：

```bash
npm run publish-flat-dry
```

## License

ISC
