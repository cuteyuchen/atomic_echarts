import type { Ref } from 'vue';
import type { EChartsOption } from '../types';
import type { Theme } from '../types';

import * as echarts from 'echarts';

import { useGetWaterYAxis } from '../config/yAxisConfig';
import useEchartsThemeColor from '../utils/useEchartsThemeColor';
import { mergeEchartsOption } from '../utils/merge';

/**
 * 横断面图专用配置：在标准 EChartsOption 基础上扩展 markPointData 字段，
 * 避免拆分为两个可选参数造成调用端传参混乱。
 */
export type CrossEchartsOptions = EChartsOption & {
  /** 水位线上的标注点数据，格式与 ECharts markPoint.data 一致 */
  markPointData?: any[];
};

export default function useCrossEcharts(theme?: Theme | Ref<Theme>) {
  const { textColor, lineColor } = useEchartsThemeColor(theme);

  const path =
    'path://M158.3104 589.824h707.3792a10.8544 10.8544 0 0 0 10.8544-10.8544v-133.98016a10.8544 10.8544 0 0 0-10.8544-10.8544H155.648a8.192 8.192 0 0 0-8.192 8.192v136.56064a10.8544 10.8544 0 0 0 10.8544 10.93632z M512 512m-131.072 0a131.072 131.072 0 1 0 262.144 0 131.072 131.072 0 1 0-262.144 0Z';

  /**
   * 获取横断面图表配置
   * @param IdData 各点 ID/标签数据
   * @param source dataset 二维源数据（每行：[距离, 河床, 水位, 左堤, 右堤]）
   * @param options 可选配置对象，含 markPointData（标注点）及所有 EChartsOption 字段
   * @example
   * getEchartsOptions(IdData, source, { markPointData: [{ xAxis: 50, yAxis: 47 }], grid: { left: 80 } })
   */
  function getEchartsOptions(IdData: string[], source: number[][], options?: CrossEchartsOptions): EChartsOption {
    const { markPointData = [], ...customOption } = options ?? ({} as CrossEchartsOptions);

    const defaultOption: EChartsOption = {
      color: ['#FFCC00', '#037AFF', '#AEE500', '#23D692'],
      dataZoom: [{ type: 'inside' }, { type: 'slider', height: 20 }],
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          let formatter = IdData[params[0].dataIndex];
          params.forEach((item: any) => {
            const yIndex = item.encode?.y?.[0] ?? item.seriesIndex + 1;
            formatter += `<br/>${item.marker}${item.seriesName}：${item.value[yIndex]}`;
          });
          return formatter;
        },
      },
      grid: {
        left: 60,
        top: 60,
        right: '2%',
        bottom: 50,
      },
      legend: {
        textStyle: {
          color: textColor.value,
        },
        data: [
          { name: '河床', icon: 'rect' },
          { name: '水位', icon: path },
          { name: '左堤', icon: path },
          { name: '右堤', icon: path },
        ],
        top: 0,
        left: 'center',
        right: 'center',
      },
      xAxis: {
        type: 'value',
        max: 'dataMax',
        axisPointer: { type: 'none' },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: { show: false, formatter: '' },
      },
      yAxis: useGetWaterYAxis({ textColor: textColor.value, lineColor: lineColor.value }),
      dataset: { source },
      series: [
        {
          name: '河床',
          encode: { x: 0, y: 1 },
          smooth: true,
          showSymbol: false,
          type: 'line',
          lineStyle: { width: 0 },
          areaStyle: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#FF9F60' },
              { offset: 0.5, color: '#FF9F60' },
              { offset: 1, color: '#815131' },
            ]),
          },
          z: 3,
        },
        {
          name: '水位',
          z: 2,
          encode: { x: 0, y: 2 },
          smooth: true,
          showSymbol: false,
          type: 'line',
          lineStyle: { color: '#00A0B4' },
          areaStyle: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#278dff' },
              { offset: 1, color: '#144780' },
            ]),
          },
          markPoint: {
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: { color: 'red' },
            data: markPointData,
            animation: false,
          },
        },
        {
          name: '左堤',
          type: 'line',
          encode: { x: 0, y: 3 },
          smooth: true,
          showSymbol: false,
          lineStyle: { color: '#00FEFE' },
          z: 3,
        },
        {
          name: '右堤',
          type: 'line',
          encode: { x: 0, y: 4 },
          smooth: true,
          showSymbol: false,
          lineStyle: { color: '#76E40D' },
          z: 3,
        },
      ],
    };
    return mergeEchartsOption({}, defaultOption, customOption as EChartsOption);
  }

  return { getEchartsOptions };
}
