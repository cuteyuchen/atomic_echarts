export * from './types';
export * from './config/config';
export * from './config/seriesConfig';
export * from './config/xAxisConfig';
export * from './config/yAxisConfig';
export * from './config/markLineAndPoint';
export * from './utils/merge';
export * from './utils/useEchartsUtils';
export { default as useEchartsThemeColor } from './utils/useEchartsThemeColor';

import useCrossEcharts from './hooks/useCrossEcharts';
import useDoCountRainDrpEcharts from './hooks/useDoCountRainDrpEcharts';
import useFlowEcharts from './hooks/useFlowEcharts';
import useSectionalViewEcharts from './hooks/useSectionalViewEcharts';
import useWaterEcharts from './hooks/useWaterEcharts';
import useWaterFlowEcharts from './hooks/useWaterFlowEcharts';

export {
  useCrossEcharts,
  useDoCountRainDrpEcharts,
  useFlowEcharts,
  useSectionalViewEcharts,
  useWaterEcharts,
  useWaterFlowEcharts
};
