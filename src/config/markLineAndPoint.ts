import type { MarkLineDataOption } from '../types';
import { mergeDeep } from '../utils/merge';

export function useGetMarkLine(option: MarkLineDataOption = {}): MarkLineDataOption {
  return mergeDeep(
    {},
    {
      label: {
        position: 'middle',
        distance: -10,
        formatter: '',
        fontWeight: 'bold',
        padding: 5,
        borderRadius: 3,
        color: '#FFF',
      },
      lineStyle: {
        type: 'solid',
        width: 2,
      },
    },
    option,
  );
}
