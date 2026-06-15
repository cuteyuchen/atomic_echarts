/**
 * 判断是否为纯对象
 * @param item 
 * @returns 
 */
export function isObject(item: unknown): item is Record<string, unknown> {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * 深度合并对象
 * 类似于 lodash.merge
 * @param target 目标对象
 * @param sources 源对象
 * @returns 合并后的对象
 */
export function mergeDeep<T>(target: T, ...sources: unknown[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    const targetRecord = target as Record<string, unknown>;
    for (const key in source) {
      const sourceVal = source[key];
      if (isObject(sourceVal)) {
        if (!isObject(targetRecord[key])) {
          targetRecord[key] = {};
        }
        mergeDeep(targetRecord[key], sourceVal);
      } else {
        targetRecord[key] = sourceVal;
      }
    }
  }

  return mergeDeep(target, ...sources);
}

/**
 * 专用于 ECharts option 的深度合并。
 * 与 mergeDeep 的区别：当目标和源的同一属性都是数组时，
 * 按索引对每个元素进行深度合并，而非整体替换。
 * 这使得 customOption.series[0].lineStyle.color 可以精确覆盖默认系列的颜色。
 *
 * @example
 * // 只修改第一条 series 的颜色，其余保持不变
 * mergeEchartsOption({}, defaultOption, { series: [{ lineStyle: { color: 'red' } }] })
 */
export function mergeEchartsOption<T>(target: T, ...sources: unknown[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    const targetRecord = target as Record<string, unknown>;
    for (const key in source) {
      const sourceVal = source[key];
      const targetVal = targetRecord[key];

      if (Array.isArray(sourceVal)) {
        if (Array.isArray(targetVal)) {
          // 按索引深度合并数组元素
          const merged = [...targetVal];
          sourceVal.forEach((item, i) => {
            if (i < merged.length && isObject(merged[i]) && isObject(item)) {
              merged[i] = mergeDeep({}, merged[i], item);
            } else {
              merged[i] = item;
            }
          });
          // 追加源数组中超出目标长度的元素
          for (let i = targetVal.length; i < sourceVal.length; i++) {
            merged.push(sourceVal[i]);
          }
          targetRecord[key] = merged;
        } else {
          targetRecord[key] = [...sourceVal];
        }
      } else if (isObject(sourceVal)) {
        if (!targetVal) {
          targetRecord[key] = {};
        }
        mergeEchartsOption(targetRecord[key], sourceVal);
      } else {
        targetRecord[key] = sourceVal;
      }
    }
  }

  return mergeEchartsOption(target, ...sources);
}
