# 优化与发布计划

经过对项目文件的分析，我发现当前代码存在对外部项目（如 `@vben/preferences`）的特定依赖，且使用了特定路径别名（`#/...`）。为了将其封装为独立的 npm 包 `atomic-echarts`，我建议执行以下计划：

## 1. 目录结构优化
将扁平的结构重组为标准的 npm 包结构：

```
atomic-echarts/
├── src/
│   ├── config/           # 图表配置文件
│   ├── hooks/            # 核心 Hooks (原根目录下的 use...ts)
│   ├── utils/            # 工具函数
│   ├── types/            # 类型定义 (新增，解决类型依赖)
│   └── index.ts          # 统一入口文件
├── package.json          # 依赖与发布配置
├── tsconfig.json         # TypeScript 配置
├── vite.config.ts        # 构建配置
└── README.md             # 使用文档
```

## 2. 代码重构与清理
为了解耦和通用化，需要修改部分代码：

### A. 移除外部依赖
- **`utils/useEchartsThemeColor.ts`**:
  - 移除 `import { usePreferences } from '@vben/preferences'`。
  - 修改为纯粹的 Hook，接受 `theme` 参数（支持 `'light' | 'dark'`），默认 `'light'`。

### B. 修复路径别名
- 将所有 `#/hook/echarts/...` 和 `#/types/...` 替换为正确的相对路径（例如 `../config/seriesConfig`）。

### C. 补充缺失类型
- 创建 `src/types/index.ts`，定义 `Theme` 类型（`export type Theme = 'light' | 'dark';`），替代原来的 `#/types/common`。

## 3. 构建与发布配置
### A. `package.json`
- 设置包名为 `atomic-echarts`。
- 添加 `peerDependencies`: `vue` (>=3.0.0), `echarts` (>=5.0.0)。
- 配置 `exports`, `main`, `module`, `types` 指向构建产物。

### B. `vite.config.ts`
- 使用 Vite 库模式 (Library Mode) 进行打包。
- 配置 `vite-plugin-dts` 自动生成类型声明文件 (`.d.ts`)。
- 确保外部化 `vue` 和 `echarts`，不打包进产物中。

## 4. 执行步骤
1.  **创建新目录结构**：创建 `src` 及子目录。
2.  **移动文件**：将现有文件归位。
3.  **重写/修改代码**：修复依赖和路径。
4.  **创建配置文件**：生成 `package.json`, `tsconfig.json`, `vite.config.ts`。
5.  **验证**：尝试构建项目，确保无误。

请确认是否按照此计划执行？
