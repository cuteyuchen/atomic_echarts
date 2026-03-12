import * as echarts from 'echarts';

export type Theme = 'light' | 'dark';

export type EChartsType = echarts.EChartsType;

export interface EchartsColor {
  textColor: string;
  lineColor: string;
  waterColor: string;
  flowColor: string;
  drpColor: string;
  color1: string;
  color2: string;
}

export type SetOptionOpts = echarts.SetOptionOpts;

export type EChartsOption = echarts.EChartsOption;

export type SeriesOption = echarts.SeriesOption;

export type YAxisOption = echarts.YAXisComponentOption;

export type XAxisOption = echarts.XAXisComponentOption;

export type MarkLineDataOption = NonNullable<echarts.MarkLineComponentOption['data']>[number];

export interface commonOptions {
  textColor?: string; // 文字颜色
  lineColor?: string; // 线颜色
  theme?: Theme; // 主题
}

export type MySeriesOption = SeriesOption;

export type MyLineSeriesOption = commonOptions & echarts.LineSeriesOption;

export type MyBarSeriesOption = commonOptions & echarts.BarSeriesOption;

export type MyXAxisOption = commonOptions & XAxisOption;

export type MyYAxisOption = commonOptions &
  YAxisOption & {
    data?: number[];
  };

export type MarkPointOption = echarts.MarkPointComponentOption;
