import type { EChartsOption } from '../types';
import type { Theme } from '../types';

import { useGetRainSeries } from '../config/seriesConfig';
import { useGetTimeXAxis } from '../config/xAxisConfig';
import { useGetRainYAxis } from '../config/yAxisConfig';
import useEchartsThemeColor from '../utils/useEchartsThemeColor';

export default function UseDoCountRainDrpEcharts(theme: Theme = 'light') {
  const { lineColor } = useEchartsThemeColor(theme);

  function getEchartsOptions(XData: any[], DrpData: any[]): EChartsOption {
    return {
      color: ['#3CDDCF'],
      title: {
        text: '',
        left: 'center',
        textStyle: {
          color: '#0078F9',
        },
      },
      grid: {
        top: 40,
        left: 46,
        right: 40,
        bottom: 30,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderColor: 'rgba(0,0,0,0.7)',
        padding: [5, 10, 5, 10],
        textStyle: {
          fontSize: 12,
          color: '#FFF',
        },
      },
      xAxis: [
        useGetTimeXAxis({
          name: '时间',
          type: 'category',
          data: XData,
          axisLine: {
            onZero: false,
            lineStyle: {
              color: lineColor.value,
            },
          },
        }),
      ],
      yAxis: [
        useGetRainYAxis({
          name: '降雨量(mm)',
          nameGap: 20,
          type: 'value',
          splitLine: {
            lineStyle: {
              color: 'rgba(153, 153, 153,0.5)',
              type: 'dashed',
            },
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#999999',
            },
          },
        }),
      ],
      series: [
        useGetRainSeries({
          name: '面雨量',
          type: 'bar',
          data: DrpData,
          itemStyle: {
            color: '#0078F9',
            borderRadius: [10, 10, 0, 0],
          },
          markLine: {
            label: {
              position: 'end', // 将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
              formatter: '预报开始时间',
              color: '#C0C4CC',
            },
            symbol: 'none',
            lineStyle: {
              color: '#C0C4CC',
            },
            data: [
              {
                name: '预报开始时间',
                xAxis: '',
              },
            ],
          },
        }),
      ],
    };
  }

  return {
    getEchartsOptions,
  };
}
